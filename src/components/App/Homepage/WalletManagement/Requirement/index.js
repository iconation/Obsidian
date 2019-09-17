import React, { useState } from 'react'
import { connect } from 'react-redux'
import styles from './Requirement.module.scss'
import Button from 'components/App/core/Button'
import TextField from 'components/App/core/TextField'
import { setErrorMessage, setInfoMessage } from 'store/actions'
import { api } from 'SCORE/API'

const Requirement = ({
  multisigAddress,
  setErrorMessage,
  setInfoMessage,
  loggedWallet
}) => {
  const [requirement, setRequirement] = useState(null)

  // Get requirement
  !requirement && api.getRequirement(multisigAddress).then(requirement => {
    setRequirement(requirement)
  }).catch(err => {
    setErrorMessage(err)
  })

  const onChangeRequirement = () => {
    api.changeRequirement(loggedWallet, multisigAddress, requirement).then(result => {
      setInfoMessage('Transaction successfully created (you may need to refresh the page to see it)')
    }).catch(error => {
      setErrorMessage(error.message)
    })
  }

  return (
    <div className={styles.root}>

      <TextField
        disabled={loggedWallet ? null : true}
        className={styles.input}
        label='Wallet Confirmation Requirement'
        value={requirement || 0}
        margin='normal'
        variant='outlined'
        onChange={(event) => {
          setRequirement(event.target.value)
        }}
      />

      {loggedWallet && <Button className={styles.updateButton} onClick={() => onChangeRequirement()}>Update</Button>}

    </div>
  )
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

export default connect(mapStateToProps, mapDispatchToProps)(Requirement)
