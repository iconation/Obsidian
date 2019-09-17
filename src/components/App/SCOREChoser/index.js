import React, { useState } from 'react'
import { connect } from 'react-redux'
import styles from './SCOREChoser.module.scss'
import core from 'themes/core.module.scss'
import Button from 'components/App/core/Button'
import { Redirect } from 'react-router-dom'

const SCOREChoser = () => {
  const [multisigAddress, setMultisigAddress] = useState('cx4342c4e5863c9a37919aec48048aa858aa14559b')
  const [redirect, setRedirect] = useState(false)

  return <div className={styles.root}>
    <div className={styles.content}>
      <div className={[core.bigtitle].join(' ')}>Input the Multisig SCORE address</div>
      <input className={styles.input} type="text" value={multisigAddress} onChange={(event) => { setMultisigAddress(event.target.value) }}></input>
      {redirect && <Redirect to={'/' + multisigAddress} />}
      <Button onClick={() => { setRedirect(true) }}>Load SCORE</Button>
    </div>
  </div>
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(SCOREChoser)
