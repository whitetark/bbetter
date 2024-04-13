import styled from 'styled-components';
import * as variables from '../app/shared/colorVariables';
import { HomePadding } from './UI.styled';

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
  background-color: ${variables.WHITE};
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
`;

export const QuoteActions = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 24px;
`;
