import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "@/shared/ui";
import { RolesDict, Roles } from "../../../shared/types";
import { useLoginStore } from "@/entities/login";
import { Routes } from "@/shared/constants";

 const Callback: React.FC = () => {
  const { role, setRole } = useLoginStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [isRoleSaved, setIsRoleSaved] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const baseUrl = "http://10.6.0.184:7001/";
    const code = query.get("code");
    const state = query.get("state");

    if (code) {
      axios
        .post(`${baseUrl}/api/auth/oauth/token`, { code, state })
        .then((response) => {
          const { access_token, role } = response.data;
          // console.log("Роль, полученная с сервера:", role);

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
      console.log(role)
      // navigate(Routes.APPLICANT);
    }
  }, [isRoleSaved, role]);

  if (loading) {
    return <Loader message={"Авторизация"} />;
  }

  return null;
};

export default Callback;
