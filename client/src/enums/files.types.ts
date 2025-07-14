export enum FileUploadState {
    pending = 'pending',
    uploading = 'uploading',
    uploaded = 'uploaded'
};

export interface FileWithStatus {
    file: File;
    status: FileUploadState;
    downloadURL?: string;
};
