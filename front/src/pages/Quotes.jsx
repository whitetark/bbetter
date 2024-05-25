import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Background, Button, Modal } from '../components/UI/index';
import { QuoteAdd, QuoteItem } from '../components/index';

import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useSearchParams } from 'react-router-dom';
import { QuoteService } from '../app/services/api';
import { useAuthContext } from '../app/store/auth-context';
import QuoteFilter from '../components/Quotes/QuoteFilter';
import Pagination from '../components/UI/Paginations';
import useEdit from '../hooks/use-edit';
import useModal from '../hooks/use-modal';
import * as Styled from '../styles/Quotes.styled';

const QuotesPage = () => {
  document.title = `bbetter - Quotes`;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [showData, setShowData] = useState([]);
  const [jsonData, setJsonData] = useState([]);
  const [keywordList, setKeywordList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const postsPerPage = 6;

  const { isShowing: modalIsShowing, toggle: toggleModal } = useModal();
  const { isEditMode: isEdit, toggle: toggleEdit } = useEdit();

  const { userData } = useAuthContext();
  const requestBody = {
    AccountId: userData.accountId,
  };

  const { isLoading } = useQuery(
    ['getQuotes', requestBody],
    () => QuoteService.getByAccount(requestBody),
    {
      onSuccess: (data) => {
        setJsonData(data.data.quotes);
        setKeywordList(data.data.typesOf);
      },
      onError: (error) => {
        console.log('Get Quotes error: ' + error.message);
      },
      refetchOnMount: 'always',
    },
  );

  useEffect(() => {
    const pageValue = parseInt(searchParams.get('page'));
    if (pageValue) {
      setCurrentPage(pageValue);
    }
  }, []);

  useEffect(() => {
    setShowData(jsonData);
  }, [jsonData]);

  useEffect(() => {
    setTotalPages(Math.ceil(showData?.length / postsPerPage));
  }, [showData]);

  useEffect(() => {
    const newSearch = new URLSearchParams(searchParams);
    newSearch.set('page', currentPage);
    setSearchParams(newSearch);
  }, [currentPage]);

  const clientFiltersHandler = (filtersValue) => {
    let rawData = jsonData;

    if (filtersValue.checkedKeywords.length > 0) {
      rawData = rawData.filter((publication) =>
        filtersValue.checkedKeywords.some((keyword) =>
          publication.typeOf ? publication.typeOf == keyword : null,
        ),
      );
    }

    setShowData(rawData);
  };

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  let currentPosts = showData?.slice(firstPostIndex, lastPostIndex);
  return (
    <Styled.QuotesPage>
      <Background />
      <Styled.QuoteContent>
        <Styled.QuoteHeader>
          <Styled.QuoteHeaderBlock>
            <h1>Your Quotes</h1>
            <Styled.QuoteActions>
              <Button onClick={toggleEdit} className={isEdit && 'active'}>
                <FontAwesomeIcon icon='fa-solid fa-pencil' fixedWidth />
              </Button>
              <Button onClick={toggleModal}>
                <FontAwesomeIcon icon='fa-solid fa-plus' fixedWidth />
              </Button>
            </Styled.QuoteActions>
          </Styled.QuoteHeaderBlock>
          {jsonData && jsonData.length > 0 ? (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          ) : undefined}
        </Styled.QuoteHeader>
        <Styled.QuoteMainBlock>
          <Styled.QuoteFilter>
            <QuoteFilter
              keywordsList={keywordList}
              getClientFilters={clientFiltersHandler}
              isLoading={isLoading}
            />
          </Styled.QuoteFilter>
          <Styled.QuoteList>
            {currentPosts?.map((quote) => (
              <QuoteItem key={quote.userQuoteId} isEdit={isEdit} data={quote} />
            ))}
          </Styled.QuoteList>
        </Styled.QuoteMainBlock>
      </Styled.QuoteContent>
      <Modal isShowing={modalIsShowing} hide={toggleModal} className='add-modal' hasOverlay>
        <QuoteAdd hide={toggleModal} />
      </Modal>
    </Styled.QuotesPage>
  );
};

export default QuotesPage;
