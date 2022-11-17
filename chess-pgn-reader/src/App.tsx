import "./App.css";
import { useState } from "react";
import ImageInput from "./components/ImageInput";
import RectangleDrawer from "./components/RectangleDrawer";
import { useStrictMode } from "react-konva";
import OCR from "./components/OCR";

useStrictMode(true);
function App() {
  const [PGNImage, setPGNImage] = useState([]);
  const [annotations, setAnnotations] = useState([]);

  return (
    <div className="App">
      <ImageInput PGNImage={PGNImage} setPGNImage={setPGNImage} />
      <RectangleDrawer
        imageList={PGNImage}
        annotations={annotations}
        setAnnotations={setAnnotations}
      />
      <OCR PGNImage={PGNImage[0]?.data_url} annotations={annotations} />
    </div>
  );
}

export default App;
