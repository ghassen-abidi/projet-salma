import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  BackgroundImage,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { IconFloatNone } from "@tabler/icons";
import { useRegister } from "../api/users";

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundImage: "url(/images/20944068.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "900px 600px",
  },

  form: {
    marginTop: "0px",
    marginLeft: "60%",
    maxWidth: 450,
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export default function Signup() {
  const { classes } = useStyles();
  const redirect = useNavigate();

  const { isLoading, mutate, error } = useRegister(() => {
    redirect("/login");
  });

  const onSubmit = (ev) => {
    ev.preventDefault();
    mutate(ev.target);
  };

  return (
    <div className={classes.wrapper}>
      <Paper
        component="form"
        onSubmit={onSubmit}
        className={classes.form}
        radius={0}
        p={30}
      >
        <Title
          order={2}
          className={classes.title}
          align="center"
          mt="md"
          mb={50}
        >
          Welcome to IsetZg
        </Title>
        <TextInput
          name="name"
          label="Full Name"
          placeholder="Full Name"
          size="md"
        />
        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          name="email"
          size="md"
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
          name="password"
        />
        <PasswordInput
          label="Password"
          placeholder="password verification"
          mt="md"
          size="md"
        />

        <div
          style={{
            color: "red",
          }}
        >
          {(error as any)?.response?.data?.message}
        </div>
        <Button
          fullWidth
          mt="xl"
          size="md"
          style={{ backgroundColor: "dde4fe" }}
          type="submit"
          loading={isLoading}
        >
          Singup
        </Button>
      </Paper>
    </div>
  );
}
