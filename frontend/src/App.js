import React, {useState, useEffect} from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';
import firebase from './firebaseConfig';
import {useDispatch, useSelector} from 'react-redux';
import Nav from './Components/Nav/Nav';
import CategoryNav from "./Components/Nav/CategoryNav";
import Form from "./Containers/Forms/SignUp";
import HomePage from './Views/HomePage/Home';
import ProfilePage from './Views/Profile/Profile';
import AddProductPage from './Views/AddProductPage/AddProduct';
import SignIn from './Containers/Forms/SignIn';
import AdminSignUpPage from "./Containers/Forms/AdminSignUp";
import UnauthorizedPage from "./Views/ErrorPage/Unauthorized";
import CustomersPage from "./Views/CustomersPage/Customers";
import ProductsPage from "./Views/ProductsPage/Products";
import ProductsBy from "./Views/ProductsPage/ProductsBy";
import {initAuth} from "./Store/Actions/users";
import './App.css';
import { getProducts } from './Store/Actions/products';
import Footer from "./Components/Footer/Footer";
function App(props) {
  const [admin, setAdmin] = useState(false);
  const [home, setHome] = useState(null)
  const loggedIn = useSelector(state => state.user.loggedIn)
  const dispatch = useDispatch();

  useEffect(() => {
    {props.match.path === "/product" ? setHome(false) : dispatch(getProducts())}
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { email, uid } = user;
        console.log(user)
          firebase.auth()
          .currentUser.getIdToken()
          .then((idToken) => {
            if(idToken) {
              dispatch(initAuth(email, uid, idToken));
              // setAdmin(true);
            } else {
              console.log("no token")
              // setAdmin(false)
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    });
    return () => {
      console.log("unsubscribe ");
    };
  }, [ dispatch, loggedIn]);

let adminRoutes = (
  <Switch>
    <Route exact path="/admin/customers" component={CustomersPage}/>
    <Route exact path='/admin/addproduct' component={AddProductPage}/>
  </Switch>
)
  return (
    <main>
      <Nav/>
      {/* <CategoryNav/> */}

        <main className="wrapper">
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/products' component={ProductsPage} />
          <Route exact path='/profile/:firebase_id/orders' component={ProfilePage} />
          <Route exact path="/product/" component={ProductsBy}/>
          <Route exact path='/register' component={Form}/>
          <Route exact path="/signin" component={SignIn}/>
          <Route exact path='/admin/register' component={AdminSignUpPage}/>

          {/* ROUTES BELOW THIS LINE WILL BE ADMIN ONLY */}

         {admin ? adminRoutes : <UnauthorizedPage/>}
          </Switch>
        </main>
      <Footer/>
    </main>

  );
}

export default withRouter(App);