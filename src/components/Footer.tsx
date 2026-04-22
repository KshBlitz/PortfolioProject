import { Mail, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        <div className="grid grid-cols-3 items-center">
          
          {/* Left */}
          <div className="text-left">
            <p className="font-semibold text-sm">Kalash Mahajan</p>
            <p className="text-xs text-muted-foreground">
              Security Engineer
            </p>
          </div>

          {/* Center (perfect center now) */}
          <div className="flex justify-center gap-5">
            <a
              href="mailto:mahajankalash8@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="size-4" />
            </a>

            <a
              href="https://linkedin.com/in/kalashmahajan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="size-4" />
            </a>

            <a
              href="https://github.com/KshBlitz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="size-4" />
            </a>
          </div>

          {/* Right */}
          <div className="text-right text-xs text-muted-foreground">
            © {currentYear} Kalash Mahajan. All rights reserved.
          </div>

        </div>

      </div>
    </footer>
  );
}