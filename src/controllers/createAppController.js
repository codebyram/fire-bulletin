import actions from '../helpers/actions';

export default function createAppController(store,app) {
  let controllers = {}
  controllers.signUp = payload =>{

  }
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

  }

  controllers.post = payload =>{

  }

  controllers.fetchPosts = payload => {

  }

  return controllers;

}
