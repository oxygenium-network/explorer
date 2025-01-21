import styled from 'styled-components';

export const TransactionWrapper = styled.div`
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  padding: 16px;
  margin: 16px 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

export const TransactionHeader = styled.header`
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 16px;
`;

export const TransactionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
