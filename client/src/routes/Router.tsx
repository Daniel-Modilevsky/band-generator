import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/home/HomePage";
import { ThemeProvider } from "styled-components";
import theme from "../shared/styles/theme";

type RouterProps = {};

export const Router: React.FC<RouterProps> = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};
