import React,  {Component,useState, useEffect} from 'react'
import { Route, BrowserRouter as Router, Switch, Redirect, useHistory } from 'react-router-dom';
import App from './App';
import Header from './components/header';
import Footer from './components/footer';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import Single from './components/posts/single';
import Search from './components/posts/search';
import Admin from './Admin';
import Create from './components/admin/create';
import Edit from './components/admin/edit';
import Delete from './components/admin/delete';
import Testing from './components/testing';
import jwt_decode from "jwt-decode";
import axiosInstance from './axios';
import HeaderWrapper from './components/headerwrapper';



function AppWrapper() {
    // console.log("appwrapper");
    const history = useHistory();
    const [token_var, setToken_var] = useState(localStorage.getItem('access_token'));
   


    useEffect(() => {
        setToken_var(localStorage.getItem('access_token'))
    });


    const ProtectedRoute = ({ component: Component, ...rest }) => (
        <Route {...rest} render={(props) => (
            // console.log(token_var) && 
            token_var
            ? <Component {...props} />
            : <Redirect to={{
                pathname: '/login',
                state: { from: props.location }
              }} />
        )} 
        />
    );
    // console.log(token_var);
    return (
        <Router>
		<React.StrictMode>
			<Switch>
				{/* {token_var && <ProtectedRoute exact path="/" component={App} />} */}
                <ProtectedRoute exact path="/" component={App} />
				<ProtectedRoute exact path="/admin" component={Admin} />
				<ProtectedRoute exact path="/admin/create" component={Create} />
				<ProtectedRoute exact path="/admin/edit/:id" component={Edit} />
				<ProtectedRoute exact path="/admin/delete/:id" component={Delete} />
				<Route path="/register" component={Register} />
				<Route path="/login" component={Login} />
				<ProtectedRoute path="/logout" component={Logout} />
				<ProtectedRoute path="/post/:slug" component={Single} />
				<ProtectedRoute path="/search" component={Search} />
                <ProtectedRoute path="/testing" component={Testing} />
			</Switch>
			<Footer />
		</React.StrictMode>
	</Router>
    )
}

export default AppWrapper
