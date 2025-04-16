import { action } from 'typesafe-actions';
import { paramsSetOrderNumbers, paramsSetSheetNumber, paramsSetSkipRows, paramsProcessXlsxForm } from "./types";

export enum ActionTypes {
    SET_ORDER_NUMBERS = "SET_ORDER_NUMBERS",
    SET_SHEET_NUMBER = "SET_SHEET_NUMBER",
    SET_SKIP_ROWS = "SET_SKIP_ROWS",
    PROCESS_XLSX_FORM_REQUEST = "PROCESS_XLSX_FORM_REQUEST",
    PROCESS_XLSX_FORM_SUCCESS = "PROCESS_XLSX_FORM_SUCCESS",
    PROCESS_XLSX_FORM_FAILURE = "PROCESS_XLSX_FORM_FAILURE"
}

export const setOrderNumbers = (...args: paramsSetOrderNumbers) => action(ActionTypes.SET_ORDER_NUMBERS, ...args)
export const setSheetNumber = (...args: paramsSetSheetNumber) => action(ActionTypes.SET_SHEET_NUMBER, ...args)
export const setSkipRows = (...args: paramsSetSkipRows) => action(ActionTypes.SET_SKIP_ROWS, ...args)
export const processXlsxForm = (...args: paramsProcessXlsxForm) => action(ActionTypes.PROCESS_XLSX_FORM_REQUEST, ...args)