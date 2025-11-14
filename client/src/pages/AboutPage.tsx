import { Card } from "@/components/ui/card";
import { Code, Database, Wallet, Sparkles } from "lucide-react";

export function AboutPage() {
  return (
    <div className="flex-1 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold" data-testid="text-about-title">
              About Web3 Social Wall
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A decentralized social platform built for the Web3 community, powered by blockchain technology and modern web infrastructure.
            </p>
          </div>

          <Card className="p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-6" data-testid="text-project-description">
              Project Overview
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Web3 Social Wall is a demonstration project that combines the power of blockchain identity with modern social networking features. By connecting your MetaMask wallet, you become part of a decentralized community where your wallet address is your identity.
              </p>
              <p>
                This platform showcases how Web3 technologies can be integrated into everyday applications, providing a glimpse into the future of decentralized social media where users have true ownership of their identity and interactions.
              </p>
              <p>
                Built as a hackathon project, this application demonstrates real-time data synchronization, wallet-based authentication, and community engagement features in a beautiful, modern interface.
              </p>
            </div>
          </Card>

          <div>
            <h2 className="text-2xl font-bold mb-6" data-testid="text-tech-stack">
              Technology Stack
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 hover-elevate transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Wallet className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">MetaMask Integration</h3>
                    <p className="text-sm text-muted-foreground">
                      Wallet connection and message signing for verified posts
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-elevate transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Database className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Firebase Firestore</h3>
                    <p className="text-sm text-muted-foreground">
                      Real-time database for posts, likes, and user interactions
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-elevate transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Code className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">React & TypeScript</h3>
                    <p className="text-sm text-muted-foreground">
                      Modern frontend with type safety and component architecture
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover-elevate transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Tailwind CSS</h3>
                    <p className="text-sm text-muted-foreground">
                      Glassmorphism design with smooth animations
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <Card className="p-8 md:p-12 bg-primary/5">
            <h2 className="text-2xl font-bold mb-6" data-testid="text-hackathon">
              Built for Innovation
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This project was created as a hackathon demonstration to explore the possibilities of Web3 social platforms. It showcases how blockchain technology can enhance user identity and create more transparent, community-driven social experiences.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              While this is a demo project, it implements production-ready features including transaction-safe voting, real-time updates, and secure wallet integration. We welcome feedback and contributions from the community!
            </p>
          </Card>

          <Card className="p-8 md:p-12">
            <h2 className="text-2xl font-bold mb-6">Contact & Support</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Have questions or feedback? We'd love to hear from you! This is an open-source demonstration project built to inspire and educate about Web3 technologies.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
                data-testid="link-github-about"
              >
                GitHub Repository
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
                data-testid="link-discord"
              >
                Join Discord
              </a>
              <span className="text-muted-foreground">•</span>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
                data-testid="link-twitter-about"
              >
                Follow on Twitter
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
