import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Heart, Github, Mail, Calendar } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Informações da aplicação */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Newsletter Dashboard</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Acompanhe as últimas notícias de forma organizada e mantenha-se sempre informado 
              sobre os assuntos que mais importam para você.
            </p>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                <Calendar className="h-3 w-3 mr-1" />
                {currentYear}
              </Badge>
              <Badge variant="outline">
                v1.0.0
              </Badge>
            </div>
          </div>

          {/* Links úteis */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Links Úteis</h3>
            <div className="flex flex-col space-y-2 text-sm">
              <a 
                href="/dashboard" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Dashboard
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Sobre
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Termos de Uso
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Política de Privacidade
              </a>
            </div>
          </div>

          {/* Contato e redes sociais */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Contato</h3>
            <div className="flex flex-col space-y-2 text-sm">
              <a 
                href="mailto:contato@newsletter.com" 
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                contato@newsletter.com
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>© {currentYear} Newsletter Dashboard. Feito com</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>em React + TypeScript.</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span>Powered by shadcn/ui</span>
          </div>
        </div>
      </div>
    </footer>
  );
}