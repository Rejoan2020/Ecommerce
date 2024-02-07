import axios from 'axios'
import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
} from '../constants/userConstants'


export const login = (email, password) => async (dispatch) => {
    try{
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            headers:{
                'Content-type':'application/json'
            }
        }
        // console.log(config)
        const {data} = await axios.post( 
            '/api/users/login/',
            {'username':email, 'password':password},
            config
        )
        // console.log('after hitting backend')

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        });
        // console.log(data)
        localStorage.setItem('userInfo', JSON.stringify(data));
        
    }catch (error){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail?
            error.response.data.detail : error.message,
        })
    }
}

export const logout = () => (dispatch) =>{
    localStorage.removeItem('userInfo'); 
    dispatch({ type: USER_LOGOUT })
}