import React from 'react';
import { useDispatch } from "react-redux";
import ProcessXlsxForm from "../../components/ProcessXlsxForm";
import { setOrderNumbers, setSheetNumber, setSkipRows, processXlsxForm } from "../../store/ProcessXlsxForm/actions";
import {Descriptions, Divider, Space, Typography} from 'antd';

const {Title} = Typography;

const Airate: React.FC = () => {
    const dispatch = useDispatch();

    const callbacks = {
        setOrderNumbers: (...args: Parameters<typeof setOrderNumbers>) => dispatch(setOrderNumbers(...args)),
        setSheetNumber: (...args: Parameters<typeof setSheetNumber>) => dispatch(setSheetNumber(...args)), 
        setSkipRows: (...args: Parameters<typeof setSkipRows>) => dispatch(setSkipRows(...args)), 
        processXlsxForm: (...args: Parameters<typeof processXlsxForm>) => dispatch(processXlsxForm(...args))
    }

    const apiEndpoint = "/airate/"

    return (
        <>
            <Space size="large" direction="vertical" align="center" style={{width: 700}}>
                <Title level={2}>Airate: поправить комиссии</Title>
                <ProcessXlsxForm
                    callbacks={callbacks}
                    apiEndpoint={apiEndpoint}
                />
            </Space>
            <Divider></Divider>
            <Space>
                <Descriptions title="Как этим пользоваться:" column={1}>
                    <Descriptions.Item>0. Загружаем список order_numbers, у которых надо взять комиссии из отчёта, по одному order_number на строку.</Descriptions.Item>
                    <Descriptions.Item>1. Прописываем номер листа в XLSX-отчёте, а также сколько строчек в отчёте пропустить.</Descriptions.Item>
                    <Descriptions.Item>2. Нажимаем “Generate a CSV file for stats admin.”</Descriptions.Item>
                    <Descriptions.Item>3. Загружаем XLSX-отчёт партнёра.</Descriptions.Item>
                    <Descriptions.Item>4. В ответ придёт CSV-файл для stats-admin.</Descriptions.Item>
                </Descriptions>
            </Space>
        </>
    )
};

export default Airate;