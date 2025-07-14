interface ImageFrameProps {
  file: File;
}

const ImageFrame: React.FC<ImageFrameProps> = ({ file }) => {
  return (
    <div className="h-40 w-full min-w-20 shadow-xl sm:h-45 sm:min-w-25 lg:h-60 lg:min-w-30">
      <img src={URL.createObjectURL(file)} alt={file.name} className="h-full w-full rounded-sm object-cover" />
    </div>
  );
};

export default ImageFrame;
