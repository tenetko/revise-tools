import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Input, InputNumber, message, Space, Upload } from 'antd';
import { RootState } from '../../store/rootReducer';
import { paramsSetOrderNumbers, paramsSetSheetNumber, paramsSetSkipRows, paramsProcessXlsxForm } from '../../store/ProcessXlsxForm/types';

const { TextArea } = Input; 

interface Callbacks {
    setOrderNumbers: (...args: paramsSetOrderNumbers) => void,
    setSheetNumber: (...args: paramsSetSheetNumber) => void,
    setSkipRows: (...args: paramsSetSkipRows) => void,
    processXlsxForm: (...args: paramsProcessXlsxForm) => void
}

interface Props {
    callbacks: Callbacks
    apiEndpoint: string
}

const ProcessXlsxForm: React.FC<Props> = (props) => {
    const { callbacks, apiEndpoint } = props
    const { setOrderNumbers, setSheetNumber, setSkipRows, processXlsxForm } = callbacks

    const orderNumbersHandler = (data: any) => {
        const orderNumbers: string[] = data.target.value
            .split('\n')
            .filter((value: string) => value !== '')
            .map((value: string) => value.trim());

        setOrderNumbers({ orderNumbers })
    };

    const sheetNumberHandler = (data: any) => {
        const sheetNumber: string = data;

        setSheetNumber({ sheetNumber })
    };

    const skipRowsHandler = (data: any) => {
        const skipRows: string = data;

        setSkipRows({ skipRows })
    };

    const draggerParams  = {
        name: 'file',
        accept: '.xlsx, .xls',
        multiple: false,
        // @ts-ignore
        customRequest({ file, onError, onProgress, onSuccess }) {
            const formData = new FormData();

            const sheet_number = sheetNumber == null
                ? 1
                : sheetNumber.sheetNumber;

            const skip_rows = skipRows == null
                ? 0
                : skipRows.skipRows;

            if (orderNumbers != null) {
                formData.append('order_numbers', orderNumbers.orderNumbers);
                formData.append('sheet_number', sheet_number);
                formData.append('skip_rows', skip_rows);
                formData.append('file', file);

                const clientConfig = {
                    onUploadProgress: ({ total, loaded }: { total: number, loaded: number }) => {
                        onProgress({ percent: Number(Math.round(loaded / total * 100).toFixed(2)) })
                    }
                };
                
                processXlsxForm({ formData, clientConfig, onSuccess, onError, apiEndpoint })
            } else {
                message.error("The order numbers list should not be empty")
            }

        }
    };

    const orderNumbers = useSelector((state: RootState): any => state.setOrderNumbers)
    const sheetNumber = useSelector((state: RootState): any => state.setSheetNumber)
    const skipRows = useSelector((state: RootState): any => state.setSkipRows)

    return (
        <>
            <Space size="large" direction="horizontal" align="start">

                <Space size="small" direction="vertical" align="center">
                    <div>Order numbers:</div>
                        <TextArea
                            style={{ maxWidth: 400 }}
                            rows={ 10 }
                            onChange = { orderNumbersHandler }
                            allowClear
                        />
                    
                </Space>

                <Space size="small" direction="vertical" align="end">

                    <Space size="small" direction="horizontal" align="end">
                        <div>Sheet number (starting from 1):</div>
                        <InputNumber
                            defaultValue = {1}
                            onChange = { sheetNumberHandler } 
                    />
                    </Space>

                    <Space size="small" direction="horizontal" align="end">
                        <div>Skip rows:</div>
                        <InputNumber
                            defaultValue = {0}
                            onChange = { skipRowsHandler } 
                    />
                    </Space>

                    <Space size="small" direction="vertical" align="center">
                        <Upload { ...draggerParams } >
                                <Button type="primary" size="large">
                                    <p className="ant-upload-text">Generate a CSV file for stats-admin</p>
                                </Button>
                        </Upload>
                    </Space>

                </Space>

            </Space>

        </>
    )
};

export default ProcessXlsxForm;