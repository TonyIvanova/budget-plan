import { createSlice } from "@reduxjs/toolkit";
import { createNewBudget } from "./budgetsSlice";
import { createNewDistribution } from "./budgetDistributionsSlice";

const initialState = {
  channels: [],
};
 
export const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    addChannel: (state, action) => {
      state.channels = state.channels.map((channel) => {
        channel.isOpen = false;
        return channel;
      });
      state.channels.push(action.payload);
    },

    removeChannel: (state, action) => {
      state.channels = state.channels.filter(
        (channel) => channel.id !== action.payload
      );
    },

    toggleChannel: (state, action) => {
      const channels = state.channels.map((channel) => {
        if (channel.id === action.payload) {
          return {
            ...channel,
            isOpen: !channel.isOpen,
          };
        } else {
          return {
            ...channel,
            isOpen: false,
          };
        }
      });
      state.channels = channels;
    },
  },
});

export const addChannelAndCreateBudgetAndDistribution = (newChannel) => {
  return (dispatch, getState) => {
    dispatch(addChannel(newChannel));
    dispatch(
      createNewBudget({
        budgetId: newChannel.budgetId,
        channelId: newChannel.id,
      })
    );
    dispatch(createNewDistribution({ budgetId: newChannel.budgetId }));
  };
};

export const { addChannel, removeChannel, toggleChannel } =
  channelsSlice.actions;

export default channelsSlice.reducer;
