import React from "react";
import channelIcon from "../../assets/images/channel.svg";
import background from "../../assets/images/channels-view-background.svg";
import { months } from "../../features/budgetsSlice";
import smallArrow from "../../assets/images/small-arrow.svg";
import { useSelector } from "react-redux";

import "./ChannelsReview.css";

const ChannelsReview = () => {
  const channels = useSelector((state) => state.channelReducer.channels);
  const budgetDistributions = useSelector(
    (state) => state.budgetDistributionsReducer.budgetDistributions
  );

  const getChannelValues = (channel) => {
    return budgetDistributions
      .find((distribution) => distribution.budgetId === channel.budgetId)
      .distribution.map((value, index) => {
        return <td>${value.value}</td>;
      });
  };

  const tableValues = channels.map((channel) => {
    return (
      <tr>
        <td
          className="channel-title"
          style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "repeat-y",
            backgroundPositionX: "right",
            borderRight: "2px solid #b2bbd550",
          }}
        >
          <img src={channelIcon} alt={channel?.name} />
          {channel?.name}
        </td>
        {getChannelValues(channel)}
      </tr>
    );
  });

  const monthsHeaders = months.map((month, index) => {
    return (
      <th key={index} className="months gray-title">
        {month}
      </th>
    );
  });

  return (
    <table className="channels-table">
      <thead>
        <th
          style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "repeat-y",
            backgroundPositionX: "right",
            borderRight: "2px solid #b2bbd550",
          }}
        >
          Channel
        </th>
        {monthsHeaders}
      </thead>
      <tbody>{tableValues}</tbody>
    </table>
  );
};

export default ChannelsReview;
