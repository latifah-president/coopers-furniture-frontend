import React, {useState, useEffect} from 'react';
import { Route, Switch} from 'react-router-dom';
import firebase from './firebaseConfig';
import {useDispatch} from 'react-redux';
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
import {initAuth} from "./Store/Actions/users";
import { getProducts } from "./Store/Actions/products";
import './App.css';

function App(props) {
  const [admin, setAdmin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts())
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { email, uid } = user;
        console.log(user)
          firebase.auth()
          .currentUser.getIdToken()
          .then((idToken) => {
            if(idToken) {
              dispatch(initAuth(email, uid, idToken));
              setAdmin(true);
            } else {
              setAdmin(false)
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
  }, [dispatch]);

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
          <Route exact path='/register' component={Form}/>
          <Route exact path="/signin" component={SignIn}/>
          <Route exact path='/admin/register' component={AdminSignUpPage}/>

          {/* ROUTES BELOW THIS LINE WILL BE ADMIN ONLY */}

         {admin ? adminRoutes : <UnauthorizedPage/>}
          </Switch>
        </main>
      
    </main>

  );
}

export default App