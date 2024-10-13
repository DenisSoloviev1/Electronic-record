import { AuthSvg } from "@/assets/svg";
import { PlainText } from "@/widgets/navbar/style";
import { Button } from "@mui/material";
import styled from "styled-components";

const Image = styled.img`
  width: 40px;
  object-fit: contain;
`;

const Login = () => {
  return (
    <>
      <AuthSvg />
      <PlainText>
        Пожалуйста, войдите в систему с помощью вашей учетной записи
        <Button>ЭИОС <Image src="/logo.png" /></Button>
      </PlainText>
    </>
  );
};
export default Login;
