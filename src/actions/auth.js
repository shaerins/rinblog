import database, { firebase, googleAuthProvider } from '../utilities/firebase'
import { history } from '../routers/AppRouter'

export const login = (uid) => ({
    type: 'LOGIN',
    uid
})

export const startLogin = () => {
    return () => {
        return firebase
            .auth()
            .signInWithPopup(googleAuthProvider)
            .then((res) => {
                if (res.additionalUserInfo.isNewUser) {
                    database.ref('users/' + res.user.uid + '/user_info').set({
                        display_name: res.user.email
                    })
                }
            })
            .then(() => {
                history.push('/')
            })
    }
}

export const logout = () => ({
    type: 'LOGOUT'
})

export const startLogout = () => {
    return () => {
        return firebase.auth().signOut()
    }
}

export const editProfile = (updates) => ({
    type: 'EDIT_PROFILE',
    updates
})

export const startEditProfile = (updates) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid
        return database.ref(`users/${uid}/user_info`).update(updates).then(() => {
            dispatch(editProfile(updates))
        })
    }
}