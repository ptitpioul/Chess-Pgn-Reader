import { useState } from "react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { map } from "lodash";
export default function Toto() {
  const [image, setImage] = useState<ImageListType>([]);

  const onChange = (imageList) => {
    // data for submit
    setImage(imageList);
  };
  return (
    <ImageUploading
      multiple={false}
      value={image}
      onChange={onChange}
      dataURLKey="data_url"
      acceptType={["jpg", "png", "pdf"]}
    >
      {({
        imageList,
        onImageUpload,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div className="upload__image-wrapper">
          <button
            style={isDragging ? { color: "green" } : {}}
            onClick={onImageUpload}
            {...dragProps}
          >
            Click or Drop here
          </button>
          {map(imageList, (image, index) => (
            <div key={index} className="image-item">
              <img src={image.data_url} alt="" width="500" />
              <div className="image-item__btn-wrapper">
                <button onClick={() => onImageUpdate(index)}>Update</button>
                <button onClick={() => onImageRemove(index)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </ImageUploading>
  );
}
