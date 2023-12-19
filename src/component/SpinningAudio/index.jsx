import React from "react";

const SpinningAudio = ({ audioFile, audioRef }) => {
  return (
    <div style={{ backgroundColor: "red" }}>
      <audio ref={audioRef} src={audioFile} />
    </div>
  );
};

export default SpinningAudio;
