import { useState } from 'react';
import FileUpload from '../shared/file-upload/file-upload.component';
import ImageGallery from '../image-gallery/image-gallery.component';
import { FileUploadState, type FileWithStatus } from '../../enums/files.types';
import ProgressBar from '../shared/progress-bar/progress-bar.component';

const HomeComponent = () => {
  const [files, setFiles] = useState<FileWithStatus[]>([]);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [ uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [totalProgress, setTotalProgress] = useState(0);

  const onFileChange = async (files: File[]) => {
    const newFiles: FileWithStatus[] = files.map((file) => {
      return {
        file,
        status: FileUploadState.pending,
      };
    });

    setIsFileUploading(true);
    setUploadProgress({});



    setIsFileUploading(false);
    setUploadProgress({});
  };

  return (
    <div className="flex w-full flex-col items-center justify-center pt-20">
      <div className="flex h-45 w-65 flex-col gap-2 sm:h-50 sm:w-95 lg:h-70 lg:w-140">
        <div className="h-[80%]">
          <FileUpload onFileChange={onFileChange} />
        </div>
        <div className="h-[20%]">{isFileUploading && <ProgressBar progress={totalProgress} />}</div>
      </div>

      <div className="flex pt-10 pr-25 pb-10 pl-25">
        <ImageGallery files={files} />
      </div>
    </div>
  );
};

export default HomeComponent;
