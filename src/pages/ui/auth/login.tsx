import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthSvg, LogoDSTU } from "@/shared/ui/Icon"; // Ваш SVG логотип
import {
  Container,
  Info,
  Text,
  Button,
  ImgContainer,
  Helper,
} from "@/pages/ui/auth/style";
import { handleLogin } from "@/entities/auth";
import Callback from "@/entities/auth/api/callback";
import { Flex } from "@/shared/ui";
import { Link } from "../main";

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

          {/* <Text>
            Если у вас нет личного кабинета, <br /> обратитесь в 1-455a или
            позвоните: <Link href="tel:88632738529">8 (863) 273-85-29</Link>
          </Text> */}

          <Helper>
            Hет личного кабинета?
            <div className="message">
              <p>Обратитесь в 1-455a или позвоните:</p>&nbsp;
              <Link href="tel:88632738529">8 (863) 273-85-29</Link>
            </div>
          </Helper>
        </Info>
      </Flex>
    </Container>
  );
};

export default Login;
