import React from 'react'
import { getImage } from 'static'

export default ({ name, width = 20, height = 20, style = {} }) =>
  <span>
    <img alt="" src={getImage(name)} width={width} height={height} style={style} />
  </span>
