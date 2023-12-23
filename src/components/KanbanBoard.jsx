// src/components/KanbanBoard.js
import React, { useState, useEffect } from "react";
import { fetchData } from "../api";
import TicketCard from "./TicketCard";

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [displayedTickets, setDisplayedTickets] = useState([]);
  const [selectedGrouping, setSelectedGrouping] = useState("status");
  const [selectedOrdering, setSelectedOrdering] = useState("priority");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await fetchData();
        const initialGroupedTickets = groupTickets(data.tickets, selectedGrouping, selectedOrdering);
        setTickets(data.tickets);
        setUsers(data.users);
        setDisplayedTickets(initialGroupedTickets);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error
      }
    };

    fetchTickets();
  }, [selectedGrouping, selectedOrdering]);

  const groupTickets = (items, grouping, ordering) => {
    let groupedTickets = [];

    if (grouping === "status") {
      groupedTickets = groupBy(items, "status");
    } else if (grouping === "user") {
      groupedTickets = groupByUser(items);
    } else if (grouping === "priority") {
      groupedTickets = groupByPriority(items);
    }

    if (ordering === "priority") {
      sortGroupedTickets(groupedTickets, "priority");
    } else if (ordering === "title") {
      sortGroupedTickets(groupedTickets, "title");
    }

    return groupedTickets;
  };

  const groupBy = (items, key) => {
    return items.reduce((acc, item) => {
      const group = item[key];
      acc[group] = acc[group] || [];
      acc[group].push(item);
      return acc;
    }, {});
  };

  const groupByUser = (items) => {
    return items.reduce((acc, item) => {
      const user = getUserById(item.userId);
      const userName = user ? user.name : "Unknown User";
      acc[userName] = acc[userName] || [];
      acc[userName].push(item);
      return acc;
    }, {});
  };

  const groupByPriority = (items) => {
    return items.reduce((acc, item) => {
      const priority = item.priority;
      acc[priority] = acc[priority] || [];
      acc[priority].push(item);
      return acc;
    }, {});
  };

  const sortGroupedTickets = (groupedTickets, sortBy) => {
    Object.keys(groupedTickets).forEach((key) => {
      if (Array.isArray(groupedTickets[key])) {
        groupedTickets[key].sort((a, b) =>
          sortBy === "priority" ? b[sortBy] - a[sortBy] : a[sortBy].localeCompare(b[sortBy])
        );
      }
    });
  };

  const getUserById = (userId) => {
    return users.find((user) => user.id === userId);
  };

  return (
    <div className="container mx-auto p-8">
      {/* Dropdowns */}
      <div className="flex space-x-4 mb-4">
        <div>
          <label htmlFor="grouping" className="text-gray-700">
            Grouping:
          </label>
          <select
            id="grouping"
            value={selectedGrouping}
            onChange={(e) => setSelectedGrouping(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          >
            <option value="status">Status</option>
            <option value="user">User</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        <div>
          <label htmlFor="ordering" className="text-gray-700">
            Ordering:
          </label>
          <select
            id="ordering"
            value={selectedOrdering}
            onChange={(e) => setSelectedOrdering(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          >
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>

      {/* Displayed Tickets */}
      <div>
        {Object.keys(displayedTickets).map((group, index) => (
          <div key={index}>
            <h2 className="text-2xl font-bold mb-4">{group}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {(Array.isArray(displayedTickets[group]) ? displayedTickets[group] : []).map(
                (ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} user={getUserById(ticket.userId)} />
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
