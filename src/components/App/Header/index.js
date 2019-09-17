import React from 'react'
import { connect } from 'react-redux'
import styles from './Header.module.scss'
import Login from './Login'

const Header = () => {

    return (
        <div className={styles.root}>
            <div className={styles.title}>ICON Multisig Wallet Manager</div>
            <Login />
        </div>
    )
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
