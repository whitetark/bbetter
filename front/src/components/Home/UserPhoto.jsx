import React from 'react';
import image from '../../assets/image.jpg';
import * as Styled from '../../styles/Home.styled';

const UserPhoto = () => {
  return (
    <Styled.UserPhoto>
      <img src={image} alt='' />
    </Styled.UserPhoto>
  );
};

export default UserPhoto;
