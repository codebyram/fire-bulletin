import actions from '../helpers/actions';

export default function userReducer(reducerObj){

  reducerObj.registerReducer(actions.SHOW_LOG_IN,(state,payload,controller)=>{
    return {
      user: null,
      showSignUp: false,
    }
  });

  reducerObj.registerReducer(actions.INIT_LOG_IN,(state, payload, controller)=>{
    controller.logIn(payload)
    return {
      fetchingLogin : true
    }
  });

  reducerObj.registerReducer(actions.LOG_IN_SUCCESS,(state, payload, controller)=>{
    return {
      user: payload
    }
  });

  reducerObj.registerReducer(actions.SHOW_SIGN_UP,(state,payload,controller)=>{
    return {
      user: null,
      showSignUp: true,
    }
  })
}
