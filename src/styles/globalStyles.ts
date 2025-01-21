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
import { createGlobalStyle, css } from 'styled-components'
import normalize from 'styled-normalize'

// Breakpoints

export const deviceSizes = {
  tiny: 400,
  mobile: 600,
  tablet: 800,
  laptop: 1200,
  desktop: 1600
}

export const deviceBreakPoints = Object.entries(deviceSizes).reduce<{ [Key in keyof typeof deviceSizes]?: number }>(
  (a, s) => ({
    ...a,
    [s[0]]: `(max-width: ${s[1]}px)`
  }),
  {}
)

export default createGlobalStyle`
  ${normalize}

  * {
    box-sizing: border-box;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }

  :root {
    font-size: 13px;

    @media ${deviceBreakPoints.tiny} {
      font-size: 12px;
    }
  }

  body {
    transition: none;
    overflow: hidden auto;
    color: ${({ theme }) => theme.font.primary};
    background: transparent;
    margin: 0;
  }

  a {
    color: ${({ theme }) => theme.global.accent};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) =>
        theme.name === 'dark'
          ? colord(theme.global.accent).lighten(0.1).toHex()
          : colord(theme.global.accent).darken(0.2).toHex()};
    }
  }

  // Titles
  h2 {
    font-weight: 600;
    font-size: 1.6rem;
    margin-bottom: 15px;
  }

  // Animations
  @keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
  }

  /* Additional resets */

  button {
    outline: none;
    cursor: pointer;
    border: none;
  }

  a {
    text-decoration: none;
  }

  input {
    outline: none;
  }

  th {
    font-weight: normal;
  }

  /* Apex charts */
  .apexcharts-canvas {
    tspan {
      font-family: 'Inter' !important;
    }
    font-feature-settings: "tnum";
  }

  .apexcharts-tooltip {
    box-shadow: ${({ theme }) => theme.shadow.primary} !important;
    border-radius: 9px !important;
    border: 1px solid ${({ theme }) => theme.border.primary};
  }

  /* Dashboard card transparency */
  .sc-gTGvVq,
  .sc-eCJnSo,
  .sc-gACFrS,
  .sc-bxiBER {
    background: transparent !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }

  /* Border styles */
  .sc-gTGvVq {
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    background: transparent !important;
  }

  .sc-gTGvVq::before {
    display: none !important;
  }

  .sc-gTGvVq::after {
    display: none !important;
  }

  /* Content transparency */
  .sc-eLyvvV {
    background: transparent !important;
  }
`

export const blurredBackground = (color: string) => css`
  background-color: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
`
