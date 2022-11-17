import "./App.css";
import { useState } from "react";
import ImageInput from "./components/ImageInput";
import RectangleDrawer from "./components/RectangleDrawer";
import { useStrictMode } from "react-konva";

useStrictMode(true);
function App() {
  const [PGNImage, setPGNImage] = useState([]);

  return (
    <div className="App">
      <ImageInput PGNImage={PGNImage} setPGNImage={setPGNImage} />
      <RectangleDrawer imageList={PGNImage} />
    </div>
  );
}

export default App;
