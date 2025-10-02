export const YT_API_KEY = process.env.REACT_APP_YT_API_KEY;


export const YT_KEY = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=IN&videoCategoryId=10&maxResults=50&key=" + process.env.REACT_APP_YT_API_KEY;


export const YT_SEARCH_SUGGESTION = "https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q="

export const YT_SEARCH_API = 
  "https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=" 
  + "&key=" + process.env.REACT_APP_YT_API_KEY;