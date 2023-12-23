import React from "react";

const TicketCard = ({ ticket, user }) => {
  const getStatusIcon = (status) => {
    const iconProps = {
      stroke: "currentColor",
      fill: "none",
      strokeWidth: "2",
      viewBox: "0 0 24 24",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: "icon rounded-full",
      height: "1em",
      width: "1em",
      xmlns: "http://www.w3.org/2000/svg",
      style: { color: "white" },
    };

    switch (status) {
      case "Todo":
        return (
          <svg {...iconProps}>
            <path d="M12 20h.01"></path>
            <path d="M7 20v-4"></path>
            <path d="M12 20v-8"></path>
          </svg>
        );
      case "In progress":
        return (
          <svg {...iconProps}>
            <path d="M21 12.999L19 10 13 15 8 11.999 6 14"></path>
          </svg>
        );
      case "Backlog":
        return (
          <svg {...iconProps}>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-6h2zm0-8h-2v-2h-2v-2h2v4h2z"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="ticket-main border p-4 rounded-lg shadow-md bg-opacity-30 backdrop-blur-lg backdrop-filter backdrop-blur bg-gray-800 text-white">
      <div className="top-line flex items-center justify-between mb-4">
        <span className="text-xl font-bold">{ticket.id}</span>
        <div className="user-icon" style={{ backgroundColor: "#2f4053" }}>
          <div>{user ? user.name[0].toUpperCase() : "U"}</div>
          <div
            className={`available-icon ${
              user && user.available ? "bg-green-500" : "bg-gray-500"
            } rounded-full`}
          ></div>
        </div>
      </div>
      <div className="middle-line mb-4">
        <p className="text-lg font-semibold">{ticket.title}</p>
      </div>
      <div className="bottom-line flex items-center justify-between">
        <div className="icon-wrapper flex items-center">
          {getStatusIcon(ticket.status)}
        </div>
        <div className="tag-wrapper flex items-center ml-2">
          {ticket.tag.map((tag, index) => (
            <div key={index} className="tag flex items-center">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 256 256"
                className="icon rounded-full"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: "gray", marginRight: "4px" }}
              >
                <path d="M232,128A104,104,0,1,1,128,24,104.13,104.13,0,0,1,232,128Z"></path>
              </svg>
              <div>{tag}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TicketCard;
