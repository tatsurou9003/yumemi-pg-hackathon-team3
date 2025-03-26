import path from "path";
import { defineConfig, loadEnv } from "vite"; // loadEnvをインポート追加
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// 関数形式に変更してmodeを受け取る
export default defineConfig(({ mode }) => {
  // 環境変数をロード
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // process.envを通じて環境変数を公開
    define: {
      "process.env": env,
    },
  };
});
