import * as z from "zod";

const initEnv = () => {
  const envSchema = z.object({
    API_URL: z.string(),
    USER_POOL_ID: z.string(),
    USER_POOL_CLIENT_ID: z.string(),
  });

  const envVars = {
    API_URL: process.env.VITE_API_URL,
    USER_POOL_ID: process.env.VITE_USER_POOL_ID,
    USER_POOL_CLIENT_ID: process.env.VITE_USER_POOL_CLIENT_ID,
  };

  // スキーマでバリデーションしながらパース
  const parsedEnv = envSchema.safeParse(envVars);
  if (!parsedEnv.success) {
    throw new Error("環境変数の設定エラー");
  }

  return parsedEnv.data;
};

export const env = initEnv();
