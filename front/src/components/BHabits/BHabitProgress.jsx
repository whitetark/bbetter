import ProgressBar from '@ramonak/react-progress-bar';
import React, { useEffect } from 'react';
import * as variables from '../../app/shared/colorVariables';

const BHabitProgress = ({ number, setNumber, timeDiff, limit, setLimit }) => {
  const calculateNearestInterval = (diffInMs) => {
    const intervals = ['1h', '1d', '2d', '1w', '2w', '1m', '3m', '6m', '1y'];

    const totalMinutes = Math.floor(diffInMs / (1000 * 60));
    const nearestInterval = intervals.reduce(
      (prev, curr) => {
        const [value, unit] = curr.split('');
        let diff = 0;
        switch (unit) {
          case 'h':
            diff = Math.abs(totalMinutes - parseInt(value) * 60);
            break;
          case 'd':
            diff = Math.abs(totalMinutes - parseInt(value) * 60 * 24);
            break;
          case 'w':
            diff = Math.abs(totalMinutes - parseInt(value) * 60 * 24 * 7);
            break;
          case 'm':
            diff = Math.abs(totalMinutes - parseInt(value) * 60 * 24 * 30);
            break;
          case 'y':
            diff = Math.abs(totalMinutes - parseInt(value) * 60 * 24 * 365);
            break;
          default:
            break;
        }
        return diff < prev.diff ? { interval: curr, diff } : prev;
      },
      { interval: '', diff: Infinity },
    );

    let forMath = 0;
    if (nearestInterval?.interval.includes('h')) {
      forMath = 60;
    } else if (nearestInterval?.interval.includes('d')) {
      forMath = 24 * 60;
    } else if (nearestInterval?.interval.includes('w')) {
      forMath = 7 * 24 * 60;
    } else if (nearestInterval?.interval.includes('m')) {
      forMath = 30 * 24 * 60;
    } else if (nearestInterval?.interval.includes('y')) {
      forMath = 365 * 24 * 60;
    }

    const nearestIntervalMinutes = parseInt(nearestInterval.interval) * forMath;
    const percentage =
      ((nearestIntervalMinutes - nearestInterval.diff) / nearestIntervalMinutes) * 100;

    setNumber(percentage.toFixed(2));
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
