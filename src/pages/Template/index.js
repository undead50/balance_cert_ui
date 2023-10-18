import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, Space,Card } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  createTemplateAsync,
    deleteTemplateAsync,
      fetchTemplatesAsync,
        updateTemplateAsync,
} from '../../store/slices/templateSlice';
import { Controller, useForm } from 'react-hook-form';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import plugins from "suneditor/src/plugins";
// import { useNotification } from '../../hooks/index';

const TemplateTable = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [editMode, setEditMode] = useState(false);
  const {  control } = useForm();
  
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
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);

  const { templates, loading, error } = useSelector(
    (state) => state.template
  );

  // Function to handle opening the modal for adding/editing a record
  const handleEdit = (record) => {
    form.setFieldsValue(record);
    setEditMode(true);
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditMode(false);
    form.setFieldsValue({});
    setIsModalVisible(true);
  };

  // Function to handle deleting a record
  const handleDelete = (record) => {
    dispatch(deleteTemplateAsync(record.id));
    // callNotification('Template deleted Successfully', 'success');
  };

  useEffect(() => {
    dispatch(fetchTemplatesAsync());
    console.log(templates);
  }, []);

  const dataSource = templates;

  const onFinish = (values) => {
    console.log(values);
    values.created_by = userInfo.userName;
    values.template = control._formValues.template
    if (editMode) {
      dispatch(updateTemplateAsync(values));
      // callNotification('Template Edited Successfully', 'success');
    } else {
      dispatch(createTemplateAsync(values));
      // callNotification('Template Created Successfully', 'success');
    }
    form.resetFields();
    setIsModalVisible(false);
  };

  const columns = [

    


{
  title: 'template_name',
    dataIndex: 'template_name',
      key: 'template_name',
      },





{
  title: 'created_at',
    dataIndex: 'created_at',
      key: 'created_at',
      },



{
  title: 'Action',
    key: 'action',
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>Update</Button>
          <Button onClick={() => handleDelete(record)}>Delete</Button>
        </Space>
      ),
    },
  ];

return (
  <div>
    <Button
      type="primary"
      onClick={() => handleAdd()}
      style={{ marginBottom: '16px' }}
    >
      Add
    </Button>
    <Table dataSource={dataSource} columns={columns} />

    {/* Modal for adding/editing a record */}
    <Modal
      title={editMode ? 'Edit Record' : 'Add Record'}
      open={isModalVisible}
      width={1000}
      onCancel={() => {
        setIsModalVisible(false);
        form.resetFields();
      }}
      footer={null}
    >
      <Card>
      <Form form={form} onFinish={onFinish}>
        {/* Add form fields here based on your column fields */}
        
        {editMode && (<Form.Item name="id" hidden={true}>
            <Input/>
          </Form.Item>)}
        
        <Form.Item name="template_name" label="template_name">
          <Input />
        </Form.Item>
        
        <Form.Item label="template">
                                    <Controller
                                        name="template"
                                        defaultValue=""
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <SunEditor
                                            setDefaultStyle="font-family: Arial; width: 800px; font-size: 12px; background: #fafafa !important; height: 297mm; position: relative; z-index: 0;"
                                                onChange={onChange}
                                                value={value}
                                                setContents={editMode ? form.getFieldValue('template'):null}
                                                setOptions={{
                                              resizingBar: false,
                                              resizeEnable: true,
                                              resizingBarContainer: false,
                                              height: 297, // Set the height in millimeters to match A4
                                              minHeight: 160,
                                              historyStackDelayTime: 0,
                                              plugins: plugins,
                                              buttonList: [editorButtons],
                                            }}
                                            />
                                        )}
                                    />
                                </Form.Item>
        
        {/* <Form.Item name="created_at" label="created_at">
          <Input />
        </Form.Item> */}
        
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editMode ? 'Update' : 'Add'}
          </Button>
        </Form.Item>
        </Form>
        </Card>
    </Modal>
  </div>
);
};

export default TemplateTable;