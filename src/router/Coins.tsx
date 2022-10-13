import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
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

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  //react query는 해당 response를 caching하고 있다. 그래서 다른페이지를 다녀와도 react query는 데이터를 caching하고 있기에 다시 api에 접근하지 않는다.
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);
  return (
    <>
      <Header />
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <CoinList>
          {data?.slice(0, 100).map((item) => (
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
