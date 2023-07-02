import { Table } from 'antd';


const dataSource = [
    {
      key: '1',
      typeOfAudit: 'Financial Audit',
      fiscalYear: '2023',
      auditUnit: 'Internal Audit Department',
      branchDepartmentList: 'Branch A, Department B, Department C',
      headOfAuditUnit: 'John Doe',
      auditPeriod: '2023-01-01 - 2023-12-31',
      onsiteAuditPeriod: '2023-05-01 - 2023-05-15',
      auditTeamLeader: 'Jane Smith',
      auditTeamList: 'John Smith, Sarah Johnson, Robert Davis',
      acmNo: 'ACM001',
      acmDate: '2023-06-15',
      numOfStaffAtAuditTime: 50,
    },
    // Add more objects for additional rows
  ];
  
  const columns = [
    {
      title: 'Type of Audit',
      dataIndex: 'typeOfAudit',
      key: 'typeOfAudit',
    },
    {
      title: 'Fiscal Year',
      dataIndex: 'fiscalYear',
      key: 'fiscalYear',
    },
    {
      title: 'Audit Unit',
      dataIndex: 'auditUnit',
      key: 'auditUnit',
    },
    {
      title: 'Branch/Department List',
      dataIndex: 'branchDepartmentList',
      key: 'branchDepartmentList',
    },
    {
      title: 'Head of Audit Unit (BM/Dept Head)',
      dataIndex: 'headOfAuditUnit',
      key: 'headOfAuditUnit',
    },
    {
      title: 'Audit Period (Start-End Date)',
      dataIndex: 'auditPeriod',
      key: 'auditPeriod',
    },
    {
      title: 'Onsite Audit Period',
      dataIndex: 'onsiteAuditPeriod',
      key: 'onsiteAuditPeriod',
    },
    {
      title: 'Audit Team Leader',
      dataIndex: 'auditTeamLeader',
      key: 'auditTeamLeader',
    },
    {
      title: 'Audit Team List',
      dataIndex: 'auditTeamList',
      key: 'auditTeamList',
    },
    {
      title: 'ACM No',
      dataIndex: 'acmNo',
      key: 'acmNo',
    },
    {
      title: 'ACM Date',
      dataIndex: 'acmDate',
      key: 'acmDate',
    },
    {
      title: 'No of staff at time of Audit',
      dataIndex: 'numOfStaffAtAuditTime',
      key: 'numOfStaffAtAuditTime',
    },
  ];
  

function Index() {
    // alert('index')
    return ( <Table dataSource={dataSource} columns={columns} />);
}

export default Index;