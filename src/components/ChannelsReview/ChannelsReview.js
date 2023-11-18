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

  const channelsTitles = channels.map((channel) => {
    return (
      <div key={channel.id} className="channels-titles">
        <img src={channelIcon} alt={channel.name} />
        {channel.name}
      </div>
    );
  });

  const channelValues = channels.map((channel) => {
    return channel.budget.distribution.map((value, index) => {
      return (
        <div key={channel.id} className="channels-value">
          ${value.value}
        </div>
      );
    });
  });

  const monthsTable = months.map((month, index) => {
    return (
      <p key={index} className="months gray-title">
        {month}
      </p>
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
    <div className="channels-container">
      <div
        className="channels-titles-container"
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "repeat-y",
          backgroundPositionX: "right",
        }}
      >
        <p className="gray-title">CHANNEL</p>

        {channelsTitles}
      </div>
      <div className="channels-data-grid-container">
        {!isSlideLeft && (
          <img
            src={smallArrow}
            alt="arrow"
            className="arrow left"
            onClick={() => onSlide("left")}
          />
        )}

        <div
          className={
            isSlideLeft
              ? "channels-data-grid slide-left"
              : "channels-data-grid slide-right"
          }
        >
          {monthsTable}
          {channelValues}
        </div>

        {isSlideLeft && (
          <img
            src={smallArrow}
            alt="arrow"
            className="arrow"
            onClick={() => onSlide("right")}
          />
        )}
      </div>
    </div>
  );
};

export default ChannelsReview;
