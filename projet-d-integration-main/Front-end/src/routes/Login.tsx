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
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { IconFloatNone } from "@tabler/icons";
import { useLogin } from "../api/users";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "grid",

    backgroundImage: "url(/images/photoLogin.svg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "900px 450px",
  },

  form: {
    marginTop: "0px",
    marginLeft: "70%",
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: "100%",
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    width: 120,
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default function Login() {
  const { classes } = useStyles();
  const redirect = useNavigate();

  // create onSubmit
  const { mutate, error } = useLogin(({ token }) => {
    localStorage.setItem("token", token);
    redirect("/dashboard");
  });

  const onSubmit = (e) => {
    e.preventDefault();
    const data = e.target;
    mutate(data);
  };

  return (
    <form className={classes.wrapper} onSubmit={onSubmit}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title
          order={2}
          className={classes.title}
          align="center"
          mt="md"
          mb={50}
        >
          Login
        </Title>

        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
          name="email"
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
          name="password"
        />
        <div
          style={{
            color: "red",
          }}
        >
          {(error as any)?.response?.data?.message}
        </div>

        <Button fullWidth mt="xl" size="md" type="submit">
          Login
        </Button>

        <Text align="center" mt="md">
          Don&apos;t have an account? <Link to="/signup">Register</Link>
        </Text>
      </Paper>
    </form>
  );
}
