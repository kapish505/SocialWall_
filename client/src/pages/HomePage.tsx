import { useLocation } from "wouter";
import { Wallet, Zap, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImage from "@assets/generated_images/Web3_wallet_hero_illustration_3afe4e48.png";

interface HomePageProps {
  onConnectWallet: () => void;
  isConnected: boolean;
}

export function HomePage({ onConnectWallet, isConnected }: HomePageProps) {
  const [, navigate] = useLocation();

  return (
    <div className="flex-1">
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight" data-testid="text-hero-title">
                  Your Voice on the{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                    Blockchain
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed" data-testid="text-hero-subtitle">
                  Connect your wallet, share your thoughts, and engage with the decentralized social network of tomorrow.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                {isConnected ? (
                  <Button
                    size="lg"
                    onClick={() => navigate("/wall")}
                    className="gap-2 text-lg px-8 py-6"
                    data-testid="button-view-wall"
                  >
                    <Zap className="h-5 w-5" />
                    View Social Wall
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    onClick={onConnectWallet}
                    className="gap-2 text-lg px-8 py-6"
                    data-testid="button-hero-connect"
                  >
                    <Wallet className="h-5 w-5" />
                    Connect Wallet
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/about")}
                  className="text-lg px-8 py-6"
                  data-testid="button-learn-more"
                >
                  Learn More
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={heroImage}
                  alt="Web3 Social Wall Illustration"
                  className="w-full h-auto"
                  data-testid="img-hero"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-features-title">
              Why Web3 Social?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the future of social networking with blockchain-powered identity and real-time engagement.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover-elevate transition-all duration-200">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3" data-testid="text-feature-realtime">
                Real-time Updates
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                See posts and interactions update instantly with Firebase real-time database integration.
              </p>
            </Card>

            <Card className="p-8 hover-elevate transition-all duration-200">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3" data-testid="text-feature-secure">
                Secure & Verified
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Your wallet is your identity. Message signing ensures authentic posts from verified addresses.
              </p>
            </Card>

            <Card className="p-8 hover-elevate transition-all duration-200">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3" data-testid="text-feature-community">
                Community Driven
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Like and engage with posts from the Web3 community. Your voice matters on the blockchain.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
