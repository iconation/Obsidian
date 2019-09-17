import React, { useState } from 'react'
import { connect } from 'react-redux'
import styles from './Owners.css'
import core from 'themes/core.module.scss'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from 'components/App/core/TableCell'
import TableHead from 'components/App/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from 'components/App/core/Button'
import { api } from 'SCORE/API'
import {
  setErrorMessage,
  setInfoMessage,
  setOwnersList
} from 'store/actions'

const Owners = ({
  multisigAddress,
  loggedWallet,
  setOwnersList,
  setErrorMessage,
  setInfoMessage
}) => {
  const [owners, setOwners] = useState(null)

  const onVoteRemove = (address) => {
    if (window.confirm('Are you sure you want to remove ' + address + ' ?')) {
      api.removeWalletOwner(loggedWallet, multisigAddress, address).then(result => {
        setInfoMessage('Transaction successfully created (you may need to refresh the page to see it)')
      }).catch(error => {
        setErrorMessage(error.message)
      })
    }
  }

  const onAddOwner = () => {
    const address = window.prompt('Input a new wallet owner address', '')
    if (address) {
      api.addWalletOwner(loggedWallet, multisigAddress, address).then(result => {
        setInfoMessage('Transaction successfully created (you may need to refresh the page to see it)')
      }).catch(error => {
        setErrorMessage(error.message)
      })
    }
  }

  !owners && api.getWalletOwnerCount(multisigAddress).then(ownersCount => {
    api.getWalletOwners(multisigAddress, 0, ownersCount).then(owners => {
      setOwnersList(owners)
      setOwners(owners)
    }).catch(err => {
      setErrorMessage(err)
    })
  }).catch(err => {
    setErrorMessage(err)
  })

  return (
    <div className={styles.root}>
      {owners &&
        <>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>Address</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {owners.map(owner => (
                <TableRow key={owner}>
                  <TableCell><a className={core.link} href={'https://tracker.icon.foundation/address/' + owner}>{owner}</a></TableCell>
                  <TableCell>
                    {loggedWallet && <Button onClick={() => onVoteRemove(owner)}>🗑️ Remove</Button>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      }

      {loggedWallet && <>
        <Button onClick={() => { onAddOwner() }}>➕ Add new Owner</Button>
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
    setInfoMessage: (o) => dispatch(setInfoMessage(o)),
    setErrorMessage: (o) => dispatch(setErrorMessage(o)),
    setOwnersList: (o) => dispatch(setOwnersList(o))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Owners)
