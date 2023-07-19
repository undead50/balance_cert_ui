import React, { useEffect } from 'react';
import { useState } from 'react';
import { Modal, Table, List } from 'antd';
import { useSelector } from 'react-redux';
import './index.js'

const AssessmentSummary = (props) => {

  const { assSummary } = useSelector((state) => state.risk);

  const handleCancel = () => {
    props.onCancel()
  };

  console.log(props.auditAssessmentRecord)

  const modifiedSummary = assSummary.map((key) => {
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
        <List
          size="small"
          bordered={true}
          data={props.auditAssessmentRecord}
          style={{ marginBottom: '50px', width: '500px', backgroundColor: '#FAFAFA' }}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
        <div className="custom-scrollbar">
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </div>
      </Modal>
    </div>
  );
};

export default AssessmentSummary;
