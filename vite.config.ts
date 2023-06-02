import { defineConfig } from 'vite';

import { createConfig } from './vite.config.common';

/** @type {import('vite').UserConfig} */
// eslint-disable-next-line import/no-unused-modules
export default ({ mode }) => {
  const { plugins, define, publicDir, build, resolve } = createConfig({ mode });
  return defineConfig({
    plugins,
    define,
    publicDir,
    build,
    resolve,
  });
};
