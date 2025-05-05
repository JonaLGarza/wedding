import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "next-themes";
import { ErrorBoundary } from "./components/organisms/ErrorBoundary/ErrorBoundary";
import './lib/i18n';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
