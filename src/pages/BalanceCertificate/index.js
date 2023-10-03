import React, { useState } from 'react';
import { Steps, Button } from 'antd';
import Step1Form from './Step1Form';
import Step2Form from './Step2Form';
import Step3Form from './Step3Form';
import Step4Form from './Step4Form';

const { Step } = Steps;

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div>
      <Steps current={currentStep}>
        <Step title="Certificate Request" />
        <Step title="Report Type Option" />
        <Step title="Generate QR" />
        <Step title="Summary" />
      </Steps>
      <br />
      <br />
      {currentStep === 0 && <Step1Form />}
      {currentStep === 1 && <Step2Form />}
      {currentStep === 2 && <Step3Form />}
      {currentStep === 3 && <Step4Form />}
      <br/>
      <div>
        {currentStep > 0 && (
          <Button style={{ margin: '0 8px' }} shape='round' onClick={prev}>
            Previous
          </Button>
        )}
        {currentStep < 3 && (
          <Button type="primary" shape='round' onClick={next} htmlType="submit">
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default MultiStepForm;