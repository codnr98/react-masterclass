import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";

const CoinList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 40px;
`;

const Coin = styled.div`
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.bgColor};
  width: 100%;
  height: 40px;
  border-radius: 8px;
  margin-top: 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  a {
    padding: 20px;
    display: flex;
    align-items: center;
  }
`;

const Loading = styled.span`
  margin: 20px;
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-left: 10px;
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0, 100)); //arr.slice(0,100) arr의 0, 100을 제외한 나머지를 자른다.
      setLoading(false);
    })(); // (()=>{})() 함수를 할당과 동시에 호출한다.
  }, []);
  return (
    <>
      <Header />
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <CoinList>
          {coins.map((item) => (
            <Coin key={item.id}>
              <Img
                src={`https://coinicons-api.vercel.app/api/icon/${item.symbol.toLowerCase()}`}
              />
              <Link to={`/${item.id}`} state={item}>
                {item.name}
              </Link>
            </Coin>
          ))}
        </CoinList>
      )}
    </>
  );
}

export default Coins;
