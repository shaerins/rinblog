import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogout, startLogin } from '../actions/auth'

const MenuItems = ({ isAuthenticated, startLogin, startLogout, showOnDesktop }) => {
    const itemClass = showOnDesktop ? 'item desktop' : 'item'

    return (
        <>
            {isAuthenticated
                ? (
                    <>
                        <Link className={itemClass} to='/'>Home</Link>
                        <Link className={itemClass} to='/me'>Your Posts</Link>
                        <Link className={itemClass} to='/create'>Create Post</Link>
                        <a className={itemClass} onClick={startLogout}>Logout</a>
                    </>
                )
                : (
                    <a className={itemClass} onClick={startLogin}>Login</a>
                )
            }
            <a href='https://github.com/shaerins' className={itemClass} target='_blank'>
                <i className='code icon' />
            </a>
        </>
    )
}

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout()),
    startLogin: () => dispatch(startLogin())
})

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuItems)