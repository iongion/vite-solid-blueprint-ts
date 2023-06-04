/* @refresh reload */
import { render } from "solid-js/web";
import { createI18n, I18nProvider } from "solid-i18n";

// import "solid-devtools";

import "./index.css";

import App from "./App";

const i18n = createI18n({ language: "en" });

async function main() {
  const root = document.getElementById("root");
  if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error("Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?");
  }
  render(
    () => (
      <I18nProvider i18n={i18n}>
        <App />
      </I18nProvider>
    ),
    root!
  );
}

main();
