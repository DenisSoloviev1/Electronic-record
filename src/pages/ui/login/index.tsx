import React from "react";
// import { useLoginStore } from "../../../entities/login/model/store";
import { useNavigate } from "react-router-dom";
import { AuthSvg, LogoDSTU } from "@/shared/ui/Icon"; // Ваш SVG логотип
import { Container, Text, Button, Wrapper } from "./style";
import { Link } from "@/pages/ui/main";
import { handleLogin } from "@/entities/login";
import Callback from "@/entities/login/api/callback";

const Login: React.FC = () => {
  const navigate = useNavigate();
  // const {isLogin} = useLoginStore();
  // console.log(isLogin)

  return (
    <Wrapper>
      <AuthSvg />

      <Container>
        <Text>
          Пожалуйста, авторизируйтесь в системе с помощью вашей учетной записи
        </Text>

        <Callback/>

        <Button onClick={handleLogin}>
          перейти в ЭИОС <LogoDSTU />
        </Button>
        
        <Link onClick={() => navigate("/")}>на главную</Link>
      </Container>
    </Wrapper>
  );
};

export default Login;