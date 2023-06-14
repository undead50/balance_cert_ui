import { Form, Select, Radio, DatePicker, Input, Button } from 'antd';
import AdminLayout from "../../containers/AdminLayout";


const { Option } = Select;
const { RangePicker } = DatePicker;


function Create() {

    const onFinish = (values) => {
        console.log('Form values:', values);
      };

    const content = <Form onFinish={onFinish}>
            <h2>Audit Request Form</h2>

            <Form.Item name="auditType" label="Type of Audit" rules={[{ required: true }]}>
            <Select mode="multiple">
                <Option value="address">Address</Option>
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
            <Radio.Group>
                <Radio value="unit1">Unit 1</Radio>
                <Radio value="unit2">Unit 2</Radio>
                {/* Add more radio options as needed */}
            </Radio.Group>
            </Form.Item>

            <Form.Item name="branchDepartment" label="Branch/Department List" rules={[{ required: true }]}>
            <Select mode="multiple">
                <Option value="branch1">Branch 1</Option>
                {/* Add more options as needed */}
            </Select>
            </Form.Item>

            <Form.Item name="headOfAuditUnit" label="Head of Audit Unit (BM/Dept Head)" rules={[{ required: true }]}>
            <Select mode="multiple">
                <Option value="head1">Head 1</Option>
                {/* Add more options as needed */}
            </Select>
            </Form.Item>

            <Form.Item name="auditPeriod" label="Audit Period (Start Date)" rules={[{ required: true }]}>
            <DatePicker />
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
            <DatePicker />
            </Form.Item>

            <Form.Item name="noOfStaff" label="No of staff at time of Audit" rules={[{ required: true }]}>
            <Input.TextArea />
            </Form.Item>

            <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
        </Form>
    return ( <AdminLayout content= {content}/> );
}

export default Create;