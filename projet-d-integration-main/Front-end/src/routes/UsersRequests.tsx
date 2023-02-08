import { useState } from "react";
import { createStyles, Table, ScrollArea, Button } from "@mantine/core";
import { SideBar } from "../components/SideBar";
import { useApproveUser, useRejectUser, useUsersgetAll } from "../api/users";

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

interface TableScrollAreaProps {
  data: { name: string; email: string; id: string }[];
  onAction: () => void;
}

export default function Index() {
  const { data, isLoading, refetch } = useUsersgetAll();

  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div
        style={{
          flex: 2,
          padding: "50px",
        }}
      >
        {isLoading ? (
          <></>
        ) : (
          <>
            <h1>Users Requests</h1>
            <UsersRequests
              onAction={refetch}
              data={data.map((user) => ({
                name: user.name,
                email: user.email,
                id: user._id,
              }))}
            />
          </>
        )}
      </div>
      <div
        style={{
          flex: 2,
          maxHeight: "100vh",
          overflowY: "scroll",
          padding: "25px",
          display: "grid",
          placeItems: "center",
          overflowX: "hidden",
        }}
      >
        <img
          style={{ height: "400px", width: "400px" }}
          src="/images/photoLogin.svg"
        />
      </div>
    </div>
  );
}
function UsersRequests({ data, onAction }: TableScrollAreaProps) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const { mutate: approve, isLoading: isLoadingOnApproval } =
    useApproveUser(onAction);
  const { mutate: reject, isLoading } = useRejectUser(onAction);

  const rows = data.map((row) => (
    <tr key={row.id}>
      <td>{row.name}</td>
      <td>{row.email}</td>
      <td
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5px",
          maxWidth: "100px",
        }}
      >
        <Button
          loading={isLoading || isLoadingOnApproval}
          onClick={() => approve(row.id)}
        >
          Approve
        </Button>
        <Button
          loading={isLoading || isLoadingOnApproval}
          sx={{
            backgroundColor: "red",
            ":hover": {
              backgroundColor: "red",
            },
          }}
          onClick={() => reject(row.id)}
        >
          Reject
        </Button>
      </td>
    </tr>
  ));

  return (
    <ScrollArea onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table sx={{ minWidth: 700 }}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
