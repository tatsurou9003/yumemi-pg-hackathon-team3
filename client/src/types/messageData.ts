export type MessageData = {
  messageId: string;
  messageType: string;
  messageText: string;
  messageImage: string;
  prizeText: string;
  deadline: string;
  winner: string;
  createdBy: {
    userId: string;
    userName: string;
    profileImage: string;
    profileColor: string;
  };
  createdAt: string;
};
