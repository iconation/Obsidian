import React, { useState } from 'react'
import { connect } from 'react-redux'
import styles from './GoHomepage.css'
import Button from 'components/App/core/Button'
import { Redirect } from 'react-router-dom'

const ConnectedGoHomepage = ({ multisigAddress }) => {
  const [goPrevious, setGoPrevious] = useState(false)

  return <div className={styles.root}>
    {goPrevious && <Redirect to={'/' + multisigAddress} />}
    <Button onClick={() => { setGoPrevious(true) }}>⬅ Go Back</Button>
  </div>
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedGoHomepage)
