import { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import { map, split } from "lodash";
import "../App.css";

const formatToRectangles = (annotations) => {
  return map(annotations, ({ x, y, width, height }) => ({
    left: x,
    top: y,
    width,
    height,
  }));
};

const formatMoves = (whiteMoves, blackMoves) => {
  return map(blackMoves, (move, key) => whiteMoves[key] + "  -  " + move);
};
export default function OCR({ PGNImage, annotations }) {
  const [ocr, setOcr] = useState([]);
  const [progress, setProgress] = useState(0);

  const worker = createWorker({
    langPath: "..",
    gzip: false,
    logger: (m) => {
      setProgress(parseInt((m.progress * 100) as any));
    },
  });
  const convertImageToText = async () => {
    if (!PGNImage) return;
    const rectangles = formatToRectangles(annotations);
    await worker.load();
    await worker.loadLanguage("LCDDot_FT_500");
    await worker.initialize("LCDDot_FT_500");
    await worker.setParameters({
      tessedit_char_whitelist: "|iIXPBRNQKabcdefghx012345678+-O",
    });
    const values = [];
    for (let i = 0; i < rectangles.length; i++) {
      const {
        data: { text },
      } = await worker.recognize(PGNImage, { rectangle: rectangles[i] });
      values.push(text);
    }
    const formatedMoves = formatMoves(
      split(values[0], "\n"),
      split(values[1], "\n")
    );
    setOcr(formatedMoves);
    await worker.terminate();
  };

  useEffect(() => {
    if (annotations.length == 2) {
      convertImageToText();
    }
  }, [PGNImage, annotations]);

  return (
    <div>
      {progress < 100 && progress > 0 && (
        <div>
          <div className="progress-label">Progress ({progress}%)</div>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}
      <div className="display-flex">
        <ol>
          {map(ocr, (move, key) => (
            <li key={key}>{move}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
