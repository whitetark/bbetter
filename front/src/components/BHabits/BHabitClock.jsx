import React, { useEffect, useState } from 'react';

const BHabitClock = ({ issueDate }) => {
  const [timeDiff, setTimeDiff] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      const difference = Math.floor((currentTime - new Date(issueDate)) / 1000);
      setTimeDiff(difference);
    }, 1000);

    return () => clearInterval(interval);
  }, [issueDate]);

  const formatTimeDifference = (difference) => {
    const days = Math.floor(difference / (3600 * 24));
    const hours = Math.floor(difference / 3600);
    const minutes = Math.floor((difference % 3600) / 60);
    const seconds = difference % 60;

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  return <>{formatTimeDifference(timeDiff)}</>;
};

export default BHabitClock;
