import React, { useEffect, useState, useRef } from 'react'

import { smoothScroll } from './smooth-scroll'

const classPrefix = 'ReactSnapSlider'

const overrideableClasses = {
  button: `${classPrefix}__button`,
  prev: `${classPrefix}__prev`,
  next: `${classPrefix}__next`,
  pagination: `${classPrefix}__pagination`,
}

const classes = {
  root: `${classPrefix}__root`,
  inner: `${classPrefix}__inner`,
  scroller: `${classPrefix}__scroller`,
  page: `${classPrefix}__page`,
  item: `${classPrefix}__item`,
  dot: `${classPrefix}__dot`,
  nextArrow: `${classPrefix}__arrow-next`,
  prevArrow: `${classPrefix}__arrow-prev`,
  activeDot: `${classPrefix}__dot--active`,
  activeArrow: `${classPrefix}__arrow--active`,
}

type SnapSliderOverrideableClasses = {
  [key in keyof typeof overrideableClasses]: string
}

type SnapSliderProps = {
  columns: number
  pageNumberButtonComponent?: (args: {
    active: boolean
    index: number
  }) => React.ReactElement | null
  previousButtonComponent?: (args: {
    active: boolean
  }) => React.ReactElement | null
  nextButtonComponent?: (args: { active: boolean }) => React.ReactElement | null
  classes?: SnapSliderOverrideableClasses
  children: React.ReactNode
}

function SnapSlider(props: SnapSliderProps) {
  const {
    pageNumberButtonComponent,
    previousButtonComponent,
    nextButtonComponent,
    classes: classesOverrides = {} as SnapSliderOverrideableClasses,
    columns,
    children,
  } = props

  const buttonClass = classesOverrides.button || overrideableClasses.button
  const prevClass = classesOverrides.prev || overrideableClasses.prev
  const nextClass = classesOverrides.next || overrideableClasses.next
  const paginationClass =
    classesOverrides.pagination || overrideableClasses.pagination

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

        if (typeof isBeingScrolledTo.current === 'number') {
          if (scrollLeft === isBeingScrolledTo.current) {
            isBeingScrolledTo.current = undefined
          }
          return
        }
        setScrolledPage(Math.round((scrollLeft / scrollWidth) * pages))
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

  function scrollToPage(pageToScroll: number) {
    if (!scrollerRef.current || pageToScroll === scrolledPage) return
    const scrollLeft = Math.floor(
      scrollerRef.current.scrollWidth * (pageToScroll / pages),
    )
    setScrolledPage(pageToScroll)
    isBeingScrolledTo.current = scrollLeft
    smoothScroll(scrollerRef.current, scrollLeft)
  }

  function prev() {
    if (scrolledPage > 0) {
      scrollToPage(scrolledPage - 1)
    }
  }

  function next() {
    if (scrolledPage < pages - 1) {
      scrollToPage(scrolledPage + 1)
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
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
        {pages > 1 && (
          <>
            <div className={prevClass}>
              <button
                className={buttonClass}
                type="button"
                aria-disabled={scrolledPage === 0}
                aria-label="Show previous slide"
                onClick={prev}>
                {previousButtonComponent ? (
                  previousButtonComponent({ active: scrolledPage === 0 })
                ) : (
                  <span
                    className={`${classes.prevArrow}${
                      scrolledPage === 0 ? ` ${classes.activeArrow}` : ''
                    }`}
                  />
                )}
              </button>
            </div>
            <div className={nextClass}>
              <button
                className={buttonClass}
                type="button"
                aria-disabled={scrolledPage === pages - 1}
                aria-label="Show next slide"
                onClick={next}>
                {nextButtonComponent ? (
                  nextButtonComponent({ active: scrolledPage === pages - 1 })
                ) : (
                  <span
                    className={`${classes.nextArrow}${
                      scrolledPage === pages - 1
                        ? ` ${classes.activeArrow}`
                        : ''
                    }`}
                  />
                )}
              </button>
            </div>
          </>
        )}
      </div>
      {pages > 1 && (
        <nav className={paginationClass}>
          {pagesArray.map(key => {
            return (
              <button
                key={key}
                className={buttonClass}
                type="button"
                aria-current={key === scrolledPage ? 'page' : undefined}
                aria-label={`Show slide ${key + 1}`}
                onClick={() => scrollToPage(key)}>
                {pageNumberButtonComponent ? (
                  pageNumberButtonComponent({
                    active: key === scrolledPage,
                    index: key,
                  })
                ) : (
                  <span
                    className={`${classes.dot}${
                      key === scrolledPage ? ` ${classes.activeDot}` : ''
                    }`}
                  />
                )}
              </button>
            )
          })}
        </nav>
      )}
    </div>
  )
}

export { SnapSlider }
export default SnapSlider
