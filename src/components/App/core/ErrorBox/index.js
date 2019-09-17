import React from 'react'
import TextField from 'components/App/core/TextField'
import styles from './ErrorBox.css'

export default (props) => {
  const { value, color = '#ff0000', label = 'Attention!', ...textfieldProps } = props
  return (
    <TextField
      className={styles.root}
      disabled
      InputLabelProps={{ style: { color: color } }}
      id='filled-disabled'
      label={label}
      value={value}
      margin='normal'
      variant='outlined'
      multiline
      {...textfieldProps}
    />
  )
}
