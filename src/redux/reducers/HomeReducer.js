
// import { Action_type } from "../../constant/Action_type";
import { Action_type } from "../../constant/Action_type";
const { FETCH_API_SUCCESSFULLY,
     } = Action_type


const intialState = {
    userData:[],

}
// SET_USER_CREDENTIAL
const HomeReducer = (state = intialState, action) => {
 
    switch (action.type) {
        case FETCH_API_SUCCESSFULLY:
          console.log("action.payload",action.payload)
            return {
                ...state,
                userData: action.payload
            }
        
        default:
            return state;
    }
}
export { HomeReducer }