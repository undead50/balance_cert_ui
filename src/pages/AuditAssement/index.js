import { Form, Radio, Button, Steps } from 'antd';
import { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { getCategoryData } from '../../store/slices/categorySlice';
import {fetchQuestions} from '../../store/slices/questionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SaveOutlined } from '@ant-design/icons';

const { Step } = Steps;

const AccountOpeningForm = () => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);

  const { data, loading, error } = useSelector((state) => state.category);
  const {question} = useSelector((state)=> state.question);
  

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };
  const handleSubmit = () => {
    alert('submit');
  };

  useEffect(() => {
    dispatch(getCategoryData());
    dispatch(fetchQuestions());
    console.log(data)
    console.log(question);
  }, []);

  return (
    <Form>
      <Row>
        <Col span={5}>
          <Steps current={currentStep} direction="vertical" size="small">
            <Step title="Start"></Step>
            {data.map((category) => (
              <Step title={category.categoryName} />
            ))}
          </Steps>
        </Col>
        <Col span={2}></Col>
        <Col span={12}>
          {currentStep === 0 && (
            <p>
              Risk Assessment tool - Operational Risk Management Introduction
              The purpose of the Risk assessment is providing the bank insight
              in the level of Operational Risk Management in branches in an
              relatively easy way. The outcome of this risk assessment tool is
              indicative. Besides this, it would help the ORM-function to set
              priorities towards improvement and can be used to show
              improvements overtime. Approach The first step is to fill in the
              General Information tab. Thereafter you can fill in the green
              tabs. Each tab covers a specific topic of Operational Risk
              Management consisting of several elements. All related items per
              element should be scored on the scale 'Not comply' to 'Fully
              comply' or 'Don't know' by setting a 'x' in the right cell. After
              scoring an item, you will get a green sign. In case you missed an
              item or mistakenly provide more scores for the same item, the sign
              stays orange. In the tab “scores”, weightage is given for each
              element of Operational Risk Management based on the severity of
              risk in each element and result is presented using weightage
              average score. In the tab Assessment Summary the overall outcome
              per topic are presented based on all the scores. To do so all
              scores are translated into an % for improvent on a scale of 0 -
              100%. A high percentage indicates more room for improvement which
              also indicates more risk and vice versa. The outcomes are also
              visualized by graphs. The outcomes in each topic are then
              multiplied by the weightage given to each topics and final risk
              ranking is done based on weightage average score. If any topic in
              the tool is not applicable to any branch, score shall be given as
              “Fully comply” and Percentage of improvement shall be 0. The tab
              “Digitization of Documents” is incorporated in the Risk assessment
              tool however is not linked to the final assessment report. The
              same shall be linked to final report going further when required.
              Other Checklist Tab: Checklist that shall not deduct the marks of
              branch i.e., which are not in control of branch but branch faces
              risk due to non-compliance. Notes: 1. In case of any non
              compliance of requirement by "Nepal Rastra Bank", Scaling shall be
              given as "Not Comply" irrespective of the result as per sample
              taken. 2. In case of any non compliance of Bank's "Internal
              Policy/Guideline/Circular etc", Scaling can be lowered depending
              upon the severity of non compliance and risk faced by bank, if
              required.
            </p>
          )}
          {data.map(
            (key, index) =>
              currentStep === index + 1 && (
                <>
                  <u>
                    <h2>Observation as per manual/circulars/NRB Directives</h2>
                  </u>
                  {question.map((qdata)=>{
                    if (qdata.category_name === key.categoryName){
                       return <>
                        <Form.Item>
                    {qdata.question}
                    <br/>
                    <Radio.Group>
                      <Radio value={1}>Not comply</Radio>
                      <Radio value={2}>Partly Comply</Radio>
                      <Radio value={3}>Fully comply</Radio>
                      <Radio value={4}>Don't know</Radio>
                    </Radio.Group>
                  </Form.Item>
        
                       </> 


                    }

                  })}
                 
                </>
              )
          )}

          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {currentStep > 0 && (
              <>
                <Button type="primary" onClick={handlePrevious}>
                  Previous
                </Button>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={() => {
                    alert('saved as draft');
                  }}
                >
                  save as Draft
                </Button>
              </>
            )}
            {currentStep < data.length && (
              <Button type="primary" onClick={handleNext}>
                Next
              </Button>
            )}
            {currentStep === data.length && (
              <Button type="primary" onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default AccountOpeningForm;
