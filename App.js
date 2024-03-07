import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useState } from "react";
import * as DocumentPicker from 'expo-document-picker';
import { PDFDocument } from 'pdf-lib';
import * as FileSystem from 'expo-file-system';
import React from 'react';
import Pdf from 'react-native-pdf';


import Button from './components/Button';

export default function App() {
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [pdfText, setPdfText] = useState(null);

  const pickPDF = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      type: 'application/pdf'
    });

    if(!result.canceled) {
      // const localUri = result.assets[0].uri;
      // const filename = localUri.split('/').pop();
      // const destinationUri = `${FileSystem.cacheDirectory}${filename}`;
      // await FileSystem.copyAsync({ from: localUri, to: destinationUri });
      setSelectedPdf(result.assets[0].uri)
      // extractTextFromPdf(destinationUri)
    } else {
      alert('Aucun fichier sélectionné')
    }
  };

  // Je n'arrive pas à extraire le pdf.

  // const extractTextFromPdf = async (pdfUri) => {
  //   try {
  //     const pdfData = await FileSystem.readAsStringAsync(pdfUri, { encoding: FileSystem.EncodingType.Base64 });
  //     const pdfDoc = await PDFDocument.load(pdfData, { ignoreEncryption: true });
  //     const pageCount = pdfDoc.getPageCount();
  //     let extractedText = '';

  //     for (let i=0; i < pageCount; i++) {
  //       const page = pdfDoc.getPage(i);
  //       const content = await page.getContent();
        
  //       content.items.forEach(item => {
  //         if (item.str) {
  //           extractedText += item.str + ' ';
  //         }
  //       });
  //       extractedText += '\n';
  //     }
  //     setPdfText(extractedText);
  //   } catch (error) {
  //     console.error('Une erreur est survenue lors de l\'extraction du texte du PDF :', error);
  //   }
  // };

  return (
    <View style={styles.container}>
    {/* {selectedPdf ? (
      <Pdf
        source={{ uri: selectedPdf }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        style={styles.pdf}
      />
    ) : (
      <Text style={styles.textStyle}>Veuillez sélectionner un fichier pdf à importer !</Text>
    )} */}
      <View style={styles.footerContainer}>
          <Button theme="primary" label="Sélectionner un PDF" onPress={pickPDF}/>
          <Button label="Utiliser ce PDF" onPress={() => alert('You pressed a button.')}/>
        </View> 
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    padding: 200,
    justifyContent: 'center',
  },
  textStyle: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
