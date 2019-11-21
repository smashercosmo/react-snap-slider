import React from 'react'

function Controls(props: {
  total: number
  current: number
  scrollTo: (page: number) => void
}) {
  const { total, current, scrollTo } = props

  if (total <= 1) return null

  return (
    <div>
      <nav
        style={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
        {Array.from<undefined, number>({ length: total }, (v, i) => i).map(
          page => {
            return (
              <button
                key={page}
                style={{
                  padding: 0,
                  border: 'none',
                  background: 'none',
                  WebkitAppearance: 'none',
                  appearance: 'none',
                }}
                type="button"
                aria-current={page === current ? 'page' : undefined}
                aria-label={`Show slide ${page + 1}`}
                onClick={() => scrollTo(page)}>
                <span
                  style={{
                    flex: 'none',
                    height: 24,
                    width: 24,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <span
                    style={{
                      width: 16,
                      height: 16,
                      border: '2px solid currentColor',
                      borderRadius: '50%',
                      backgroundColor:
                        page === current ? 'currentColor' : 'transparent',
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
          <div
            style={{
              position: 'absolute',
              display: 'flex',
              alignContent: 'center',
              top: 0,
              bottom: 0,
            }}>
            <button
              style={{
                padding: 0,
                border: 'none',
                background: 'none',
                WebkitAppearance: 'none',
                appearance: 'none',
              }}
              type="button"
              aria-disabled={current === 0}
              aria-label="Show previous slide"
              onClick={() => {
                scrollTo(current - 1)
              }}>
              <span
                style={{
                  width: 0,
                  height: 0,
                  fontSize: 0,
                  display: 'block',
                  borderTop: '20px solid transparent',
                  borderBottom: '20px solid transparent',
                  borderRight: '20px solid currentColor',
                  color: current === 0 ? 'hsl(0, 0%, 50%)' : 'black',
                }}
              />
            </button>
          </div>
          <div
            style={{
              position: 'absolute',
              display: 'flex',
              alignContent: 'center',
              top: 0,
              bottom: 0,
              right: 0,
            }}>
            <button
              style={{
                padding: 0,
                border: 'none',
                background: 'none',
                WebkitAppearance: 'none',
                appearance: 'none',
              }}
              type="button"
              aria-disabled={current === total - 1}
              aria-label="Show next slide"
              onClick={() => {
                scrollTo(current + 1)
              }}>
              <span
                style={{
                  width: 0,
                  height: 0,
                  fontSize: 0,
                  display: 'block',
                  borderTop: '20px solid transparent',
                  borderBottom: '20px solid transparent',
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
