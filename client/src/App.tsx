import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProfileModal } from "@/components/ProfileModal";
import { HomePage } from "@/pages/HomePage";
import { SocialWallPage } from "@/pages/SocialWallPage";
import { AboutPage } from "@/pages/AboutPage";
import { connectWallet, signMessage } from "@/lib/wallet";
import { createPost, subscribeToPostsExclude, toggleLike, toggleDislike } from "@/lib/firestore";
import { isConfigured } from "@/lib/firebase";
import type { Post, WalletConnection } from "@shared/schema";

function AppContent() {
  const { toast } = useToast();
  const [wallet, setWallet] = useState<WalletConnection | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [votingPostId, setVotingPostId] = useState<string>();

  useEffect(() => {
    if (isConfigured) {
      const unsubscribe = subscribeToPostsExclude((newPosts) => {
        setPosts(newPosts);
        setIsLoading(false);
      });
      return () => unsubscribe();
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleConnectWallet = async () => {
    try {
      const connection = await connectWallet();
      setWallet(connection);
      
      toast({
        title: "Wallet connected",
        description: `Connected to ${connection.address.slice(0, 6)}...${connection.address.slice(-4)}`,
      });
    } catch (error: any) {
      toast({
        title: "Connection failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      });
    }
  };

  const handleDisconnect = () => {
    setWallet(null);
    setShowProfile(false);
    toast({
      title: "Wallet disconnected",
      description: "Your wallet has been disconnected",
    });
  };

  const handleCreatePost = async (message: string) => {
    if (!wallet?.address) return;

    setIsCreating(true);
    try {
      let signature: string | undefined;

      try {
        const signatureMessage = `Web3 Social Wall\n\nI am posting the following message:\n"${message}"\n\nTimestamp: ${Date.now()}`;
        signature = await signMessage(wallet.address, signatureMessage);
      } catch (signError: any) {
        if (signError.message.includes("rejected")) {
          toast({
            title: "Signature required",
            description: "You need to sign the message to prove ownership",
            variant: "destructive",
          });
          setIsCreating(false);
          return;
        }
      }

      if (isConfigured) {
        await createPost({
          message,
          address: wallet.address,
          signature,
        });
      } else {
        const newPost: Post = {
          id: `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          message,
          address: wallet.address.toLowerCase(),
          timestamp: Date.now(),
          likes: 0,
          dislikes: 0,
          likedBy: [],
          dislikedBy: [],
          ensName: wallet.ensName,
          signature,
        };
        setPosts(prev => [newPost, ...prev]);
      }

      toast({
        title: "Post created",
        description: "Your post has been shared with the community",
      });
    } catch (error: any) {
      console.error("Error creating post:", error);
      toast({
        title: "Failed to create post",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const handleLike = async (postId: string) => {
    if (!wallet?.address || votingPostId) return;
    
    setVotingPostId(postId);

    try {
      if (isConfigured) {
        await toggleLike(postId, wallet.address);
      } else {
        setPosts(prev => prev.map(post => {
          if (post.id !== postId) return post;

          const userAddress = wallet.address!.toLowerCase();
          const hasLiked = post.likedBy.includes(userAddress);
          const hasDisliked = post.dislikedBy.includes(userAddress);

          if (hasLiked) {
            return {
              ...post,
              likes: post.likes - 1,
              likedBy: post.likedBy.filter(addr => addr !== userAddress),
            };
          }

          if (hasDisliked) {
            return {
              ...post,
              likes: post.likes + 1,
              dislikes: post.dislikes - 1,
              likedBy: [...post.likedBy, userAddress],
              dislikedBy: post.dislikedBy.filter(addr => addr !== userAddress),
            };
          }

          return {
            ...post,
            likes: post.likes + 1,
            likedBy: [...post.likedBy, userAddress],
          };
        }));
      }
    } catch (error: any) {
      console.error("Error toggling like:", error);
      toast({
        title: "Failed to like post",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => setVotingPostId(undefined), 300);
    }
  };

  const handleDislike = async (postId: string) => {
    if (!wallet?.address || votingPostId) return;
    
    setVotingPostId(postId);

    try {
      if (isConfigured) {
        await toggleDislike(postId, wallet.address);
      } else {
        setPosts(prev => prev.map(post => {
          if (post.id !== postId) return post;

          const userAddress = wallet.address!.toLowerCase();
          const hasLiked = post.likedBy.includes(userAddress);
          const hasDisliked = post.dislikedBy.includes(userAddress);

          if (hasDisliked) {
            return {
              ...post,
              dislikes: post.dislikes - 1,
              dislikedBy: post.dislikedBy.filter(addr => addr !== userAddress),
            };
          }

          if (hasLiked) {
            return {
              ...post,
              likes: post.likes - 1,
              dislikes: post.dislikes + 1,
              likedBy: post.likedBy.filter(addr => addr !== userAddress),
              dislikedBy: [...post.dislikedBy, userAddress],
            };
          }

          return {
            ...post,
            dislikes: post.dislikes + 1,
            dislikedBy: [...post.dislikedBy, userAddress],
          };
        }));
      }
    } catch (error: any) {
      console.error("Error toggling dislike:", error);
      toast({
        title: "Failed to dislike post",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => setVotingPostId(undefined), 300);
    }
  };

  const userPosts = posts.filter(
    post => wallet?.address && post.address.toLowerCase() === wallet.address.toLowerCase()
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        walletAddress={wallet?.address}
        onConnectWallet={handleConnectWallet}
        onOpenProfile={() => setShowProfile(true)}
      />

      <Switch>
        <Route path="/">
          <HomePage
            onConnectWallet={handleConnectWallet}
            isConnected={!!wallet}
          />
        </Route>
        
        <Route path="/wall">
          <SocialWallPage
            posts={posts}
            currentAddress={wallet?.address}
            isConnected={!!wallet}
            onCreatePost={handleCreatePost}
            onLike={handleLike}
            onDislike={handleDislike}
            isCreating={isCreating}
            isLoading={isLoading}
            votingPostId={votingPostId}
          />
        </Route>
        
        <Route path="/about">
          <AboutPage />
        </Route>
      </Switch>

      <Footer />

      {showProfile && wallet && (
        <ProfileModal
          address={wallet.address}
          ensName={wallet.ensName}
          userPosts={userPosts}
          onClose={() => setShowProfile(false)}
          onDisconnect={handleDisconnect}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <AppContent />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
