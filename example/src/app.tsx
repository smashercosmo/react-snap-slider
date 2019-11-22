import React, { CSSProperties } from 'react'
import useResponsiveValue from 'use-responsivevalue'

import { Controls } from './controls'
import { SnapSlider } from '../../src'

function App() {
  const columns = useResponsiveValue(
    '(min-width: 480px) 3, (min-width: 720px) 4, (min-width: 1024px) 6, 2',
  )

  const itemStyles: CSSProperties = {
    height: 'auto',
    width: '100%',
    display: 'block',
    borderRight: '1px solid red',
    borderLeft: '1px solid red',
    boxSizing: 'border-box',
  }

  return (
    <div style={{ position: 'relative' }}>
      <SnapSlider columns={Number(columns)} controls={Controls}>
        <img
          style={itemStyles}
          src="https://via.placeholder.com/110x300?text=One"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/110x300?text=Two"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/110x300?text=Three"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/110x300?text=Four"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/110x300?text=Five"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/110x300?text=Six"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/110x300?text=Seven"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/110x300?text=Eight"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/110x300?text=Nine"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/110x300?text=Ten"
          alt=""
        />
        <img
          style={itemStyles}
          src="https://via.placeholder.com/110x300?text=Eleven"
          alt=""
        />
      </SnapSlider>
    </div>
  )
}

export default App
