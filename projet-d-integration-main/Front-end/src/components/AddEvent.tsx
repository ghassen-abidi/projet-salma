import { SideBar } from "../components/SideBar";
import { DropzoneButton } from "../components/DropzoneButton";
import { Button, createStyles, Select, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useAddEvent } from "../api/event";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
  },
  input: {
    height: "auto",
    paddingTop: 18,
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}));
const AddEvent = () => {
  const { classes } = useStyles();

  const form = useRef<HTMLFormElement>(null);

  const [file, setFile] = useState<File | null>(null);

  const { isLoading, mutate, error } = useAddEvent(() => {
    form.current?.reset();
    toast.success("Event added successfully");
  });

  const onSubmit = (ev) => {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    const body = new FormData();
    body.append("title", data.title);
    body.append("description", data.description);
    body.append("date", data.date);
    body.append("file", file!);

    mutate(body);
  };

  return (
    <form onSubmit={onSubmit} ref={form}>
      <h1>Add Event</h1>
      <div>
        <TextInput
          label="title"
          placeholder="event title"
          classNames={classes}
          name="title"
          disabled={isLoading}
        />
        <TextInput
          label="desription"
          placeholder="event description"
          classNames={classes}
          name="description"
          disabled={isLoading}
        />

        <DatePicker
          style={{ marginTop: 20 }}
          label="event date"
          placeholder=""
          classNames={classes}
          clearable={false}
          name="date"
          disabled={isLoading}
        />
      </div>

      <DropzoneButton
        onDrop={(file) => {
          console.log(file[0]);
          setFile(file[0]);
        }}
      />
      <div
        style={{
          color: "red",
        }}
      >
        {(error as any)?.response?.data?.message}
      </div>

      <Button fullWidth mt="xl" size="md" type="submit" loading={isLoading}>
        Add
      </Button>
    </form>
  );
};

export default AddEvent;
