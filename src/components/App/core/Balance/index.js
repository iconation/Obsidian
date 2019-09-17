import React from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Icon from 'components/App/core/Icon'

const ConnectedBalance = (props) => {
  const { balance, dispatch, ...textfieldProps } = props
  const color = balance === 0 ? '#ffffff' : '#ffffff'

  return (
    <>
      <TextField
        disabled
        InputLabelProps={{ style: { color: color } }}
        id='filled-disabled'
        InputProps={{ endAdornment: <Icon name={'icx'} /> }}
        label={'Balance (ICX)'}
        value={balance || 0}
        margin='normal'
        variant='filled'
        {...textfieldProps}
      />
    </>
  )
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps)(ConnectedBalance)
