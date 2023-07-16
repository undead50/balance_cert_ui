import { Form, Radio, Button, Steps, Input, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import { Col, Row, Card } from 'antd';
import { fetchCategorysAsync } from '../../store/slices/categorySlice';
import { fetchQuestionsAsync } from '../../store/slices/questionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SaveOutlined } from '@ant-design/icons';
import { createRiskAsync, updateRiskAsync } from '../../store/slices/riskSlice';
import { useNotification } from '../../hooks/index';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './index.css';

const { Step } = Steps;

const AccountOpeningForm = () => {
  const { riskassessmentID } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (riskassessmentID) {
      const editRisk = risks.filter((risk) => risk.id == riskassessmentID);
      console.log('editRisk');
      console.log(editRisk[0]['assessment_data']);
      setFormValues(editRisk[0]['assessment_data']);
      form.setFieldsValue(editRisk[0]['assessment_data']);
      setIsDraft(true);
    }
  }, [riskassessmentID]);

  const { callNotification } = useNotification();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [isDraft, setIsDraft] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [saveAsDraft, setsaveAsDraft] = useState(false);
  const { TextArea } = Input;
  const { categorys, loading, error } = useSelector((state) => state.category);
  const { risks } = useSelector((state) => state.risk);
  const { questions } = useSelector((state) => state.question);
  const [value, setValue] = useState(1);
  const [requiredExplation,setRequiredExplation] = useState({})

  const { userInfo } = useSelector((state) => state.user);

  console.log(userInfo);
  const handleNext = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        setFormValues((prevFormValues) => ({
          ...prevFormValues,
          ...values,
        }));
        setCurrentStep(currentStep + 1);
        console.log(form.getFieldsValue());
        console.log(formValues);
      })
      .catch((errors) => {
        // Handle form validation errors
        console.log('Form validation failed:', errors);
      });
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleDraft = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        setsaveAsDraft(true);
        setFormValues((prevFormValues) => ({
          ...prevFormValues,
          ...values,
        }));
        console.log(form.getFieldsValue());
        console.log(formValues);
        navigate('/assessmentindex');
      })
      .catch((errors) => {
        // Handle form validation errors
        console.log('Form validation failed:', errors);
      });
  };

  useEffect(() => {
    const postData = {
      assessment_data: formValues,
      status: saveAsDraft ? 'DRAFT' : 'CREATED',
      created_by: userInfo.userName,
    };

    const postDataEdit = {
      id: riskassessmentID ? parseInt(riskassessmentID) : null,
      assessment_data: formValues,
      status: saveAsDraft ? 'DRAFT' : 'CREATED',
      created_by: userInfo.userName,
    };

    if (saveAsDraft) {
      // alert(isDraft);
      if (isDraft) {
        try {
          dispatch(updateRiskAsync(postDataEdit));
          callNotification('Saved as Draft', 'success');
        } catch (error) {
          callNotification(`${error}`, 'error');
        }
      } else {
        try {
          // alert('postData');
          dispatch(createRiskAsync(postData));
          callNotification('Saved as Draft', 'success');
        } catch (error) {
          callNotification(`${error}`, 'error');
        }
      }
    }
    setsaveAsDraft(false);
    console.log(postData);
  }, [formValues, saveAsDraft]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        const finalFormValues = {
          ...formValues,
          ...values,
        };
        console.log(finalFormValues);
        try {
          if (isDraft) {
            const postDataEdit = {
              id: riskassessmentID ? parseInt(riskassessmentID) : null,
              assessment_data: finalFormValues,
              status: saveAsDraft ? 'DRAFT' : 'CREATED',
              created_by: userInfo.userName,
            };
            dispatch(updateRiskAsync(postDataEdit));
          } else {
            const postData = {
              assessment_data: finalFormValues,
              status: saveAsDraft ? 'DRAFT' : 'CREATED',
              created_by: userInfo.userName,
            };
            dispatch(createRiskAsync(postData));
          }

          callNotification('Form Submitted SuccessFully', 'success');
          navigate('/assessmentindex');
        } catch (error) {
          callNotification(`${error}`, 'error');
        }
      })
      .catch((errors) => {
        // Handle form validation errors
        console.log('Form validation failed:', errors);
      });
  };

  useEffect(() => {
    dispatch(fetchCategorysAsync());
    dispatch(fetchQuestionsAsync());
    console.log(categorys);
    console.log(questions);
  }, []);

  useEffect(()=>{
    console.log(requiredExplation)
  },[requiredExplation])

  const handleRadioChange = (fieldName, selectedValue) => {
    console.log('radio checked', selectedValue);
    let value = selectedValue === 3 ? false: true
    form.setFieldsValue({
      [fieldName]: selectedValue,
    });
    // form.setFieldsValue({ input: value === 3 ? false : true });
    console.log('formvalues')
    
    // console.log(form.getFieldsValue()[fieldName])
    // alert(value)

    setRequiredExplation(prevData => ({
      ...prevData,
      [fieldName]: selectedValue === 3 ? false: true
    }));

    // alert(form.getFieldValue(`requireExplanation_${fieldName}`))
    // console.log(form.getFieldValue())
    // if(selectedValue === 3){
    //   setRequiredExplation(false)
    // }
    // else {
    //   setRequiredExplation(true)
    // }
    // setValue(e.target.value);
  };

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Row>
        <Col span={5}>
          <Steps current={currentStep} direction="vertical" size="small">
            <Step title="Start"></Step>
            {categorys.map((category) => (
              <Step title={category.categoryName} />
            ))}
          </Steps>
        </Col>
        <Col span={1}></Col>
        <Col span={12}>
          {currentStep === 0 && (
            
              <Card style={{ width: '140%' }}>
                <>
                  <p style={{ marginTop: '0px', marginBottom: '10px' }}>
                    <strong>
                      Risk Assessment tool - Operational Risk Management
                    </strong>
                  </p>
                  <p style={{ marginTop: '0px', marginBottom: '10px' }}>
                    <strong>Introduction</strong>
                  </p>
                  <p style={{ marginTop: '0px', marginBottom: '10px' }}>
                    <strong>The purpose </strong>of the Risk assessment is
                    providing the bank insight in the level of Operational Risk
                    Management in branches in an relatively easy way. The
                    outcome of this risk assessment tool is indicative. Besides
                    this, it would help the ORM-function to set priorities
                    towards improvement and can be used to show improvements
                    overtime.
                  </p>
                  <p style={{ marginTop: '0px', marginBottom: '10px' }}>
                    <strong>Approach</strong>
                  </p>
                  <p style={{ marginTop: '0px', marginBottom: '10px' }}>
                    The first step is to fill in the&#xa0;{' '}
                    <u>General Information</u> tab.
                  </p>
                  <p style={{ marginTop: '0px', marginBottom: '10px' }}>
                    Thereafter you can fill in the <u>green tabs</u>. Each tab
                    covers a specific topic of Operational Risk Management
                    consisting of several elements.&#xa0; All related items per
                    element should be scored on the scale 'Not comply' to 'Fully
                    comply' or 'Don't know' by setting a 'x' in the right cell.
                    After scoring an item, you will get a green sign. In case
                    you missed an item or mistakenly provide more scores for the
                    same item, the sign stays orange.
                  </p>
                  <p style={{ marginTop: '0px', marginBottom: '10px' }}>
                    In the tab “scores”, weightage is given for each element of
                    Operational Risk Management based on the severity of risk in
                    each element and result is presented using weightage average
                    score.
                  </p>
                  <p style={{ marginTop: '0px', marginBottom: '10px' }}>
                    In the tab Assessment Summary the overall outcome per topic
                    are presented based on all the scores. To do so all scores
                    are translated into an % for improvent on a scale of 0 -
                    100%. A high percentage indicates more room for improvement
                    which also indicates more risk and vice versa. The outcomes
                    are also visualized by graphs.
                  </p>
                  <p style={{ marginTop: '0px', marginBottom: '10px' }}>
                    The outcomes in each topic are then multiplied by the
                    weightage given to each topics and final risk ranking is
                    done based on weightage average score.
                  </p>
                  <p style={{ marginTop: '0px', marginBottom: '10px' }}>
                    If any topic in the tool is not applicable to any branch,
                    score shall be given as “Fully comply” and Percentage of
                    improvement shall be 0.
                  </p>
                  <p style={{ marginTop: '0px', marginBottom: '10px' }}>
                    The tab “Digitization of Documents” is incorporated in the
                    Risk assessment tool however is not linked to the final
                    assessment report. The same shall be linked to final report
                    going further when required.
                  </p>
                  <p style={{ marginTop: '0px', marginBottom: '10px' }}>
                    Other Checklist Tab: Checklist that shall not deduct the
                    marks of branch i.e., which are not in control of branch but
                    branch faces risk due to non-compliance.
                  </p>
                  <p style={{ marginTop: '0px', marginBottom: '10px' }}>
                    <strong>
                      <em>
                        <u>Notes:</u>
                      </em>
                    </strong>
                  </p>
                  <p style={{ marginTop: '0px', marginBottom: '10px' }}>
                    <strong>
                      <em>
                        <u>
                          1. In case of any non compliance of requirement by
                          "Nepal Rastra Bank", Scaling shall be given as "Not
                          Comply" irrespective of the result as per sample
                          taken.
                        </u>
                      </em>
                    </strong>
                  </p>
                  <p style={{ marginTop: '0px', marginBottom: '10px' }}>
                    <strong>
                      <em>
                        <u>
                          2. In case of any non compliance of Bank's "Internal
                          Policy/Guideline/Circular etc", Scaling can be lowered
                          depending upon the severity of non compliance and risk
                          faced by bank, if required.
                        </u>
                      </em>
                    </strong>
                  </p>
                  <p style={{ marginTop: '0px', marginBottom: '10px' }}>
                    &#xa0;
                  </p>
                </>
              </Card>
          )}
          {currentStep == 0 && (
            <div style={{ marginTop: '8px' }}>
              <Button type="primary" onClick={handleNext}>
                Next
              </Button>
            </div>
          )}

          {currentStep != 0 && (
            <Card style={{ width: '140%', marginTop: '9px' }}>
              <div className="custom-scrollbar">
                {categorys.map(
                  (key, index) =>
                    currentStep === index + 1 && (
                      <>
                        <u>
                          <h2>
                            Observation as per manual/circulars/NRB Directives
                          </h2>
                        </u>
                        {questions.map((qdata) => {
                          if (qdata.category_name === key.categoryName) {
                            return (
                              <>
                                <Card
                                  style={{ marginTop: '6px' }}
                                  key={qdata.id}
                                >
                                  <Form.Item
                                    name={qdata.ref}
                                    label={qdata.ref}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please select an option',
                                      },
                                    ]}
                                  >
                                    {qdata.question}
                                    <br />
                                    <Radio.Group
                                      name={qdata.ref}
                                      defaultValue={formValues[qdata.ref]}
                                      onChange={(e) =>
                                        handleRadioChange(
                                          qdata.ref,
                                          e.target.value
                                        )
                                      }
                                    >
                                      <Radio value={1}>Not comply</Radio>
                                      <Radio value={2}>Partly Comply</Radio>
                                      <Radio value={3}>Fully comply</Radio>
                                      <Radio value={4}>Don't know</Radio>
                                    </Radio.Group>
                                  </Form.Item>
                                  <Form.Item
                                    name={'ES' + qdata.ref}
                                    defaultValue={formValues[`ES${qdata.ref}`]}
                                    label="Explanation of Score"
                                    rules={[
                                      {
                                        required: requiredExplation[qdata.ref],
                                        message: 'Please provide an Explanation',
                                      },
                                    ]}
                                  >
                                    <TextArea
                                      rows={4}
                                      defaultValue={
                                        formValues[`ES${qdata.ref}`]
                                      }
                                    />
                                  </Form.Item>
                                </Card>
                              </>
                            );
                          }
                        })}
                      </>
                    )
                )}

                <br />
              </div>
              <div style={{ display: 'flex',marginTop:'50px', justifyContent: 'space-between' }}>
                {currentStep > 0 && (
                  <>
                    <Button type="primary" onClick={handlePrevious}>
                      Previous
                    </Button>
                    <Button
                      type="primary"
                      icon={<SaveOutlined />}
                      onClick={handleDraft}
                    >
                      save as Draft
                    </Button>
                  </>
                )}
                {currentStep < categorys.length && (
                  <Button type="primary" onClick={handleNext}>
                    Next
                  </Button>
                )}
                {currentStep === categorys.length && (
                  <Popconfirm
                    title="Submit the Assessment"
                    description="Are you sure you want to submit this assessment?"
                    onConfirm={handleSubmit}
                    onCancel={() => {
                      console.log('cancled');
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button style={{ backgroundColor: '#40A3A1',color:'white' }}>
                      Submit
                    </Button>
                  </Popconfirm>
                )}
              </div>
            </Card>
          )}
        </Col>
      </Row>
    </Form>
  );
};

export default AccountOpeningForm;
