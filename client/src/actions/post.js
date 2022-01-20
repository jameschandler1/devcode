import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
} from './types';

//get posts
export const getPosts = () => async dispatch => {
    try {
        const response = await axios.get('/api/posts');
        dispatch({
            type: GET_POSTS,
            payload: response.data
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

//add like 
export const addLike = postId => async dispatch => {
    try {
        const response = await axios.put(`/api/posts/like/${postId}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: {
                postId,
                likes: response.data
            }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

//remove like 
export const removeLike = postId => async dispatch => {
    try {
        const response = await axios.put(`/api/posts/unlike/${postId}`);
        dispatch({
            type: UPDATE_LIKES,
            payload: {
                postId,
                likes: response.data
            }
        });
    } catch (err) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

