import dotenv from "dotenv";
import tsconfigPaths from "vite-tsconfig-paths";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { checker } from "vite-plugin-checker";
import solidPlugin from "vite-plugin-solid";
import devtools from "solid-devtools/vite";
import solidSvg from "vite-plugin-solid-svg";
import { fileURLToPath } from "url";

// eslint-disable-next-line
import project from "./package.json";

const ENVIRONMENT = process.env.ENVIRONMENT || "development";

// https://vitejs.dev/config/
dotenv.config();
dotenv.config({ path: ".env.local", override: true });
dotenv.config({ path: `.env.${ENVIRONMENT}`, override: true });
if (process.env.LOCAL === "yes") {
  dotenv.config({ path: `.env.${ENVIRONMENT}.local`, override: true });
}

/** @type {import('vite').UserConfig} */
// eslint-disable-next-line import/no-unused-modules
export const createConfig = ({ mode }) => {
  const plugins = [
    // the vite plugin is not necessary for the devtools to work
    devtools({
      // but enabling some of the options, such as "autoname" will improve the debugging experience
      // https://github.com/thetarnav/solid-devtools/tree/main/packages/transform#options
      autoname: true,
      locator: {
        targetIDE: "vscode",
        key: "Ctrl",
        jsxLocation: true,
        componentLocation: true,
      },
    }),
    solidPlugin(),
    solidSvg(),
    checker({
      typescript: true,
    }),
    tsconfigPaths(),
    ViteEjsPlugin({
      version: project.version,
      environment: ENVIRONMENT,
      env_code: ENVIRONMENT[0].toLowerCase(),
    }),
  ];
  const definitions = {
    "import.meta.env.NODE_ENV": `"${mode}"`,
    "import.meta.env.ENVIRONMENT": JSON.stringify(ENVIRONMENT),
    "import.meta.env.PROJECT_VERSION": JSON.stringify(project.version),
  };
  if (mode !== "test") {
    console.debug("Environment", definitions);
  }
  return {
    plugins,
    define: definitions,
    publicDir: "./public",
    build: {
      target: "esnext",
      chunkSizeWarningLimit: 5 * 1024,
      reportCompressedSize: mode === "production",
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: () => `app-${project.version}.bundle.js`,
        },
        input: {
          appMain: fileURLToPath(new URL("./index.html", import.meta.url)),
          appMaintenance: fileURLToPath(new URL("./maintenance.html", import.meta.url)),
        },
      },
    },
    server: {
      hmr: false,
    },
    resolve: {
      alias: {
        "@blueprint": fileURLToPath(new URL("./src/blueprint", import.meta.url)),
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
};
