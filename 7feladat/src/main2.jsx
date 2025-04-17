import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlackjackApp from './BJ/BJ'
import Layout from './nav';
import Home from "./home";
import RockPaperScissorsApp from "./RPS/App";
import Vissza from "./vissza";

export default function Main2() { 
    return ( 
      <BrowserRouter> 
        <Routes> 
          <Route path="/react/7feladat" element={<Layout />}>
            <Route index element={<Home />} /> 
            <Route path="blackjack" element={<BlackjackApp />} />
            <Route path="rockpaperscissors" element={<RockPaperScissorsApp />} />
            <Route path="/" element={<Vissza />} />
          </Route> 
        </Routes> 
      </BrowserRouter> 
    ); 
  } 