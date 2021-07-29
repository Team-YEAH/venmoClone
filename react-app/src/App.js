import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import SplashPage from "./components/SplashPage/SplashPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import ProfileSettings from "./components/ProfileSettings/ProfileSettings";
import TransactionsPage  from "./components/TransactionsPage/TransactionsPage";
import PaymentDetailsPage from "./components/PaymentDetailsPage/PaymentDetailsPage";
import PaymentMethodsPage from "./components/PaymentMethodsPage/PaymentMethodsPage";
import TransactionForm from "./components/TransactionForm/TransactionForm";
import IndividualTransactionPageComponent from "./components/IndividualTransactionPage/IndividualTransactionPageComponent";
import FriendsPageComponent from "./components/FriendsPageComponent/FriendsPageComponent";
import AddFriendsFormComponent from "./components/FriendsPageComponent/AddFriendsFormComponent";
import Comments from "./components/Comment/Comment";
import ErrorPage from "./components/404Page/404Page";
import Footer from "./components/Footer/Footer"

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path="/requests" exact={true}>
          <TransactionsPage request={true}/>
        </Route>
        <Route path="/transaction-form" exact={true}>
          <TransactionForm request={false}/>
        </Route>
        <Route path="/transaction-form/request" exact={true}>
          <TransactionForm request={true}/>
        </Route>
        <Route path="/friends" exact={true}>
          <FriendsPageComponent />
        </Route>
        <Route path="/addFriends" exact={true}>
          <AddFriendsFormComponent />
        </Route>
        <Route path="/transaction/:id" exact={true}>
          <IndividualTransactionPageComponent />
          <Comments/>
        </Route>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/profile" exact={true}>
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute path='/paymentdetails' exact={true}>
          <PaymentDetailsPage />
        </ProtectedRoute>
        <ProtectedRoute path='/paymentmethods' exact={true}>
          <PaymentMethodsPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profilesettings" exact={true}>
          <ProfileSettings />
        </ProtectedRoute>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/transactions' exact={true}>
          <TransactionsPage />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <Route path="/" exact={true} >
          <SplashPage />
        </Route>
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
