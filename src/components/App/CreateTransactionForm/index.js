import React, { useState } from 'react'
import { connect } from 'react-redux'
import styles from './CreateTransactionForm.module.scss'
import core from 'themes/core.module.scss'
import TextField from 'components/App/core/TextField'
import Button from 'components/App/core/Button'
import GoHomepage from 'components/App/GoHomepage'
import { api } from 'SCORE/API'
import { setErrorMessage, setInfoMessage } from 'store/actions'
import { IconAmount, IconConverter } from 'icon-sdk-js'

const CreateTransactionForm = ({ match, loggedWallet, setErrorMessage, setInfoMessage }) => {
  const multisigAddress = 'cx' + match.params.multisigAddress
  const [destinationWallet, setDestinationWallet] = useState('')
  const [value, setValue] = useState(0)
  const [description, setDescription] = useState('Enter here the purpose of this transaction')
  const [method, setMethod] = useState('')
  const [params, setParams] = useState('')

  const onSubmit = () => {
    const loopValue = IconConverter.toHex(IconConverter.toBigNumber(IconAmount.of(value, IconAmount.Unit.ICX).convertUnit(IconAmount.Unit.LOOP)))
    api.submitTransaction(
      loggedWallet,
      multisigAddress,
      destinationWallet,
      method,
      params,
      loopValue,
      description
    ).then(result => {
      setInfoMessage('Transaction successfully submitted!')
    }).catch(error => {
      setErrorMessage(error.message)
    })
  }

  return <div className={styles.root}>

    <GoHomepage multisigAddress={multisigAddress} />

    <br />
    <div className={core.bigtitle}>Create a new transaction</div>

    <TextField
      className={styles.input}
      label='Destination Address (required)'
      value={destinationWallet}
      margin='normal'
      variant='outlined'
      onChange={(event) => {
        setDestinationWallet(event.target.value)
      }}
    />

    <TextField
      className={styles.input}
      onFocus={event => { event.target.select() }}
      label='Value (in ICX) (required)'
      value={value}
      margin='normal'
      variant='outlined'
      onChange={(event) => {
        setValue(event.target.value)
      }}
    />

    <TextField
      className={styles.input}
      onFocus={event => { event.target.select() }}
      label='Description (required)'
      value={description}
      margin='normal'
      variant='outlined'
      onChange={(event) => {
        setDescription(event.target.value)
      }}
    />

    <TextField
      className={styles.input}
      label='Method name (optional, keep empty if none)'
      value={method}
      margin='normal'
      variant='outlined'
      onChange={(event) => {
        setMethod(event.target.value)
      }}
    />

    <TextField
      className={styles.input}
      label='Method params (optional, keep empty if none)'
      value={params}
      margin='normal'
      variant='outlined'
      onChange={(event) => {
        setParams(event.target.value)
      }}
    />

    <br />
    {loggedWallet && <Button onClick={() => { onSubmit() }}>✔️ Submit</Button>}

  </div>
}

const mapStateToProps = state => {
  return {
    loggedWallet: state.loggedWallet
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setErrorMessage: (o) => dispatch(setErrorMessage(o)),
    setInfoMessage: (o) => dispatch(setInfoMessage(o))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTransactionForm)
