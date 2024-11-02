import React from "react";
// import { useLoginStore } from "../../../entities/login/model/store";
import { useNavigate } from "react-router-dom";
import { AuthSvg, LogoDSTU } from "@/shared/ui/Icon"; // Ваш SVG логотип
import {
  Container,
  Info,
  Text,
  Button,
  ImgContainer,
} from "@/pages/ui/auth/style";
import { Link } from "@/pages/ui/main";
import { handleLogin } from "@/entities/auth";
import Callback from "@/entities/auth/api/callback";
import { Flex } from "@/shared/ui";

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Flex>
        <ImgContainer>
          <AuthSvg />
        </ImgContainer>

        <Info>
          <Text>
            Пожалуйста, авторизируйтесь в системе с помощью вашей учетной записи
          </Text>

          <Callback />

          <Button onClick={handleLogin}>
            перейти в ЭИОС <LogoDSTU />
          </Button>

          <Link onClick={() => navigate("/")}>на главную</Link>
        </Info>
      </Flex>
    </Container>
  );
};

export default Login;
