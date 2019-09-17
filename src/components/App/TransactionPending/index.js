import React, { useState } from 'react'
import { connect } from 'react-redux'
import styles from './TransactionPending.module.scss'
import core from 'themes/core.module.scss'
import { api } from 'SCORE/API'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from 'components/App/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { IconAmount, IconConverter } from 'icon-sdk-js'
import GoHomepage from 'components/App/GoHomepage'
import { setErrorMessage, setInfoMessage } from 'store/actions'
import Revoke from './Revoke'
import Confirm from './Confirm'

const ConnectedTransactionPending = ({ match, loggedWallet, setInfoMessage, setErrorMessage }) => {
  const [tx, setTx] = useState(null)
  const multisigAddress = 'cx' + match.params.multisigAddress
  const transactionId = match.params.id
  const [requirement, setRequirement] = useState(null)

  !tx && api.getTransactionInfo(multisigAddress, transactionId).then(tx => {
    return api.getConfirmationCount(multisigAddress, tx['_transaction_id']).then(count => {
      tx['_confirmationCount'] = count
      setTx(tx)
    })
  })

  // Get requirement
  !requirement && api.getRequirement(multisigAddress).then(requirement => {
    setRequirement(requirement)
  }).catch(err => {
    setErrorMessage(err)
  })

  return <>
    <GoHomepage multisigAddress={multisigAddress} />

    <div className={[core.bigtitle, styles.title].join(' ')}>Transaction #{transactionId}</div>
    {tx &&
      <>
        <Table size='small'>
          <TableBody>

            <TableRow key={tx['_transaction_id'] + 'req'}>
              <TableCell className={styles.dark}>Requirement</TableCell>
              <TableCell>{tx['_confirmationCount']} / {requirement}</TableCell>
            </TableRow>

            <TableRow key={tx['_transaction_id'] + 'destination'}>
              <TableCell className={styles.dark}>Destination</TableCell>
              <TableCell>{tx['_destination']}</TableCell>
            </TableRow>

            <TableRow key={tx['_transaction_id'] + 'value'}>
              <TableCell className={styles.dark}>Value (ICX)</TableCell>
              <TableCell>{IconConverter.toNumber(IconAmount.of(tx['_value'], IconAmount.Unit.LOOP).convertUnit(IconAmount.Unit.ICX))}</TableCell>
            </TableRow>

            <TableRow key={tx['_transaction_id'] + 'method'}>
              <TableCell className={styles.dark}>Method</TableCell>
              <TableCell className={core.tt}>{tx['_method']}</TableCell>
            </TableRow>

            <TableRow key={tx['_transaction_id'] + 'params'}>
              <TableCell className={styles.dark}>Parameters</TableCell>
              <TableCell className={core.tt}>{tx['_params']}</TableCell>
            </TableRow>

            <TableRow key={tx['_transaction_id'] + 'description'}>
              <TableCell className={styles.dark}>Description</TableCell>
              <TableCell>{tx['_description']}</TableCell>
            </TableRow>

          </TableBody>
        </Table>

        {loggedWallet && <div className={styles.actions}>
          <Revoke multisigAddress={multisigAddress} transactionId={tx['_transaction_id']} />
          <Confirm multisigAddress={multisigAddress} transactionId={tx['_transaction_id']} />
        </div>
        }
      </>
    }
  </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedTransactionPending)
