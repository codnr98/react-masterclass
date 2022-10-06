import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coins from "./router/Coins";
import Coin from "./router/Coin";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:coinId" element={<Coin />} />
        <Route path="/" element={<Coins />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
