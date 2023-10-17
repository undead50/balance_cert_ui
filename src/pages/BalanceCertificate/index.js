import React, { useState } from 'react';
import { Steps, Button, message,Popconfirm  } from 'antd';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';
import Step4Form from './Step4Form';
import { useSelector, useDispatch } from 'react-redux';
import { createQrcertificateAsync } from '../../store/slices/qrcertificateSlice';
import { useNavigate } from 'react-router-dom';
import { resetStateCertificate } from '../../store/slices/certificateSlice';
const { Step } = Steps;

const MultiStepForm = () => {


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const { certificates, certificate_loading, custom_description, qr_certificate_detail, report_type, certificate_detail } = useSelector((state) => state.certificate);
  const { userInfo} = useSelector((state) => state.user);
  const certificateData = certificates.length !== 0 ? certificates[0] : [];
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = () => {
    const payload = {
      certificate_json: certificateData,
      branch_code: userInfo.solId,
      status: 'C',
      certificate: certificate_detail,
      verification_qr: qr_certificate_detail,
      reference_no: certificateData["REFERENCE_NO"],
      created_by:userInfo.userName,
      
    }
    dispatch(createQrcertificateAsync(payload)).then(() => {
      dispatch(resetStateCertificate());
      navigate('/qrcertificate')
    })

  }

  const next = () =>
    {
      if (currentStep === 0) {
        if (certificateData.length === 0) {
          messageApi.open({
            type: 'error',
            content: "Please provide Certificate Details.",
          });
        } else {
          setCurrentStep(currentStep + 1);
        }
    }
    
    if (currentStep === 1) {
      if (report_type === "") {
        messageApi.open({
          type: 'error',
          content: "Please Select the Report Type and Confirm.",
        });
      } else {
        setCurrentStep(currentStep + 1);
      }
    }

    if (currentStep === 2) { 
      if (certificate_detail === "") {
        messageApi.open({
          type: 'error',
          content: "Please Confirm and Verify the Certificate.",
        });
      } else {
        setCurrentStep(currentStep + 1);
      }
      
    }



  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div>
      {contextHolder}
      <Steps current={currentStep}>
        <Step title="Certificate Request" />
        <Step title="Report Type Option" />
        <Step title="Summary and Verfication" />
        <Step title="Generate QR" />
      </Steps>
      <br />
      <br />
      {currentStep === 0 && <Step1Form />}
      {currentStep === 1 && <Step2Form />}
      {currentStep === 2 && <Step4Form />}
      {currentStep === 3 && <Step3Form />}
      <br />
      <div>
        {currentStep > 0 && (
          <Button style={{ margin: '0 8px' }} shape="round" onClick={prev}>
            Previous
          </Button>
        )}
        {currentStep < 3 && (
          <Popconfirm
          title="Confirmation"
          description="Are you sure to Proceed with the 
          information?"
          okText="Yes"
            cancelText="No"
            onConfirm={next} 
        >
          <Button type="primary" shape="round" htmlType="submit">
            Next
            </Button>
            </Popconfirm>
        )}
        {currentStep === 3 && (
          <Popconfirm
          title="Confirmation"
          description="Are you sure to Submit with the 
          information?"
          okText="Yes"
            cancelText="No"
            onConfirm={handleSubmit} 
        >
          <Button type="primary" shape="round">
          Submit
            </Button>
            </Popconfirm>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;
