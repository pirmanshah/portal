import {
  Text,
  Stack,
  Image,
  Group,
  Button,
  TextInput,
  PasswordInput,
} from "@mantine/core";
import { IconLockOpen } from "@tabler/icons-react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { Form, redirect, useActionData, useNavigation } from "react-router";

import logo from "#app/assets/logo.svg";
import { PATH } from "#app/constants/path";
import type { Route } from "./+types/sign-in";
import { signInSchema } from "./sign-in.shema";
import { authenticate } from "./sign-in.service";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign In" },
    { name: "description", content: "Sign In for access Portal" },
  ];
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const submission = parseWithZod(formData, { schema: signInSchema });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const { success, message } = await authenticate(submission.value);

  if (!success) {
    return submission.reply({
      fieldErrors: {
        username: [message],
      },
    });
  }

  return redirect(PATH.DASHBOARD);
}

export default function SignIn() {
  const navigation = useNavigation();
  const lastResult = useActionData<typeof clientAction>();

  const loading = navigation.state === "submitting";

  const [form, fields] = useForm({
    lastResult,
    constraint: getZodConstraint(signInSchema),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signInSchema });
    },
  });

  return (
    <>
      <Stack mb="md" gap="xs">
        <Group>
          <Image src={logo} w={30} />
          <Text fw={700} ff="monospace">
            Portal S-IKI
          </Text>
        </Group>
        <Text
          fz={14}
          style={{
            color:
              "light-dark(var(--mantine-color-gray-7), var(--mantine-color-gray-0))",
          }}
        >
          Sign in to streamline your operations and keep everything
          well-organized efficiently.
        </Text>
      </Stack>
      <Form method="POST" {...getFormProps(form)}>
        <Stack gap="sm">
          <TextInput
            radius="md"
            label="Username"
            placeholder="Your username"
            error={fields.username.errors}
            {...getInputProps(fields.username, { type: "text" })}
          />
          <PasswordInput
            radius="md"
            label="Password"
            placeholder="Your password"
            error={fields.password.errors}
            {...getInputProps(fields.password, { type: "password" })}
          />
        </Stack>
        <Button
          mt="lg"
          fullWidth
          radius="md"
          type="submit"
          loading={loading}
          leftSection={<IconLockOpen size="1.2rem" stroke={1.5} />}
        >
          Sign In
        </Button>
      </Form>
    </>
  );
}
