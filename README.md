<p align="center">
  <img 
    src="https://iconation.team/images/very_small.png" 
    width="120px"
    alt="ICONation logo">
</p>

<h1 align="center">Obsidian - ICONation MultiSig GUI Wallet</h1>

 [![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)


## Definition & Purpose

A Multi Signature Wallet is a SCORE that enables more than one user to manage their ICON funds safely. Such wallet can prevent one person from running off with the stored ICX or tokens and reduce the risk in case of one person is incapacitated or loses their keys.

## How To Use
### Definition

#### Wallet
SCORE in which ICX and tokens are stored in. Stored ICX and tokens can be used (transferred) only when the wallet conditions declared internally are satisfied.

#### Wallet owner
Addresses who have participation rights of the Wallet SCORE. 

#### Transaction
Initiated by a wallet owner, a transaction changes the wallet state (e.g., transfer tokens or ICX stored in the wallet, add a new wallet owner, change requirement of confirmations (2 to 3 -> 3 to 3), etc).

#### Requirement
The number of approvals from the wallet owners required for the transaction to be executed.


Please refer to the official ICON multisig wallet for more information :
https://github.com/icon-project/multisig-wallet


## How To Build : Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
