import { FETCH_ALL, CREATE, DELETE, LIKE, UPDATE} from "../constants/actionTypes"
import * as api from "../api";

// Action Creators => son funciones que retornan acciones

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();

        dispatch({
            type: FETCH_ALL,
            payload: data
        })
        
    } catch (error) {
        console.log(error.message)
    }
};

// export function getPosts(){
//     return async function(dispatch){
//         try {
//             const { data } = await api.fetchPosts();
            
//             dispatch({
//                 type: 'FETCH_ALL',
//                 payload: data
//             })
            
//         } catch (error) {

//             console.log(error.message);
            
//         }
//     }
// };

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({type: CREATE, payload: data})
    } catch (error) {
        console.log('error', error)
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({type: UPDATE, payload: data})
    } catch (error) {
        console.log(error)
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id)
            .then((res) => res)
            .catch((err) => err)

        dispatch({type: DELETE, payload: id})
    } catch (error) {
        console.log(error)
    };
};

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({type: LIKE, payload: data})
    } catch (error) {
        console.log(error)
    }
}