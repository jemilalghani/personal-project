const INITIAL_STATE={
    color: 'white'
}

const UPDATE_COLOR = "UPDATE_COLOR";

function reducer(state = INITIAL_STATE, action){
    switch(action.type){
        case UPDATE_COLOR:
            return Object.assign({},state,{color:action.payload})
        default: return state
    }
}
export function changeColor(color){
    return {
        type: UPDATE_COLOR,
        payload: color
    }
}
export default reducer;