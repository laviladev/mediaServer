import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const LiveStream = () => {
  const videoRef = useRef(null);

  const streamName = 'STREAM_NAME'

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(`http://localhost:8000/live/${streamName}/index.m3u8`);
      hls.attachMedia(videoRef.current);
    } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
      // Para Safari
      videoRef.current.src = `http://localhost:8000/live/${streamName}/index.m3u8`;
    }
  }, []);

  return <video ref={videoRef} controls autoPlay />;
};

export default LiveStream
