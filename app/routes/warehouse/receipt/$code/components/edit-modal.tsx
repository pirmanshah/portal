import {
  Group,
  Modal,
  Stack,
  Select,
  Button,
  TextInput,
  NumberInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { DateInput, TimeInput } from "@mantine/dates";

import { updateSchema } from "../utils/schema";
import { useCustomQuery } from "../../hooks/use-custom";
import type { Receipt } from "../types/receipt.code.types";
import { mapInitialValue } from "../utils/mapInitialValue";
import { useUpdateReceipt } from "../hooks/use-receipt-code";

type EditModalProps = {
  item: Receipt;
  opened: boolean;
  onClose: () => void;
};

export function EditModal({ item, opened, onClose }: EditModalProps) {
  const { data } = useCustomQuery();
  const { mutateAsync, isPending } = useUpdateReceipt(item.code);
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
          <TextInput
            size="xs"
            label="Lot No."
            {...form.getInputProps("lot_number")}
          />
          <TextInput
            size="xs"
            label="Business Partner Lot"
            {...form.getInputProps("maker_lot_number")}
          />
        </Group>
        <Group gap="xs" grow>
          <NumberInput
            size="xs"
            hideControls
            decimalScale={4}
            thousandSeparator
            fixedDecimalScale
            label="Received Qty"
            {...form.getInputProps("actual_qty", {
              parse: (value: any) =>
                value ? parseFloat(value.toString().replace(/,/g, "")) : 0,
              format: (value: any) => value.toString(),
            })}
          />
          <NumberInput
            size="xs"
            hideControls
            thousandSeparator
            label="Packing Slip"
            {...form.getInputProps("packing_slip")}
          />
        </Group>

        <Group gap="xs" grow>
          <DateInput
            size="xs"
            clearable
            label="Arrival Date"
            {...form.getInputProps("arrival_date")}
          />
          <TimeInput
            size="xs"
            label="Arrival Time"
            {...form.getInputProps("arrival_time")}
          />
        </Group>

        <Group gap="xs" grow>
          <TextInput
            size="xs"
            label="Delivery Order No."
            {...form.getInputProps("delivery_order_number")}
          />
          <DateInput
            size="xs"
            clearable
            label="Delivery Order Date"
            {...form.getInputProps("delivery_order_date")}
          />
        </Group>
        <DateInput
          size="xs"
          clearable
          label="Expire Date"
          {...form.getInputProps("expiration_date")}
        />
        <Group gap="xs" grow>
          <Select
            size="xs"
            clearable
            searchable
            data={data}
            label="BC Type"
            {...form.getInputProps("custom_doc_type")}
          />
          <TextInput
            size="xs"
            label="BC No."
            {...form.getInputProps("custom_doc_number")}
          />
          <DateInput
            size="xs"
            clearable
            label="BC Date"
            {...form.getInputProps("custom_doc_date")}
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
