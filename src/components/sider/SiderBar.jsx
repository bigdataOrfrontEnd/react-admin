import React, { useState } from "react";
import { UilBars, UilSignOutAlt } from "@iconscout/react-unicons";
import Logo from "../../imgs/logo.png";
import { SidebarData } from "../../Data/Data";
import { motion } from "framer-motion";
import "./siderbar.css";
export default function SiderBar() {
  //控制鼠标选中
  const [select, SetSelect] = useState(0);
  return (
    <div>
      <div className="bar">
        <UilBars />
      </div>
      <motion.div className="sidebar">
        {/* logo */}
        <div className="logo">
          <img src={Logo} alt="logo" />
          <span>
            Sh<span>o</span>ps
          </span>
        </div>
        {/* mennu */}
        <div className="menu">
          {SidebarData.map((item, index) => {
            return (
              <div
                className={select === index ? "active menuItem " : "menuItem"}
                key={index}
                onClick={() => {
                  SetSelect(index);
                }}
              >
                <item.icon />
                <span>{item.heading}</span>
              </div>
            );
          })}
          {/* signoutIcon */}
          <div className="menuItem">
            <UilSignOutAlt />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
