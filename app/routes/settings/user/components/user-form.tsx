import {
  Group,
  Stack,
  Select,
  Button,
  TextInput,
  PasswordInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useRoleSelectQuery } from "#app/hooks/use-role-query";
import { userFormSchema, type UserFormValues } from "../utils/schema";
import { useDepartmentSelectQuery } from "#app/hooks/use-department-query";

type UserFormProps = {
  onSubmit: (values: UserFormValues) => void;
  isLoading?: boolean;
};

export function UserForm({ onSubmit, isLoading = false }: UserFormProps) {
  const form = useForm<UserFormValues>({
    validate: zodResolver(userFormSchema),
    initialValues: {
      username: "",
      fullname: "",
      email: "",
      password: "",
      department_id: "",
      role_id: "2",
    },
  });

  const { data: departmentOptions, isLoading: isDeptLoading } =
    useDepartmentSelectQuery("form");
  const { data: roleOptions, isLoading: isRoleLoading } =
    useRoleSelectQuery("form");

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap="xs">
        <Group grow>
          <TextInput
            size="xs"
            withAsterisk
            label="Username"
            placeholder="Username"
            {...form.getInputProps("username")}
          />
          <TextInput
            size="xs"
            withAsterisk
            label="Fullname"
            placeholder="Fullname"
            {...form.getInputProps("fullname")}
          />
        </Group>

        <TextInput
          size="xs"
          withAsterisk
          label="Email"
          placeholder="@s-iki.co.id"
          {...form.getInputProps("email")}
        />

        <Group grow>
          <PasswordInput
            size="xs"
            withAsterisk
            label="Password"
            placeholder="Password"
            {...form.getInputProps("password")}
          />
        </Group>

        <Group grow>
          <Select
            size="xs"
            clearable
            searchable
            withAsterisk
            label="Department"
            placeholder="Department"
            data={departmentOptions ?? []}
            disabled={isDeptLoading}
            {...form.getInputProps("department_id")}
          />
          <Select
            size="xs"
            clearable
            searchable
            withAsterisk
            label="Role"
            placeholder="Role"
            data={roleOptions ?? []}
            disabled={isRoleLoading}
            {...form.getInputProps("role_id")}
          />
        </Group>

        <Group mt="sm" justify="right">
          <Button size="xs" type="submit" loading={isLoading}>
            Register
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
