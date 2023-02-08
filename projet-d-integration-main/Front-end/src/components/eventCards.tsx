import {
  createStyles,
  SimpleGrid,
  Card,
  Image,
  Text,
  Container,
  AspectRatio,
} from "@mantine/core";
import { useGetAllEvent } from "../api/event";
import { getImage } from "../rq";

const useStyles = createStyles((theme) => ({
  card: {
    transition: "transform 150ms ease, box-shadow 150ms ease",

    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
}));

export function EventCards() {
  const { classes } = useStyles();

  const { data, isLoading } = useGetAllEvent();

  if (isLoading) {
    return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
  }
  console.log({ data });

  const cards = data.map((ev, idx) => (
    <Card
      key={ev.title}
      p="md"
      radius="md"
      component="a"
      className={classes.card}
    >
      <AspectRatio ratio={1920 / 1080}>
        <Image
          src={
            ev.image
              ? getImage(ev.image)
              : "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80"
          }
          onError={(e) => {
            (e.currentTarget as any).src =
              "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80";
          }}
        />
      </AspectRatio>
      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
        {new Date(ev.date).toDateString()}
      </Text>
      <Text className={classes.title} mt={5}>
        {ev.title}
      </Text>
    </Card>
  ));

  return (
    <Container py="xl">
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {cards}
      </SimpleGrid>
    </Container>
  );
}
