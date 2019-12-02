import React, { useEffect, useState, useRef } from 'react'

import { supportsPassiveOption } from './support-check'
import { smoothScroll } from './smooth-scroll'

const classPrefix = 'ReactSnapSlider'

const classes = {
  scroller: `${classPrefix}__scroller`,
  page: `${classPrefix}__page`,
  item: `${classPrefix}__item`,
  itemEqualSize: `${classPrefix}__item--equal-size`,
}

type SnapSliderProps = {
  columns: number
  forceEqualItemSize?: boolean
  children: React.ReactNode
  controls?: React.ComponentType<{
    total: number
    current: number
    scrollTo: (page: number) => void
  }>
}

function SnapSlider(props: SnapSliderProps) {
  const { controls: Controls, columns, children, forceEqualItemSize } = props

  const [scrolledPage, setScrolledPage] = useState(0)
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
      let previousOffsetWidth: number | undefined
      let resizeTimeout: number | null = null
      let scrollTimeout: number | null = null
      let wheelTimeout: number | null = null
      let isBeingResized = false
      let isBeingManuallyScrolled = false

      function getCurrentPage() {
        if (!scrollerNode) return undefined
        const scrollLeft = scrollerNode.scrollLeft
        const scrollWidth = scrollerNode.scrollWidth
        return Math.round((scrollLeft / scrollWidth) * pages)
      }

      function onResizeEnd() {
        isBeingResized = false
      }

      function onScrollEnd() {
        isBeingManuallyScrolled = false
      }

      function onWheelEnd() {
        isBeingManuallyScrolled = false
      }

      function onScroll() {
        if (isBeingResized) return

        if (isBeingManuallyScrolled) {
          const currentPage = getCurrentPage()
          if (typeof currentPage === 'number') setScrolledPage(currentPage)
        }

        if (scrollTimeout) window.clearTimeout(scrollTimeout)
        scrollTimeout = window.setTimeout(onScrollEnd, 100)
      }

      function onResize() {
        if (!scrollerNode) return
        const offsetWidth = scrollerNode.offsetWidth
        isBeingResized = true
        scrollerNode.scrollLeft +=
          offsetWidth - (previousOffsetWidth || offsetWidth)
        previousOffsetWidth = offsetWidth
        if (resizeTimeout) window.clearTimeout(resizeTimeout)
        resizeTimeout = window.setTimeout(onResizeEnd, 100)
      }

      function onWheel() {
        isBeingManuallyScrolled = true
        if (wheelTimeout) window.clearTimeout(wheelTimeout)
        wheelTimeout = window.setTimeout(onWheelEnd, 100)
      }

      function onTouchMove() {
        isBeingManuallyScrolled = true
      }

      if (scrollerRef.current) {
        scrollerNode = scrollerRef.current
        scrollerNode.addEventListener(
          'scroll',
          onScroll,
          supportsPassiveOption ? { passive: true } : false,
        )
        scrollerNode.addEventListener(
          'wheel',
          onWheel,
          supportsPassiveOption ? { passive: true } : false,
        )
        scrollerNode.addEventListener(
          'touchmove',
          onTouchMove,
          supportsPassiveOption ? { passive: true } : false,
        )

        const currentPage = getCurrentPage()
        if (typeof currentPage === 'number') setScrolledPage(currentPage)
      }

      window.addEventListener(
        'resize',
        onResize,
        supportsPassiveOption ? { passive: true } : false,
      )

      return function onTeardown() {
        window.removeEventListener('resize', onResize)
        if (scrollerNode) {
          scrollerNode.removeEventListener('scroll', onScroll)
          scrollerNode.removeEventListener('touchmove', onTouchMove)
          scrollerNode.removeEventListener('wheel', onWheel)
        }
      }
    },
    [pages],
  )

  function scrollTo(pageToScroll: number) {
    if (
      !scrollerRef.current ||
      pageToScroll === scrolledPage ||
      pageToScroll < 0 ||
      pageToScroll > pages - 1
    ) {
      return
    }

    const scrollLeft = Math.floor(
      scrollerRef.current.scrollWidth * (pageToScroll / pages),
    )
    setScrolledPage(pageToScroll)
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
                  return (
                    <div
                      className={
                        forceEqualItemSize
                          ? classes.itemEqualSize
                          : classes.item
                      }>
                      {child}
                    </div>
                  )
                }
                return null
              })}
              {itemsToPad > 0 &&
                page === pages - 1 &&
                itemsToPadArray.map(temToPadIndex => (
                  <div
                    key={`pad${temToPadIndex}`}
                    className={
                      forceEqualItemSize ? classes.itemEqualSize : classes.item
                    }
                  />
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
