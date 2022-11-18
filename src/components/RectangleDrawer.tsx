import { useState } from "react";
import { Stage, Layer, Rect, Image as KonvaImage } from "react-konva";
import { map, filter } from "lodash";

export default function RectangleDrawer({
  imageList,
  annotations,
  setAnnotations,
}) {
  const [newAnnotation, setNewAnnotation] = useState([]);
  const handleMouseDown = (event) => {
    if (newAnnotation.length === 0) {
      const { x, y } = event.target.getStage().getPointerPosition();
      setNewAnnotation([{ x, y, width: 0, height: 0 }]);
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
      };
      setNewAnnotation([]);
      setAnnotations([...annotations, annotationToAdd]);
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
        },
      ]);
    }
  };
  const annotationsToDraw = [...annotations, ...newAnnotation];

  const removeFromAnnotations = (key) => {
    const newAnnotations = filter(annotations, (_, index) => index !== key);
    console.log(annotations, newAnnotations);
    setAnnotations(newAnnotations);
  };
  const PGN = new Image(); // Image constructor
  PGN.src = imageList[0]?.data_url || "";
  return (
    <Stage
      width={PGN?.width}
      height={PGN?.height}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <Layer>
        <KonvaImage image={PGN} />
        {map(annotationsToDraw, (value, key) => {
          return (
            <Rect
              key={key}
              x={value.x}
              y={value.y}
              width={value.width}
              height={value.height}
              fill="transparent"
              stroke="black"
              onClick={() => removeFromAnnotations(key)}
            />
          );
        })}
      </Layer>
    </Stage>
  );
}
