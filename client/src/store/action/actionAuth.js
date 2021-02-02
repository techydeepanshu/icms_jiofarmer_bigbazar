import axios from "axios"

export const AUTH = 'AUTH'
export const FETCH_USER = 'FETCH_USER'
// export const HANDLE_TOKEN = 'HANDLE_TOKEN'

export const auth = (details) => {
    return {
        type: AUTH,
        userDetails: details
    }
}

export const authFetchUser = (data) => {
    return {
        type: FETCH_USER,
        userDetails: data
    }
}

export const authenticate = () => {
    return dispatch => {
        // axios
        //   .get("/auth/login")
        //   .then((res) => {
        //     console.log(res);
            dispatch(auth("res"));
        //   })
        //   .catch((err) => console.log(err));
    }
}

// export const inventoryData = () => {
//     return {
//         type: 
//     }
// }

export const fetchUser = () => {
    return dispatch => {
        axios
          .get("/api/current_user")
          // export const stripeToken  = (data) => {
          //     return {
          //         type : HANDLE_TOKEN,
          //         payload: data
          //     }
          // }

          .then((res) => {
            console.log("User Data:", res.data._id);
            dispatch(authFetchUser("res.data"));
          });
    }
}

export const fetchInventoryData = (imagePath) => {
    return dispatch => {
        axios.post('/api/read-value', imagePath)
        .then(res => {
            console.log("successful!! HANDLE TOKEN  data is",res.data)
            dispatch(authFetchUser(res.data))
        })
        .catch(err => console.log(err))
    }
}