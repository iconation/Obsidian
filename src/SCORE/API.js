import IconService from 'icon-sdk-js'
import { SCORE_NETWORK, Networks } from 'SCORE/network'

// ================================================
//  Exceptions
// ================================================
export class UnconfirmedTransaction extends Error {
  constructor(txHash) {
    super(txHash)
    this.name = 'UnconfirmedTransaction'
  }

  toString() {
    return 'The transaction cannot be confirmed.'
  }
}

export class SCOREUnhandledError extends Error {
  constructor(error, txHash) {
    super(error, txHash)
    this.name = 'SCOREUnhandledError'
    this.txHash = txHash
    this.error = error
  }

  toString() {
    return this.error
  }
}

export class ExecutionFailure extends Error {
  constructor(error, txHash) {
    super(error, txHash)
    this.name = 'SCOREUnhandledError'
    this.txHash = txHash
    this.error = error
  }

  toString() {
    return this.error + '(' + this.txHash + ')'
  }
}

// ================================================
//  Constants
// ================================================

// ================================================
//  API Implementation
// ================================================
class API {
  constructor(network) {
    const iconNetworkInfo = this._getNetworkInfo(network)

    const url = iconNetworkInfo.url
    const httpProvider = new IconService.HttpProvider(url + '/api/v3')

    this._nid = iconNetworkInfo.nid
    this._network = network
    this._iconService = new IconService(httpProvider)
  }

  _getNetworkInfo(network) {
    const iconNetworksInfo = []
    iconNetworksInfo[Networks.LOCALHOST] = { url: 'http://127.0.0.1:9000', nid: 0 }
    iconNetworksInfo[Networks.MAINNET] = { url: 'https://ctz.solidwallet.io', nid: 1 }
    iconNetworksInfo[Networks.EULJIRO] = { url: 'https://test-ctz.solidwallet.io', nid: 2 }
    iconNetworksInfo[Networks.YEOUIDO] = { url: 'https://bicon.net.solidwallet.io', nid: 3 }
    return iconNetworksInfo[network]
  }

  getNetwork() {
    return this._network
  }

  getEndpoint() {
    return this._getNetworkInfo(this._network).url
  }

  getNid() {
    return this._getNetworkInfo(this._network).nid
  }

  __handleErrors(txResult, txHash) {
    if (txResult.status === 0) {
      switch (txResult.failure.message) {
        default:
          throw new SCOREUnhandledError(JSON.stringify(txResult.failure.message), txHash)
      }
    } else {
      txResult.eventLogs.forEach(eventlog => {
        const eventSignature = eventlog.indexed[0]
        switch (eventSignature) {
          case 'ExecutionFailure(int)':
            throw new ExecutionFailure('Transaction ' + eventlog.indexed[1] + ' failed to be executed', txHash)
          default:
            break
        }
      })
    }
  }

  getTransactionCount(multisigAddress, pending, executed) {
    return this.__call(multisigAddress, 'getTransactionCount', {
      _pending: pending ? '0x1' : '0x0',
      _executed: executed ? '0x1' : '0x0'
    }).then(count => {
      return parseInt(count, 16)
    })
  }

  getWalletOwnerCount(multisigAddress) {
    return this.__call(multisigAddress, 'getWalletOwnerCount', {}).then(count => {
      return parseInt(count, 16)
    })
  }

  getTransactionInfo(multisigAddress, transactionId) {
    return this.__call(multisigAddress, 'getTransactionInfo', {
      _transactionId: transactionId
    }).then(info => {
      return info
    })
  }

  getConfirmationCount(multisigAddress, transactionId) {
    return this.__call(multisigAddress, 'getConfirmationCount', {
      _transactionId: transactionId
    }).then(count => {
      return parseInt(count, 16)
    })
  }

  getConfirmations(multisigAddress, offset, count, transactionId) {
    return this.__call(multisigAddress, 'getConfirmations', {
      _offset: '0x' + offset.toString(16),
      _count: '0x' + count.toString(16),
      _transactionId: transactionId
    }).then(list => {
      return list
    })
  }

  getRequirement(multisigAddress) {
    return this.__call(multisigAddress, 'getRequirement', {}).then(req => {
      return parseInt(req, 16)
    })
  }

  getTransactionList(multisigAddress, offset, count, pending, executed) {
    return this.__call(multisigAddress, 'getTransactionList', {
      _offset: '0x' + offset.toString(16),
      _count: '0x' + count.toString(16),
      _pending: pending ? '0x1' : '0x0',
      _executed: executed ? '0x1' : '0x0'
    }).then(txList => {
      return txList
    })
  }

  getWalletOwners(multisigAddress, offset, count) {
    return this.__call(multisigAddress, 'getWalletOwners', {
      _offset: '0x' + offset.toString(16),
      _count: '0x' + count.toString(16)
    }).then(list => {
      return list
    })
  }

  revokeTransaction(from, multisigAddress, transactionId) {
    return this.__iconexCallTx(from, multisigAddress, 0, 10000000, 'revokeTransaction', {
      _transactionId: transactionId
    }).then(async result => {
      const txHash = result['result']
      const txResult = await this.__txResult(txHash)
      this.__handleErrors(txResult, txHash)
    })
  }

  cancelTransaction(from, multisigAddress, transactionId) {
    return this.__iconexCallTx(from, multisigAddress, 0, 10000000, 'cancelTransaction', {
      _transactionId: transactionId
    }).then(async result => {
      const txHash = result['result']
      const txResult = await this.__txResult(txHash)
      this.__handleErrors(txResult, txHash)
    })
  }

  confirmTransaction(from, multisigAddress, transactionId) {
    return this.__iconexCallTx(from, multisigAddress, 0, 10000000, 'confirmTransaction', {
      _transactionId: transactionId
    }).then(async result => {
      const txHash = result['result']
      const txResult = await this.__txResult(txHash)
      this.__handleErrors(txResult, txHash)
    })
  }

  submitTransaction(from, multisigAddress, destination, method, params, value, description) {
    return this.__iconexCallTx(from, multisigAddress, 0, 10000000, 'submitTransaction', {
      _value: value,
      _destination: destination,
      _params: params,
      _method: method,
      _description: description
    }).then(async result => {
      const txHash = result['result']
      const txResult = await this.__txResult(txHash)
      this.__handleErrors(txResult, txHash)
    })
  }

  getBalance(address) {
    return this._iconService.getBalance(address).execute()
  }

  removeWalletOwner(from, multisigAddress, address) {
    return this.submitTransaction(
      from,
      multisigAddress,
      multisigAddress,
      'removeWalletOwner',
      '[{"name":"_walletOwner","type":"Address","value":"' + address + '"}]',
      '0x0',
      'Remove an existing wallet owner : ' + address
    )
  }

  changeRequirement(from, multisigAddress, required) {
    return this.submitTransaction(
      from,
      multisigAddress,
      multisigAddress,
      'changeRequirement',
      '[{"name":"_required","type":"int","value":"' + required + '"}]',
      '0x0',
      'Update the requirement value : ' + required
    )
  }

  addWalletOwner(from, multisigAddress, address) {
    return this.submitTransaction(
      from,
      multisigAddress,
      multisigAddress,
      'addWalletOwner',
      '[{"name":"_walletOwner","type":"Address","value":"' + address + '"}]',
      '0x0',
      'Add a new wallet owner : ' + address
    )
  }

  // ICONex Connect Extension =============================================================
  iconexHasAccount() {
    return this.__iconexConnectRequest('REQUEST_HAS_ACCOUNT').then(payload => {
      return payload
    })
  }

  iconexHasAddress(address) {
    return this.__iconexConnectRequest('REQUEST_HAS_ADDRESS', address).then(payload => {
      return payload
    })
  }

  iconexAskAddress() {
    return this.__iconexConnectRequest('REQUEST_ADDRESS').then(payload => {
      return payload
    })
  }

  // ======================================================================================
  // Following classes are private because they are lower level methods at a protocol level
  __iconexTransferIcx(from, to, value, stepLimit = 100000) {
    const transaction = this.__icxTransactionBuild(from, to, value, stepLimit)

    const jsonRpcQuery = {
      jsonrpc: '2.0',
      method: 'icx_sendTransaction',
      params: IconService.IconConverter.toRawTransaction(transaction),
      id: 50889
    }

    return this.__iconexJsonRpc(jsonRpcQuery)
  }

  __iconexCallTx(from, to, value = 0, stepLimit = 10000000, method, params = {}) {
    const transaction = this.__icxCallTransactionBuild(from, to, value, stepLimit, method, params)

    const jsonRpcQuery = {
      jsonrpc: '2.0',
      method: 'icx_sendTransaction',
      params: IconService.IconConverter.toRawTransaction(transaction),
      id: 50889
    }

    return this.__iconexJsonRpc(jsonRpcQuery)
  }

  __iconexConnectRequest(requestType, payload) {
    return new Promise((resolve, reject) => {
      function eventHandler(event) {
        const { payload } = event.detail
        window.removeEventListener('ICONEX_RELAY_RESPONSE', eventHandler)
        resolve(payload)
      }
      window.addEventListener('ICONEX_RELAY_RESPONSE', eventHandler)

      window.dispatchEvent(new window.CustomEvent('ICONEX_RELAY_REQUEST', {
        detail: {
          type: requestType,
          payload
        }
      }))
    })
  }

  __iconexJsonRpc(jsonRpcQuery) {
    return this.__iconexConnectRequest('REQUEST_JSON-RPC', jsonRpcQuery).then(payload => {
      return payload
    })
  }

  // ======================================================================================

  __getBlock(block) {
    return this._iconService.getBlock(block).execute()
  }

  __call(to, method, params = {}) {
    return new Promise((resolve, reject) => {
      try {
        let callBuilder = new IconService.IconBuilder.CallBuilder()
          .from(null)
          .to(to)
          .method(method)

        // Optional "params" field
        if (Object.keys(params).length !== 0) {
          callBuilder = callBuilder.params(params)
        }

        const call = callBuilder.build()
        const result = this._iconService.call(call).execute()
        resolve(result)
      } catch (err) {
        reject(err)
      }
    })
  }

  __callTx(to, method, wallet, value = 0, params = {}) {
    return new Promise((resolve, reject) => {
      try {
        let callTransactionBuilder = new IconService.IconBuilder.CallTransactionBuilder()
          .from(wallet.getAddress())
          .to(to)
          .value(IconService.IconConverter.toHex(IconService.IconAmount.of(value, IconService.IconAmount.Unit.ICX).toLoop()))
          .stepLimit(IconService.IconConverter.toBigNumber(40000000))
          .nid(IconService.IconConverter.toBigNumber(this._nid))
          .nonce(IconService.IconConverter.toBigNumber(1))
          .version(IconService.IconConverter.toBigNumber(3))
          .timestamp((new Date()).getTime() * 1000)
          .method(method)

        // Optional "params" field
        if (Object.keys(params).length !== 0) {
          callTransactionBuilder = callTransactionBuilder.params(params)
        }

        const transaction = new IconService.SignedTransaction(callTransactionBuilder.build(), wallet)
        const result = this._iconService.sendTransaction(transaction).execute()
        resolve(result)
      } catch (err) {
        reject(err)
      }
    })
  }

  __icxTransactionBuild(from, to, value, stepLimit) {
    return new IconService.IconBuilder.IcxTransactionBuilder()
      .from(from)
      .to(to)
      .value(IconService.IconAmount.of(value, IconService.IconAmount.Unit.ICX).toLoop())
      .stepLimit(IconService.IconConverter.toBigNumber(stepLimit))
      .nid(IconService.IconConverter.toBigNumber(this._nid))
      .version(IconService.IconConverter.toBigNumber(3))
      .timestamp((new Date()).getTime() * 1000)
      .build()
  }

  __icxCallTransactionBuild(from, to, value, stepLimit, method, params) {
    let callTransactionBuilder = new IconService.IconBuilder.CallTransactionBuilder()
      .from(from)
      .to(to)
      .value(IconService.IconConverter.toHex(IconService.IconAmount.of(value, IconService.IconAmount.Unit.ICX).toLoop()))
      .stepLimit(IconService.IconConverter.toBigNumber(stepLimit))
      .nid(IconService.IconConverter.toBigNumber(this._nid))
      .nonce(IconService.IconConverter.toBigNumber(1))
      .version(IconService.IconConverter.toBigNumber(3))
      .timestamp((new Date()).getTime() * 1000)
      .method(method)

    // Optional "params" field
    if (Object.keys(params).length !== 0) {
      callTransactionBuilder = callTransactionBuilder.params(params)
    }

    return callTransactionBuilder.build()
  }

  __icxTransaction(wallet, to, value) {
    const transaction = this.__icxTransactionBuild(wallet.getAddress(), to, value, 100000)
    return new Promise((resolve, reject) => {
      try {
        const signedTransaction = new IconService.SignedTransaction(transaction, wallet)
        const result = this._iconService.sendTransaction(signedTransaction).execute()
        resolve(result)
      } catch (err) {
        reject(err)
      }
    })
  }

  async __txResult(txHash, retriesLeft = 1000, interval = 100) {
    try {
      return await this._iconService.getTransactionResult(txHash).execute()
    } catch (error) {
      if (retriesLeft) {
        await new Promise((resolve, reject) => setTimeout(resolve, interval))
        return this.__txResult(txHash, retriesLeft - 1, interval)
      } else throw new UnconfirmedTransaction(txHash)
    }
  }
}

export const api = new API(SCORE_NETWORK)
