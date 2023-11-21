import React from "react";
import Channel from "../Channel/Channel";
import { useSelector, useDispatch } from "react-redux";

const FirstTab = () => {
  const channels = useSelector((state) => state.channelReducer.channels);
  const dispatch = useDispatch();

  const setChannelBudget = (channelId, budget) => {
    dispatch(setChannelBudget(channelId, budget));
  };

  const allChannels = channels.map((channel) => {
    return (
      <Channel
        key={channel.id}
        channel={channel}
        setChannelBudget={(channelId, budget) =>
          setChannelBudget(channelId, budget)
        }
      />
    );
  });

  return <div>{allChannels}</div>;
};

export default FirstTab;
