import React from 'react';
import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const MyPdfDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.section}>
        {/* Your entire component's content goes here */}
        <h1>Hello, this is my PDF!</h1>
                <p>This is an example of rendering a whole component as a PDF.</p>
                asdfasdfasdfasdf
        {/* Include all other content of your component */}
      </Text>
    </Page>
  </Document>
);

export default MyPdfDocument;
