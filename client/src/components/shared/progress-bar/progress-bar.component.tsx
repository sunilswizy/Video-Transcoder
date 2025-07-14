interface ProgressBarPros {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarPros> = ({ progress }) => {
  return (
    <div className="flex h-10 w-full flex-col gap-2">
      <div className="text-xs text-gray-500">
        {progress === 100 ? 'Completed' : 'Uploading...'} {progress}%
      </div>
      <progress value={progress} max="100"></progress>
    </div>
  );
};

export default ProgressBar;
