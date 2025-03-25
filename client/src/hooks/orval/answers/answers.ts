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
  Answer,
  GetThemeAnswer,
} from "../oogiriAppAPI.schemas";

export const getAnswers = () => {
  /**
   * テーマに対する回答を投稿します。{messageId} == parentId
   * @summary テーマへの回答
   */
  const postAnswersMessageId = <TData = AxiosResponse<void>>(
    messageId: string,
    answer: Answer,
    options?: AxiosRequestConfig,
  ): Promise<TData> => {
    return axios.default.post(`/answers/${messageId}`, answer, options);
  };
  /**
   * テーマに対する回答を取得します。{messageId} == parentId
   * @summary 回答取得
   */
  const getAnswersMessageId = <TData = AxiosResponse<GetThemeAnswer[]>>(
    messageId: string,
    options?: AxiosRequestConfig,
  ): Promise<TData> => {
    return axios.default.get(`/answers/${messageId}`, options);
  };
  return { postAnswersMessageId, getAnswersMessageId };
};
export type PostAnswersMessageIdResult = AxiosResponse<void>;
export type GetAnswersMessageIdResult = AxiosResponse<GetThemeAnswer[]>;
