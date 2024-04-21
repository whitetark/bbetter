import styled from 'styled-components';
import * as variables from '../app/shared/colorVariables';
import { BHabitActions, BHabitItemActions } from './BHabits.styled';
import { HomePadding } from './UI.styled';
import { AddWish, AddWishButton, AddWishForm } from './Wishes.styled';

export const QuoteContent = styled(HomePadding)`
  position: relative;
  z-index: 2;
  max-width: 90rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const QuoteHeader = styled.div`
  color: ${variables.DISABLED_BUTTON};
  background-color: ${variables.WHITE};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 10px;
`;

export const QuoteList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  font-size: 18px;
`;

export const QuotesPage = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
`;

export const Quote = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${variables.WHITE};
  padding: 1.5rem;
  border-radius: 10px;
  gap: 1rem;

  .content {
    font-style: italic;
    font-size: 20px;
  }

  .author {
    font-weight: 500;
    color: ${variables.DIVIDER};
    align-self: flex-end;
    font-size: 16px;
  }
`;

export const QuoteActions = styled(BHabitActions)``;
export const QuoteItemActions = styled(BHabitItemActions)`
  display: flex;
  flex-direction: column;
`;

export const AddQuote = styled(AddWish)``;
export const AddQuoteForm = styled(AddWishForm)`
  gap: 1rem;

  textarea {
    width: 100%;
    padding: 0.5rem;
    resize: none;
    border-radius: 10px;
    outline: none;
    border: 1px solid ${variables.DIVIDER};
  }
`;
export const AddQuoteButton = styled(AddWishButton)``;
