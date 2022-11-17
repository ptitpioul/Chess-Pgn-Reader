import { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import { map, head } from "lodash";
import "../App.css";

const formatToRectangles = (annotations) => {
  return map(annotations, ({ x, y, width, height }) => ({
    left: x,
    top: y,
    width,
    height,
  }));
};

export default function OCR({ PGNImage, annotations }) {
  const [ocr, setOcr] = useState("");
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
    const rectangle = head(rectangles);
    console.log(annotations, rectangles, rectangle);
    await worker.load();
    await worker.loadLanguage("LCDDot_FT_500");
    await worker.initialize("LCDDot_FT_500");
    const {
      data: { text },
    } = await worker.recognize(PGNImage, { rectangle });
    setOcr(text);
    await worker.terminate();
  };

  useEffect(() => {
    if (annotations.length > 0) {
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
        <p>{ocr}</p>
      </div>
    </div>
  );
}
