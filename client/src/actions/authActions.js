import { persistor } from "../redux/store";

export const logout = () => (dispatch) => {
    dispatch({ type: 'LOGOUT' });  // Dispatch the LOGOUT action to reset the Redux state
    persistor.purge();  // Clear the persisted state from localStorage or sessionStorage
};