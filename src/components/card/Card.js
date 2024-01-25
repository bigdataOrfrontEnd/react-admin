import React, { useState } from "react";
import "./card.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion } from "framer-motion";
export default function Card(props) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      {expanded ? (
        <ExpandedCard parma={props} setExpanded={() => setExpanded(false)} />
      ) : (
        <Contard prams={props} setExpanded={() => setExpanded(true)} />
      )}
    </>
  );
}
//页面显示的渲染
function Contard(props) {
  return (
    <motion.div
      className="card"
      onClick={props.setExpanded}
      style={{
        background: props?.prams?.color?.backGround,
        boxShadow: props?.prams?.color?.boxShadow,
      }}
    >
      <div className="cardItem">11</div>
    </motion.div>
  );
}
//点击放大后的渲染
function ExpandedCard(props) {
  return (
    <motion.div className="excard" onClick={props.setExpanded}>
      22
    </motion.div>
  );
}
