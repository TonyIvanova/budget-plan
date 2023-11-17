import React from "react";
import Channel from "../Channel/Channel";
import { BudgetProvider } from "../../context/BudgetContext";
import { useChannels } from "../../context/ChannelsContext";

const FirstTab = () => {
  const { channels, setChannelBudget } = useChannels();

  const allChannels = channels.map((channel) => {
    return (
      <BudgetProvider>
        <Channel
          key={channel.id}
          channel={channel}
          setChannelBudget={(channelId, budget) =>
            setChannelBudget(channelId, budget)
          }
        />
      </BudgetProvider>
    );
  });

  return <div>{allChannels}</div>;
};

export default FirstTab;
