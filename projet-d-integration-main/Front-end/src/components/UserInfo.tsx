import { Avatar, Text, Button, Paper } from "@mantine/core";

interface UserInfoActionProps {
  avatar: string;
  name: string;
  email: string;
  job: string;
  role: string;
}

export function UserInfo({
  avatar,
  name,
  email,
  job,
  role,
}: UserInfoActionProps) {
  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Avatar src={avatar} size={120} radius={120} mx="auto" />
      <Text align="center" size="lg" weight={500} mt="md">
        {name}
      </Text>
      <Text align="center" color="dimmed" size="sm">
        • {email} •
      </Text>

      <Button
        variant="default"
        fullWidth
        mt="md"
        sx={{ textTransform: "uppercase" }}
      >
        {role}
      </Button>
    </Paper>
  );
}
