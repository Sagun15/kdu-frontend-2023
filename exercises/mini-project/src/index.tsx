import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import reportWebVitals from "./reportWebVitals";
import "./index.scss";

const container = document.getElementById("root")!;
const root = createRoot(container);

Sentry.init({
  dsn: "https://29f38a7b7d6d4337ad52cf25917d597d@o4504796894330880.ingest.sentry.io/4504796904554496",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
