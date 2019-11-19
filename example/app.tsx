import React from 'react'
import useResponsiveValue from 'use-responsivevalue'

import { SnapSlider } from '../src'

function App() {
  const columns = useResponsiveValue(
    '(min-width: 480px) 3, (min-width: 720px) 4, (min-width: 1024px) 6, 2',
  )

  const itemStyles = {
    height: 'auto',
    width: '100%',
    display: 'block',
  }

  return (
    <div>
      <SnapSlider
        columns={Number(columns)}
        pageNumberButtonComponent={({ index, active }) => (
          <div style={{ fontSize: 24, color: active ? 'green' : 'black' }}>
            {index + 1}
          </div>
        )}
        nextButtonComponent={({ active }) => (
          <div style={{ fontSize: 24, color: active ? 'green' : 'black' }}>
            &gt;
          </div>
        )}
        previousButtonComponent={({ active }) => (
          <div style={{ fontSize: 24, color: active ? 'green' : 'black' }}>
            &lt;
          </div>
        )}>
        <img
          style={itemStyles}
          src="https://via.placeholder.com/100x300"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/100x300"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/100x300"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/100x300"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/100x300"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/100x300"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/100x300"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/100x300"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/100x300"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/100x300"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/100x300"
          alt=""
        />
      </SnapSlider>
    </div>
  )
}

export default App
