import React, {useState, useEffect} from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';
import firebase from './firebaseConfig';
import {useDispatch, useSelector} from 'react-redux';
import Nav from './Components/Nav/Nav';
import Form from "./Containers/Forms/SignUp";
import HomePage from './Views/HomePage/Home';
import ProfilePage from './Views/Profile/Profile';
import SignIn from './Containers/Forms/SignIn';
import AdminSignUpPage from "./Containers/Forms/StoreForms/AdminSignUp";
import UnauthorizedPage from "./Views/ErrorPage/Unauthorized";
import ProductsPage from "./Views/ProductsPage/Products";
import ProductsBy from "./Views/ProductsPage/ProductsBy";
import ProductDetailsPage from "./Views/ProductsPage/ProductDetails";
import StoreManagerPage from "./Views/StoreManagerPage/AdminConsole";
import AgentPage from "./Views/AgentPage/AgentPage";
import CartPage from "./Views/Cart/Cart";
import AgentSignUp from "./Containers/AgentOnboarding/AgentMultiStep";
import {initAuth} from "./Store/Actions/users";
import {getProducts} from "./Store/Actions/products";
import './App.css';
import Footer from "./Components/Footer/Footer";
import EmployeeSignIn from './Containers/Forms/EmployeeSignIn';
import { CircularProgress } from '@material-ui/core';

function App(props) {
  const loggedIn = useSelector(state => state.user.loggedIn)
  const admin = useSelector(state => state.user.admin)
  const agent = useSelector(state => state.user.agent)

  const dispatch = useDispatch();
// console.log("is admin", admin)
  useEffect(() => {
    // {props.match.path === "/products" ? setHome(false) : dispatch(getProducts())}

      // if (loggedIn) {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            const { email, uid } = user;
              firebase.auth()
              .currentUser.getIdToken()
              .then((idToken) => {
                if(idToken) {
                  if (props.match.path === "/") {
                    dispatch(initAuth(email, uid, idToken));
      
                 }
                } else {
                  console.log("no token")
                }
              })
              .catch((err) => {
                console.log(err.message);
              });
          }
        })
        dispatch(getProducts())
      //  }
    return () => {
      console.log("unsubscribe ");
    };
  }, [dispatch, props.match.path ]);

let adminRoutes = (
  <Switch>
     <Route  exact path='/storemanager/:firebase_id' component={StoreManagerPage} />

  </Switch>
)
  return (
    <div className="page-container">
     
      {/* <CategoryNav/> */}
      <Nav/>
        <main className="wrapper">
        
        <Switch>
        <Route exact path='/agent/register' component={AgentSignUp}/>

        <Route exact path='/profile/:id/cart' component={CartPage}/>

        <Route exact path='/product/:id' component={ProductDetailsPage} />
        <Route exact path='/admin/register' component={AdminSignUpPage}/>
        <Route exact path='/cart/:id' component={CartPage}/>

          <Route exact path="/product/" component={ProductsBy}/>
          <Route exact path='/register' component={Form}/>
          <Route  path='/profile/:firebase_id' component={ProfilePage} />

          <Route exact path="/signin" component={SignIn}/>
          <Route exact path="/portal/signin" component={EmployeeSignIn}/>

          <Route exact path="/chfagent" component={AgentPage}/>

          <Route exact path='/' component={HomePage} />
          <Route exact path='/products' component={ProductsPage} />

          {/* <Route exact path='/admin/addproduct' component={AddProductPage}/> */}

          {/* ROUTES BELOW THIS LINE WILL BE ADMIN ONLY */}
          <Route  exact path='/storemanager/:firebase_id' component={StoreManagerPage} />

         {/* {loading ? <CircularProgress/> admin || agent? adminRoutes : } */}
          </Switch>
          
        </main>
        <Footer/>
    </div>

  );
}

export default withRouter(App);