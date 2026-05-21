"use client"

import { Github, Linkedin, Mail, FileText } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2 font-mono text-sm">
              <span className="text-primary">fatih</span>
              <span className="text-foreground">OS</span>
              <span className="text-muted-foreground">v1.0</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Fatih Berk Yozgatli. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/fatihberkyozgatli"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/fatih-berk-yozgatli-4b623b261/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:fatihberkyozgatli@gmail.com"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="/Fatih_Berk_Yozgatli_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Resume"
            >
              <FileText className="w-5 h-5" />
            </a>
          </div>
        </div>


      </div>
    </footer>
  )
}
