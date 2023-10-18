import React, { useEffect, useState } from 'react';
import { Form, Button, DatePicker,Card,message } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import plugins, { table } from 'suneditor/src/plugins';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTemplatesAsync } from '../../store/slices/templateSlice';
import { setCertificate } from '../../store/slices/certificateSlice';
import { ToWords } from 'to-words';


const DataTable = (data) => {

  const tableRows = data.map((item, index) => (
    `<tr key=${index}>
      <td>${item["ACCT_NO"]}</td>
      <td>${item["ACCT_CRNCY_CODE"]}</td>
      <td>${item["BALANCE_EOD"]}</td>
      <td>${item["BALANCE_CONVERTED"]}</td>
      <td>${item["EQU_FCRNCY"]}</td>
      <td>${item["RATE"]}</td>
    </tr>`
  ));
  return `
    <div style="margin-left:25px">
      <table>
        <thead>
          <tr>
            <th>Account Number</th>
            <th>Account Currency</th>
            <th>Account Balance</th>
            <th>Equivalent(FCY)</th>
            <th>FCY Currency</th>
            <th>Exchange Rate</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows.join('')}
        </tbody>
      </table>
    </div>
  `;
};


// Define a handler function to convert amounts to words for different currencies
const  convertAmountToWords = (amount, currencyCode) =>{
  // Create a configuration object for each supported currency
  // alert(amount)
  // alert(currencyCode)
  const currencyConfig = {
    'JPY': {
      localeCode: 'en-BD',
      currencyOptions: {
        name: 'Japanese Yen',
        plural: 'Japanese Yen',
        symbol: '¥',
        fractionalUnit: {
          name: 'Sen',
          plural: 'Sen',
          symbol: '',
        },
      },
    },
    'USD': {
      localeCode: 'en-US',
      currency: true,
      currencyOptions: {
        name: 'United States Dollar',
        plural: 'United States Dollars',
        symbol: '$',
        fractionalUnit: {
          name: 'Cent',
          plural: 'Cents',
          symbol: '¢',
        },
      },
    },
    'AUD': {
      localeCode: 'en-US',
      currency: true,
      currencyOptions: {
        name: 'Australian Dollar',
        plural: 'Australian Dollars',
        symbol: '$',
        fractionalUnit: {
          name: 'Cent',
          plural: 'Cents',
          symbol: '¢',
        },
      },
    },
    'EUR': {
      localeCode: 'en-GB',
      currency: true,
      currencyOptions: {
        name: 'Euro',
        plural: 'Euros',
        symbol: '€',
        fractionalUnit: {
          name: 'Cent',
          plural: 'Cents',
          symbol: '¢',
        },
      },
    },
    'INR': {
      localeCode: 'en-IN',
      currency: true,
      currencyOptions: {
        name: 'Indian Rupee',
        plural: 'Indian Rupees',
        symbol: '₹',
        fractionalUnit: {
          name: 'Paisa',
          plural: 'Paise',
          symbol: '',
        },
      },
    },
    'NPR': {
      localeCode: 'en-NP',
      currency: true,
      currencyOptions: {
        name: 'Nepalese Rupee',
        plural: 'Nepalese Rupees',
        symbol: 'रू',
        fractionalUnit: {
          name: 'Paisa',
          plural: 'Paisa',
          symbol: '',
        },
      },
    },
    'GBP': {
      localeCode: 'en-GB',
      currencyOptions: {
        name: 'British Pound Sterling',
        plural: 'British Pounds Sterling',
        symbol: '£',
        fractionalUnit: {
          name: 'Pence',
          plural: 'Pence',
          symbol: 'p',
        },
      },
    },
    // Add configurations for other currencies as needed
  };

  // Check if the provided currency code is supported
  if (currencyConfig[currencyCode]) {
    const toWordsConfig = currencyConfig[currencyCode];
    const toWordsConverter = new ToWords(toWordsConfig);
    return toWordsConverter.convert(amount,{ currency: true });
  } else {
    return 'Currency not supported';
  }
}
const Step4Form = () => {
  const { control } = useForm();
  const dispatch = useDispatch();
  const { certificates, report_type, custom_description } = useSelector(
    (state) => state.certificate
  );
  const { templates } = useSelector((state) => state.template);
  const certificateData = certificates.length !== 0 ? certificates[0] : [];
  const [content, setContent] = useState('');
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    // alert(certificateData['ACCT_CRNCY_CODE'])
    // alert(certificateData['BALANCE_NPR'])
    // alert(certificateData['ACCT_CRNCY_CODE'])
    let ACCOUNT_CRNCY_WORD = convertAmountToWords(parseFloat(certificateData['BALANCE_NPR']), certificateData['ACCT_CRNCY_CODE']);
    var BALANCE_CONVERTED = 0
    if (certificateData.CERTIFICATE_TYPE === 'S') {
      var BALANCE_FCY_WORD = convertAmountToWords(parseFloat(certificateData['BALANCE_FCY']), certificateData['EQU_FCRNCY']);
    } else {

      const sumOfBalanceConverted = certificateData.COMBINED_DATA.reduce((acc, item) => {
        // Convert the string values to numbers before adding
        const balanceConverted = parseFloat(item.BALANCE_CONVERTED) || 0;
        return acc + balanceConverted;
      }, 0);
      // alert(sumOfBalanceConverted)
      // alert(certificateData['EQU_FCRNCY'])
      var BALANCE_FCY_WORD = convertAmountToWords(sumOfBalanceConverted,certificateData['EQU_FCRNCY']);
    }
    
    dispatch(fetchTemplatesAsync());
    console.log(templates);
    const template_string = (template_string_name) => {
      for (const template of templates) {
        if (template.template_name === template_string_name) {
          return template;
        }
      }
      return null;
    };
    if (report_type === 'standard') {
      var template_string_name =
        certificateData.CERTIFICATE_TYPE === 'S'
          ? 'balance_certificate_single'
          : 'balance_certificate_combined';



      const foundTemplate = template_string(template_string_name);

      // const ACCOUNT_NAME = certificateData["ACCOUNT_NAME"];
      // alert(ACCOUNT_NAME)
      var finalContent = foundTemplate.template;
      if (certificateData.CERTIFICATE_TYPE === 'S') {
      finalContent = finalContent.replace('${ACCOUNT_NAME}', certificateData["ACCOUNT_NAME"]);
      finalContent = finalContent.replace('${ACCOUNTNUMBER}', certificateData['ACCOUNTNUMBER']);
      finalContent = finalContent.replace('${REFERENCE_NO}', certificateData['REFERENCE_NO']);
      finalContent = finalContent.replace('${BALANCE_NPR}', certificateData['BALANCE_NPR']);
      finalContent = finalContent.replace('${BALANCE_FCY}', certificateData['BALANCE_FCY']);
      finalContent = finalContent.replace(/\${ACCT_CRNCY_CODE}/g, certificateData['ACCT_CRNCY_CODE']);
      finalContent = finalContent.replace(/\${EQU_FCRNCY}/g, certificateData['EQU_FCRNCY']);
      finalContent = finalContent.replace(/\${ACCOUNT_CRNCY_WORD}/g, ACCOUNT_CRNCY_WORD);
      finalContent = finalContent.replace(/\${BALANCE_FCY_WORD}/g, BALANCE_FCY_WORD);
      finalContent = finalContent.replace('${CERT_ISSUING_BRANCH}', certificateData['CERT_ISSUING_BRANCH']);
      finalContent = finalContent.replace('${RATE}', certificateData['RATE']);
      } else {
        console.log('start')
        console.log(certificateData['COMBINED_DATA'])
        const tableData = DataTable(certificateData['COMBINED_DATA'])
        finalContent = finalContent.replace('${TABLE}', tableData);
        finalContent = finalContent.replace('${CIF_ID}', certificateData['CIF_ID']);
        finalContent = finalContent.replace('${CERT_ISSUING_BRANCH}', certificateData['CERT_ISSUING_BRANCH']);
        finalContent = finalContent.replace(/\${EQU_FCRNCY}/g, certificateData['EQU_FCRNCY']);
        finalContent = finalContent.replace('${REFERENCE_NO}', certificateData['REFERENCE_NO']);
        finalContent = finalContent.replace(/\${BALANCE_FCY_WORD}/g, BALANCE_FCY_WORD);
        finalContent = finalContent.replace('${CERT_ISSUING_BRANCH}', certificateData['CERT_ISSUING_BRANCH']);
        console.log(tableData)
      }
      
      // alert(foundTemplate.template);
      setContent(finalContent);
    } else {
      setContent(custom_description);
    }
  }, []);

  const onFinish = (values) => { 
    dispatch(setCertificate(control._formValues.certificate))
    console.log(control._formValues.certificate)
    messageApi.open({
      type: 'success',
      content: 'confrimed',
  });
  }


  const editorButtons = [
    'bold',
    'underline',
    'italic',
    'fontSize',
    'hiliteColor',
    'removeFormat',
    'outdent',
    'indent',
    'align',
    'horizontalRule',
    'list',
    'table',
    'fullScreen',
  ];
  return (
    <Card>
      {contextHolder}
    <Form form={form} name="verficationForm" layout="vertical" onFinish={onFinish}>
      <Form.Item label="certificate">
        <Controller
          name="certificate"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <SunEditor
              setDefaultStyle="font-family: Arial; width: 800px; font-size: 12px; background: #fafafa !important; height: 297mm; position: relative; z-index: 0;"
              onChange={onChange}
              value={value}
              setContents={content}
              setOptions={{
                resizingBar: false,
                resizeEnable: true,
                resizingBarContainer: false,
                height: 297, // Set the height in millimeters to match A4
                minHeight: 160,
                historyStackDelayTime: 0,
                plugins: plugins,
                buttonList: [editorButtons],
              }}
            />
          )}
        />
      </Form.Item>
      <Button type="primary" shape='round' htmlType="submit">
                    Confrim
      </Button>
      </Form>
      </Card>
  );
};

export default Step4Form;
