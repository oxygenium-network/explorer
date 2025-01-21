/*
 

The library is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

The library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with the library. If not, see <http://www.gnu.org/licenses/>.
*/

import styled from 'styled-components'

const AppFooter = () => (
  <FooterContainer>
    <FooterText>
      ©Copyright 2025 Oxygenium - All Rights Reserved. Powered by Blake3{' '}
      <FooterLink href="https://oxygenium.org" target="_blank" rel="noopener noreferrer">
        https://oxygenium.org
      </FooterLink>
    </FooterText>
  </FooterContainer>
)

const FooterContainer = styled.footer`
  padding: 20px;
  text-align: center;
`

const FooterText = styled.p`
  color: ${({ theme }) => theme.font.primary};
  opacity: 0.7;
  margin: 0;
`

const FooterLink = styled.a`
  color: inherit;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`

export default AppFooter
