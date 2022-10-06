import { useParams } from "react-router-dom";

function Coin() {
  // useParams()는 매치되는 <Route path>에 의해 current URL을 가져온다.
  const { coinId } = useParams<string>();
  return <h1>Coin: {coinId}</h1>;
}

export default Coin;
