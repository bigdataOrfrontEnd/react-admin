import "./App.css";
import MainDash from "./components/main/MainDash";
import RightSide from "./components/right/RightSide";
import SiderBar from "./components/sider/SiderBar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="AppGlass">
        <SiderBar />
        <Routes>
          <Route path="/" element={<MainDash />}></Route>
          <Route path="/expenss" element={<RightSide />}></Route>
        </Routes>
        {/* <MainDash />  
        <RightSide /> */}
      </div>
    </div>
  );
}

export default App;
