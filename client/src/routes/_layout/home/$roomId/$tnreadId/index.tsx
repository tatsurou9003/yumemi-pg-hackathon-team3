import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/common/button/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/common/form/form";
import { Input } from "@/components/common/input/input";
import Oogiri from "@/features/room/oogiri";
import RoomHeader from "@/features/room/room-header";
import { createFileRoute } from "@tanstack/react-router";
import { MessageData } from "@/types/messageData";
import { AnswerData } from "@/types/answerData";
import ThreadFooter from "@/features/room/thread-footer";

const formSchema = z.object({
  answer: z.string().min(2, {
    message: "必須入力項目です。",
  }),
});

export const Route = createFileRoute("/_layout/home/$roomId/$tnreadId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const oogiri: MessageData = {
    messageId: "msg010",
    messageType: "oogiri",
    messageText: "このエンジニア、何かが違う…",
    messageImage: "",
    prizeText: "特別参加賞",
    deadline: "2024-04-06",
    winner: "",
    createdBy: {
      userId: "user333",
      userName: "直樹",
      profileImage: "/images/naoki.jpg",
      profileColor: "#33ff99",
    },
    createdAt: "2025-03-18T12:45:00Z",
  };

  const answers: AnswerData[] = [
    {
      answerId: "1",
      groupId: "group1",
      createdBy: {
        userId: "user1",
        userName: "ユーザー1",
        profileImage: "https://example.com/profile1.jpg",
        profileColor: "#FF5733",
      },
      answerText: "これはサンプルの解答です。",
      answerImage: "https://example.com/answer1.jpg",
      createdAt: "2025-03-24T04:56:47.610Z",
      goodCount: 5,
      isLiked: true,
    },
    {
      answerId: "2",
      groupId: "group1",
      createdBy: {
        userId: "user2",
        userName: "ユーザー2",
        profileImage: "https://example.com/profile2.jpg",
        profileColor: "#33FF57",
      },
      answerText: "こちらが別のサンプル解答です。",
      answerImage: "https://example.com/answer2.jpg",
      createdAt: "2025-03-24T05:10:47.610Z",
      goodCount: 3,
      isLiked: false,
    },
    {
      answerId: "3",
      groupId: "group2",
      createdBy: {
        userId: "user3",
        userName: "ユーザー3",
        profileImage: "https://example.com/profile3.jpg",
        profileColor: "#3357FF",
      },
      answerText: "解答の内容がここに記述されます。",
      answerImage: "https://example.com/answer3.jpg",
      createdAt: "2025-03-24T06:00:47.610Z",
      goodCount: 8,
      isLiked: true,
    },
    {
      answerId: "4",
      groupId: "group3",
      createdBy: {
        userId: "user4",
        userName: "ユーザー4",
        profileImage: "https://example.com/profile4.jpg",
        profileColor: "#FF33A6",
      },
      answerText: "解答内容のテキストがここに入ります。",
      answerImage: "https://example.com/answer4.jpg",
      createdAt: "2025-03-24T07:10:47.610Z",
      goodCount: 2,
      isLiked: true,
    },
    {
      answerId: "5",
      groupId: "group2",
      createdBy: {
        userId: "user5",
        userName: "ユーザー5",
        profileImage: "https://example.com/profile5.jpg",
        profileColor: "#57FF33",
      },
      answerText: "別の解答例がここに記載されます。",
      answerImage: "https://example.com/answer5.jpg",
      createdAt: "2025-03-24T08:30:47.610Z",
      goodCount: 7,
      isLiked: false,
    },
    {
      answerId: "6",
      groupId: "group1",
      createdBy: {
        userId: "user6",
        userName: "ユーザー6",
        profileImage: "https://example.com/profile6.jpg",
        profileColor: "#57A6FF",
      },
      answerText: "これもサンプル解答です。",
      answerImage: "https://example.com/answer6.jpg",
      createdAt: "2025-03-24T09:45:47.610Z",
      goodCount: 1,
      isLiked: false,
    },
    {
      answerId: "7",
      groupId: "group3",
      createdBy: {
        userId: "user7",
        userName: "ユーザー7",
        profileImage: "https://example.com/profile7.jpg",
        profileColor: "#33A6FF",
      },
      answerText: "サンプル解答内容はここに書きます。",
      answerImage: "https://example.com/answer7.jpg",
      createdAt: "2025-03-24T10:30:47.610Z",
      goodCount: 6,
      isLiked: true,
    },
    {
      answerId: "8",
      groupId: "group2",
      createdBy: {
        userId: "user8",
        userName: "ユーザー8",
        profileImage: "https://example.com/profile8.jpg",
        profileColor: "#FF5733",
      },
      answerText: "こちらがさらに別の解答です。",
      answerImage: "https://example.com/answer8.jpg",
      createdAt: "2025-03-24T11:10:47.610Z",
      goodCount: 4,
      isLiked: true,
    },
    {
      answerId: "9",
      groupId: "group1",
      createdBy: {
        userId: "user9",
        userName: "ユーザー9",
        profileImage: "https://example.com/profile9.jpg",
        profileColor: "#A6FF33",
      },
      answerText: "解答の詳細がここに表示されます。",
      answerImage: "https://example.com/answer9.jpg",
      createdAt: "2025-03-24T12:00:47.610Z",
      goodCount: 3,
      isLiked: false,
    },
    {
      answerId: "10",
      groupId: "group2",
      createdBy: {
        userId: "user10",
        userName: "ユーザー10",
        profileImage: "https://example.com/profile10.jpg",
        profileColor: "#33FF57",
      },
      answerText: "こちらは最後のサンプル解答です。",
      answerImage: "https://example.com/answer10.jpg",
      createdAt: "2025-03-24T13:30:47.610Z",
      goodCount: 9,
      isLiked: true,
    },
  ];

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="h-[calc(100vh_-_56px)] flex flex-col justify-between bg-[#FFBC92] text-xs bg-[url(/src/assets/icons/character.svg)]">
      <div className="w-full">
        <RoomHeader title="大喜利に回答する" />
      </div>
      <div className="flex flex-col gap-6 p-5 overflow-y-auto flex-grow">
        <Oogiri
          text={oogiri.messageText}
          image={oogiri.messageImage}
          isDead={false}
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
      <ThreadFooter answers={answers} />
    </div>
  );
}

export default RouteComponent;
