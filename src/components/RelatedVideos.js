import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { YT_API_KEY } from "../utils/constants";

const RelatedVideos = ({ videoId, videoTitle, channelId }) => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (videoId) {
      getRelatedVideos(videoId, videoTitle, channelId);
    }
  }, [videoId, videoTitle, channelId]);

  const getRelatedVideos = async (id, title, channel) => {
    try {
      // Try relatedToVideoId (may fail)
      let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&relatedToVideoId=${id}&maxResults=10&key=${YT_API_KEY}`;
      let res = await fetch(url);
      let json = await res.json();

      // If it fails, fallback to music search
      if (json.error || !json.items?.length) {
        console.warn("relatedToVideoId failed, falling back to music search...");

        url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=10&q=${encodeURIComponent(
          title + " music"
        )}&maxResults=10&key=${YT_API_KEY}`;
        res = await fetch(url);
        json = await res.json();

        // If still empty, fallback to channel uploads
        if (!json.items?.length && channel) {
          console.warn("No music results, fetching from same channel...");
          url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&channelId=${channel}&maxResults=10&key=${YT_API_KEY}`;
          res = await fetch(url);
          json = await res.json();
        }
      }

      setRelated(json.items || []);
    } catch (err) {
      console.error("Error fetching related videos:", err);
    }
  };

  return (
    <div>
      <h3 className="font-bold mb-2">Related Videos</h3>
      {related.map((video, idx) => {
        const vidId = video.id?.videoId || `related-${idx}`;
        return (
          <Link
            key={vidId}
            to={`/watch?v=${vidId}`}
            className="flex mb-3 hover:bg-gray-100 rounded-lg p-1 transition"
          >
            <img
              className="w-40 h-24 rounded-lg object-cover"
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
            />
            <div className="ml-2 overflow-hidden">
              <p className="text-sm font-semibold line-clamp-2">
                {video.snippet.title}
              </p>
              <p className="text-xs text-gray-500">
                {video.snippet.channelTitle}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default RelatedVideos;
