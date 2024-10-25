import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthSvg, LogoDSTU } from "@/shared/ui/Icon"; // Ваш SVG логотип
import { Container, Text, Button, Wrapper } from "./style";
import { Link } from "@/pages/ui/main";

interface LoginRequest {
  role: string;
  division: string;
  username: string;
  email: string;
  phone: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<LoginRequest | null>(null);
  
  const handleLogin = () => {
    const clientId = "724363";
    const redirectUri = encodeURIComponent("https://example.com/callback");
    const state = "Ert2q5Z";
    const loginUrl = `https://edu.donstu.ru/WebApp/#/Authorize?client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;

    window.open(loginUrl, "_blank", "width=500,height=600");
  };

  const fetchUserData = async (accessToken: string) => {
    try {
      const response = await axios.get<LoginRequest>("/api/user/data", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUserInfo(response.data); 

      // Теперь отправляем данные для авторизации
      await authorizeUser(response.data, accessToken);
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
    }
  };

  const authorizeUser = async (userData: LoginRequest, accessToken: string) => {
    try {
      const response = await axios.post("/api/auth/login", userData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Авторизация успешна:", response.data);
      // Перенаправляем пользователя на защищенную страницу
      navigate("/protected"); // Замените на ваш защищённый маршрут
    } catch (error) {
      console.error("Ошибка при авторизации пользователя:", error);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get("code");
    const state = query.get("state");

    if (code) {
      // Отправляем код на сервер для обмена на access_token
      axios
        .post("/api/auth/oauth/token", { code, state })
        .then((response) => {
          const { access_token } = response.data;
          // Сохраняем токен в localStorage
          localStorage.setItem("loginToken", access_token);

          // Запрашиваем данные пользователя
          fetchUserData(access_token);
        })
        .catch((error) => {
          console.error("Ошибка при обмене кода на токен:", error);
        });
    }
  }, [navigate]);

  return (
    <Wrapper>
      <AuthSvg />

      <Container>
        <Text>
          Пожалуйста, авторизируйтесь в системе с помощью вашей учетной записи
        </Text>

        <Button onClick={handleLogin}>
          перейти в ЭИОС <LogoDSTU />
        </Button>

        <Link onClick={() => navigate("/")}>на главную</Link>
      </Container>
    </Wrapper>
  );
};

export default Login;
