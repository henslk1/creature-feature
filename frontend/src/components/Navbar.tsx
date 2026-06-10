import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  return (
    <div className="border-b bg-background px-6 py-3 flex items-center gap-6">
      <span className="font-bold text-lg">Creature Feature</span>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Management</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="p-2 w-40">
                <li><NavigationMenuLink asChild><Link to="/" className="block px-3 py-2 rounded hover:bg-accent">Animals</Link></NavigationMenuLink></li>
                <li><NavigationMenuLink asChild><Link to="/species" className="block px-3 py-2 rounded hover:bg-accent">Species</Link></NavigationMenuLink></li>
                <li><NavigationMenuLink asChild><Link to="/breeds" className="block px-3 py-2 rounded hover:bg-accent">Breeds</Link></NavigationMenuLink></li>
                <li><NavigationMenuLink asChild><Link to="/generate" className="block px-3 py-2 rounded hover:bg-accent">Generate</Link></NavigationMenuLink></li> 
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
