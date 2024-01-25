import React from "react";
import Card from "../card/Card";
import "./cards.css";
import { cardsData } from "../../Data/Data";
export default function Cards() {
  return (
    <div className="cards">
      {cardsData.map((card, index) => {
        return (
          <Card
            title={card.title}
            color={card.color}
            barValue={card.barValue}
            value={card.value}
            png={card.png}
            series={card.series}
            key={index}
          />
        );
      })}
    </div>
  );
}
