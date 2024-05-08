import React, { useEffect, useState } from 'react';
import * as Styled from '../../styles/GHabits.styled';

const Checklist = (props) => {
  const data = props.data;

  const [weeks, setWeeks] = useState({
    mon: false,
    tue: false,
    wed: false,
    thu: false,
    fri: false,
    sat: false,
    sun: false,
  });

  useEffect(() => {
    data.forEach((item) => {
      const date = new Date(item.dateOf);
      const day = date.getDay(); // Returns a number from 0 (Sunday) to 6 (Saturday)
      const dayName = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][day];
      setWeeks((prevState) => ({ ...prevState, [dayName]: true }));
    });
  }, [data]);

  const handleChange = (event) => {
    const target = event.target;
    const value = target.checked;
    const name = target.name;

    setWeeks((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <Styled.Checklist>
      <Styled.Input type='checkbox' name='mon' checked={weeks.mon} readOnly />
      <Styled.Input type='checkbox' name='tue' checked={weeks.tue} readOnly />
      <Styled.Input type='checkbox' name='wed' checked={weeks.wed} readOnly />
      <Styled.Input type='checkbox' name='thu' checked={weeks.thu} readOnly />
      <Styled.Input type='checkbox' name='fri' checked={weeks.fri} readOnly />
      <Styled.Input type='checkbox' name='sat' checked={weeks.sat} readOnly />
      <Styled.Input type='checkbox' name='sun' checked={weeks.sun} readOnly />
    </Styled.Checklist>
  );
};

export default Checklist;
