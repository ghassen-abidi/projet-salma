import { Profiler, useState } from "react";
import { Navbar } from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Home from "./routes/Home";
import Dashbored from "./routes/Dashbored";
import { useUsersgetMyData } from "./api/users";
import { Protected } from "./components/Protected";
import UsersRequests from "./routes/UsersRequests";
import EventsRequests from "./routes/EventsRequests";

function App() {
  const { isLoading, data } = useUsersgetMyData();

  if (isLoading) return <h1>Loading</h1>;

  console.log({
    data,
  });

  return (
    <div className="App">
      <Router>
        <Navbar
          links={[
            { label: "Home", link: "/home" },
            // {
            //   label: "event",
            //   link: "event",
            //   links: [
            //     { label: "old events", link: "/old" },
            //     { label: "current events", link: "/current" },
            //   ],
            // },
          ]}
        />

        <Routes>
          {/* DONE */}
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* <Protected role="admin"> */}

          {/* </Protected> */}
          {/* <Protected> */}
          <Route path="/event/old" />
          {/* </Protected> */}
          <Route path="/event/current" />

          {/* MISSING: dashboard admin */}
          <Route path="/dashboard/users" element={<UsersRequests />} />
          <Route path="/dashboard/events" element={<EventsRequests />} />

          <Route path="/dashboard" element={<Dashbored />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
