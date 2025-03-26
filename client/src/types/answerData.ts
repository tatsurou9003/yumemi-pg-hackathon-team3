export type AnswerData = {
  answerId: string;
  groupId: string;
  createdBy: {
    userId: string;
    userName: string;
    profileImage: string;
    profileColor: string;
  };
  answerText: string;
  answerImage: string;
  createdAt: string;
  goodCount: number;
  isLiked: boolean;
};
