import { useState } from "react";
import { Stage, Layer, Rect, Image as KonvaImage } from "react-konva";

export default function RectangleDrawer({ imageList }) {
  const [annotations, setAnnotations] = useState([]);
  const [newAnnotation, setNewAnnotation] = useState([]);

  const handleMouseDown = (event) => {
    if (newAnnotation.length === 0) {
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewAnnotation([{ x, y, width: 0, height: 0, key: "0" }]);
    }
  };

  const handleMouseUp = (event) => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      const annotationToAdd = {
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        key: annotations.length + 1,
      };
      console.log(annotationToAdd);

      annotations.push(annotationToAdd);
      setNewAnnotation([]);
      setAnnotations(annotations);
    }
  };

  const handleMouseMove = (event) => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewAnnotation([
        {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          key: "0",
        },
      ]);
    }
  };
  const annotationsToDraw = [...annotations, ...newAnnotation];

  const PGN = new Image(); // Image constructor
  PGN.src = imageList[0]?.data_url || "";
  return (
    <Stage
      width={500}
      height={800}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <Layer>
        <KonvaImage image={PGN} width={500} height={800} />
        {annotationsToDraw.map((value, key) => {
          return (
            <Rect
              key={key}
              x={value.x}
              y={value.y}
              width={value.width}
              height={value.height}
              fill="transparent"
              stroke="black"
            />
          );
        })}
      </Layer>
    </Stage>
  );
}
