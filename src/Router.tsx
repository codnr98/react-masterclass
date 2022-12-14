import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coins from "./router/Coins";
import Coin from "./router/Coin";
import CoinChart from "./router/Chart";
import Price from "./router/Price";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:coinId" element={<Coin />}>
          <Route path="chart" element={<CoinChart />} />
          <Route path="price" element={<Price />} />
        </Route>
        <Route path="/" element={<Coins />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
