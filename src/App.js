import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Emoji = styled.span`
  font-size: 50px;
`;

const animation = keyframes`
    from {transform:rotate(0deg);
      border-radius: 25%;
    }
    to {
      transform:rotate(360deg);
      border-radius: 50%;
    }
  `;

const Box = styled.div`
  background-color: tomato;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${animation} 1s linear infinite;

  ${Emoji} {
    &:hover {
      font-size: 70px;
    }
  }
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <Emoji>😀</Emoji>
      </Box>
    </Wrapper>
  );
}

export default App;
