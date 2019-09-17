import React from 'react'
import { connect } from 'react-redux'
import styles from './Login.module.scss'
import Button from 'components/App/core/Button'
import { api } from 'SCORE/API'
import { setErrorMessage, setInfoMessage, setLoggedWallet } from 'store/actions'

const Login = ({
  loggedWallet,
  owners,
  setErrorMessage,
  setInfoMessage,
  setLoggedWallet
}) => {
  const onClickLogin = () => {
    const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime)
    if (!isChrome) {
      window.alert('You need Google Chrome with ICONex installed')
    } else {
      api.iconexAskAddress().then(address => {
        if (address) {
          owners.forEach(owner => {
            if (owner === address) {
              setLoggedWallet(address)
              window.sessionStorage.setItem('LoggedWallet', address)
              setInfoMessage('Successfully connected!')
            }
          })

          if (!loggedWallet) {
            throw new Error('This wallet is not a wallet owner')
          }
        }
      }).catch(err => {
        setErrorMessage(err.message)
      })
    }
  }

  const onClickDisconnect = () => {
    setLoggedWallet(null)
    window.sessionStorage.removeItem('LoggedWallet')
  }

  return <div className={styles.root}>
    {loggedWallet
      ? <Button onClick={() => { onClickDisconnect() }} className={styles.loginButton}>🔌 Disconnect</Button>
      : <Button onClick={() => { onClickLogin() }} className={styles.loginButton}>Login with ICONex</Button>
    }
  </div>
}

const mapStateToProps = state => {
  return {
    loggedWallet: state.loggedWallet,
    owners: state.owners
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setErrorMessage: (o) => dispatch(setErrorMessage(o)),
    setInfoMessage: (o) => dispatch(setInfoMessage(o)),
    setLoggedWallet: (o) => dispatch(setLoggedWallet(o))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
