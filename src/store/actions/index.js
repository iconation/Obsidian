import {
  ERROR_MESSAGE_UPDATED,
  INFO_MESSAGE_UPDATED,
  UPDATE_OWNERS_LIST,
  UPDATE_LOGGED_WALLET
} from './actionTypes'

export const errorMessageUpdated = (errorMessage) => ({ type: ERROR_MESSAGE_UPDATED, errorMessage })
export const infoMessageUpdated = (infoMessage) => ({ type: INFO_MESSAGE_UPDATED, infoMessage })
export const updateOwnersList = (owners) => ({ type: UPDATE_OWNERS_LIST, owners })
export const updateLoggedWallet = (loggedWallet) => ({ type: UPDATE_LOGGED_WALLET, loggedWallet })

export const setErrorMessage = (errorMessage) =>
  async (dispatch, getState) => {
    const { errorMessage: oldError } = getState()
    if (oldError !== errorMessage) {
      dispatch(errorMessageUpdated(errorMessage))
    }
  }

export const setInfoMessage = (infoMessage) =>
  async (dispatch, getState) => {
    const { infoMessage: oldInfo } = getState()
    if (oldInfo !== infoMessage) {
      dispatch(infoMessageUpdated(infoMessage))
    }
  }

export const setOwnersList = (o) =>
  async (dispatch, getState) => {
    dispatch(updateOwnersList(o))
  }

export const setLoggedWallet = (o) =>
  async (dispatch, getState) => {
    dispatch(updateLoggedWallet(o))
  }
