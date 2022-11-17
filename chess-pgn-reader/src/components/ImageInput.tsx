import ImageUploading, { ImageListType } from "react-images-uploading";
export default function ImageInput({ PGNImage, setPGNImage }) {
  const onChange = (imageList) => {
    // data for submit
    setPGNImage(imageList);
  };
  return (
    <ImageUploading
      multiple={false}
      value={PGNImage}
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
        </div>
      )}
    </ImageUploading>
  );
}
