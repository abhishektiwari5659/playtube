import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from 'react-router-dom';
import { YT_API_KEY } from '../utils/constants';
import RelatedVideos from './RelatedVideos';

const WatchPage = () => {
  const [search] = useSearchParams();
  const [videoDetails, setVideoDetails] = useState(null);
  const dispatch = useDispatch();

  const videoId = search.get("v");

  useEffect(() => {
    dispatch(closeMenu());
    if (videoId) fetchVideoDetails();
  }, [videoId]);

  const fetchVideoDetails = async () => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${YT_API_KEY}`
      );
      const json = await res.json();

      if (json.error) {
        console.error("YouTube API Error:", json.error);
        return;
      }

      setVideoDetails(json.items[0]);
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  };

  return (
    <div className="flex">
      <div className="flex-1 px-6 pt-2">
        {/* Main video player */}
        <iframe
          key={videoId} // Forces reload on videoId change
          className="rounded-lg w-full h-[500px]"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>

        {/* Video details */}
        {videoDetails && (
          <div className="mt-4">
            <h2 className="text-xl font-bold">{videoDetails.snippet.title}</h2>
            <p className="text-gray-600">{videoDetails.snippet.channelTitle}</p>
            <p className="text-sm text-gray-500 mt-2">
              {Number(videoDetails.statistics.viewCount).toLocaleString()} views •{" "}
              {Number(videoDetails.statistics.likeCount).toLocaleString()} likes
            </p>
          </div>
        )}
      </div>

      {/* Related videos sidebar */}
      <div className="w-[400px] pr-6 pt-2">
        <RelatedVideos videoId={videoId} videoTitle={videoDetails?.snippet.title} channelId={videoDetails?.snippet.channelId} />
      </div>
    </div>
  );
};

export default WatchPage;
