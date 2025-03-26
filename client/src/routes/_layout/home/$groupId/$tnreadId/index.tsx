import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useLocation } from "@tanstack/react-router";
import RoomHeader from "@/features/room/room-header";
import Oogiri from "@/features/room/oogiri";
import Answer from "@/features/room/answer";
import ThreadFooter from "@/features/room/thread-footer";
import { Input } from "@/components/common/input/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/common/form/form";
import { SendBrown } from "@/components/common/icon";
import { MessageData } from "@/types/messageData";
import { AnswerData } from "@/types/answerData";
import { getGroups } from "@/hooks/orval/groups/groups";
import { getAnswers } from "@/hooks/orval/answers/answers";
import { getLikes } from "@/hooks/orval/likes/likes";
import { useEffect, useState } from "react";
import { env } from "@/env";

const formSchema = z.object({
  answer: z.string().min(2, {
    message: "必須入力項目です。",
  }),
});

export const Route = createFileRoute("/_layout/home/$groupId/$tnreadId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const location = useLocation();
  const path = location.pathname ?? "";
  const groupId = path.split("/")[2];
  const threadId = path.split("/")[3];

  const [oogiri, setOogiri] = useState<MessageData | undefined>(undefined);
  const [answers, setAnswers] = useState<AnswerData[]>([]);
  const [flag, setFlag] = useState<boolean>(false);

  const userId = localStorage.getItem(
    `CognitoIdentityServiceProvider.${env.USER_POOL_CLIENT_ID}.LastAuthUser`,
  );
  const idToken = localStorage.getItem(
    `CognitoIdentityServiceProvider.${env.USER_POOL_CLIENT_ID}.${userId}.idToken`,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chatResponse = await getGroups().getGroupsChatGroupId(groupId);
        const chatDataFormatted = chatResponse.data.messages.map((message) => ({
          messageId: message.messageId,
          messageType: message.messageType,
          messageText: message.messageText,
          messageImage: message.messageImage ?? undefined,
          prizeText: message.prizeText ?? undefined,
          deadline: message.deadline ?? undefined,
          winner: message.winner ?? undefined,
          createdBy: message.createdBy ?? undefined,
          createdAt: message.createdAt ?? undefined,
        }));
        const targetOogiri = chatDataFormatted.find(
          (message) => message.messageId === threadId,
        );
        setOogiri(targetOogiri);

        const response = await fetch(`${env.API_URL}/answers/${threadId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
        });
        const data = await response.json();

        const formattedAnswers = data.map((answer: AnswerData) => ({
          answerId: answer.answerId,
          createdBy: {
            userId: answer.createdBy.userId,
            userName: answer.createdBy.userName,
            profileImage: answer.createdBy.profileImage ?? "",
            profileColor: answer.createdBy.profileColor ?? "",
          },
          answerText: answer.answerText,
          createdAt: answer.createdAt,
          goodCount: answer.goodCount,
          isliked: answer.isliked,
        }));
        setAnswers(formattedAnswers);
      } catch (error) {
        console.error("データの取得に失敗しました:", error);
      }
    };

    fetchData();
  }, [groupId, threadId, flag]);

  const isDead =
    oogiri && oogiri.deadline ? new Date(oogiri.deadline) < new Date() : false;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await fetch(`${env.API_URL}/answers/${threadId}?groupId=${groupId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          answerText: values.answer,
        }),
      });

      setFlag(!flag);
    } catch (error) {
      console.error("データ送信エラー:", error);
    }
  };

  const handleGood = async (id: string, liked: boolean) => {
    if (liked) {
      await getLikes().deleteAnswersLikeAnswerId(id, threadId);
    } else {
      await getLikes().putAnswersLikeAnswerId(id, threadId);
    }
  };

  return (
    <div className="h-[calc(100vh_-_56px)] flex flex-col justify-between bg-[#FFBC92] text-xs bg-[url(/src/assets/icons/character.svg)]">
      <div className="w-full">
        <RoomHeader title={isDead ? "回答を見る" : "大喜利に回答する"} />
      </div>
      {oogiri && (
        <div className="flex flex-col gap-6 p-5 overflow-y-auto flex-grow">
          <Oogiri
            text={oogiri.messageText}
            image={oogiri.messageImage}
            isDead={isDead}
          />
          {isDead && answers ? (
            <div className="flex flex-col gap-4 overflow-y-auto w-full">
              {answers.map((answer: AnswerData) => (
                <div className="flex justify-start" key={answer.answerId}>
                  <Answer {...answer} />
                </div>
              ))}
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="answer"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 border-2 border-white p-1 rounded-lg bg-white space-y-0">
                      <FormControl>
                        <Input
                          placeholder="回答を入力"
                          className="border-none shadow-none hover:shadow-none focus-visible:outline-none focus-visible:ring-0"
                          {...field}
                        />
                      </FormControl>
                      <button className="cursor-pointer" type="submit">
                        <SendBrown width="24px" height="24px" />
                      </button>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          )}
        </div>
      )}
      {!isDead && <ThreadFooter answers={answers} onGood={handleGood} />}
    </div>
  );
}

export default RouteComponent;
