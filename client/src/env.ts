import * as z from "zod";

// 環境変数の型定義と変換処理
const initEnv = () => {
  // 必要な環境変数の定義とバリデーション
  const envSchema = z.object({
    API_URL: z.string().default("https://api.amazon.com/dev"),
    API_CLIENT_ID: z.string().default(""),
    API_CLIENT_SECRET: z.string().default(""),
  });

  // process.envを使用して環境変数にアクセス
  const envVars = {
    API_URL: process.env.VITE_API_URL,
    API_CLIENT_ID: process.env.VITE_API_CLIENT_ID,
    API_CLIENT_SECRET: process.env.VITE_API_CLIENT_SECRET,
  };

  // スキーマでバリデーション
  const parsedEnv = envSchema.safeParse(envVars);
  if (!parsedEnv.success) {
    console.error("環境変数の設定エラー:", parsedEnv.error);
    // エラー時はデフォルト値を使用
    return envSchema.parse({});
  }

  return parsedEnv.data;
};

export const env = initEnv();
