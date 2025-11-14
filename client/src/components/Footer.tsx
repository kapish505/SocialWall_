import { Github, Twitter, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full backdrop-blur-lg bg-card/50 border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">W3</span>
              </div>
              <span className="font-bold text-lg">Web3 Social</span>
            </div>
            <p className="text-sm text-muted-foreground">
              A decentralized social platform powered by MetaMask and Firebase. Built for the Web3 community.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-foreground transition-colors" data-testid="link-footer-home">
                  Home
                </a>
              </li>
              <li>
                <a href="/wall" className="hover:text-foreground transition-colors" data-testid="link-footer-wall">
                  Social Wall
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-foreground transition-colors" data-testid="link-footer-about">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md bg-accent hover-elevate active-elevate-2 flex items-center justify-center transition-transform"
                aria-label="GitHub"
                data-testid="link-github"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md bg-accent hover-elevate active-elevate-2 flex items-center justify-center transition-transform"
                aria-label="Twitter"
                data-testid="link-twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://replit.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-md bg-accent hover-elevate active-elevate-2 flex items-center justify-center transition-transform"
                aria-label="Website"
                data-testid="link-website"
              >
                <Globe className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>Built with 💜 for the Web3 community | Hackathon Demo Project</p>
        </div>
      </div>
    </footer>
  );
}
