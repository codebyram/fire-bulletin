import actions from '../helpers/actions';

export default function postReducer(reducerObj){

  reducerObj.registerReducer(actions.INIT_FETCH,(state,payload,controller)=>{
    controller.fetchPosts();
    return {
      ...state,
      fetchingPosts: true
    }
  });

  reducerObj.registerReducer(actions.POST_FETCH,(state,payload,controller)=>{
    return {
      ...state,
      posts: payload,
      fetchingPosts: false
    }
  })

  reducerObj.registerReducer(actions.NEW_POST,(state,payload,controller)=>{
    return {
      ...state,
      posts: [
        payload,
        ...state.posts
      ],
      fetchingPosts: false
    }
  })

}
