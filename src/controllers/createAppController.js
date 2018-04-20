import actions from '../helpers/actions';

export default function createAppController(store,app) {
  let controllers = {}

  controllers.logIn = (payload) =>{
    app.auth.onAuthStateChanged(user=>{
      store.dispatch({
        type: actions.LOG_IN_SUCCESS,
        payload: {
          email: user.email,
          name: user.displayName
        }
      });
    })
    app.auth.signInWithEmailAndPassword(payload.email, payload.password).catch(error=>{
      console.log(error);
    });
  }

  controllers.logOut = payload =>{
    app.auth.signOut().then(()=>{
      store.dispatch({
        type: actions.SHOW_LOG_IN,
        payload: null
      })
    })
  }

  controllers.signUp = payload =>{
    app.auth.onAuthStateChanged(user=>{
      store.dispatch({
        type: actions.LOG_IN_SUCCESS,
        payload: {
          email: user.email,
          name: user.displayName
        }
      });
    })
    app.auth.createUserWithEmailAndPassword(payload.email, payload.password).catch(error => {
      console.log(error);
    });
  }

  controllers.post = payload =>{

  }

  controllers.fetchPosts = payload => {

  }

  return controllers;

}
