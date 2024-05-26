import styled from 'styled-components';
import * as variables from '../app/shared/colorVariables';
import { BHabitActions, BHabitItemActions } from './BHabits.styled';
import { HomePadding, Pagination } from './UI.styled';
import { AddWishButton, AddWishForm } from './Wishes.styled';

export const QuoteContent = styled(HomePadding)`
  position: relative;
  z-index: 2;
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const QuoteHeader = styled.div`
  color: ${variables.DISABLED_BUTTON};
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > div {
    background-color: ${variables.WHITE};
    padding: 1rem;
    border-radius: 10px;
  }

  ${Pagination} {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
`;

export const QuoteHeaderBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const QuoteMainBlock = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;
export const QuoteFilter = styled.div`
  max-width: 25rem;
  width: 100%;
`;

export const QuoteList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-size: 18px;
  width: 100%;
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
  padding: 1.5rem 3rem;
  border-radius: 10px;
  gap: 1rem;

  .content {
    font-size: 20px;
    font-style: italic;
  }
`;
export const QuoteMain = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;
export const QuoteInfo = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  gap: 4rem;

  .author {
    font-weight: 500;
    color: ${variables.DIVIDER};
    font-size: 16px;
  }

  .type {
    font-size: 14px;
    color: ${variables.DISABLED_BUTTON};
    background-color: ${variables.TAB_HOVER};
    padding: 0.3rem 1rem;
    border-radius: 100px;
  }
`;

export const QuoteActions = styled(BHabitActions)``;
export const QuoteItemActions = styled(BHabitItemActions)`
  display: flex;
  flex-direction: column;
`;

export const AddQuote = styled.div`
  padding: 2rem;
`;
export const AddQuoteForm = styled(AddWishForm)`
  gap: 1rem;

  input[type='text'] {
    padding: 0.5rem;
    width: 100%;
    border-radius: 10px;
    outline: none;
    font-size: 20px;
    max-width: 35rem;
    border: 1px solid ${variables.DIVIDER};
  }

  select {
    padding: 0.5rem;
    width: 100%;
    border-radius: 10px;
    outline: none;
    font-size: 20px;
    max-width: 35rem;
    border: 1px solid ${variables.DIVIDER};
  }

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

export const QuoteFilterMain = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${variables.WHITE};
  padding: 2rem;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  gap: 1rem;

  p {
    font-size: 2rem;
    font-weight: 500;
    color: ${variables.DISABLED_BUTTON};
  }
`;
export const QuoteFilterDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  select {
    border-radius: 10px;
    border: none;
    outline: none;
    padding: 0.5rem;
    color: ${variables.DELEGATE_CELL};
    font-weight: 400;
    cursor: pointer;
  }
`;

const keywordPadding = '1rem';
export const QuoteTypeList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: scroll;
  max-height: 15rem;
  border: 1px solid ${variables.DIVIDER};
  padding: 0.5rem;
  background-color: ${variables.WHITE};
  border-radius: 10px;
  caret-color: ${variables.GREEN};
  text-transform: capitalize;
  gap: 0.5rem;

  > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: ${keywordPadding};
    padding-right: ${keywordPadding};
    gap: 1rem;

    input {
      cursor: pointer;
    }

    .keyword {
      text-align: center;
      word-break: break-all;
    }
    &:first-child {
      padding-top: ${keywordPadding};
    }
    &:last-child {
      padding-bottom: ${keywordPadding};
    }

    &.odd {
      background-color: ${variables.TAB_HOVER};
    }
  }

  span {
    font-size: 16px;
  }

  &::-webkit-scrollbar {
    width: 1rem;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.068);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: ${variables.GREEN};
  }
`;
