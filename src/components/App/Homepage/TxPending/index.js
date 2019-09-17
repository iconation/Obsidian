import React, { useState } from 'react'
import { connect } from 'react-redux'
import styles from './TxPending.module.scss'
import core from 'themes/core.module.scss'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from 'components/App/core/TableCell'
import TableHead from 'components/App/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from 'components/App/core/Button'
import { api } from 'SCORE/API'
import { setErrorMessage, setInfoMessage } from 'store/actions'
import { Redirect } from 'react-router-dom'
import { IconAmount, IconConverter } from 'icon-sdk-js'
import Revoke from 'components/App/TransactionPending/Revoke'
import Cancel from 'components/App/TransactionPending/Cancel'
import Confirm from 'components/App/TransactionPending/Confirm'
import { style } from '@material-ui/system'

const ConnectedTxPending = ({
  multisigAddress,
  loggedWallet,
  setErrorMessage
}) => {
  const [txPending, setTxPending] = useState(null)
  const [requirement, setRequirement] = useState(null)
  const [txDetailsId, setTxDetailsId] = useState(null)

  // Get transactions
  !txPending && api.getTransactionCount(multisigAddress, true, true).then(txCount => {
    api.getTransactionList(multisigAddress, 0, txCount, true, false).then(async txList => {
      // Get additional information
      const confirmations = await Promise.all(txList.map(tx => {
        return api.getConfirmationCount(multisigAddress, tx['_transaction_id']).then(count => {
          tx['_confirmationCount'] = count
          return tx
        })
      }))
      setTxPending(confirmations)
    }).catch(err => {
      setErrorMessage(err)
    })
  })

  const onDetails = (id) => {
    setTxDetailsId(parseInt(id, 16))
  }

  // Get requirement
  !requirement && api.getRequirement(multisigAddress).then(requirement => {
    setRequirement(requirement)
  }).catch(err => {
    setErrorMessage(err)
  })

  return (
    <div className={styles.root}>
      {txDetailsId !== null && <Redirect to={'/' + multisigAddress + '/txpending/' + txDetailsId} />}
      {txPending &&
        <>
          <div className={[core.bigtitle, styles.title].join(' ')}>Pending Transactions</div>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>Confirmations</TableCell>
                <TableCell>Value (ICX)</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {txPending.reverse().map(tx => (
                <TableRow key={tx['_transaction_id']}>
                  <TableCell>{tx['_confirmationCount']} / {requirement}</TableCell>
                  <TableCell>{IconConverter.toNumber(IconAmount.of(tx['_value'], IconAmount.Unit.LOOP).convertUnit(IconAmount.Unit.ICX))}</TableCell>
                  <TableCell>{tx['_description']}</TableCell>
                  <TableCell>
                    <div className={styles.actions}>
                      <Button onClick={() => onDetails(tx['_transaction_id'])}>🔎 Details</Button>
                      {loggedWallet && (
                        tx['_confirmationCount'] > 0
                          ? <Revoke multisigAddress={multisigAddress} transactionId={tx['_transaction_id']} />
                          : <Cancel multisigAddress={multisigAddress} transactionId={tx['_transaction_id']} />
                      )}
                      {loggedWallet && <Confirm multisigAddress={multisigAddress} transactionId={tx['_transaction_id']} />}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      }
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

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedTxPending)
