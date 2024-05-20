import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Background, Button, Modal } from '../components/UI/index';
import { QuoteAdd, QuoteItem } from '../components/index';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../components/UI/Paginations';
import useEdit from '../hooks/use-edit';
import useModal from '../hooks/use-modal';
import { useRefetchQuotes } from '../hooks/use-quote';
import * as Styled from '../styles/Quotes.styled';

const QuotesPage = () => {
  document.title = `bbetter - Quotes`;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [searchParams, setSearchParams] = useSearchParams();
  const postsPerPage = 15;

  const { isShowing: modalIsShowing, toggle: toggleModal } = useModal();
  const { isEditMode: isEdit, toggle: toggleEdit } = useEdit();
  const { quotes, error, isLoading } = useRefetchQuotes();

  useEffect(() => {
    const pageValue = parseInt(searchParams.get('page'));
    if (pageValue) {
      setCurrentPage(pageValue);
    }
  }, []);

  useEffect(() => {
    quotes && setTotalPages(Math.ceil(quotes.length / postsPerPage));
  }, [quotes]);

  useEffect(() => {
    const newSearch = new URLSearchParams(searchParams);
    newSearch.set('page', currentPage);
    setSearchParams(newSearch);
  }, [currentPage]);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  let currentPosts = quotes && quotes.slice(firstPostIndex, lastPostIndex);
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
          {quotes && quotes.length > 0 ? (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          ) : undefined}
        </Styled.QuoteHeader>
        <Styled.QuoteList>
          {currentPosts.map((quote) => (
            <QuoteItem key={quote.userQuoteId} isEdit={isEdit} data={quote} />
          ))}
        </Styled.QuoteList>
      </Styled.QuoteContent>
      <Modal isShowing={modalIsShowing} hide={toggleModal} className='add-modal' hasOverlay>
        <QuoteAdd hide={toggleModal} />
      </Modal>
    </Styled.QuotesPage>
  );
};

export default QuotesPage;
