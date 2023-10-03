import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Select, Button, Card, Row, Col, Descriptions, message,Divider } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import plugins from "suneditor/src/plugins";
import { setCustomDescription, setReportType } from '../../store/slices/certificateSlice';
import { useDispatch } from 'react-redux';


const { Option } = Select;
const Step2Form = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch()
    const [reportVisible, setReportVisible] = useState(false)
    const { certificates, custom_description, report_type } = useSelector((state) => state.certificate);
    const certificateData = certificates.length !== 0 ? certificates[0] : [];
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({ reportType: report_type })
        if (report_type === 'customized') {
            setReportVisible(true)
        }
    }, [])

    const handleReport = (data) => {
        if (data == 'customized') {
            setReportVisible(true)
        } else {
            setReportVisible(false)
        }
    }
    const editorButtons = ["bold",
        "underline",
        "italic",
        "fontSize",
        "hiliteColor",
        "removeFormat",
        "outdent",
        "indent",
        "align",
        "horizontalRule",
        "list",
        "table",
        "fullScreen",]
    const { handleSubmit, control } = useForm();
    const onFinish = (values) => {
        try {

            console.log('Selected Report Type:', values.reportType);
            console.log(control._formValues.description)
            dispatch(setReportType(values.reportType))
            dispatch(setCustomDescription(control._formValues.description))
            messageApi.open({
                type: 'success',
                content: 'confrimed',
            });
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: error,
            });
        }

    };
    return (
        <Card>
            {contextHolder}
            <Form form={form} name="reportForm" layout="vertical" onFinish={onFinish}>

                <Row gutter={16}>
                    <Col span={6}>
                        <Form.Item
                            name="reportType"
                            label="Select Report Type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select a report type',
                                },
                            ]}
                        >
                            <Select placeholder="Select a report type" defaultValue={report_type} onChange={(record) => handleReport(record)}>
                                <Option value="standard">Standard</Option>
                                <Option value="customized">Customized</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={14}>
                        <div>
                            <Form.Item hidden={!reportVisible}>
                                <Form.Item label="Description">
                                    <Controller
                                        name="description"
                                        defaultValue=""
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <SunEditor
                                                setDefaultStyle="font-family: arial; font-size: 12px; background: #fafafa !important; height: auto; position:relative; z-index:0"
                                                onChange={onChange}
                                                value={value}
                                                setContents={custom_description}
                                                setOptions={{
                                                    resizingBar: false,
                                                    resizeEnable: true,
                                                    resizingBarContainer: false,
                                                    height: "auto",
                                                    minHeight: 160,
                                                    historyStackDelayTime: 0,
                                                    plugins: plugins,
                                                    buttonList: [editorButtons],
                                                }}
                                            />
                                        )}
                                    />
                                </Form.Item>


                            </Form.Item>
                        </div>
                    </Col>
                    <Col span={1}>
                    <Divider type='vertical' />
                    </Col>
                    <Col span={8}>
                        <Card hidden={!reportVisible}>
                            {certificates.length !== 0 ? (
                                <Descriptions column={1}>
                                    <Descriptions.Item label={<span className="bold-label">SOL_ID_CERTIFICATE_ISSUE</span>}>
                                        {certificateData['SOL_ID_CERTIFICATE_ISSUE']}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={<span className="bold-label">REFERENCE_NO</span>}>
                                        {certificateData['REFERENCE_NO']}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={<span className="bold-label">CERTIFICATE_TYPE</span>}>
                                        {certificateData['CERTIFICATE_TYPE']}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={<span className="bold-label">CERT_ISSUING_BRANCH</span>}>
                                        {certificateData['CERT_ISSUING_BRANCH']}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={<span className="bold-label">CIF_ID</span>}>
                                        {certificateData['CIF_ID']}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={<span className="bold-label">ACCOUNTNUMBER</span>}>
                                        {certificateData['ACCOUNTNUMBER']}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={<span className="bold-label">ACCOUNT_SOL_ID</span>}>
                                        {certificateData['ACCOUNT_SOL_ID']}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={<span className="bold-label">BRANCH_ACCT_OPENED</span>}>
                                        {certificateData['BRANCH_ACCT_OPENED']}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={<span className="bold-label">ACCOUNT_NAME</span>}>
                                        {certificateData['ACCOUNT_NAME']}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={<span className="bold-label">ISSUE_DATE</span>}>
                                        {certificateData['ISSUE_DATE']}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={<span className="bold-label">BAL_AS_ON_DATE</span>}>
                                        {certificateData['BAL_AS_ON_DATE']}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={<span className="bold-label">BALANCE_NPR</span>}>
                                        {certificateData['BALANCE_NPR']}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={<span className="bold-label">BALANCE_FCY</span>}>
                                        {certificateData['BALANCE_FCY']}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={<span className="bold-label">LCHG_USER_ID</span>}>
                                        {certificateData['LCHG_USER_ID']}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={<span className="bold-label">LCHG_TIME</span>}>
                                        {certificateData['LCHG_TIME']}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={<span className="bold-label">EQU_CRNCY</span>}>
                                        {certificateData['EQU_CRNCY']}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={<span className="bold-label">EQU_FCRNCY</span>}>
                                        {certificateData['EQU_FCRNCY']}
                                    </Descriptions.Item>
                                </Descriptions>
                            ) : null}
                        </Card>
                    </Col>
                </Row>
                <Button type="primary" shape='round' htmlType="submit">
                    Confrim
                </Button>
            </Form>
        </Card>
    );
};

export default Step2Form;