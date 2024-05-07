import React, { useEffect } from 'react';

const BHabitClock = ({ timeDiff, setTimeDiff, issueDate }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      const difference = Math.floor(currentTime - new Date(issueDate));
      setTimeDiff(difference);
    }, 1000);

    return () => clearInterval(interval);
  }, [issueDate]);

  const formatTimeDifference = (difference) => {
    const days = Math.floor(difference / (24 * 60 * 60 * 1000));
    const daysms = difference % (24 * 60 * 60 * 1000);
    const hours = Math.floor(daysms / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 3600)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

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
