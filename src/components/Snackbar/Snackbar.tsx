/*
Copyright 2018 - 2022 The Oxygenium Authors
This file is part of the oxygenium project.

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

import { motion } from 'framer-motion'
import styled from 'styled-components'

import { deviceBreakPoints } from '@/styles/globalStyles'

import { SnackbarMessage } from './SnackbarProvider'

const Snackbar = ({ text, Icon, type }: SnackbarMessage) => (
  <SnackbarStyled className={type || 'info'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    {Icon}
    {text}
  </SnackbarStyled>
)

export default Snackbar

const SnackbarStyled = styled(motion.div)`
  text-align: center;
  min-width: 150px;
  max-width: 50vw;
  padding: 20px;
  color: white;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.border.primary};
  box-shadow: ${({ theme }) => theme.shadow.secondary};

  display: flex;
  gap: 10px;
  align-items: center;

  &.alert {
    background-color: rgb(219, 99, 69);
  }

  &.info {
    background-color: black;
  }

  &.success {
    background-color: rgb(56, 168, 93);
  }

  @media ${deviceBreakPoints.mobile} {
    margin: 10px auto;
    max-width: 90vw;
  }
`
