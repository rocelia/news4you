import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile';
import { BrowserRouter as Link } from 'react-router-dom';
import { databaseBase, firebase } from './base'
import logo from './img/logo.png';

class App extends Component {
  constructor() {
    super()
    this.state = {
      authenticated: false,
      hideSignUpForm: false,
      showFilters: false,
      showSaved: false,

    }
  }

  handleCreateUserEmailChange = (event) => {
    this.setState({ createUserEmail: event.target.value });
  }

  handleCreateUserPasswordChange = (event) => {
    this.setState({ createUserPassword: event.target.value });
  }

  handleLoginEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  }

  handleLoginPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  }

  createUser = (event) => {
    event.preventDefault()
    const promise = firebase.auth().createUserWithEmailAndPassword(this.state.createUserEmail, this.state.createUserPassword)
    // promise.catch(e => console.log(e.message))
    promise.catch(e => {
      console.log(e.message)
      this.setState({
        error: e.message
      })
      setTimeout(() => {
        this.setState({
          error: ""
        })
      }, 3000)
    })
  }

  signInBtn = () => {
    this.setState({
      hideSignUpForm: true
    });

  }

  signIn = (event) => {
    event.preventDefault()
    const promise = firebase.auth().signInWithEmailAndPassword(this.state.signInEmail, this.state.signInPassword)
    // promise.catch(e => console.log(e.message))
    promise.catch(e => {
      console.log(e.message)
      this.setState({
        error: e.message
      })
      setTimeout(() => {
        this.setState({
          error: ""
        })
      }, 3000)
    })
  }

  signOut = () => {
    firebase.auth().signOut()
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        console.log(firebaseUser);
        this.setState({
          authenticated: true,
          uid: firebaseUser.uid
        })
        var string = `/to-do-list`
        databaseBase.syncState(string, {
          context: this,
          state: 'items',
          asArray: true,
          keepKeys: true,
          queries: {
            orderByChild: 'uid',
            equalTo: this.state.uid
          }
        });
      } else {
        console.log('not logged in');
        this.setState({ authenticated: false })
      }
    })
  }

  showFilters = () => {
    this.setState({
      showFilters: true,
      showSaved: false,
    });
  }

  showSaved = () => {
    this.setState({
      showSaved: true,
      showFilters: false
    });
  }

  back = () => {
    this.setState({
      showSaved: false,
      showFilters: false
    });
  }

  render() {

    const showSignUpForm = this.state.hideSignUpForm ? { display: 'none' } : {};

    return (
      <div className="Body">

        {/* Authentication  */}
        <div>

          {/* new user [sign up/creater user form] */}
          {this.state.authenticated === false &&
            <div className="sign-up-form" style={showSignUpForm}>

              <h1 className="homePage-title">News4You</h1>
              <p className="description">bringing you the stuff you really want to know.</p>
              <form className="new-user-form" onSubmit={this.createUser}>
                <h3 className="welcome animated fadeIn">Welcome</h3>
                <input className="new-user-email-input animated fadeIn" placeholder="Email" value={this.state.value} onChange={this.handleCreateUserEmailChange} type="email" required></input>
                <input className="new-user-pw-input animated fadeIn" placeholder="Password" value={this.state.value} onChange={this.handleCreateUserPasswordChange} type="password" required></input>
                <button className="new-user-submit-btn animated fadeIn" type="submit">Create Account</button>
                {/* <input value={this.state.value} onChange={this.handleCreateUserEmailChange} type="email" placeholder="Email" required></input>
                <input value={this.state.value} onChange={this.handleCreateUserPasswordChange} type="password" placeholder="Password" required></input>
                <button id="sign-up-button" type="submit">Sign Up</button> */}
              </form>

              <p className="sign-in-btn animated fadeIn" onClick={this.signInBtn}>Sign In</p>


              {/* <form id="sign-in-form" onSubmit={this.signIn}>
                <h2>Sign in</h2>
                <input value={this.state.value} onChange={this.handleLoginEmailChange} type="email" placeholder="Email" required></input>
                <input value={this.state.value} onChange={this.handleLoginPasswordChange} type="password" placeholder="Password" required></input>
                <button id="signIn-button" type="submit">Log In</button>
              </form>

              <p id="errors">{this.state.error}</p> */}

            </div>
          }

          {/* existing user log in form [shown onClick of sign-in-btn^] */}
          {this.state.hideSignUpForm === true &&
            this.state.authenticated === false &&
            <div>
              <h1 className="homePage-title">News4You</h1>
              <form className="sign-in-form" onSubmit={this.signIn}>
                <div className="sign-in-nav-grid">
                  <a className="uk-margin-large-right animated bounceInUp back-btn" uk-icon="chevron-left" href="/"></a>
                  <h3 className="sign-in-msg animated bounceInUp">Sign In</h3>
                </div>
                <input className="sign-in-email-input animated bounceInUp" value={this.state.value} onChange={this.handleLoginEmailChange} type="email" placeholder="Email" required></input>
                <input className="sign-in-pw-input animated bounceInUp" value={this.state.value} onChange={this.handleLoginPasswordChange} type="password" placeholder="Password" required></input>
                <button className="submit-sign-in animated bounceInUp" type="submit">Continue</button>
              </form>
            </div>
          }

        </div>

        {/* Errors  */}
        {/* {
          (this.state.authenticated === false)
            ? <div className="status">status <span className="status-red">not authenticated</span></div>
            : <div className="status">status <span className="status-green">authenticated</span></div>
        } */}

        {this.state.authenticated === true &&
          this.state.showFilters === false &&
          this.state.showSaved === false &&
          <div className="clientView">

            <div className="top-navi">
              <img className="logo" src={logo}></img>

              <div className="top-right">
                <span className="search" uk-icon="search"></span>
                <Link to={"/profile/"}>
                  <span className="user" uk-icon="user"></span>
                </Link>
              </div>

            </div>
            
            <h1 className="homePage-title">News4You</h1>

            <Dashboard
              uid={this.state.uid}
              items={this.state.items}
            />

          </div>
        }

        {
          this.state.authenticated === true &&
          this.state.showFilters === true &&
          <div>
            <h1>Filters</h1>
            <button onClick={this.back}>back</button>
            <button id="sign-out-button" onClick={this.signOut}>Log Out</button>
          </div>
        }

        {
          this.state.authenticated === true &&
          this.state.showSaved === true &&
          <div>
            <h1>Your Saved Articles</h1>
            <button onClick={this.back}>back</button>
          </div>
        }

      </div >
    );
  }
}

export default App;
