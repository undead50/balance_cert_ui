import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
    calculateRiskAsync,
    updateRiskAsync,
} from '../../store/slices/riskSlice';
import { createRiskdetailAsync } from '../../store/slices/RiskDetailSlice';

const currentDate = new Date();
const CommentModal = (props) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();


    const { assSummary } = useSelector((state) => state.risk);

    const { userInfo } = useSelector((state) => state.user);

    useEffect(() => {
        
    },[assSummary])

    const onFinish = (values) => {
        // Handle form submission here (e.g., sending the comment data to the server)

        if (props.commentRecord.status === 'CREATED') {
            const toSubmitValue = { ...props.commentRecord }
            toSubmitValue.status = 'REVIEWED'
            toSubmitValue.reviewed_comment = values.comment
            toSubmitValue.reviewed_by = userInfo.userName
            toSubmitValue.reviewed_at = currentDate
            if (typeof toSubmitValue.assessment_data === 'string') {
                toSubmitValue.assessment_data = JSON.parse(toSubmitValue.assessment_data);  
              }
            console.log(toSubmitValue)
            dispatch(updateRiskAsync(toSubmitValue))
            props.closeComment()
            form.resetFields()

        }
        if (props.commentRecord.status === 'REVIEWED') {
            
            const toSubmitValue = { ...props.commentRecord }
            // dispatch(calculateRiskAsync(toSubmitValue))
            toSubmitValue.status = 'APPROVED'
            toSubmitValue.approved_comment = values.comment
            toSubmitValue.approved_by = userInfo.userName
            toSubmitValue.approved_at = currentDate
            if (typeof toSubmitValue.assessment_data === 'string') {
                toSubmitValue.assessment_data = JSON.parse(toSubmitValue.assessment_data);  
              }
            console.log(toSubmitValue)
            dispatch(updateRiskAsync(toSubmitValue))

            let weightageAverageScoreList = []
            assSummary.map((data) => {
                weightageAverageScoreList.push(data.weightageAverageScore)
            })
            
            const sumOfWeightageAverageScore = weightageAverageScoreList.reduce((accumulator, currentObj) => {
                return accumulator + currentObj;
             }, 0);
            
            const detailData = {
                riskId : toSubmitValue.id,
                assessment_data: assSummary,
                created_by: userInfo.employeeName,
                approved_by: userInfo.employeeName,
                sumOfWeightageAverageScore:sumOfWeightageAverageScore
                
            }
            dispatch(createRiskdetailAsync(detailData))
            // console.log(assSummary)
            props.closeComment()
            form.resetFields()

        }

    };

    const handleCancel = () => {
        props.closeComment()
        form.resetFields()
    };

    const handleReject = () => {
        form.validateFields().then((value) => {
            const toSubmitValue = { ...props.commentRecord }
            toSubmitValue.status = 'REJECTED'
            toSubmitValue.rejected_comment = value.comment
            toSubmitValue.rejected_by = userInfo.userName
            toSubmitValue.rejected_at = currentDate
            if (typeof toSubmitValue.assessment_data === 'string') {
                toSubmitValue.assessment_data = JSON.parse(toSubmitValue.assessment_data);  
              }
            console.log(toSubmitValue)
            props.closeComment()
            form.resetFields()
            dispatch(updateRiskAsync(toSubmitValue))
            props.closeComment()
            form.resetFields()
        }).catch((err) => {
            console.log(err)
        })

    }

    return (
        <Modal
            open={props.commentVisible}
            title={props.commentRecord.status == 'CREATED' ? 'REVIEW' : props.commentRecord.status == 'REVIEWED' ? 'APPROVE' : ''}
            footer={null}
            onFinish={onFinish}
            onCancel={handleCancel}
            destroyOnClose={true}
        >
            <Form form={form} onFinish={onFinish} layout="vertical">
                <Form.Item
                    name="comment"
                    label="Comment"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your comment',
                        },
                    ]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        {props.commentRecord.status == 'CREATED' ? 'REVIEW' : props.commentRecord.status == 'REVIEWED' ? 'APPROVE' : ''}
                    </Button>
                    <Button type="primary" danger style={{ marginLeft: '9px' }} onClick={handleReject}>
                        REJECT
                    </Button>
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default CommentModal;
