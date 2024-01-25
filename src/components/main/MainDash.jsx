import React from "react";
import Cards from "../cards/Cards";
import "./main.css";
export default function MainDash() {
  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      <Cards />
      <div>table</div>
    </div>
  );
}
