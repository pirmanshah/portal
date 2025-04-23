import { Grid, Image, Text } from "@mantine/core";

import image from "#app/assets/profile_image.svg";

export default function HeaderSection() {
  return (
    <Grid>
      <Grid.Col span={{ base: 12, md: 8 }}>
        <Text mb={5} size="md" fw={500}>
          Profile Info
        </Text>
        <div>
          <Text size="sm">
            Personal information and options to manage it. You can change your
            profile photo so others can easily recognize you.
          </Text>
        </div>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <Image src={image} maw={200} />
      </Grid.Col>
    </Grid>
  );
}
