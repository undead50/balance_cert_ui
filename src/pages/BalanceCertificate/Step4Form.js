import React, { useEffect, useState } from 'react';
import { Form, Input, DatePicker } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import plugins from 'suneditor/src/plugins';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTemplatesAsync } from '../../store/slices/templateSlice';

const Step4Form = () => {
  const { control } = useForm();
  const dispatch = useDispatch();
  const { certificates, report_type, custom_description } = useSelector(
    (state) => state.certificate
  );
  const { templates } = useSelector((state) => state.template);
  const certificateData = certificates.length !== 0 ? certificates[0] : [];
  const [content, setContent] = useState('');

  useEffect(() => {
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

      // alert(foundTemplate.template);
      setContent(foundTemplate.template);
    } else {
      setContent(custom_description);
    }
  }, []);

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
    <Form>
      <Form.Item label="certificate">
        <Controller
          name="certificate"
          defaultValue=""
          control={control}
          render={({ field: { onChange, value } }) => (
            <SunEditor
              setDefaultStyle="font-family: arial; font-size: 12px; background: #fafafa !important; height: auto; position:relative; z-index:0"
              onChange={onChange}
              value={value}
              setContents={content}
              setOptions={{
                resizingBar: false,
                resizeEnable: true,
                resizingBarContainer: false,
                height: 'auto',
                minHeight: 160,
                historyStackDelayTime: 0,
                plugins: plugins,
                buttonList: [editorButtons],
              }}
            />
          )}
        />
      </Form.Item>
    </Form>
  );
};

export default Step4Form;
