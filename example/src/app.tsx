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

  const items = [
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
  ]

  return (
    <div style={{ position: 'relative' }}>
      <SnapSlider columns={Number(columns)} controls={Controls}>
        {items.map(item => (
          <img
            style={itemStyles}
            src={`https://via.placeholder.com/110x300?text=${item}`}
            alt=""
          />
        ))}
      </SnapSlider>
    </div>
  )
}

export default App
