/**
 * Generated by orval v7.7.0 🍺
 * Do not edit manually.
 * Oogiri App API
 * チャットでのテーマ・メッセージ投稿以外のAPIエンドポイントを提供します。 ユーザー登録、ログイン、プロフィール更新、グループ作成、招待、回答、いいね、の機能を提供します。

 * OpenAPI spec version: 1.0.0
 */
import { customInstance } from "../../../lib/custom-instance";

export const getLikes = () => {
  /**
   * 回答に対していいねをします。
   * @summary いいね
   */
  const putAnswersLikeAnswerId = (answerId: string) => {
    return customInstance<void>({
      url: `/answers/like/${answerId}`,
      method: "PUT",
    });
  };
  /**
   * 回答に対していいねを解除します。
   * @summary いいね解除
   */
  const deleteAnswersLikeAnswerId = (answerId: string) => {
    return customInstance<void>({
      url: `/answers/like/${answerId}`,
      method: "DELETE",
    });
  };
  return { putAnswersLikeAnswerId, deleteAnswersLikeAnswerId };
};
export type PutAnswersLikeAnswerIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getLikes>["putAnswersLikeAnswerId"]>>
>;
export type DeleteAnswersLikeAnswerIdResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof getLikes>["deleteAnswersLikeAnswerId"]>>
>;
