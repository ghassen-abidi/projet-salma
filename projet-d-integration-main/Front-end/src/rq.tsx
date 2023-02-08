import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";

const queryClient = new QueryClient();

export const RQProvider = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const baseURL = "http://localhost:4000";

export function getClient() {
  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
}

export function getImage(path) {
  return baseURL + "/storage/" + path;
}
