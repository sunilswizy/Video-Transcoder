import { type FileWithStatus } from '../../enums/files.types';
import ImageFrame from '../shared/image-frame/image-frame.component';

interface ImageGalleryProps {
  files: FileWithStatus[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ files }) => {
  return (
    <div className="xl:grid-cols-auto-fit grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-10">
      {files
        .filter((file) => file.downloadURL)
        .map(({ file }, idx) => (
          <ImageFrame file={file} key={idx} />
        ))}
    </div>
  );
};

export default ImageGallery;
