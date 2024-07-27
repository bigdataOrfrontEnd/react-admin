import "./App.css";
import MainDash from "./components/main/MainDash";
import RightSide from "./components/right/RightSide";
import SiderBar from "./components/sider/SiderBar";
import Modall from "./components/Modal/index";
import Tabled from "./components/TableED/index";
// import Page from "./components/Tab/index"
// import Page from "./components/Tab/index"//tab切换
// import Page from "./components/TableED/index"//table表格编辑
// import Page from "./components/contex/index"//useContext上下文
import Page from "./components/form/index"; //form表单

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="AppGlass">
        <SiderBar />
        <Routes>
          {/* <Route path="/" element={<Login />}></Route> */}
          <Route path="/login" element={<MainDash />}></Route>
          <Route path="/expenss" element={<RightSide />}></Route>
          <Route path="/modal" element={<Modall />}></Route>
          <Route path="/tabke" element={<Tabled />}></Route>
          <Route path="/page" element={<Page />}></Route>
        </Routes>
        {/* <MainDash />  
        <RightSide /> */}
      </div>
    </div>
  );
}

export default App;
