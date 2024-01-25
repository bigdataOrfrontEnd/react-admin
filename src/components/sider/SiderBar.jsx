import React from "react";
import { UilBars } from "@iconscout/react-unicons";
import Logo from '../../imgs/logo.png'
import { motion } from "framer-motion";
import './siderbar.css'
export default function SiderBar() {
  return <div>
    {/* <div>
      <UilBars/>
    </div> */}
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
        {/* signoutIcon */}
      </div>


    </motion.div>
  </div>;
}
