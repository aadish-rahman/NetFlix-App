import React from "react";
import "./App.css";
import Banner from "./Components/Banner/Banner";
import NavBar from "./Components/NavBar/NavBar";
import RowPost from "./Components/RowPost/RowPost";
import {
  action,
  comedy,
  documentary,
  horror,
  originals,
  romance,
} from "./urls";

function App() {
  return (
    <div>
      <NavBar />
      <Banner />
      <RowPost url={originals} title="NetFlix Originals" />
      <RowPost url={action} title="Action" isSmall />
      <RowPost url={romance} title="Romance" isSmall />
      <RowPost url={horror} title="Horror" isSmall />
      <RowPost url={comedy} title="Comedy" isSmall />
      <RowPost url={documentary} title="Documentaries" isSmall />
    </div>
  );
}

export default App;
