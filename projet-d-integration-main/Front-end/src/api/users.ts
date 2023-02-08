import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getClient } from "../rq";

// const { mutate, isLoading, data } = useLogin()

export const useRegister = (onSuccess) => {
  return useMutation(
    (data) => {
      return getClient()
        .post("/user/register", data)
        .then((res) => res.data);
    },
    {
      onSuccess,
    }
  );
};

export const useLogout = () => {
  const redirect = useNavigate();
  return () => {
    localStorage.removeItem("token");
    redirect("/login");
  };
};

export const useIsAuthenticated = () => {
  console.log("wtf1");

  //   const { data, isLoading } = useUsersgetMyData();
  return false; // !isLoading && !!data;
};

export const useIsAdmin = () => {
  const { data, isLoading } = useUsersgetMyData();
  console.log("wtf2");

  return !isLoading && !!data && data.role === "admin";
};

export const useLogin = (onSuccess) => {
  return useMutation(
    (data) => {
      return getClient()
        .post("/user/login", data)
        .then((res) => res.data);
    },
    {
      onSuccess,
    }
  );
};

export const useApproveUser = (onSuccess) => {
  return useMutation(
    (id: string) => {
      return getClient()
        .put("/user/approve/" + id)
        .then((res) => res.data);
    },
    {
      onSuccess,
    }
  );
};

export const useRejectUser = (onSuccess) => {
  return useMutation(
    (id: string) => {
      return getClient()
        .delete("/user/reject/" + id)
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
      .get("/user")
      .then((res) => res.data)
  );
};

export const useUsersgetMyData = () => {
  return useQuery(
    "user",
    () => {
      console.log("wtf");
      return getClient()
        .get("/user/me")
        .then((res) => res.data);
    },
    {
      retry: false,
    }
  );
};
