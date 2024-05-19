import React from 'react';
import * as Styled from '../../styles/Home.styled';
import ReflectionItem from '../Reflections/ReflectionItem';

const RecentReflection = ({ reflection }) => {
  return (
    <Styled.RecentReflection>
      <h1>Recent Reflection</h1>
      {reflection ? (
        <ReflectionItem reflection={reflection} />
      ) : (
        <p>You don`t have reflections yet :(</p>
      )}
    </Styled.RecentReflection>
  );
};

export default RecentReflection;
