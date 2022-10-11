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

function Header() {
  return (
    <Container>
      <Wrapper>
        <Title>COIN INFO</Title>
      </Wrapper>
    </Container>
  );
}
export default Header;
