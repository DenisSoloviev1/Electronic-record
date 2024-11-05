import { ReactNode, memo } from "react";

import { Aside, Box } from "@/widgets/layout/style";
import { Routes } from "@/shared/constants";
import { isMobile } from "@/shared/lib";
import { Flex } from "@/shared/ui";

import { NavBar } from "../navbar";

export const Layout = memo(({ children }: { children: ReactNode }) => {
  const isMain = window.location.pathname === Routes.MAIN;

  return (
    <Flex $direction={isMobile ? "column" : "row"} $justify="space-between" $align="start">
      {isMobile ? (
        <>
          {isMain && (
            <Aside>
              <NavBar />
            </Aside>
          )}
          {!isMain && (
            <Flex $align="start" >
              <Aside>
                <NavBar />
              </Aside>

              {/* <Box $bg="#fff">
                <Flex
                  $justify="space-between"
                  $align="center"
                  style={{ marginBottom: "2em" }}
                ></Flex>
                {children}
              </Box> */}
            </Flex>
          )}
        </>
      ) : (
        <>
          <Aside>
            <NavBar />
          </Aside>

          <Box $bg={isMain ? "transparent" : "#fff"}>{children}</Box>
        </>
      )}
    </Flex>
  );
});
