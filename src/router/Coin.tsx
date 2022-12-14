import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  useLocation,
  useParams,
  Outlet,
  Link,
  useMatch,
} from "react-router-dom";
import styled from "styled-components";
import { fetchPrice, fetchInfo } from "../api";

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

const ChartWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  margin-top: 20px;
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
  // useParams()??? ???????????? <Route path>??? ?????? current URL??? ????????????.
  // Coins.tsx?????? ????????? state??? ???????????? title??? ????????????.
  const { coinId } = useParams(); // react-route-Dom v6 ????????? useParams??? ?????? ???????????? string | undefined??? ????????? ??????.
  const { state } = useLocation();
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchInfo(coinId)
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<PriceData>(
    ["price", coinId],
    () => fetchPrice(coinId)
  );
  const loading = infoLoading || priceLoading;

  return (
    <>
      <Container>
        <Wrapper>
          {/* ????????? URL??? ?????? ???????????? ?????? api??? ?????? ??????????????? ????????????. */}
          {state?.name ? (
            <Title>{state.name}</Title>
          ) : loading ? (
            <Loading>Loading...</Loading>
          ) : (
            <Title>{infoData?.name}</Title>
          )}
        </Wrapper>
      </Container>

      <InfoWrapper>
        <OverView>
          <OverViewItem>
            <span>Rank: </span>
            <span>{infoData?.rank}</span>
            {/* info???? ???? .rank??? ???????????? ???????????? ???????????? ???????????? ???????????? ?????? */}
          </OverViewItem>
          <OverViewItem>
            <span>Name: </span>
            <span>{infoData?.name}</span>
          </OverViewItem>
          <OverViewItem>
            <span>Symbol: </span>
            <span>{infoData?.symbol}</span>
          </OverViewItem>
        </OverView>

        <CoinDescription>
          <p>{infoData?.description}</p>
        </CoinDescription>

        <OverView>
          <OverViewItem>
            <span>total supply: </span>
            <span>{priceData?.total_supply}</span>
          </OverViewItem>
          <OverViewItem></OverViewItem>
          <OverViewItem>
            <span>max supply: </span>
            <span>{priceData?.max_supply}</span>
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
        <ChartWrapper>
          <Outlet />
        </ChartWrapper>
      </InfoWrapper>
    </>
  );
}

export default Coin;
