import { useState } from "react";
import { createStyles, Navbar, Group, Code, Button } from "@mantine/core";
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
} from "@tabler/icons";
import { MantineLogo } from "@mantine/ds";
import { UserInfo } from "../components/UserInfo";
import { useIsAdmin, useLogout, useUsersgetMyData } from "../api/users";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");

  return {
    navbar: {
      backgroundColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
    },

    version: {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      ),
      color: theme.white,
      fontWeight: 700,
    },

    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      )}`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      )}`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color: theme.white,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: "filled", color: theme.primaryColor })
            .background!,
          0.1
        ),
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.white,
      opacity: 0.75,
      marginRight: theme.spacing.sm,
    },
  };
});

export function SideBar() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Billing");

  const { isLoading, data: user } = useUsersgetMyData();
  const logout = useLogout();
  const is = useIsAdmin();

  if (isLoading) {
    return null;
  }

  return (
    <Navbar width={{ sm: 300 }} p="md" className={classes.navbar}>
      <Navbar.Section className={classes.header}>
        <UserInfo
          avatar="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
          name={user.name}
          email={user.email}
          job=""
          role={user.role}
        />
      </Navbar.Section>

      <Link to="/home" className={classes.link}>
        Home
      </Link>

      <Link to="/dashboard" className={classes.link}>
        Dashboard
      </Link>

      {is && (
        <>
          <Link to="/dashboard/users" className={classes.link}>
            Approve Users Requests
          </Link>
          <Link to="/dashboard/events" className={classes.link}>
            Approve Events Requests
          </Link>
        </>
      )}
      {/* <Navbar.Section className={classes.header}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>
      </Navbar.Section> */}
      <Navbar.Section className={classes.footer}>
        <Button
          className={classes.link}
          sx={{
            backgroundColor: "red",
            ":hover": {
              backgroundColor: "red",
            },
          }}
          fullWidth
          onClick={logout}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Button>
      </Navbar.Section>
    </Navbar>
  );
}
