import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes } from "./routes";
import Layout from "./components/Layout";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Layout>
        <Routes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
