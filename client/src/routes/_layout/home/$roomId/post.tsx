import { useState, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, ControllerRenderProps } from "react-hook-form";
import { z } from "zod";
import RoomHeader from "@/features/room/room-header";
import { Button } from "@/components/common/button/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/common/form/form";
import { Input } from "@/components/common/input/input";
import { Textarea } from "@/components/common/textarea/textarea";
import { SendSlantBrown, PaperClip } from "@/components/common/icon";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/home/$roomId/post")({
  component: RouteComponent,
});

const formSchema = z.object({
  text: z.string().min(1, { message: "必須入力項目です。" }),
  prize: z.string().optional(),
  deadline: z.string().min(1, { message: "必須入力項目です。" }),
  image: z.instanceof(File).optional(),
});

type FormSchema = z.infer<typeof formSchema>;

function RouteComponent() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      deadline: "",
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  function onSubmit(values: FormSchema) {
    console.log(values);
  }

  return (
    <div className="h-[calc(100vh_-_56px)] flex flex-col bg-[#FFBC92] text-xs bg-[url(/src/assets/character-room.webp)]">
      <div className="w-full">
        <RoomHeader title="大喜利を投稿する" />
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-between gap-[120px] pt-[36px] pb-[61px] px-[34px] overflow-y-auto"
        >
          <div className="flex flex-col gap-[40px]">
            <div className="flex flex-col gap-[10px]">
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Uploaded preview"
                  className="rounded w-[248px] h-auto"
                />
              )}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file) {
                            field.onChange(file);
                            setPreviewImage(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="button"
                className="border-radius-[12px] bg-[#96BB00] text-[#F5F5F5] text-[12px] font-bold w-[104px] hover:bg-[#96BB00]/90"
                onClick={() => fileInputRef.current?.click()}
              >
                <PaperClip width="16px" height="16px" /> 写真を添付
              </Button>
              <FormField
                control={form.control}
                name="text"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<FormSchema, "text">;
                }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="お題を入力" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-black text-[12px] font-bold">景品設定</div>
              <FormField
                control={form.control}
                name="prize"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<FormSchema, "prize">;
                }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="景品を入力" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="text-black text-[12px] font-bold">終了日時</div>
              <FormField
                control={form.control}
                name="deadline"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<FormSchema, "deadline">;
                }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="終了日時を入力"
                        type="datetime-local"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              className="border-radius-[8px] border-[2px] border-[#743E3E] bg-[#FF7C2A] text-[#743E3E] text-[12px] font-bold w-[100px] hover:bg-[#FF7C2A]/90"
            >
              <SendSlantBrown width="16px" height="16px" /> 投稿する
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default RouteComponent;
