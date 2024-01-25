import React from "react";
import Cards from "../cards/Cards";
import "./main.css";
export default function MainDash() {
  return (
    <div className="MainDash">
      <h1>Dashboard</h1>
      <Cards />
      <div>显示答案</div>
    </div>
  );
}
