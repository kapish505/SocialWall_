import { X, Copy, LogOut, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { getInitials, generateIdenticon } from "@/lib/wallet";
import type { Post } from "@shared/schema";

interface ProfileModalProps {
  address: string;
  ensName?: string;
  userPosts: Post[];
  onClose: () => void;
  onDisconnect: () => void;
}

export function ProfileModal({ address, ensName, userPosts, onClose, onDisconnect }: ProfileModalProps) {
  const { toast } = useToast();

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address copied",
      description: "Wallet address copied to clipboard",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        data-testid="overlay-profile-modal"
      />
      
      <Card className="relative w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={generateIdenticon(address)} alt={address} />
                <AvatarFallback>{getInitials(address)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                {ensName && (
                  <h2 className="text-xl font-bold mb-1" data-testid="text-ens-name">
                    {ensName}
                  </h2>
                )}
                <div className="flex items-center gap-2">
                  <code className="text-sm text-muted-foreground break-all font-mono" data-testid="text-full-address">
                    {address}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copyAddress}
                    className="h-8 w-8 flex-shrink-0"
                    aria-label="Copy address"
                    data-testid="button-copy-address"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <a
                  href={`https://etherscan.io/address/${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline inline-flex items-center gap-1 mt-2"
                  data-testid="link-etherscan"
                >
                  View on Etherscan
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close"
              data-testid="button-close-modal"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <h3 className="font-semibold mb-4" data-testid="text-posts-count">
            Your Posts ({userPosts.length})
          </h3>
          
          {userPosts.length === 0 ? (
            <p className="text-muted-foreground text-center py-8" data-testid="text-no-posts">
              You haven't posted anything yet.
            </p>
          ) : (
            <div className="space-y-4">
              {userPosts.map((post) => (
                <Card key={post.id} className="p-4">
                  <p className="text-sm mb-2" data-testid={`text-post-${post.id}`}>
                    {post.message}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span data-testid={`text-post-date-${post.id}`}>
                      {new Date(post.timestamp).toLocaleDateString()}
                    </span>
                    <span data-testid={`text-post-likes-${post.id}`}>
                      {post.likes} likes
                    </span>
                    <span data-testid={`text-post-dislikes-${post.id}`}>
                      {post.dislikes} dislikes
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 border-t">
          <Button
            variant="destructive"
            className="w-full gap-2"
            onClick={onDisconnect}
            data-testid="button-disconnect-wallet"
          >
            <LogOut className="h-4 w-4" />
            Disconnect Wallet
          </Button>
        </div>
      </Card>
    </div>
  );
}
