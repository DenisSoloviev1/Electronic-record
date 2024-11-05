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
          <Text>Авторизируйтесь через edu.donstu.ru</Text>

          <Callback />

          <Flex $gap={10}>
            <Button onClick={handleLogin}>
              <LogoDSTU /> начать
            </Button>

            <Button onClick={() => navigate("/")}>вернуться</Button>
          </Flex>

        </Info>
      </Flex>
    </Container>
  );
};

export default Login;
