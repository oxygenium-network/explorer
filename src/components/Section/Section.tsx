// ...existing code...

const SectionContainer = styled.div`
  background: rgba(255, 255, 255, 0.005);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.02);
`

const SectionHeader = styled.header`
  margin-bottom: 15px;
`

const SectionTitle = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.font.primary};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.01);
`

const SectionContent = styled.div`
  border-radius: 8px;
  background: transparent;
`

// ...existing code...
