export default function createReducer (store = null,appController = null, reducers={}){

  const reducer = (state,actionObject)=>{
    try{
      //return new state returned from action reducer
      return reducers[actionObject.type](state,actionObject.payload,appController);
    } catch(e){
      //returning the input state without changes in case of error in reducing
      return state;
    }
  }

  // to register an action reducer
  const registerReducer = (action,reducerFunction)=>{
    //todo: should check if action is already present
    reducers[action] = reducerFunction;
  }

  const setStore = newStore=>{
    store = newStore;
  }

  const setController = (controller) => {
    appController = controller;
  }

  return {
    reducer: reducer,
    registerReducer: registerReducer,
    setStore: setStore,
    setController: setController
  }
}
