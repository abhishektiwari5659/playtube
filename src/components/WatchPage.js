import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeMenu } from '../utils/appSlice';
import { useSearchParams } from 'react-router-dom';
import { YT_API_KEY } from '../utils/constants';

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
      const data = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${YT_API_KEY}`
      );
      const json = await data.json();
      setVideoDetails(json.items[0]);
    } catch (error) {
      console.error("Error fetching video details:", error);
    }
  };

  return (
    <div>
      <div className="pl-6 pt-2 mx-6">
        <iframe
  className="rounded-lg"
  width="1000"
  height="500"
  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`}
  title="YouTube video player"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  referrerPolicy="strict-origin-when-cross-origin"
  allowFullScreen
></iframe>

      </div>

      {videoDetails && (
        <div className="pl-12 mt-4">
          <h2 className="text-xl font-bold">{videoDetails.snippet.title}</h2>
          <p className="text-gray-600">{videoDetails.snippet.channelTitle}</p>
          <p className="text-sm text-gray-500 mt-2">
            {videoDetails.statistics.viewCount} views •{" "}
            {videoDetails.statistics.likeCount} likes
          </p>
        </div>
      )}
    </div>
  );
};

export default WatchPage;
