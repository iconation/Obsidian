import {
  ERROR_MESSAGE_UPDATED,
  INFO_MESSAGE_UPDATED,
  UPDATE_OWNERS_LIST,
  UPDATE_LOGGED_WALLET
} from 'store/actions/actionTypes'

const initialState = {
  errorMessage: null,
  infoMessage: null,
  loggedWallet: null,
  owners: []
}

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case ERROR_MESSAGE_UPDATED:
      return { ...state, errorMessage: action.errorMessage }
    case INFO_MESSAGE_UPDATED:
      return { ...state, infoMessage: action.infoMessage }
    case UPDATE_LOGGED_WALLET:
      return { ...state, loggedWallet: action.loggedWallet }
    case UPDATE_OWNERS_LIST:
      return { ...state, owners: action.owners }
    default:
      return state
  }
}
export default rootReducer
