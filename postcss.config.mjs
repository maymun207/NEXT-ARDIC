import { createRequire } from "module";
import { fileURLToPath } from "url";
import path from "path";

// Always resolve plugins from THIS project's node_modules, not from a
// parent directory that may have a stray package.json confusing Turbopack.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(__dirname);

const config = {
  plugins: {
    "@tailwindcss/postcss": require("@tailwindcss/postcss"),
  },
};

export default config;
