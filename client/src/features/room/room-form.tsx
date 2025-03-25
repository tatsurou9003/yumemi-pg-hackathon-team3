import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/common/button/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/common/form/form";
import { Input } from "@/components/common/input/input";

const formSchema = z.object({
  message: z.string().min(1),
});

export type FormSchema = z.infer<typeof formSchema>;

type RoomFormProps = {
  onSend: (data: FormSchema) => void;
};

const RoomForm = ({ onSend }: RoomFormProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSend)}
        className="w-full flex items-center space-x-2"
      >
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Aa" {...field} className="w-full" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">送信</Button>
      </form>
    </Form>
  );
};

export default RoomForm;