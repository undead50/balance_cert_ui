import { Form, Radio, Button, Steps, Input, Popconfirm } from 'antd';
import { useEffect, useState } from 'react';
import { Col, Row, Card, Checkbox,Tooltip } from 'antd';
import { fetchCategorysAsync } from '../../store/slices/categorySlice';
import { fetchQuestionsAsync } from '../../store/slices/questionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SaveOutlined ,PlayCircleFilled} from '@ant-design/icons';
import { createRiskAsync, updateRiskAsync } from '../../store/slices/riskSlice';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './index.css';

const { Step } = Steps;

const AccountOpeningForm = () => {
  const { riskassessmentID } = useParams();
  const [checked, setChecked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (riskassessmentID) {
      const editRisk = risks.filter((risk) => risk.id == riskassessmentID);
      console.log('editRisk');
      // console.log(JSON.parse(editRisk[0]['assessment_data']));
      const selectedRecord = editRisk[0]['assessment_data'];
      if (typeof selectedRecord === 'string') {
        var selectedObject = JSON.parse(selectedRecord);
      }
      else {
        var selectedObject = selectedRecord
      }

      setFormValues(selectedObject);
      form.setFieldsValue(selectedObject);
      if (editRisk[0]['status'] === 'DRAFT') {
        setIsDraft(true);
      }
      else {
        setIsDraft(false);
      }
      
    }
  }, [riskassessmentID]);

  // const { callNotification } = useNotification();
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
  const [requiredExplation, setRequiredExplation] = useState({})

  const { userInfo } = useSelector((state) => state.user);

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  };
  // alert(userInfo.solId)
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
        console.log("formValues")
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
      id: riskassessmentID ? parseInt(riskassessmentID) : null,
      assessment_data: formValues,
      status: saveAsDraft ? 'DRAFT' : 'CREATED',
      // branch_code: formValues.branch_code,
      created_by: userInfo.userName,
    };

    const postDataEdit = {
      id: riskassessmentID ? parseInt(riskassessmentID) : null,
      assessment_data: formValues,
      status: saveAsDraft ? 'DRAFT' : 'CREATED',
      created_by: userInfo.userName,
      // branch_code: formValues.branch_code,
    };

    if (saveAsDraft) {
      // alert(isDraft);
      if (isDraft) {
        try {
          dispatch(updateRiskAsync(postDataEdit));
          // callNotification('Saved as Draft', 'success');
        } catch (error) {
          // callNotification(`${error}`, 'error');
        }
      } else {
        try {
          // alert('postData');
          dispatch(updateRiskAsync(postData));
          // callNotification('Saved as Draft', 'success');
        } catch (error) {
          // callNotification(`${error}`, 'error');
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
              // branch_code: userInfo.solId,
            };
            dispatch(updateRiskAsync(postDataEdit));
          } else {
            const postData = {
              id: riskassessmentID ? parseInt(riskassessmentID) : null,
              assessment_data: finalFormValues,
              status: saveAsDraft ? 'DRAFT' : 'CREATED',
              created_by: userInfo.userName,
              // branch_code: userInfo.solId,
            };
            dispatch(updateRiskAsync(postData));
          }

          // callNotification('Form Submitted SuccessFully', 'success');
          navigate('/assessmentindex');
        } catch (error) {

          // callNotification(`${error}`, 'error');
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

  useEffect(() => {
    console.log(requiredExplation)
  }, [requiredExplation])

  const handleRadioChange = (fieldName, selectedValue) => {
    console.log('radio checked', selectedValue);
    let value = selectedValue === 3 ? false : true
    form.setFieldsValue({
      [fieldName]: selectedValue,
    });
    console.log('formvalues')


    setRequiredExplation(prevData => ({
      ...prevData,
      [fieldName]: selectedValue === 3 ? false : true
    }));
  };

  const initialValues = {
    branch_code: userInfo.solId,
  };

  return (
    <Form form={form} onFinish={handleSubmit} initialValues={initialValues}>
      <Row>
        <Col span={5}>
          <Form.Item name="branch_code" style={{ display: 'none' }}>
            <Input type="hidden" value={userInfo.solId} />
          </Form.Item>
          <Steps current={currentStep} direction="vertical" size="small">
            <Step title="Start"></Step>
            {categorys.map((category) => (
              <Step title={category.categoryName} />
            ))}
          </Steps>
        </Col>
        {/* <Col span={1}></Col> */}
        <Col span={11}>
          {currentStep === 0 && (
            <div style={{ width: '150%', height: '90%' }}>
              <Card style={{ width: '110%' }}>
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
                {!isDraft && <Checkbox checked={checked} onChange={handleCheckboxChange}>
                I accept the terms and conditions
                </Checkbox>}
                
                {currentStep == 0 && (
            <div style={{ marginTop: '20px' }}>
              
              <br />
                    {(checked || isDraft) && (
                      <Tooltip placement="topLeft" title={ isDraft ? 'Please click to continue your Draft':'Please click to start the assessment'}>
                      <Button type="primary" shape="round" onClick={handleNext}>
                {isDraft ? 'Continue Draft' : 'Start Assessment'} <PlayCircleFilled />
                        </Button>
                        </Tooltip>)}
              
            </div>
          )}

              </Card>
            </div>
          )}
          

          {currentStep != 0 && (
            <Card style={{ width: '170%', marginTop: '9px' }}>
              <div className="custom-scrollbar"  >
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
              <div style={{ display: 'flex', marginTop: '50px', justifyContent: 'space-between' }}>
                {currentStep > 0 && (
                  <>
                    <Button type="primary" shape = "round" onClick={handlePrevious}>
                      Previous
                    </Button>
                    <Button
                      type="primary"
                      icon={<SaveOutlined />}
                      onClick={handleDraft}
                      shape = "round"
                    >

                      Save as Draft
                    </Button>
                  </>
                )}
                {currentStep < categorys.length && (
                  <Button type="primary" onClick={handleNext} shape = "round">
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
                    <Button style={{ backgroundColor: '#40A3A1', color: 'white' }}>
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
