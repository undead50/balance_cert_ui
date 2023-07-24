import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Modal, Table, List, Button, Tag } from 'antd';
import { useSelector } from 'react-redux';
import './index.css';
import ChartComponent from './AssessmentChart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FilePdfOutlined } from '@ant-design/icons';

const AssessmentSummary = (props) => {
  const { assSummary } = useSelector((state) => state.risk);
  const modalContentRef = useRef(null);
  const [riskState, setRiskState] = useState('')

  const handleCancel = () => {
    props.onCancel();
  };

  const handleConvertToPDF = () => {
    const pdfWidth = 480; // Width of A4 in mm
    const pdfHeight = 297; // Height of A4 in mm
    html2canvas(modalContentRef.current).then((canvas) => {
      const dataURL = canvas.toDataURL();
      // Convert the dataURL to PDF using jspdf
      const pdf = new jsPDF({
        orientation: 'portrait', // You can also use 'landscape' if needed
        unit: 'mm',
        format: [pdfWidth, pdfHeight],
      });
      pdf.addImage(dataURL, 'PNG', 20, 1); // You can adjust the position and size of the image in the PDF
      pdf.save('assessment_summary.pdf');
    });
  };



  // useEffect(() => {
  //   const SortedData = assSummary.sort((a, b) => a.weightageAverageScore - b.weightageAverageScore);
  //   console.log('sorted data')
  //   console.log(SortedData)

  // },[])

  useEffect(() => {
    if (sumOfWeightageAverageScore < 20) {
      setRiskState('Low')
    }
    else if (sumOfWeightageAverageScore > 70) {
      setRiskState('High')
    }
    else {
      setRiskState('Medium')
    }

  }, [assSummary])


  const mutableData = [...assSummary];

  // Use the map() function to create a new array with sorted elements
  // Print the sorted array

  const sortByAverageWeight = mutableData.sort((a, b) => {
    return a.weightageAverageScore - b.weightageAverageScore
    // alert(a.weightageAverageScore)
  })

  const sumOfWeightageAverageScore = mutableData.reduce((accumulator, currentObj) => {
    return accumulator + currentObj.weightageAverageScore;
  }, 0);






  const sumOfTotalSum = mutableData.reduce((accumulator, currentObj) => {
    return accumulator + currentObj.totalSum;
  }, 0);


  const sumOfWeightage = mutableData.reduce((accumulator, currentObj) => {
    return accumulator + currentObj.weightage
  }, 0)

  const averageOfTotalSum = sumOfTotalSum / mutableData.length;

  const modifiedSummary = sortByAverageWeight.map((key) => {
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
        <Button type='text' onClick={handleConvertToPDF} icon={<FilePdfOutlined style={{ fontSize: '35px' }} />} size={'large'} ></Button>
        <br />
        <br />
        <div ref={modalContentRef}>
          {/* <div className="custom-scrollbar"> */}

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

          <Table dataSource={dataSource} columns={columns} pagination={false}
            summary={() => {
              return (
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}><strong>Final Scoring</strong></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}><strong>{averageOfTotalSum}% </strong></Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>
                      <strong>{sumOfWeightage}%</strong>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3}>
                      <strong>{sumOfWeightageAverageScore}% Risk: <Tag bordered={false} color={riskState === "High" ? "error" : riskState === "Low" ? "success" : riskState === "Medium" ? "warning" : null}>
                        {riskState}
                      </Tag></strong>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          />
          <ChartComponent />
        </div>
        {/* </div> */}

      </Modal>

    </div>
  );
};

export default AssessmentSummary;
