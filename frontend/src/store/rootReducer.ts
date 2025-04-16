import { combineReducers } from "redux";
import { setOrderNumbersReducer, setSheetNumberReducer, setSkipRowsReducer } from "./ProcessXlsxForm/reducers";

const reducers = {
    setOrderNumbers: setOrderNumbersReducer,
    setSheetNumber: setSheetNumberReducer,
    setSkipRows: setSkipRowsReducer
};

const rootReducer = combineReducers(reducers);

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;