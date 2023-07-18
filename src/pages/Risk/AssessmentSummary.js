import React, { useEffect, useState } from 'react';
import { Modal, Table, Button } from 'antd';
import { useSelector } from 'react-redux';

const AssessmentSummary = (props) => {
  const [visible, setVisible] = useState(false);


  const { risks, loading, error,assSummary } = useSelector((state) => state.risk);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    props.onCancel()
  };

  const modifiedSummary = assSummary.map((key)=>{
    const data =
     {
        "categoryName": key.categoryName,
        "totalSum": `${key.totalSum}%`,
        "categoryId": `${key.categoryId}%`,
        "weightage": `${key.weightage}%`,
        "weightageAverageScore": `${key.weightageAverageScore}%`
    }

    return data

  })

  const dataSource = modifiedSummary

  const columns = [
    {
      title: 'Topic',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: 'Potential for improvement (0-100%)',
      dataIndex: 'totalSum',
      key: 'totalSum',
    },
    {
      title: 'Weightage',
      dataIndex: 'weightage',
      key: 'weightage',
    },
    {
        title: 'Weightage average score',
        dataIndex: 'weightageAverageScore',
        key: 'weightageAverageScore',
    }
  ];

  return (
    <div>
      <Modal
        title="Assessment Summary"
        open={props.visible}
        onCancel={handleCancel}
        footer={null}
        width="1000px"
      >
        <Table dataSource={dataSource} columns={columns} />
      </Modal>
    </div>
  );
};

export default AssessmentSummary;
