import actions from '../helpers/actions';
import _ from 'lodash';

export default function createAppController(store,app) {
  let controllers = {}
  const postRef = app.db.ref('posts');

  controllers.logIn = (payload) =>{

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
      if(user === null)
        return;
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
    postRef.push(payload);
  }

  controllers.fetchPosts = payload => {
    postRef.orderByChild('created_at').once('value').then((snapshot) => {
      let posts = snapshot.val();
      if(posts) {
        posts = _.map(posts,(post,key) => {
          return {
            ...post,
            id: key
          }
        });
      }
      store.dispatch({
        type: actions.POST_FETCH,
        payload: _.reverse(posts) || []
      });
    });
  }

  controllers.delete = key => {
    app.db.ref('posts/'+key).remove();
  }

  controllers.bindPostListener = () => {
    postRef.orderByChild('created_at').on('child_added',(data)=>{
      let payload = {
        ...data.val(),
        id: data.key
      };
      store.dispatch({
        type: actions.NEW_POST,
        payload: payload
      });
    });

    postRef.orderByChild('created_at').on('child_removed',(data)=>{
      store.dispatch({
        type: actions.DELETE_POST,
        payload: data.key
      });
    });
  }

  app.auth.onAuthStateChanged(user=>{
    if(user === null)
      return;
    store.dispatch({
      type: actions.INIT_FETCH,
      payload: null
    });
    store.dispatch({
      type: actions.LOG_IN_SUCCESS,
      payload: {
        email: user.email
      }
    });
  })

  return controllers;

}
