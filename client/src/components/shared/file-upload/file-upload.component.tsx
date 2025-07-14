import { useState } from 'react';
import { videoIcon } from '../../../assets/images';

interface IFileUploadProps {
  onFileChange: (files: File[]) => void;
}

const FileUpload: React.FC<IFileUploadProps> = ({ onFileChange }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files?.length) {
      onFileChange(Array.from(e.dataTransfer.files));
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      onFileChange(Array.from(e.target.files));
    }
  };

  return (
    <div
      className={`relative h-full w-full border-2 border-dashed ${
        isDragging ? 'border-blue-700 bg-blue-100' : 'border-blue-500'
      } cursor-pointer border-blue-500`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="file-upload"
        multiple
        accept=".mp4, .mkv"
        onChange={handleFileChange}
        className="absolute top-0 left-0 z-20 h-full w-full cursor-pointer opacity-0"
        title=""
      />
      <div className="align-center absolute top-0 bottom-0 flex h-full w-full flex-col justify-center gap-2">
        <div className="align-center relative flex justify-center">
          <img
            src={videoIcon}
            className={`z-10 h-8 w-8 transition-transform duration-300 ease-in-out ${isDragging ? '-translate-y-3' : ''} sm:h-10 sm:w-10 lg:h-15 lg:w-15`}
            alt="image-icon"
          />
          <img
            src={videoIcon}
            className={`absolute top-0 bottom-0 z-5 h-8 w-8 scale-90 grayscale filter transition-transform duration-300 ease-in-out ${isDragging ? '-translate-y-2 translate-x-10 rotate-45' : ''} sm:h-10 sm:w-10 lg:h-15 lg:w-15`}
            alt="image-icon"
          />
          <img
            src={videoIcon}
            className={`absolute top-0 bottom-0 z-5 h-8 w-8 scale-90 grayscale filter transition-transform duration-300 ease-in-out ${isDragging ? '-translate-x-10 -translate-y-2 -rotate-45' : ''} sm:h-10 sm:w-10 lg:h-15 lg:w-15`}
            alt="image-icon"
          />
        </div>
        <p className="text-center text-sm font-semibold text-gray-500 lg:text-base">Drop your video here or browse</p>
        <p className="text-center text-xs font-semibold text-gray-300 lg:text-sm">supports mp4, mkv</p>
      </div>
    </div>
  );
};

export default FileUpload;
