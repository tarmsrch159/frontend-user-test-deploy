import React from 'react'
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer'


//Components

import { NavLink, Link } from 'react-router-dom'


const styles = StyleSheet.create({
    page:{
        backgroundColor: "#d11fb6",
        color: "white"
    },
    section:{
        margin: 10,
        padding: 10
    },
    viewer: { 
        width: window.innerWidth,
        height: window.innerHeight
    }
})


function Demo_pdf() {
  return (
    <PDFViewer>
        {/* Start of the document*/}
      <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text break render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`}>
                    First Gello break
                </Text>
            </View>
            <View style={styles.section}>
                <Text break>World</Text>
            </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default Demo_pdf