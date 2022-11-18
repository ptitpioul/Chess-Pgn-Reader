import "./App.css";
import { useState } from "react";
import ImageInput from "./components/ImageInput";
import RectangleDrawer from "./components/RectangleDrawer";
import { useStrictMode } from "react-konva";
import OCR from "./components/OCR";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Column = styled.div`
  width: 40%;
  min-width: 480px;
`;

useStrictMode(true);
function App() {
  const [PGNImage, setPGNImage] = useState([]);
  const [annotations, setAnnotations] = useState([]);

  return (
    <div className="App">
      <ImageInput PGNImage={PGNImage} setPGNImage={setPGNImage} />
      <Container>
        <Column>
          <RectangleDrawer
            imageList={PGNImage}
            annotations={annotations}
            setAnnotations={setAnnotations}
          />
        </Column>
        <Column>
          <OCR PGNImage={PGNImage[0]?.data_url} annotations={annotations} />
        </Column>
      </Container>
    </div>
  );
}

export default App;
