import { VideoIcon } from "lucide-react";

function CallButton({ handleVideoCall }) {
  return (
    <div className="absolute top-4 right-6 z-10">
      <button
        onClick={handleVideoCall}
        className="btn btn-success btn-sm text-white"
      >
        <VideoIcon className="size-6" />
      </button>
    </div>
  );
}

export default CallButton;
