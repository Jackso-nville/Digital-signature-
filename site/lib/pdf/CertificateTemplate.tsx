import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 40,
  },
  container: {
    border: "2px solid #000",
    padding: 20,
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
  },
  body: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  recipient: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  signature: {
    borderTop: "1px solid #000",
    paddingTop: 5,
    width: "40%",
    textAlign: "center",
  },
  qrCode: {
    width: 80,
    height: 80,
  },
});

interface CertificateTemplateProps {
  studentName: string;
  cohort: string;
  qrCode: string;
  issuedAt: string;
}

export const CertificateTemplate: React.FC<CertificateTemplateProps> = ({
  studentName,
  cohort,
  qrCode,
  issuedAt,
}) => (
  <Document title="DADA DEVS Certificate">
    <Page size="A4" orientation="landscape" style={styles.page}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Certificate of Completion</Text>
          <Text style={styles.subtitle}>Dada Devs</Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.message}>This is to certify that</Text>
          <Text style={styles.recipient}>{studentName}</Text>
          <Text style={styles.message}>
            has successfully completed the {cohort} program.
          </Text>
        </View>
        <View style={styles.footer}>
          <View style={styles.signature}>
            <Text>Authorized Signature</Text>
            <Text>Date: {issuedAt}</Text>
          </View>
          <Image style={styles.qrCode} src={qrCode} />
        </View>
      </View>
    </Page>
  </Document>
);
