import { Form, Select, Radio, DatePicker, Input, Button } from 'antd';
import { useFetch } from '../../hooks';
import { useState } from 'react';
import { BACKEND_URL } from '../../config';
import { useEffect } from 'react';

const { Option } = Select;
const { RangePicker } = DatePicker;



function Create() {

    const [url, setUrl] = useState(
        BACKEND_URL + '/apims/branchList'
      );
    alert('createpage')  
    // const { data, loading, error } = useFetch('http://192.168.254.54:54684/api/apims/branchList');
    const [options, setOptions] = useState([
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ]);
    const [selectedOption, setSelectedOption] = useState('');
    // const [branchDepartment, setbranchDepartment] = useState("Branch");
    // useEffect(() => {
    //     if (branchDepartment === 'Branch') {
    //         const url = BACKEND_URL + '/apims/branchList'
    //         setUrl(url)
    //         alert(branchDepartment)
    //         console.log('change')
    //         // console.log(data)
    //         // let departmentName = data.Data.departmentList.map(department =>{
    //         //     return department.departmentName
    //         // })
    //         // setOptions(departmentName)
    //         console.log('change')
    //     } 
    //     else {
    //         // const url = BACKEND_URL + '/apims/departmentList'
    //         alert(branchDepartment)
    //         // console.log(data.Data)
    //         // let categoriesList = data.Data.categoriesList.map(category =>{
    //         //     return category.REF_DESC
    //         // })
    //         // setOptions(categoriesList)
    //         // setUrl(url)
    //     }
    //   }, [branchDepartment]);
    
    const handleBranchDepartment=(e) =>{
        if( e.target.value == "Branch"){
            const url = BACKEND_URL + '/apims/branchList'
            setUrl(url)
        }
        else {
            const url = BACKEND_URL + '/apims/departmentList'
            setUrl(url)
        }
    }

    const onFinish = (values) => {
        console.log('Form values:', values);
        alert(values.fiscalYear)
        // alert(values.onsiteAuditPeriod)
        values.onsiteAuditPeriod.map((data)=>{
            alert(data.format('YYYY-MM-DD'))
        })
        alert(values.acmDate.format('YYYY-MM-DD'))
      };

    const content = <Form onFinish={onFinish}>
            <h2>Audit Request Form</h2>

            <Form.Item name="auditType" label="Type of Audit" rules={[{ required: true }]}>
            <Select mode="multiple">
                <Option value="Internal Audit">Internal Audit</Option>
                {/* Add more options as needed */}
            </Select>
            </Form.Item>

            <Form.Item name="fiscalYear" label="Fiscal Year" rules={[{ required: true }]}>
            <Select mode="multiple">
                <Option value="2021">2021</Option>
                {/* Add more options as needed */}
            </Select>
            </Form.Item>

            <Form.Item name="auditUnit" label="Audit Unit" rules={[{ required: true }]}>
            <Radio.Group onChange={handleBranchDepartment} value = {selectedOption}>
                <Radio value="Branch">Branch</Radio>
                <Radio value="Department">Department</Radio>
                {/* Add more radio options as needed */}
            </Radio.Group>
            </Form.Item>

            <Form.Item name="branchDepartment" label="Branch/Department List" rules={[{ required: true }]}>
            <Select mode="multiple">
                {options.map(option => (
                    <Option key={option.value} value={option.value}>
                    {option.label}
                    </Option>
                ))}
                {/* Add more options as needed */}
            </Select>
            </Form.Item>

            <Form.Item name="headOfAuditUnit" label="Head of Audit Unit (BM/Dept Head)" rules={[{ required: true }]}>
            <Select mode="multiple">
                <Option value="head1">Head 1</Option>
                {/* Add more options as needed */}
            </Select>
            </Form.Item>

            <Form.Item name="auditPeriod" label="Audit Period (Start-End Date)" rules={[{ required: true }]}>
            <RangePicker />
            </Form.Item>


            <Form.Item name="onsiteAuditPeriod" label="Onsite Audit Period" rules={[{ required: true }]}>
            <RangePicker />
            </Form.Item>

            <Form.Item name="auditTeamLeader" label="Audit Team Leader" rules={[{ required: true }]}>
            <Select>
                <Option value="leader1">Leader 1</Option>
                {/* Add more options as needed */}
            </Select>
            </Form.Item>

            <Form.Item name="auditTeamList" label="Audit Team List" rules={[{ required: true }]}>
            <Select mode="multiple">
                <Option value="team1">Team 1</Option>
                {/* Add more options as needed */}
            </Select>
            </Form.Item>

            <Form.Item name="acmNo" label="ACM No" rules={[{ required: true }]}>
            <Input />
            </Form.Item>

            <Form.Item name="acmDate" label="ACM Date" rules={[{ required: true }]}>
            <DatePicker
            format='YYYY-MM-DD'
             />
            </Form.Item>

            <Form.Item name="noOfStaff" label="No of staff at time of Audit" rules={[{ required: true }]}>
            <Input.TextArea />
            </Form.Item>

            <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    return (content);
}

export default Create;