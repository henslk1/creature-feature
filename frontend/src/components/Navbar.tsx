import { Link } from "react-router-dom";

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
