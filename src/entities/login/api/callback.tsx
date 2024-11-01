import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "@/shared/ui";
import { RolesDict, Roles } from "../../../shared/types";
import { useAuthStore } from "@/entities/auth/model/store/index";
import { Routes } from "@/shared/constants";
import { baseUrl } from "@/shared/config";

const Callback: React.FC = () => {
  const { role, setRole } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [isRoleSaved, setIsRoleSaved] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get("code");
    const state = query.get("state");

    if (code) {
      axios
        .post(`${baseUrl}/api/auth/`, { code, state })
        .then((response) => {
          const {
            access_token,
            user: { firstName, lastName, middleName, userID },
          } = response.data;
          console.log(response.data);
          console.log("Имя:", firstName);
          console.log("Фамилия:", lastName);
          console.log("Отчество:", middleName);
          console.log("ID пользователя:", userID);

          if (Object.values(RolesDict).includes(role)) {
            localStorage.setItem("authToken", access_token);
            setRole(role as Roles);
            setIsRoleSaved(true);
          } else {
            console.error("Неверная роль, полученная с сервера:", role);
          }
        })
        .catch((error) => {
          console.error("Ошибка при обмене кода на токен:", error);
        });
    } else {
      setLoading(false);
    }
  }, [location, setRole]);

  useEffect(() => {
    if (isRoleSaved) {
      // console.log("Роль успешно сохранена в Zustand:", role);
      // // Перенаправляем пользователя в зависимости от сохраненной роли
      console.log(role);
      // navigate(role === RolesDict.EMPLOYEE ? Routes.EMPLOYEE:  Routes.STUDENT);
      navigate(Routes.MAIN);
    }
  }, [isRoleSaved, role]);

  if (loading) {
    return <Loader message={"Авторизация"} />;
  }

  return null;
};

export default Callback;
