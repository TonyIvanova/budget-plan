import React from "react";
import { useChannels } from "../../context/ChannelsContext";
import channelIcon from "../../assets/images/channel.svg";
import background from "../../assets/images/channels-view-background.svg";
import { months } from "../../context/BudgetContext";
import smallArrow from "../../assets/images/small-arrow.svg";

import "./ChannelsReview.css";

const ChannelsReview = () => {
  const { channels } = useChannels();
  const [isSlideLeft, setIsSlideLeft] = React.useState(true);

  const getChannelValues = (channel) => {
    return channel?.budget?.distribution?.map((value, index) => {
      return <td>${value.value}</td>;
    });
  };

  const tableValues = channels?.map((channel) => {
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

  const onSlide = (where) => {
    if (where === "left") {
      setIsSlideLeft(true);
    } else {
      setIsSlideLeft(false);
    }
  };

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

    // <div className="channels-container">
    //   <div
    //     className="channels-titles-container"
    //     style={{
    //       backgroundImage: `url(${background})`,
    //       backgroundRepeat: "repeat-y",
    //       backgroundPositionX: "right",
    //     }}
    //   >
    //     <p className="gray-title">CHANNEL</p>

    //     {channelsTitles}
    //   </div>
    //   <div className="channels-data-grid-container">
    //     {!isSlideLeft && (
    //       <img
    //         src={smallArrow}
    //         alt="arrow"
    //         className="arrow left"
    //         onClick={() => onSlide("left")}
    //       />
    //     )}

    //     <div
    //       className={
    //         isSlideLeft
    //           ? "channels-data-grid slide-left"
    //           : "channels-data-grid slide-right"
    //       }
    //     >
    //       {monthsTable}
    //       {channelValues}
    //     </div>

    //     {isSlideLeft && (
    //       <img
    //         src={smallArrow}
    //         alt="arrow"
    //         className="arrow"
    //         onClick={() => onSlide("right")}
    //       />
    //     )}
    //   </div>
    // </div>
  );
};

export default ChannelsReview;
