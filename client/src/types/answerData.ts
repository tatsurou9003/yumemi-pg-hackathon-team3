export type AnswerData = {
  answerId: string;
  createdBy: {
    userId: string;
    userName: string;
    profileImage?: string;
    profileColor?: string;
  };
  answerText: string;
  createdAt: string;
  goodCount: number;
  isliked: boolean;
};
