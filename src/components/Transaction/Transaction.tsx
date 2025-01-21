import React from 'react';
import {
  TransactionWrapper,
  TransactionHeader,
  TransactionContent,
} from './Transaction.styles';

interface TransactionProps {
  title: string;
  children?: React.ReactNode;
}

export const Transaction: React.FC<TransactionProps> = ({ title, children }) => {
  return (
    <TransactionWrapper>
      <TransactionHeader>{title}</TransactionHeader>
      <TransactionContent>{children}</TransactionContent>
    </TransactionWrapper>
  );
};

export default Transaction;
