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
    <nav>
      <Link to="/">Animals</Link> 
      <Link to="/species">Species</Link>
      <Link to="/breeds">Breeds</Link>
      <Link to="/generate">Generate</Link>
    </nav> 
  )
}
