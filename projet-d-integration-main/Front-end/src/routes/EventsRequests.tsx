import { useState } from "react";
import { createStyles, Table, ScrollArea, Button } from "@mantine/core";
import { SideBar } from "../components/SideBar";
import { useApproveUser, useRejectUser, useUsersgetAll } from "../api/users";
import {
  useApproveEvent,
  useEventUnchcked,
  useRejectEvent,
} from "../api/event";

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
  data: { title: string; description: string; id: string; date: string }[];
  onAction: () => void;
}

export default function Index() {
  const { data, isLoading, refetch } = useEventUnchcked();

  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <div
        style={{
          flex: 1,
          padding: "50px",
        }}
      >
        {isLoading ? (
          <></>
        ) : (
          <>
            <h1>Events Requests</h1>
            <EventsRequests
              onAction={refetch}
              data={data.map((ev) => ({
                title: ev.title,
                description: ev.description,
                date: new Date(ev.date).toDateString(),
                id: ev._id,
              }))}
            />
          </>
        )}
      </div>
    </div>
  );
}
function EventsRequests({ data, onAction }: TableScrollAreaProps) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const { mutate: approve, isLoading: isLoadingOnApproval } =
    useApproveEvent(onAction);
  const { mutate: reject, isLoading } = useRejectEvent(onAction);

  const rows = data.map((row) => (
    <tr key={row.id}>
      <td>{row.title}</td>
      <td>{row.description}</td>
      <td>{row.date}</td>
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
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}
