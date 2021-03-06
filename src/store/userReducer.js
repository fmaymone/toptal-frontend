import * as UserActions from '../store/actions/userActions'



// We are dividing the reducers using a technique called Reducer composition.
// By doing this we are seperating the reducer for the Collection and the Individual Item


//The collection Reducer, It handles only the collection

export function UserListReducer(state = [], action) {
    switch (action.type) {

        // The cases ordered in CRUD order.

        // Create
        case UserActions.CREATE_USER_SUCCESS: {
                return [
                    ...state,
                    action.user
                ];
        }
            
        //Read    
        case UserActions.GET_USERS_SUCCESS: {
            
            return action.users;

        }

        case UserActions.GET_USER: {
            return { 
                ...state, 
                loadingUsers: action.loadingUsers
            };
        }
        
        // The following Cases handle the data by mapping it. Mostly because they are related with the modification of a single Data
        
        //Update    
        case UserActions.START_EDITING_USER: {
            
            return state.map(s => user(s, action))

        }
        case UserActions.CANCEL_EDITING_USER: {
            
            return state.map(s => user(s, action))

        }
        case UserActions.UPDATE_USER: {

            return state.map(s => user(s, action))
            
        }
        case UserActions.UPDATE_USER_SUCCESS: {

            return state.map(s => user(s, action))

        }
        
        //Delete    
        case UserActions.DELETE_USER: {

            return state.map(s => user(s, action))

        }
        case UserActions.DELETE_USER_SUCCESS: {

            return state.filter(s => user(s, action))

        }
            
        default:
            return state
    }
}


//The individual Reducer. It handles only one User Object.


const user = (state, action) => {

    // If the mapped user of the previous state matches with the new ID of the action, 
    // Only then proceed to the Reducer Switch case

    if (state._id !== (action._id || action.user._id)) {
        return state;
    }

    switch (action.type) {

        // Edit/modifies the individual Users using ES6 spread operator. The cases are self explanatory.

        case UserActions.START_EDITING_USER:
            {
                return {
                    ...state,
                    editing: true
                }
            }

        case UserActions.CANCEL_EDITING_USER:
            {
                return {
                    ...state,
                    editing: false
                }
            }

        case UserActions.UPDATE_USER:
            {
                return {
                    ...state,
                    editing: false,
                    updating: true
                }
            }

        case UserActions.UPDATE_USER_SUCCESS:
            {
                return {
                    ...state,
                    user: action.user,
                    updating: false
                }
            }

        case UserActions.DELETE_USER:
            {
                return {
                    ...state,
                    deleting: true
                }
            }

        case UserActions.DELETE_USER_SUCCESS:
            {
                return false
            }

        default:
            {
                return state;
            }
    }
}