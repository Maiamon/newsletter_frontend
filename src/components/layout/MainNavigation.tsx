
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
    href: "/dashboard",
    description: "Acompanhe as notícias mais populares e comentadas",
    icon: <TrendingUp className="h-4 w-4" />,
  },
  {
    title: "Arquivo",
    href: "/dashboard",
    description: "Acesse notícias antigas organizadas por data",
    icon: <Calendar className="h-4 w-4" />,
  },
  {
    title: "Perfil",
    href: "/profile",
    description: "Gerencie suas informações pessoais e preferências",
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
            "block select-none space-y-2 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:shadow-md focus:bg-gradient-to-r focus:from-blue-100 focus:to-purple-100 border border-transparent hover:border-white/30 group",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {icon}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-600 ml-11">
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
          <NavigationMenuTrigger className="bg-white/30 backdrop-blur-sm border border-white/20 text-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 hover:text-blue-700 data-[state=open]:bg-gradient-to-r data-[state=open]:from-blue-100 data-[state=open]:to-purple-100 data-[state=open]:text-blue-700 transition-all duration-300 shadow-md">
            Navegação
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white/95 backdrop-blur-md border border-white/20 shadow-xl">
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