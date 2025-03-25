import * as z from "zod";

const initEnv = () => {
  const envSchema = z.object({
    API_URL: z.string(),
    API_CLIENT_ID: z.string(),
    API_CLIENT_SECRET: z.string(),
  });

  const envVars = {
    API_URL: process.env.VITE_API_URL,
    API_CLIENT_ID: process.env.VITE_API_CLIENT_ID,
    API_CLIENT_SECRET: process.env.VITE_API_CLIENT_SECRET,
  };

  // スキーマでバリデーションしながらパース
  const parsedEnv = envSchema.safeParse(envVars);
  if (!parsedEnv.success) {
    throw new Error("環境変数の設定エラー");
  }

  return parsedEnv.data;
};

export const env = initEnv();
