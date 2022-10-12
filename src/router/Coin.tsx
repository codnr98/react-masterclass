import { useEffect, useState } from "react";
import {
  useLocation,
  useParams,
  Outlet,
  Link,
  useMatch,
} from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.bgColor};
`;

const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 768px;
  height: 200px;
  margin: 0 auto;
`;

const Title = styled.div`
  margin-top: 5px;
  font-size: 35px;
  font-weight: 700;
`;

const Loading = styled(Title)`
  margin-top: 5px;
  font-size: 35px;
  font-weight: 700;
`;

const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OverView = styled.div`
  width: 90%;
  height: 80px;
  margin-top: 20px;
  background-color: ${(props) => props.theme.accentColor};
  border-radius: 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  span:first-child {
    font-size: 30px;
  }
`;

const OverViewItem = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
  color: ${(props) => props.theme.bgColor};
`;

const CoinDescription = styled.div`
  width: 90%;
  margin-top: 20px;
  font-size: 19px;
  font-weight: 500;
`;

const Buttons = styled.div`
  width: 90%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled(Link)<{ isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  width: 45%;
  height: 50px;
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) =>
    props.isActive ? props.theme.activeColor : props.theme.bgColor};
  font-size: 20px;
`;

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  logo: string;
  description: string;
  open_source: boolean;
}

interface IQuotes {
  USD: {
    price: number;
  };
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  quotes: IQuotes;
}

function Coin() {
  // useParams()는 매치되는 <Route path>에 의해 current URL을 가져온다.
  // Coins.tsx에서 보내진 state를 기반으로 title을 출력한다.
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<InfoData>();
  const [price, setPrice] = useState<PriceData>();
  const { coinId } = useParams();
  const { state } = useLocation();
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPrice(priceData);
      setLoading(false);
    })();
  }, [coinId]);
  return (
    <>
      <Container>
        <Wrapper>
          {/* 별도의 URL을 통해 들어왔을 경우 api를 통해 코인이름을 로드한다. */}
          {state?.name ? (
            <Title>{state.name}</Title>
          ) : loading ? (
            <Loading>Loading...</Loading>
          ) : (
            <Title>{info?.name}</Title>
          )}
        </Wrapper>
      </Container>

      <InfoWrapper>
        <OverView>
          <OverViewItem>
            <span>Rank: </span>
            <span>{info?.rank}</span>
            {/* info?의 ?는 .rank의 데이터가 없을경우 데이터를 요구하지 않는다는 의미 */}
          </OverViewItem>
          <OverViewItem>
            <span>Name: </span>
            <span>{info?.name}</span>
          </OverViewItem>
          <OverViewItem>
            <span>Symbol: </span>
            <span>{info?.symbol}</span>
          </OverViewItem>
        </OverView>

        <CoinDescription>
          <p>{info?.description}</p>
        </CoinDescription>
        <OverView>
          <OverViewItem>
            <span>total supply: </span>
            <span>{price?.total_supply}</span>
          </OverViewItem>
          <OverViewItem></OverViewItem>
          <OverViewItem>
            <span>max supply: </span>
            <span>{price?.max_supply}</span>
          </OverViewItem>
        </OverView>
        <Buttons>
          <Button isActive={priceMatch !== null} to="price">
            Price
          </Button>
          <Button isActive={chartMatch !== null} to="chart">
            Chart
          </Button>
        </Buttons>
        <Outlet />
      </InfoWrapper>
    </>
  );
}

export default Coin;
