import React, { useEffect, useState } from 'react';
import * as Styled from '../../styles/GHabits.styled';

const Checklist = (props) => {
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
    props.onChange(
      weeks.mon && weeks.tue && weeks.wed && weeks.thu && weeks.fri && weeks.sat && weeks.sun,
    );
  }, [weeks]);

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
      <Styled.Input type='checkbox' name='mon' defaultChecked={weeks.mon} onChange={handleChange} />
      <Styled.Input type='checkbox' name='tue' defaultChecked={weeks.tue} onChange={handleChange} />
      <Styled.Input type='checkbox' name='wed' defaultChecked={weeks.wed} onChange={handleChange} />
      <Styled.Input type='checkbox' name='thu' defaultChecked={weeks.thu} onChange={handleChange} />
      <Styled.Input type='checkbox' name='fri' defaultChecked={weeks.fri} onChange={handleChange} />
      <Styled.Input type='checkbox' name='sat' defaultChecked={weeks.sat} onChange={handleChange} />
      <Styled.Input type='checkbox' name='sun' defaultChecked={weeks.sun} onChange={handleChange} />
    </Styled.Checklist>
  );
};

export default Checklist;
