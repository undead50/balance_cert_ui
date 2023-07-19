import React, { useEffect } from 'react';
import { useState } from 'react';
import { Modal, Table, List } from 'antd';
import { useSelector } from 'react-redux';
import './index.css';
import ChartComponent from './AssessmentChart.js';

const AssessmentSummary = (props) => {
  const { assSummary } = useSelector((state) => state.risk);

  const handleCancel = () => {
    props.onCancel();
  };

  const modifiedSummary = assSummary.map((key) => {
    const data = {
      categoryName: key.categoryName,
      totalSum: `${key.totalSum}%`,
      categoryId: `${key.categoryId}%`,
      weightage: `${key.weightage}%`,
      weightageAverageScore: `${key.weightageAverageScore}%`,
    };

    return data;
  });

  const dataSource = modifiedSummary;

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
    },
  ];

  return (
    <div>
      <Modal
        title="Assessment Summary"
        open={props.visible}
        onCancel={handleCancel}
        footer={null}
        width="1000px"
        height="200px"
      >
        <div className="custom-scrollbar">
          <List
            size="small"
            bordered={true}
            dataSource={props.auditAssessmentRecord}
            style={{
              marginBottom: '50px',
              width: '500px',
              backgroundColor: '#FAFAFA',
            }}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />

          <Table dataSource={dataSource} columns={columns} pagination={false} />
          <ChartComponent />
        </div>
      </Modal>
    </div>
  );
};

export default AssessmentSummary;
