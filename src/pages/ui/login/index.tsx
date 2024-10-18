import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthSvg, LogoDSTU } from "@/shared/ui/Icon"; // Ваш SVG логотип
import { Container, Text, Button, Wrapper } from "./style";
import { Link } from "@/pages/ui/main";

interface AuthRequest {
  username: string;
  phone: string;
  email: string;
  division: string;
  post: string;
}

const Login = () => {
  const API_URL = "https://api.example.com/login"; // Замените на URL вашего API
  const navigate = useNavigate();

  const handleLogin = async () => {
    const userData: AuthRequest = {
      username: "your_username", // Замените на реальное значение или получите его динамически
      phone: "your_phone", // Замените на реальное значение или получите его динамически
      email: "your_email", // Замените на реальное значение или получите его динамически
      division: "your_division", // Замените на реальное значение или получите его динамически
      post: "your_post", // Замените на реальное значение или получите его динамически
    };

    try {
      const response = await axios.post(API_URL, userData);
      const { token } = response.data; // Получаем токен из ответа
      // Здесь можно сохранить токен в localStorage или sessionStorage
      localStorage.setItem("authToken", token);

      // Перенаправляем пользователя на другой сайт для авторизации
      window.location.href = "https://external-website.com/auth"; // Замените на URL вашего внешнего сайта
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message || "Ошибка авторизации";
        console.error(errorMessage); // Выводим сообщение об ошибке
      } else {
        console.error("Неизвестная ошибка при авторизации");
      }
    }
  };

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
