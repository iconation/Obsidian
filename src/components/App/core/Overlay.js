import React from 'react'

const style = {
  position: 'fixed',
  display: 'block',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 10
}

export default (props) => (
  <div style={style} {...props} />
)
