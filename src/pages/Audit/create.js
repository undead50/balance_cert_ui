import { Form, Select, Radio, DatePicker, Input, Button } from 'antd';
import { useEffect, useState } from 'react';
import { useFetch } from '../../hooks';
import { BACKEND_URL } from '../../config';
import axios from 'axios';
import { useSelector } from 'react-redux';

const { Option } = Select;
const { RangePicker } = DatePicker;



function Create() {
    // console.log('createpage') 
    const [url, setUrl] = useState(BACKEND_URL + '/apims/branchList')
    const { data, loading, error } = useFetch(url);
    const [branchorDepartment, setbranchorDepartment] = useState('Branch')
    const [options, setOptions] = useState([]);

    const { userInfo } = useSelector((state) => state.user);

    useEffect(() => {
        if (data !== null) {
            if (branchorDepartment === "Branch") {
                const branchData = data.Data.categoriesList.map((category) => {
                    return {
                        value: category.REF_CODE,
                        label: category.REF_DESC
                    }

                })
                console.log(branchData)
                setOptions(branchData)


            } else {
                const departmentData = data.Data.departmentList.map((department) => {
                    return {
                        value: department.departmentId,
                        label: department.departmentName
                    }

                })
                setOptions(departmentData)


            }
        }
    }, [data])

    useEffect(() => {
        const handleUrlChange = async (url) => {
            setUrl(url); // Set the new URL here
            await data
        };
        if (branchorDepartment === "Branch") {
            const url = BACKEND_URL + '/apims/branchList'
            setUrl(url)

        }
        else {
            const url = BACKEND_URL + '/apims/departmentList'
            setUrl(url)
        }


    }, [branchorDepartment])

    const handleBranchDepartment = (e) => {
        // alert(e.target.value)
        setbranchorDepartment(e.target.value)

    }

    const onFinish = (values) => {
        console.log('Form values:', values);
        alert(values.fiscalYear)
        // alert(values.onsiteAuditPeriod)
        values.onsiteAuditPeriod.map((data) => {
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
            <Radio.Group onChange={handleBranchDepartment}>
                <Radio value="Branch">Branch</Radio>
                <Radio value="Department">Department</Radio>
                {/* Add more radio options as needed */}
            </Radio.Group>
        </Form.Item>

        <Form.Item name="branchDepartment" label="Branch/Department List" rules={[{ required: true }]}>
            <Select mode="single">
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