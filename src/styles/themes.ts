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

import { colord } from 'colord'
import { DefaultTheme } from 'styled-components'

export type ThemeType = 'light' | 'dark'

export const lightTheme: DefaultTheme = {
  name: 'light',
  bg: {
    primary: 'rgba(255, 255, 255, 0)',
    secondary: 'rgba(249, 249, 249, 0)',
    tertiary: 'rgba(244, 244, 244, 0)',
    hover: 'rgba(255, 255, 255, 0)',
    contrast: 'rgba(33, 33, 38, 0)',
    accent: colord('#5981f3').alpha(0).toRgbString(),
    background1: 'rgba(240, 240, 240, 0)',
    background2: 'rgba(240, 240, 240, 0)'
  },
  font: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.8)',
    tertiary: 'rgba(255, 255, 255, 0.6)',
    contrastPrimary: '#ffffff',
    contrastSecondary: 'rgba(255, 255, 255, 0.8)',
    highlight: '#ffffff'
  },
  border: {
    primary: '#e3e3e3',
    secondary: '#f1f1f1'
  },
  shadow: {
    primary: '0 2px 2px rgba(0, 0, 0, 0.03)',
    secondary: '0 10px 10px rgba(0, 0, 0, 0.04)',
    tertiary: '0 0 50px rgba(0, 0, 0, 0.3)'
  },
  global: {
    accent: '#5981f3',
    complementary: '#ce5cf8',
    alert: '#da3341',
    warning: '#ffa600',
    valid: '#028f54',
    highlight: '#f78c14',
    highlightGradient: 'linear-gradient(45deg, rgba(18,0,218,1) 0%, rgba(255,93,81,1) 100%)'
  }
}

export const darkTheme: DefaultTheme = {
  name: 'dark',
  bg: {
    primary: 'rgba(27, 27, 31, 0)',
    secondary: 'rgba(24, 24, 27, 0)', 
    tertiary: 'rgba(20, 20, 23, 0)',
    hover: 'rgba(255, 255, 255, 0)',
    contrast: 'rgba(255, 255, 255, 0)',
    accent: colord('#598BED').alpha(0).toRgbString(),
    background1: 'rgba(18, 18, 21, 0)',
    background2: 'rgba(14, 14, 16, 0)'
  },
  font: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.8)',
    tertiary: 'rgba(255, 255, 255, 0.6)',
    contrastPrimary: '#ffffff',
    contrastSecondary: 'rgba(255, 255, 255, 0.8)',
    highlight: '#ffffff'
  },
  border: {
    primary: 'rgba(255, 255, 255, 0.08)',
    secondary: 'rgba(255, 255, 255, 0.08)'
  },
  shadow: {
    primary: '0 4px 4px rgba(0, 0, 0, 0.25)',
    secondary: '0 10px 10px rgba(0, 0, 0, 0.3)',
    tertiary: '0 0 50px rgb(0, 0, 0)'
  },
  global: {
    accent: '#598BED',
    complementary: '#eb88a4',
    alert: '#f24242',
    warning: '#ffc42d',
    valid: '#1dcd84',
    highlight: '#f78c14',
    highlightGradient: 'linear-gradient(45deg, rgb(240, 239, 252) 0%, rgba(255,93,81,1) 100%)'
  }
}
