import React from 'react';
import * as Styled from '../../styles/WhatToDo.styled';

const WhatToDoItem = ({ data, hasType }) => {
  return (
    <Styled.WhatToDoItem>
      <div className='content'>{data.content}</div>
      {hasType && <div className='type'>{data.type}</div>}
    </Styled.WhatToDoItem>
  );
};

export default WhatToDoItem;
