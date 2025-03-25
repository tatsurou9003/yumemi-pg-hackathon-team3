import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { env } from "../env";

const { API_URL } = env;

// Axiosインスタンスの作成
const instance: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// リクエストインターセプター - すべてのリクエストに認証トークンを追加
instance.interceptors.request.use(
  (config) => {
    // ローカルストレージからアクセストークンを取得
    const idToken = localStorage.getItem("idToken");

    // トークンが存在する場合、認証ヘッダーに追加
    if (idToken && config.headers) {
      config.headers["Authorization"] = `Bearer ${idToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// レスポンスインターセプター - エラーハンドリング
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 401エラー（認証エラー）が発生した場合
    if (error.response?.status === 401) {
      console.error("認証エラー", error.response);
      toast.error("認証エラーが発生しました。再ログインしてください。");
      // ログイン画面へリダイレクト
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// Orval用のエクスポート関数
export const customInstance = <T>(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return instance.request<T>(config);
};
