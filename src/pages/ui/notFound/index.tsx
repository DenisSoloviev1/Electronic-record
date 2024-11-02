import React from "react";
import { NavLink } from "react-router-dom";
import {Wrapper} from "./style.ts";
import { Flex } from "@/shared/ui";
import { NotFoundSvg } from "@/shared/ui/Icon";
import { Routes } from "@/shared/constants";

const NotFound: React.FC = () => {
  return (
    <Wrapper>
      <NotFoundSvg />
      <Flex $direction="column" $align="start" $gap={5}>
        <h1>Ошибка 404: страница не найдена.</h1>
        <p>Запрашиваемая страница была удалена или никогда не существовала.</p>
        <p>
          Вернуться на <NavLink to={Routes.AUTH}>главную</NavLink>.
        </p>
      </Flex>
    </Wrapper>
  );
};

export default NotFound;