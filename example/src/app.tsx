import React from 'react'
import useResponsiveValue from 'use-responsivevalue'

import { SnapSlider } from '../../src'

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
          src="https://via.placeholder.com/100x300?text=One"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/100x300?text=Two"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/100x300?text=Three"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/100x300?text=Four"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/100x300?text=Five"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/100x300?text=Six"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/100x300?text=Seven"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/100x300?text=Eight"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/100x300?text=Nine"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/100x300?text=Ten"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/100x300?text=Eleven"
          alt=""
        />
      </SnapSlider>
    </div>
  )
}

export default App
