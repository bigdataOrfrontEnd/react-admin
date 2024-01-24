import "./App.css";
import MainDash from "./components/main/MainDash";
import RightSide from "./components/right/RightSide";
import SiderBar from "./components/sider/SiderBar";

function App() {
  return (
    <div className="App">
      <div className="AppGlass">
        <SiderBar />
        <MainDash />
        <RightSide />
      </div>
    </div>
  );
}

export default App;
