import { Group, Modal, Stack, Button, NumberInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";

import { updateSchema } from "../utils/schema";
import type { Issued } from "../types/issued.code.types";
import { mapInitialValue } from "../utils/mapInitialValue";
import { useUpdateIssued } from "../hooks/use-issued-code";

type EditModalProps = {
  item: Issued;
  opened: boolean;
  onClose: () => void;
};

export function EditModal({ item, opened, onClose }: EditModalProps) {
  const { mutateAsync, isPending } = useUpdateIssued(item.code);
  const initialValues = mapInitialValue(item);

  const form = useForm({
    initialValues,
    validate: zodResolver(updateSchema),
  });

  const handleSubmit = () => {
    if (form.validate().hasErrors) return;

    mutateAsync({ id: item.id, payload: form.values }).finally(onClose);
  };

  return (
    <Modal centered opened={opened} onClose={onClose} title="Edit Data">
      <Stack gap={5}>
        <Group gap="xs" grow>
          <NumberInput
            size="xs"
            hideControls
            decimalScale={6}
            thousandSeparator
            fixedDecimalScale
            label="Issued Qty"
            {...form.getInputProps("qty", {
              parse: (value: any) =>
                value ? parseFloat(value.toString().replace(/,/g, "")) : 0,
              format: (value: any) => value.toString(),
            })}
          />
        </Group>
      </Stack>
      <Group gap="xs" mt="lg" justify="right">
        <Button size="xs" color="gray" loading={isPending} onClick={onClose}>
          Cancel
        </Button>
        <Button size="xs" onClick={handleSubmit} loading={isPending}>
          Update
        </Button>
      </Group>
    </Modal>
  );
}
