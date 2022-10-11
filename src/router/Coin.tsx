import { useLocation, useParams } from "react-router-dom";
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

function Coin() {
  // useParams()는 매치되는 <Route path>에 의해 current URL을 가져온다.
  // Coins.tsx에서 보내진 state를 기반으로 title을 출력한다.
  const { state } = useLocation();
  return (
    <Container>
      <Wrapper>
        <Title>{state.name}</Title>
      </Wrapper>
    </Container>
  );
}

export default Coin;
