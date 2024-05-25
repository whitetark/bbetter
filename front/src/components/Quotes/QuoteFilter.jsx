import { useEffect, useState } from 'react';
import LoadingWrapper from '../../components/UI/LoadingWrapper';
import * as Styled from '../../styles/Quotes.styled';

const QuoteFilter = ({ keywordsList, getClientFilters, isLoading }) => {
  const [checkedKeywords, setCheckedKeywords] = useState([]);

  const handleCheckboxChange = (keyword) => {
    setCheckedKeywords((prevCheckedKeywords) => {
      return prevCheckedKeywords.includes(keyword)
        ? prevCheckedKeywords.filter((kw) => kw !== keyword)
        : [...prevCheckedKeywords, keyword];
    });
  };

  useEffect(() => {
    setCheckedKeywords([]);
  }, [keywordsList]);

  useEffect(() => {
    const filtersValue = {
      checkedKeywords: checkedKeywords,
    };

    getClientFilters(filtersValue);
  }, [checkedKeywords]);

  return (
    <Styled.QuoteFilterMain>
      <Styled.QuoteFilterDiv>
        <p>Keywords</p>
        <LoadingWrapper isLoading={isLoading}>
          <Styled.QuoteTypeList>
            {keywordsList.map((keyword, index) => {
              return (
                <div key={index} className={index % 2 ? 'odd' : 'even'}>
                  <input
                    type='checkbox'
                    value={keyword.typeOf}
                    checked={checkedKeywords.includes(keyword.typeOf)}
                    onChange={() => handleCheckboxChange(keyword.typeOf)}
                  />
                  <span className='keyword'>{keyword.typeOf}</span>
                  <span className='count'>({keyword.count})</span>
                </div>
              );
            })}
          </Styled.QuoteTypeList>
        </LoadingWrapper>
      </Styled.QuoteFilterDiv>
    </Styled.QuoteFilterMain>
  );
};

export default QuoteFilter;
