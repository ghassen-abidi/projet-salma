import { Navigate } from "react-router-dom";
import { useUsersgetMyData } from "../api/users";

export function Protected({
  role,
  children,
}: {
  children: any;
  role?: string;
}) {
  const { isLoading, data } = useUsersgetMyData();

  if (isLoading) {
    console.log("-1");
    return null;
  }

  if (!data) {
    console.log("1");
    return <Navigate to="/login" />;
  }

  if (data && role && data.role !== role) {
    console.log("2");

    return <Navigate to="/login" />;
  }
  console.log("0");

  return children;
}
