import React from "react";
import { useChannels } from "../../context/ChannelsContext";

const SecondTab = () => {
  const { channels } = useChannels();

  const allChannels = channels.map((channel) => {
    return (
      <div key={channel.id}>
        <div>{channel.name}</div>
        <div>{channel?.budget?.allocation}</div>
        <div>{channel?.budget?.baseline}</div>
      </div>
    );
  });

  return <div>{allChannels}</div>;
};

export default SecondTab;
