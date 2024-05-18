import ProgressBar from '@ramonak/react-progress-bar';
import React, { useEffect } from 'react';
import * as variables from '../../app/shared/colorVariables';

const BHabitProgress = ({ number, setNumber, timeDiff, limit, setLimit }) => {
  const calculateNearestInterval = (diffInMs) => {
    const intervals = ['1h', '1d', '2d', '1w', '2w', '1m', '3m', '6m', '1y'];

    const totalMinutes = Math.floor(diffInMs / (1000 * 60));

    const nearestInterval = intervals.reduce(
      (prev, curr) => {
        const [, value, unit] = curr.match(/(\d+)([hdwmy])/);
        const intValue = parseInt(value);
        let intervalMinutes = 0;

        switch (unit) {
          case 'h':
            intervalMinutes = intValue * 60;
            break;
          case 'd':
            intervalMinutes = intValue * 60 * 24;
            break;
          case 'w':
            intervalMinutes = intValue * 60 * 24 * 7;
            break;
          case 'm':
            intervalMinutes = intValue * 60 * 24 * 30;
            break;
          case 'y':
            intervalMinutes = intValue * 60 * 24 * 365;
            break;
          default:
            break;
        }

        if (intervalMinutes >= totalMinutes && intervalMinutes < prev.intervalMinutes) {
          return { interval: curr, intervalMinutes };
        }

        return prev;
      },
      { interval: '', intervalMinutes: Infinity },
    );

    const percentage = ((totalMinutes / nearestInterval.intervalMinutes) * 100).toFixed(2);

    setNumber(percentage);
    setLimit(nearestInterval.interval);
  };

  useEffect(() => {
    calculateNearestInterval(timeDiff);
  }, [timeDiff]);

  return (
    <div className='progress-content'>
      <span>{limit}</span>
      <ProgressBar
        completed={number}
        maxCompleted={100}
        bgColor={variables.GREEN}
        baseBgColor={variables.WHITE}
        isLabelVisible={false}
        animateOnRender={true}
      />
    </div>
  );
};

export default BHabitProgress;
