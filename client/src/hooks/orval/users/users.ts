/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * Oogiri App API
 * チャットでのテーマ・メッセージ投稿以外のAPIエンドポイントを提供します。 ユーザー登録、ログイン、プロフィール更新、グループ作成、招待、回答、いいね、の機能を提供します。

 * OpenAPI spec version: 1.0.0
 */
import * as axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

import type {
  AuthResponse,
  UserBasicInfo,
  UserIdRequest,
  UserProfileUpdate,
  UserRegistration,
  UserWithGroupsResponse,
} from "../oogiriAppAPI.schemas";

export const getUsers = () => {
  /**
   * メールアドレスとパスワードのみでユーザーを新規登録します。
   * @summary ユーザー新規登録
   */
  const postSignup = <TData = AxiosResponse<AuthResponse>>(
    userRegistration: UserRegistration,
    options?: AxiosRequestConfig,
  ): Promise<TData> => {
    return axios.default.post(`/signup`, userRegistration, options);
  };
  /**
   * メールアドレスとパスワードでログインします。
   * @summary ログイン
   */
  const postLogin = <TData = AxiosResponse<AuthResponse>>(
    userRegistration: UserRegistration,
    options?: AxiosRequestConfig,
  ): Promise<TData> => {
    return axios.default.post(`/login`, userRegistration, options);
  };
  /**
   * ログイン時に初回ログインかどうかをチェックします。
   * @summary 初回ログインチェック
   */
  const postUsersFirstLoginCheck = <TData = AxiosResponse<void>>(
    options?: AxiosRequestConfig,
  ): Promise<TData> => {
    return axios.default.post(`/users/first_login_check`, undefined, options);
  };
  /**
   * 初回ログイン時に追加情報（ユーザー名、プロフィール画像、背景色）を登録・更新。
   * @summary ユーザーのプロフィール登録（初回ログイン時）および更新
   */
  const putUsersProfileUserId = <TData = AxiosResponse<void>>(
    userId: string,
    userProfileUpdate: UserProfileUpdate,
    options?: AxiosRequestConfig,
  ): Promise<TData> => {
    return axios.default.put(
      `/users/profile/${userId}`,
      userProfileUpdate,
      options,
    );
  };
  /**
   * ホーム画面でのユーザーの情報（プロフィール、参加・招待されているグループ）を取得します。
   * @summary ユーザー情報取得
   */
  const getUsersHome = <TData = AxiosResponse<UserWithGroupsResponse>>(
    options?: AxiosRequestConfig,
  ): Promise<TData> => {
    return axios.default.get(`/users/home`, options);
  };
  /**
   * 招待画面でユーザーIDを指定してユーザー情報を検索します。
   * @summary ユーザー検索
   */
  const getUsersSearch = <TData = AxiosResponse<UserBasicInfo>>(
    userIdRequest: UserIdRequest,
    options?: AxiosRequestConfig,
  ): Promise<TData> => {
    return axios.default.get(`/users/search`, options);
  };
  return {
    postSignup,
    postLogin,
    postUsersFirstLoginCheck,
    putUsersProfileUserId,
    getUsersHome,
    getUsersSearch,
  };
};
export type PostSignupResult = AxiosResponse<AuthResponse>;
export type PostLoginResult = AxiosResponse<AuthResponse>;
export type PostUsersFirstLoginCheckResult = AxiosResponse<void>;
export type PutUsersProfileUserIdResult = AxiosResponse<void>;
export type GetUsersHomeResult = AxiosResponse<UserWithGroupsResponse>;
export type GetUsersSearchResult = AxiosResponse<UserBasicInfo>;
