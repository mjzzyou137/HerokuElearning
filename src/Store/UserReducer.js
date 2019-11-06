import { FETCH_USER_LOGIN, USER_LOG_OUT } from "./Actions/Type";

const initalState = {
    user:{}, 
};

const UserReducer = (state=initalState,action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN: 
        state.user = action.payload;  
        return {...state}  
        default:
            return state;
    }
}

export default UserReducer;