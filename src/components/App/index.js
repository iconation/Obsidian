import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { setLoggedWallet } from 'store/actions'
import styles from './App.module.scss'

import ErrorSnackbar from 'components/App/core/ErrorSnackbar'
import InfoSnackbar from 'components/App/core/InfoSnackbar'
import Homepage from './Homepage'
import Header from './Header'
import SCOREChoser from './SCOREChoser'
import TransactionExecuted from './TransactionExecuted'
import TransactionPending from './TransactionPending'
import CreateTransactionForm from './CreateTransactionForm'

const App = ({ loggedWallet, setLoggedWallet }) => {

  if (!loggedWallet && window.sessionStorage.getItem('LoggedWallet')) {
    setLoggedWallet(window.sessionStorage.getItem('LoggedWallet'))
  }

  return (
    <>
      <Header />
      <div className={styles.root}>
        <Switch>
          <Route exact path='/' component={SCOREChoser} />
          <Route exact path='/cx:multisigAddress' component={Homepage} />
          <Route exact path='/cx:multisigAddress/create' component={CreateTransactionForm} />
          <Route exact path='/cx:multisigAddress/txexecuted/:id' component={TransactionExecuted} />
          <Route exact path='/cx:multisigAddress/txpending/:id' component={TransactionPending} />
        </Switch>

        <ErrorSnackbar />
        <InfoSnackbar />
      </div>
    </>
  )
}

const mapStateToProps = state => {
  return {
    loggedWallet: state.loggedWallet
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setLoggedWallet: (o) => dispatch(setLoggedWallet(o))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
