import React, { useState } from 'react';
import { Form, Select, Button, Card, Row, Col } from 'antd';
import { Controller,useForm } from 'react-hook-form';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import plugins from "suneditor/src/plugins";


const { Option } = Select;
const Step2Form = () => {
    const [reportVisible, setReportVisible] = useState(false)
    const handleReport = (data) => {
        if (data == 'customized') {
            setReportVisible(true)
        } else {
            setReportVisible(false)
        }
    }
    const editorButtons = [ "bold",
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
        console.log('Selected Report Type:', values.reportType);
    };
    return (
        <Card>
            <Form name="reportForm" onFinish={onFinish}>

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
                            <Select placeholder="Select a report type" onChange={(record)=>handleReport(record)}>
                                <Option value="standard">Standard</Option>
                                <Option value="customized">Customized</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

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
                    {/* <Button type="primary" htmlType="submit">
                        Submit
                    </Button> */}
                </Form.Item>
            </Form>
        </Card>
    );
};

export default Step2Form;