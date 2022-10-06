import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import styled from "styled-components";

const coins = [
  {
    id: "btc-bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    rank: 1,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "eth-ethereum",
    name: "Ethereum",
    symbol: "ETH",
    rank: 2,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  {
    id: "hex-hex",
    name: "HEX",
    symbol: "HEX",
    rank: 3,
    is_new: false,
    is_active: true,
    type: "token",
  },
];
const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Header = styled.header`
  width: 678px;
  height: 20vh;
  align-items: left;
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.bgColor};
`;

const CoinList = styled.ul``;
const Coin = styled.li``;
function Coins() {
  return (
    <Container>
      <Header>COIN</Header>
      <CoinList>
        {coins.map((item) => (
          <Coin key={item.id}>
            <Button variant="contained">{item.name}</Button>
          </Coin>
        ))}
      </CoinList>
    </Container>
  );
}

export default Coins;
