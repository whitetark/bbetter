import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import * as Styled from '../../styles/UI.styled';

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  return (
    <Styled.Pagination>
      <button
        disabled={currentPage === 1}
        onClick={() => {
          setCurrentPage((prevState) => prevState - 1);
        }}>
        <FontAwesomeIcon icon='fa-solid fa-arrow-left' fixedWidth />
      </button>
      <button
        disabled={currentPage === totalPages}
        onClick={() => {
          setCurrentPage((prevState) => prevState + 1);
        }}>
        <FontAwesomeIcon icon='fa-solid fa-arrow-right' fixedWidth />
      </button>
      <span>
        {currentPage}/{totalPages}
      </span>
    </Styled.Pagination>
  );
};

export default Pagination;
