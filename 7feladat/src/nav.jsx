import { Outlet, Link } from "react-router-dom";


const Layout = () => { 
  return ( 
    <> 
      <nav> 
        <ul> 
          <li> 
            <Link to="/react/7feladat/vissza">Vissza</Link> 
          </li> 
          <li> 
            <Link to="/react/7feladat/blackjack">BlackJack</Link> 
          </li> 
          <li> 
            <Link to="/react/7feladat/rockpaperscissors">RPS</Link> 
          </li> 
        </ul> 
      </nav> 
 
      <Outlet /> 
    </> 
  ) 
}; 
export default Layout; 