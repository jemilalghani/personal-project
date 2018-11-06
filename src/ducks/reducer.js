const INITIAL_STATE={
    color: 'white',
    user: null,
    messages:[],
    image: ''
}

const UPDATE_COLOR = "UPDATE_COLOR";
const USER_LOGIN = "USER_LOGIN";
const USER_MESSAGES = "USER_MESSAGES"
const UPLOAD_IMG ="UPLOAD_IMG";

function reducer(state = INITIAL_STATE, action){
    // console.log(action.payload, action.type)
    switch(action.type){
        case UPDATE_COLOR:
            return Object.assign({},state,{color:action.payload})
        case USER_LOGIN:
            return Object.assign({}, state, {user:action.payload})
        case USER_MESSAGES:
            return {...state, messages: [...action.payload]}
        case UPLOAD_IMG:
            return Object.assign({}, state, {image:action.payload})
        default: return state
    }
}
export function changeColor(color){
    sessionStorage.setItem('color', color)
    return {
        type: UPDATE_COLOR,
        payload: color
    }
}
export function userLogin(user){
    return {
        type: USER_LOGIN,
        payload: user
    }
}
export function userMessage(message){
    return{
        type: USER_MESSAGES,
        payload: message
    }
}
export function uploadImg(image){
    return{
        type: UPLOAD_IMG,
        payload: image
    }
}
export default reducer;