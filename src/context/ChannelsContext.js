import React, { useState, useContext } from "react";

const ChannelsContext = React.createContext();
const UpdateChannelsContext = React.createContext();

export const useChannels = () => {
  return useContext(ChannelsContext);
};

export const useUpdateChannels = () => {
  return useContext(UpdateChannelsContext);
};

export const ChannelsProvider = ({ children }) => {
  const [channels, setChannels] = useState([
    { name: "Paid Reviews", id: 1, isOpen: true }, // should store channel budget as well
  ]);

  const setChannelBudget = (channelId, budget) => {
    // We need to update all channels to be able to access the data in tab 2
    const updatedChannels = channels.map((channel) => {
      if (channel.id === channelId) {
        channel = { ...channel, budget: budget };
      }
      return channel;
    });

    setChannels(updatedChannels);
  };

  const addChannel = (newChannel) => {
     const updatedChannels = channels.map((channel) => {
       channel = { ...channel, isOpen: false };
       return channel;
     });
     setChannels([...updatedChannels, newChannel]);

  };

  const toggleChannel = (channelId) => {
    if (channels.find((channel) => channel.id === channelId).isOpen) {
      closeAll();
    } else {
      openChannel(channelId);
    }
  };

  const openChannel = (channelId) => {
    const updatedChannels = channels.map((channel) => {
      channel =
        channel.id === channelId
          ? { ...channel, isOpen: true }
          : { ...channel, isOpen: false };
      return channel;
    });
    setChannels(updatedChannels);
  };

  const closeAll = () => {
    const updatedChannels = channels.map((channel) => {
      channel = { ...channel, isOpen: false };
      return channel;
    });
    setChannels(updatedChannels);
  };

  return (
    <ChannelsContext.Provider
      value={{ channels, addChannel, toggleChannel, setChannelBudget }}
    >
      {children}
    </ChannelsContext.Provider>
  );
};
