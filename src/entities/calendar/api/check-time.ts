import axios from "axios";

interface CheckTimeApiProps {
  department: number;
  division: number;
  type: number;
  date_request: string;
}

export const checkTimeApi = async (params: CheckTimeApiProps) => {
  try {
    const res = await axios.post(
      "http://185.195.24.47:7001/api/list-time/",
      params,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 200) {
      return res.data; // Возвращаем доступное время
    } else {
      console.error("Неправильный статус ответа:", res.status);
      return [];
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Ошибка при запросе доступного времени:",
        error.response?.data
      );
      console.error("Статус:", error.response?.status);
    } else if (error instanceof Error) {
      console.error("Ошибка при настройке запроса:", error.message);
    } else {
      console.error("Неизвестная ошибка:", error);
    }
    return [];
  }
};
