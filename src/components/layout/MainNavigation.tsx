
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Newspaper, TrendingUp, Calendar, Settings } from "lucide-react";
import type { ReactNode } from "react";

const components = [
  {
    title: "Todas as Notícias",
    href: "/dashboard",
    description: "Visualize todas as notícias disponíveis com filtros avançados",
    icon: <Newspaper className="h-4 w-4" />,
  },
  {
    title: "Tendências",
    href: "/trending",
    description: "Acompanhe as notícias mais populares e comentadas",
    icon: <TrendingUp className="h-4 w-4" />,
  },
  {
    title: "Arquivo",
    href: "/archive",
    description: "Acesse notícias antigas organizadas por data",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    title: "Configurações",
    href: "/settings",
    description: "Personalize suas preferências de notícias",
    icon: <Settings className="h-4 w-4" />,
  },
];

interface ListItemProps {
  className?: string;
  title: string;
  href: string;
  children: ReactNode;
  icon?: ReactNode;
}

const ListItem = ({ className, title, href, children, icon, ...props }: ListItemProps) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {icon}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

export function MainNavigation() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Navegação</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  icon={component.icon}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        

      </NavigationMenuList>
    </NavigationMenu>
  );
}