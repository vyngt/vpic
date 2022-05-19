import { Video } from "../../models";

const VideoElement = ({ video }: { video: Video }) => {
  return (
    <div className="p-2">
      <video width="320" height="240" controls>
        <source src={video.record} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export const VideoRenderer = ({ videos }: { videos: Array<Video> }) => {
  return (
    <div className="d-grid gap-3">
      {videos.map((video) => (
        <VideoElement key={video.id} video={video} />
      ))}
    </div>
  );
};
