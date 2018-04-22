import actions from '../helpers/actions';
import _ from 'lodash';

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

  reducerObj.registerReducer(actions.DELETE_POST, (state,payload,controller)=>{
    var posts = _.filter(state.posts,(p)=>{
      return p.id !== payload;
    });
    return {
      ...state,
      posts: posts
    }
  })

}
