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

import { HTMLAttributes, MutableRefObject, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

interface TextMiddleEllipsisProps extends HTMLAttributes<HTMLDivElement> {
  text: string
  className?: string
}

const TextMiddleEllipsis = ({ text, className }: TextMiddleEllipsisProps) => {
  const el = useRef<HTMLDivElement | null>(null)
  const charWidth = useRef<number>()
  const [_text, setText] = useState(text)

  const handleResize = createHandleResize(el, charWidth, text, setText)

  useEffect(() => {
    handleResize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={el} className={className}>
      <HiddenText>{text}</HiddenText>
      <div>{_text}</div>
    </div>
  )
}

const createHandleResize =
  (
    el: MutableRefObject<HTMLDivElement | null>,
    charWidth: MutableRefObject<number | undefined>,
    text: string,
    setText: (t: string) => void
  ) =>
  () => {
    if (el?.current === null) return

    if (charWidth.current === undefined) {
      charWidth.current = el.current.scrollWidth / text.length
    }

    const visibleChars = Math.floor(el.current.clientWidth / charWidth.current)
    const half = visibleChars / 2

    setText(
      visibleChars >= text.length
        ? text
        : text.slice(0, Math.floor(half)) +
            (visibleChars == text.length ? '' : '...') +
            text.slice(-Math.ceil(half) + 3)
    )
  }

export default styled(TextMiddleEllipsis)`
  font-variant-numeric: tabular-nums;
  overflow: hidden;
`

const HiddenText = styled.div`
  visibility: hidden;
  height: 0;
`
