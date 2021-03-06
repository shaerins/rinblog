import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import PostList from '../components/PostList'
import AddPostPage from '../components/AddPostPage'
import UserForm from '../components/UserForm'
import EditPostPage from '../components/EditPostPage'
import NotFoundPage from '../components/NotFoundPage'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import PostView from '../components/PostView'
import EditProfilePage from '../components/EditProfilePage'
import Header from '../components/Header'
import ScrollToTopOnPageChange from '../components/ScrollToTop'

export const history = createBrowserHistory()

const AppRouter = () => (
    <Router history={history}>
        <>
            <Header history={history} />
            <ScrollToTopOnPageChange />
            <Switch>
                <PublicRoute path='/' component={() => <PostList getAllPosts />} exact={true} />
                <PublicRoute path='/signup' component={() => <UserForm title='Sign Up' />} />
                <PublicRoute path='/login' component={() => <UserForm title='Login' />} />
                <PublicRoute path='/user/:id' component={(props) => <PostList getUserPosts={true} {...props} />} />
                <PublicRoute path='/post/:id' component={PostView} />
                <PrivateRoute path='/me' component={() => <PostList />} />
                <PrivateRoute path='/edit/profile' component={EditProfilePage} />
                <PrivateRoute path='/create' component={AddPostPage} />
                <PrivateRoute path='/edit/:id' component={EditPostPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </>
    </Router>
)

export default AppRouter