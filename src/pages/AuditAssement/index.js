import { Form, Radio,Button,Steps } from 'antd';
import { useState } from 'react';
const { Step } = Steps;

const AccountOpeningForm = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };
  const handleSubmit = () => {
    alert('submit')
  }

  return (
    <Form>
      <Steps current={currentStep}>
        <Step title="Account Opening Procedure" />
        <Step title="Account Closing Procedure" />
        <Step title="Cash at vault as Heading"/>
      </Steps>
      <br />
      {currentStep === 0 && (
        <>
          <h3>Observation as per manual/circulars/NRB Directives</h3>
          <Form.Item>
            Obtained complete documents while account opening as per Operations manual point no. 1.2.2 & KYC guidelines.
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            Account opening form completed with introducer's signature duly verified by CSD. (Operation Manual 1.2.1)
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            The field of Estimated annual turnover/income mentioned or declared in KYC form (Operation Manual 1.2.2)
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            Risk Categorized in opened accounts as per AML/CFT Policy of the Bank/NRB Circular (Operation Manual 1.2.2)
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            Approval obtained from COO or designated prior to opening High risk graded accounts as per AML/CFT policy chapter 4.1.1
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            Photocopy of citizenship of all family members [i.e. unseparated family members] obtained of those customers falling under high risk category as per AMLCFT policy or whose Enhanced CDD has to be conducted. In case of minors, birth certificate or identification card is to be obtained. (Operation Manual 1.2.2)
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            Multiple individual accounts of same nature are not maintained by branch. (Unified Directive 21/078, Point no 45)
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
        </>
      )}
      {currentStep === 1 && (
        <>
          <h3>Observation as per manual/circulars/NRB Directives</h3>
          <Form.Item>
            Clearance from all department of branch (i.e TAD, CAD, Finance, Locker, Card, E-banking/Mobile banking) is obtained.(Operational Manual 1.4)
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            System printed cheque inventory, if any, attached in account closing file with printed statement after account closure.(Operational Manual 1.4)
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            Remaining valid cheques/ATM card if issued has been returned by the customer at the time of account close.(Operational Manual 1.4)
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            “Account Closed” stamp affixed on the face of the Account Closing Request Form/Letter and Account Opening Form after closure. (Operational Manual 1.4)
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
        </>
      )}
      {currentStep === 2 && (
        <>
          <h3>Observation as per manual/circulars/NRB Directives</h3>
          <Form.Item>
            Clearance from all department of branch (i.e TAD, CAD, Finance, Locker, Card, E-banking/Mobile banking) is obtained.(Operational Manual 1.4)
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            System printed cheque inventory, if any, attached in account closing file with printed statement after account closure.(Operational Manual 1.4)
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            Remaining valid cheques/ATM card if issued has been returned by the customer at the time of account close.(Operational Manual 1.4)
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            “Account Closed” stamp affixed on the face of the Account Closing Request Form/Letter and Account Opening Form after closure. (Operational Manual 1.4)
            <Radio.Group>
              <Radio value={1}>Not comply</Radio>
              <Radio value={2}>Partly Comply</Radio>
              <Radio value={3}>Fully comply</Radio>
              <Radio value={4}>Don't know</Radio>
            </Radio.Group>
          </Form.Item>
        </>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {currentStep > 0 && (
          <Button type="primary" onClick={handlePrevious}>
            Previous
          </Button>
        )}
        {currentStep < 2 && (
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        )}
        {currentStep === 2 && (
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </div>
    </Form>
  );
};

export default AccountOpeningForm;