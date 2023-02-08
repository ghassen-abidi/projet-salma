import {
  createStyles,
  Menu,
  Center,
  Header,
  Container,
  Group,
  Button,
  Burger,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useIsAuthenticated, useLogout, useUsersgetMyData } from "../api/users";

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: 5,
  },
}));

interface NavbarProps {
  links: {
    link: string;
    label: string;
    links?: { link: string; label: string }[];
  }[];
}

export function Navbar({ links }: NavbarProps) {
  const { pathname } = useLocation();
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);

  // const { isLoading, data } = useUsersgetMyData();
  // const is = useMemo(() => !isLoading && !!data, [isLoading, data]);
  const is = useIsAuthenticated();

  const logout = useLogout();
  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" exitTransitionDuration={0}>
          <Menu.Target>
            <Link
              to={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={12} stroke={1.5} />
              </Center>
            </Link>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link
        key={link.label}
        to={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </Link>
    );
  });

  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }}>
      <Container className={classes.inner} fluid>
        <Group>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
          <img
            src="/public/images/logo.jpg"
            alt="logo"
            width="40px"
            height="40px"
          />
        </Group>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <pre>
          <Group spacing={12} className={classes.links}>
            {is ? (
              <>
                <Link to="/dashboard">
                  <Button>Dashboard</Button>
                </Link>
                <Button sx={{ backgroundColor: "red" }} onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <p>
                  <Link to="/Signup">signup</Link>{" "}
                </p>
                <Link to="/Login">
                  <Button radius="xl" sx={{ height: 30 }}>
                    Log in
                  </Button>
                </Link>
              </>
            )}
          </Group>
        </pre>
      </Container>
    </Header>
  );
}
