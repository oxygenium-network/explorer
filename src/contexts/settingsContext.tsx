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

import { createContext, ReactNode, useCallback, useContext, useEffect } from 'react'

import useStateWithLocalStorage from '@/hooks/useStateWithLocalStorage'
import { ThemeType } from '@/styles/themes'
import { OnOff } from '@/types/generics'

export interface SettingsContextValue {
  theme: ThemeType
  switchTheme: (arg0: ThemeType) => void
  timestampPrecisionMode: OnOff
  setTimestampPrecisionMode: (status: OnOff) => void
}

const systemThemeQuery = matchMedia('(prefers-color-scheme: dark)')

//could be `no-preference` so default is `light`'
const currentSystemTheme = () => (systemThemeQuery.matches ? 'dark' : 'light')

const initialSystemTheme: ThemeType = currentSystemTheme()

export const SettingsContext = createContext<SettingsContextValue>({
  theme: initialSystemTheme,
  switchTheme: () => null,
  timestampPrecisionMode: 'off',
  setTimestampPrecisionMode: () => null
})

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useStateWithLocalStorage<ThemeType>('theme', initialSystemTheme)
  const [timestampPrecisionMode, setTimestampPrecisionMode] = useStateWithLocalStorage<OnOff>(
    'timestampPrecisionMode',
    'off'
  )

  const switchTheme = useCallback((theme: ThemeType) => setTheme(theme), [setTheme])

  return (
    <SettingsContext.Provider
      value={{
        theme,
        switchTheme,
        timestampPrecisionMode,
        setTimestampPrecisionMode
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => useContext(SettingsContext)
