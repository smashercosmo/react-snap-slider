import React from 'react'
import useResponsiveValue from 'use-responsivevalue'

import { SnapSlider } from '../src'

function App() {
  const columns = useResponsiveValue(
    '(min-width: 480px) 3, (min-width: 720px) 4, (min-width: 1024px) 6, 2',
  )

  const itemStyles = {
    height: 200,
    borderLeft: '1px solid green',
    borderRight: '1px solid blue',
    backgroundColor: 'pink',
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
        <div style={itemStyles}>1</div>
        <div style={itemStyles}>2</div>
        <div style={itemStyles}>3</div>
        <div style={itemStyles}>4</div>
        <div style={itemStyles}>5</div>
        <div style={itemStyles}>6</div>
        <div style={itemStyles}>7</div>
        <div style={itemStyles}>8</div>
        <div style={itemStyles}>9</div>
        <div style={itemStyles}>10</div>
        <div style={itemStyles}>11</div>
        <div style={itemStyles}>12</div>
      </SnapSlider>
    </div>
  )
}

export default App
