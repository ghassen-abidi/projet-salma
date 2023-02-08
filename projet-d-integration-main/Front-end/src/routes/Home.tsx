import { Footer } from "../components/Footer";
import { Button } from "@mantine/core";
import { EventCards } from "../components/eventCards";
const Home = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1 style={{ textAlign: "center" }}>
            Bienvenue a Institut Supérieur des Etudes Technologiques de zaghouan
          </h1>

          <Button style={{ margin: "auto" }} mt="xl" size="sm">
            Show events
          </Button>
        </div>

        <img
          src="/images/photo1-removebg-preview.png"
          alt="photo1"
          style={{ width: "30%" }}
        />
      </div>
      <EventCards />
      <Footer />
    </div>
  );
};

export default Home;
