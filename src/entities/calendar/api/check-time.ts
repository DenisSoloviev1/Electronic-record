import axios, { AxiosError } from "axios";

export const checkTimeApi = async () => {
  try {
    const params = {
      department: 11,
      division: 6,
      type: 5,
      date_request: "2071-09-24T15:16:22Z",
    };
    console.log(params);
    // Отправка GET запроса с параметрами
    const res = await axios.get("http://185.195.24.47:7001/api/list-time/", {
      data: params,
    });

    if (res.status === 200) {
      return res.data; // Возвращаем доступное время
    } else {
      console.error("Неправильный статус ответа:", res.status);
      return [];
    }
  } catch (error) {
    // Проверка, что ошибка является AxiosError
    if (axios.isAxiosError(error)) {
      // Сервер ответил с кодом ошибки
      console.error(
        "Ошибка при запросе доступного времени:",
        error.response?.data
      );
      console.error("Статус:", error.response?.status);
    } else if (error instanceof Error) {
      // Ошибка при настройке запроса
      console.error("Ошибка при настройке запроса:", error.message);
    } else {
      // Неизвестная ошибка
      console.error("Неизвестная ошибка:", error);
    }
    return [];
  }
};
