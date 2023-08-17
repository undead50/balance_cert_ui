import React from 'react';
import { Form, Select, Button, Input, Transfer } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { fetchBranchsAsync } from '../../store/slices/branchSlice';
import { initiateAssessmentAsync } from '../../store/slices/riskSlice';
import { useNavigate } from 'react-router-dom';


const { Option } = Select;

const mockData = Array.from({
  length: 20,
}).map((_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,
}));

const oriTargetKeys = mockData.filter((item) => Number(item.key) % 3 > 1).map((item) => item.key);

const InitiateAssessment = () => {

  const [form] = Form.useForm();

  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);
  const [branchData, setBranchData] = useState([])
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const handleChange = (newTargetKeys, direction, moveKeys) => {
    setTargetKeys(newTargetKeys);
    console.log('targetKeys: ', newTargetKeys);
    console.log('direction: ', direction);
    console.log('moveKeys: ', moveKeys);
  };
  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
    console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    console.log('targetSelectedKeys: ', targetSelectedKeys);
  };
  const handleScroll = (direction, e) => {
    console.log('direction:', direction);
    console.log('target:', e.target);
  };
  const handleDisable = (checked) => {
    setDisabled(checked);
  };

  const handleSearch = (dir, value) => {
    console.log('search:', dir, value);
  };

  const dispatch = useDispatch();

  const [options, setOptions] = useState([]);


  useEffect(() => {
    dispatch(fetchBranchsAsync())
    const branchData = branchs.map((branch) => {
      return {
        value: branch.branchCode,
        label: branch.branchDesc
      }

    })

    const branchDataa = branchs.map((branch) => {
      return {
        key: branch.branchCode,
        title: branch.branchDesc,
        description: branch.branchDesc
      }
    })
    setBranchData(branchDataa)


    console.log(branchData)
    setOptions(branchData)
    console.log('mock')
    console.log(mockData)
  }, [])
  const filterOption = (inputValue, option) => option.description.indexOf(inputValue.toUpperCase()) > -1;

  const { branchs } = useSelector((state) => state.branch)
  const onFinish = (values) => {
    console.log(values);
    console.log('keys branch')
    if (targetKeys.length === 0) {
      alert('Please select Branch')
      return false
    }
    values.initiated_by = userInfo.userName
    dispatch(initiateAssessmentAsync(values))
    form.resetFields();
    setTargetKeys([])
    navigate('/assessmentindex')
    console.log(targetKeys)
  };

  return (
    <div>
      <h2>Initiate the Assessment</h2>
      <Form onFinish={onFinish} form={form}>
        {/* <Form.Item
        label="Select options"
        name="options"
        rules={[{ required: true, message: 'Please select at least one option' }]}
      >
        <Select mode="multiple">
        {options.map(option => (
                    <Option key={option.value} value={option.value}>
                        {option.label}
                    </Option>
                ))}
     
        </Select>
              </Form.Item> */}
        <Form.Item
          label="Branch"
          name="branch"
        >
          <Transfer
            dataSource={branchData}
            titles={['Branch List', 'Selected Branch']}
            showSearch
            filterOption={filterOption}
            targetKeys={targetKeys}
            selectedKeys={selectedKeys}
            onChange={handleChange}
            onSelectChange={handleSelectChange}
            onScroll={handleScroll}
            onSearch={handleSearch}
            render={(item) => item.title}
            disabled={false}
            // oneWay
            style={{
              marginBottom: 16,
            }}
            listStyle={{
              width: '300px', // Set the width you want for the transfer boxes
              height: '300px', // Set the height you want (optional)
            }}
            // pagination
          />


        </Form.Item>

        <Form.Item
          label="Remarks"
          name="remarks"
          rules={[
            {
              required: true,
              message: 'This remarks field is required!',
            },
          ]}
        >
          <Input.TextArea rows={4}  style={{ width: '400px' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" shape='round' htmlType="submit">
            Initiate Assessment
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default InitiateAssessment;