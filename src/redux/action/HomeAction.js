
import { Action_type } from "../../constant/Action_type";
import axios from "axios";
export const hitApi = () => {
    return async (dispatch) => {
        try {

            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify([{
                    title: 'shashi',
                },
                {
                    title: 'ranjan',
                }]
                ),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    var arr = Object.values(data)
                    arr.pop()
                    return (
                        dispatch({
                            type: Action_type.FETCH_API_SUCCESSFULLY,
                            payload: arr
                        })
                    )
                }

                );
        } catch (error) {
            dispatch({
                type: Action_type.SET_API_FETCH_ERROR,
                payload: error
            })
        }
    }
}
export const sendDataToApi = (bodyData, userData) => {
    console.log("action",userData)
    return async (dispatch) => {
        try {

            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify(bodyData),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                     let arr=[...userData, ...Object.values(data)]
                       arr.pop()
                    return (
                        dispatch({
                            type: Action_type.FETCH_API_SUCCESSFULLY,
                            payload: arr
                        })
                    )
                }

                );
        } catch (error) {
            dispatch({
                type: Action_type.SET_API_FETCH_ERROR,
                payload: error
            })
        }
    }
}


