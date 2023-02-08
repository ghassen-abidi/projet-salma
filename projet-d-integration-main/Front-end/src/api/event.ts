import { useQuery, useMutation } from "react-query";
import { getClient } from "../rq";

export const useAddEvent = (onSuccess) => {
  return useMutation(
    (data: any) => {
      return getClient()
        .post("/event/create", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => res.data);
    },
    {
      onSuccess,
    }
  );
};

export const useUsersgetAll = () => {
  return useQuery("users", () =>
    getClient()
      .get("/event/all")
      .then((res) => res.data)
  );
};

export const useEventUnchcked = () => {
  return useQuery("users", () =>
    getClient()
      .get("/event/unchecked")
      .then((res) => res.data)
  );
};

export const useGetEventById = (id) => {
  return useQuery("users", () =>
    getClient()
      .get("/event/" + id)
      .then((res) => res.data)
  );
};

export const useGetAllEvent = () => {
  return useQuery("users", () =>
    getClient()
      .get("/event/getAllEvent")
      .then((res) => res.data)
  );
};

export const useApproveEvent = (onSuccess) => {
  return useMutation(
    (id: string) => {
      return getClient()
        .put("/event/approve/" + id)
        .then((res) => res.data);
    },
    {
      onSuccess,
    }
  );
};

export const useRejectEvent = (onSuccess) => {
  return useMutation(
    (id: string) => {
      return getClient()
        .delete("/event/reject/" + id)
        .then((res) => res.data);
    },
    {
      onSuccess,
    }
  );
};
