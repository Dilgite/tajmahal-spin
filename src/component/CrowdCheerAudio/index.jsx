import React from "react";

const CrowdCheerAudio = ({ audioFile, audioRef }) => {
  return (
    <div style={{ backgroundColor: "red" }}>
      <audio ref={audioRef} src={audioFile} />
    </div>
  );
};

export default CrowdCheerAudio;
