import React, { CSSProperties } from 'react'

const paginationStyles: CSSProperties = {
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}

const dotStyles: CSSProperties = {
  flex: 'none',
  height: 24,
  width: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

const dotInnerStyles: CSSProperties = {
  width: 16,
  height: 16,
  border: '2px solid black',
  borderRadius: '50%',
}

const buttonStyles: CSSProperties = {
  padding: 0,
  border: 'none',
  background: 'none',
  WebkitAppearance: 'none',
  appearance: 'none',
}

const prevStyles: CSSProperties = {
  position: 'absolute',
  display: 'flex',
  alignContent: 'center',
  top: 0,
  bottom: 0,
}

const nextStyles: CSSProperties = { ...prevStyles, right: 0 }

const arrowStyles: CSSProperties = {
  width: 0,
  height: 0,
  fontSize: 0,
  display: 'block',
  borderTop: '20px solid transparent',
  borderBottom: '20px solid transparent',
}

function Controls(props: {
  total: number
  current: number
  scrollTo: (page: number) => void
}) {
  const { total, current, scrollTo } = props

  if (total <= 1) return null

  return (
    <div>
      <nav style={paginationStyles}>
        {Array.from<undefined, number>({ length: total }, (v, i) => i).map(
          page => {
            return (
              <button
                key={page}
                style={buttonStyles}
                type="button"
                aria-current={page === current ? 'page' : undefined}
                aria-label={`Show slide ${page + 1}`}
                onClick={() => scrollTo(page)}>
                <span style={dotStyles}>
                  <span
                    style={{
                      ...dotInnerStyles,
                      backgroundColor:
                        page === current ? 'black' : 'transparent',
                    }}
                  />
                </span>
              </button>
            )
          },
        )}
      </nav>
      {total > 1 && (
        <>
          <div style={prevStyles}>
            <button
              style={buttonStyles}
              type="button"
              aria-disabled={current === 0}
              aria-label="Show previous slide"
              onClick={() => {
                scrollTo(current - 1)
              }}>
              <span
                style={{
                  ...arrowStyles,
                  borderRight: '20px solid currentColor',
                  color: current === 0 ? 'hsl(0, 0%, 50%)' : 'black',
                }}
              />
            </button>
          </div>
          <div style={nextStyles}>
            <button
              style={buttonStyles}
              type="button"
              aria-disabled={current === total - 1}
              aria-label="Show next slide"
              onClick={() => {
                scrollTo(current + 1)
              }}>
              <span
                style={{
                  ...arrowStyles,
                  borderLeft: '20px solid currentColor',
                  color: current === total - 1 ? 'hsl(0, 0%, 50%)' : 'black',
                }}
              />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export { Controls }
