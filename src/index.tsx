import React, { useEffect, useState, useRef } from 'react'

import { smoothScroll } from './smooth-scroll'

const classPrefix = 'ReactSnapSlider'

const classes = {
  scroller: `${classPrefix}__scroller`,
  page: `${classPrefix}__page`,
  item: `${classPrefix}__item`,
}

type SnapSliderProps = {
  columns: number
  children: React.ReactNode
  controls?: React.ComponentType<{
    total: number
    current: number
    scrollTo: (page: number) => void
  }>
}

function SnapSlider(props: SnapSliderProps) {
  const { controls: Controls, columns, children } = props

  const [scrolledPage, setScrolledPage] = useState(0)
  const isBeingScrolledTo = useRef<number | undefined>(undefined)
  const scrollerRef = useRef<HTMLDivElement | null>(null)

  const childrenCount = React.Children.count(children)
  const pages = Math.ceil(childrenCount / columns)
  const pagesArray = Array.apply(null, Array(pages)).map(
    Number.call,
    Number,
  ) as number[]
  const itemsToPad = columns * pages - childrenCount
  const itemsToPadArray = Array.apply(null, Array(itemsToPad)).map(
    Number.call,
    Number,
  ) as number[]

  useEffect(
    function onPagesChange() {
      let scrollerNode: HTMLDivElement | undefined
      let timeout: number | null = null
      let previousOffsetWidth: number | undefined
      let isBeingResized = false

      function onScroll() {
        if (!scrollerNode || isBeingResized) return
        const scrollLeft = scrollerNode.scrollLeft
        const scrollWidth = scrollerNode.scrollWidth

        // Because of easing function in smooth scroll polyfill
        // final scrollLeft value could be not precise.
        const normalizedScrollLeft = Math.floor(scrollLeft)

        if (typeof isBeingScrolledTo.current === 'number') {
          if (normalizedScrollLeft === isBeingScrolledTo.current) {
            isBeingScrolledTo.current = undefined
          }
          return
        }
        setScrolledPage(
          Math.round((normalizedScrollLeft / scrollWidth) * pages),
        )
      }

      function reset() {
        isBeingResized = false
      }

      function onResize() {
        if (!scrollerNode) return
        const offsetWidth = scrollerNode.offsetWidth
        isBeingResized = true
        scrollerNode.scrollLeft +=
          offsetWidth - (previousOffsetWidth || offsetWidth)
        previousOffsetWidth = offsetWidth
        if (timeout) window.clearTimeout(timeout)
        timeout = window.setTimeout(reset, 500)
      }

      if (scrollerRef.current) {
        scrollerNode = scrollerRef.current
        scrollerNode.addEventListener('scroll', onScroll)
      }

      window.addEventListener('resize', onResize)

      return function onTeardown() {
        window.removeEventListener('resize', onResize)
        if (scrollerNode) {
          scrollerNode.removeEventListener('scroll', onScroll)
        }
      }
    },
    [pages],
  )

  function scrollTo(pageToScroll: number) {
    if (!scrollerRef.current || pageToScroll === scrolledPage) return
    const scrollLeft = Math.floor(
      scrollerRef.current.scrollWidth * (pageToScroll / pages),
    )
    setScrolledPage(pageToScroll)
    isBeingScrolledTo.current = scrollLeft
    smoothScroll(scrollerRef.current, scrollLeft)
  }

  return (
    <>
      <div className={classes.scroller} ref={scrollerRef}>
        {pagesArray.map(page => {
          return (
            <div key={`page${page}`} className={classes.page}>
              {React.Children.map(children, (child, index) => {
                if (
                  index >= page * columns &&
                  index < page * columns + columns
                ) {
                  return <div className={classes.item}>{child}</div>
                }
                return null
              })}
              {itemsToPad > 0 &&
                page === pages - 1 &&
                itemsToPadArray.map(temToPadIndex => (
                  <div key={`pad${temToPadIndex}`} className={classes.item} />
                ))}
            </div>
          )
        })}
      </div>
      {Controls && (
        <Controls total={pages} current={scrolledPage} scrollTo={scrollTo} />
      )}
    </>
  )
}

export { SnapSlider }
export default SnapSlider
