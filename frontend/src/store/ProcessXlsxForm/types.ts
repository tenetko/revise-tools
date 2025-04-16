export type paramsSetOrderNumbers = Parameters<(orderNumbers: any) => void>;

export type paramsSetSheetNumber = Parameters<(sheetNumber: any) => void>;

export type paramsSetSkipRows = Parameters<(skipRows: any) => void>;

export type paramsProcessXlsxForm = Parameters<({ formData }: {
    formData: FormData
    clientConfig: object
    onSuccess: any
    onError: any
    apiEndpoint: string
}) => void>;

export interface callPostResponse {
    data: string
    status: number
    request: XMLHttpRequest
}
