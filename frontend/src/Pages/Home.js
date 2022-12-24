import React from "react";
import Container from "../Components/Container/Container";
import Categories from "../Components/Categories/Categories";
import Featured from "../Components/Featured/Featured";

function Home() {
  return (
    <>
      <Container>
        <Featured />
        <Categories />
      </Container>
    </>
  );
}

export default Home;
