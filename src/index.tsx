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

  const [scrolledItem, setScrolledItem] = useState(0)
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

      function onScroll() {
        if (!scrollerRef.current) return
        const scrollLeft = scrollerRef.current.scrollLeft
        const scrollWidth = scrollerRef.current.scrollWidth

        if (typeof isBeingScrolledTo.current === 'number') {
          if (scrollLeft === isBeingScrolledTo.current) {
            isBeingScrolledTo.current = undefined
          }
          return
        }

        setScrolledItem(Math.round((scrollLeft / scrollWidth) * pages))
      }

      if (scrollerRef.current) {
        scrollerNode = scrollerRef.current
        scrollerNode.addEventListener('scroll', onScroll)
      }

      return function onTeardown() {
        if (scrollerNode) {
          scrollerNode.removeEventListener('scroll', onScroll)
        }
      }
    },
    [pages],
  )

  function scrollToItem(itemToScroll: number) {
    if (!scrollerRef.current || itemToScroll === scrolledItem) return
    const scrollLeft = Math.floor(
      scrollerRef.current.scrollWidth * (itemToScroll / pages),
    )
    setScrolledItem(itemToScroll)
    isBeingScrolledTo.current = scrollLeft
    smoothScroll(scrollerRef.current, scrollLeft)
  }

  function prev() {
    if (scrolledItem > 0) {
      scrollToItem(scrolledItem - 1)
    }
  }

  function next() {
    if (scrolledItem < pages - 1) {
      scrollToItem(scrolledItem + 1)
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.scroller} ref={scrollerRef}>
          {pagesArray.map(pageIndex => {
            return (
              <div key={`page${pageIndex}`} className={classes.page}>
                {React.Children.map(children, (child, index) => {
                  if (
                    index >= pageIndex * columns &&
                    index < pageIndex * columns + columns
                  ) {
                    return <div className={classes.item}>{child}</div>
                  }
                  return null
                })}
                {itemsToPad > 0 &&
                  pageIndex === pages - 1 &&
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
                aria-disabled={scrolledItem === 0}
                aria-label="Show previous slide"
                onClick={prev}>
                {previousButtonComponent ? (
                  previousButtonComponent({ active: scrolledItem === 0 })
                ) : (
                  <span
                    className={`${classes.prevArrow}${
                      scrolledItem === 0 ? ` ${classes.activeArrow}` : ''
                    }`}
                  />
                )}
              </button>
            </div>
            <div className={nextClass}>
              <button
                className={buttonClass}
                type="button"
                aria-disabled={scrolledItem === pages - 1}
                aria-label="Show next slide"
                onClick={next}>
                {nextButtonComponent ? (
                  nextButtonComponent({ active: scrolledItem === pages - 1 })
                ) : (
                  <span
                    className={`${classes.nextArrow}${
                      scrolledItem === pages - 1
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
                aria-current={key === scrolledItem ? 'page' : undefined}
                aria-label={`Show slide ${key + 1}`}
                onClick={() => scrollToItem(key)}>
                {pageNumberButtonComponent ? (
                  pageNumberButtonComponent({
                    active: key === scrolledItem,
                    index: key,
                  })
                ) : (
                  <span
                    className={`${classes.dot}${
                      key === scrolledItem ? ` ${classes.activeDot}` : ''
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
