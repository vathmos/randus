import { useTranslation } from "@/contexts/TranslationContext";
import useMemberForm from "@/hooks/useMemberForm";
import { Button, Form, Input, PressEvent } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const createMemberSchema = z.object({
  memberName: z.string({ message: "Input must be a string" }).trim().nonempty({ message: "Please type something dude" }),
})
type CreateMemberSchema = z.infer<typeof createMemberSchema>;

export default function MemberForm(props: { selectedItemKeys: Set<string> | "all", handleDeleteItem: ((e: PressEvent) => void) | undefined }) {

  const createMemberForm = useForm<CreateMemberSchema>({
    resolver: zodResolver(createMemberSchema),
  });

  const { text } = useTranslation();
  const { handleAddMember } = useMemberForm();

  return (
    <>
      <div key="bordered" className="flex w-full flex-wrap md:flex-nowrap md:mb-0 gap-4">
        <Form className="flex flex-row items-end w-full" onSubmit={createMemberForm.handleSubmit(handleAddMember)}>
          <Controller
            name="memberName"
            control={createMemberForm.control}
            render={({ field }) => (
              <Input
                isInvalid={createMemberForm.formState.errors.memberName ? true : false}
                errorMessage={createMemberForm.formState.errors.memberName?.message}
                {...field}
                label={text.table.name}
                type="text"
                variant="underlined"
                placeholder={text.new_member}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    createMemberForm.handleSubmit(handleAddMember)();
                  }
                }}
              />
            )}
          />
          <section className="flex items-end gap-2">
            <Button isIconOnly variant="solid" size="md" color="primary">
              <Plus></Plus>
            </Button>
            <Button isDisabled={props.selectedItemKeys !== "all" && props.selectedItemKeys.size === 0} onPress={props.handleDeleteItem} isIconOnly variant="solid" size="md" color="danger">
              <Trash></Trash>
            </Button>
          </section>
        </Form>
      </div>
    </>
  )
}