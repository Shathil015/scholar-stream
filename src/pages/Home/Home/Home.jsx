import React from "react";
import Banner from "./Banner";
import Newspaper from "./Newspaper";
import TopScholarships from "./TopScholarship";

const Home = () => {
  return (
    <div className="my-5 ">
      <Banner></Banner>
      <TopScholarships></TopScholarships>
      <Newspaper></Newspaper>
    </div>
  );
};

export default Home;
