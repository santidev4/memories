import * as api from "../api";

// Action Creators => son funciones que retornan acciones

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();

        dispatch({
            type: 'FETCH_ALL',
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

        dispatch({type: 'CREATE', payload: data})
    } catch (error) {
        console.log('error', error)
    }
}