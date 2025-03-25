/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * Oogiri App API
 * チャットでのテーマ・メッセージ投稿以外のAPIエンドポイントを提供します。 ユーザー登録、ログイン、プロフィール更新、グループ作成、招待、回答、いいね、の機能を提供します。

 * OpenAPI spec version: 1.0.0
 */
import type {
  AuthResponse,
  UserBasicInfo,
  UserProfileUpdate,
  UserRegistration,
  UserWithGroupsResponse,
} from "../oogiriAppAPI.schemas";

import { customInstance } from "../../../lib/custom-instance";

export const getUsers = () => {
  /**
   * メールアドレスとパスワードのみでユーザーを新規登録します。
   * @summary ユーザー新規登録
   */
  const postSignup = (userRegistration: UserRegistration) => {
    return customInstance<AuthResponse>({
      url: `/signup`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: userRegistration,
    });
  };
  /**
   * メールアドレスとパスワードでログインします。
   * @summary ログイン
   */
  const postLogin = (userRegistration: UserRegistration) => {
    return customInstance<AuthResponse>({
      url: `/login`,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: userRegistration,
    });
  };
  /**
   * ログイン時に初回ログインかどうかをチェックします。
   * @summary 初回ログインチェック
   */
  const postUsersFirstLoginCheck = () => {
    return customInstance<void>({
      url: `/users/first_login_check`,
      method: "POST",
    });
  };
  /**
   * 初回ログイン時に追加情報（ユーザー名、プロフィール画像、背景色）を登録・更新。
   * @summary ユーザーのプロフィール登録（初回ログイン時）および更新
   */
  const putUsersProfileUserId = (
    userId: string,
    userProfileUpdate: UserProfileUpdate,
  ) => {
    return customInstance<void>({
      url: `/users/profile/${userId}`,
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      data: userProfileUpdate,
    });
  };
  /**
   * ホーム画面でのユーザーの情報（プロフィール、参加・招待されているグループ）を取得します。
   * @summary ユーザー情報取得
   */
  const getUsersHome = () => {
    return customInstance<UserWithGroupsResponse>({
      url: `/users/home`,
      method: "GET",
    });
  };
  /**
   * 招待画面でユーザーIDを指定してユーザー情報を検索します。
   * @summary ユーザー検索
   */
  const getUsersSearch = () => {
    return customInstance<UserBasicInfo>({
      url: `/users/search`,
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
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
export type PostSignupResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getUsers>["postSignup"]>>
>;
export type PostLoginResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getUsers>["postLogin"]>>
>;
export type PostUsersFirstLoginCheckResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getUsers>["postUsersFirstLoginCheck"]>>
>;
export type PutUsersProfileUserIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getUsers>["putUsersProfileUserId"]>>
>;
export type GetUsersHomeResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getUsers>["getUsersHome"]>>
>;
export type GetUsersSearchResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getUsers>["getUsersSearch"]>>
>;
