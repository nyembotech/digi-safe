import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { format } from 'date-fns';
import type { RegistrationData } from '../types/registration';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  companyInfo: {
    fontSize: 10,
    textAlign: 'right',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    backgroundColor: '#f3f4f6',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: 120,
    fontSize: 10,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
    fontSize: 10,
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    padding: 5,
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 5,
    fontSize: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  col1: { width: '40%' },
  col2: { width: '20%' },
  col3: { width: '20%' },
  col4: { width: '20%' },
  priceBreakdown: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  priceLabel: {
    fontSize: 10,
    marginRight: 20,
  },
  priceValue: {
    fontSize: 10,
    width: 80,
    textAlign: 'right',
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 20,
  },
  totalValue: {
    fontSize: 12,
    fontWeight: 'bold',
    width: 80,
    textAlign: 'right',
  },
  discountHighlight: {
    color: '#059669',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 8,
    textAlign: 'center',
    color: '#6b7280',
  },
});

interface InvoiceProps {
  registration: RegistrationData;
}

export function Invoice({ registration }: InvoiceProps) {
  if (!registration || !registration.courseInfo) {
    return (
      <div className="p-4 text-center text-gray-500">
        No registration data available
      </div>
    );
  }

  // Calculate price breakdown
  const finalAmount = registration.payment.amount;
  const discountPercentage = registration.payment.subsidyRequested ? 40 : 0;
  const originalPrice = finalAmount / (1 - (discountPercentage / 100));
  const discountAmount = originalPrice - finalAmount;

  return (
    <PDFViewer style={{ width: '100%', height: '600px' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.companyInfo}>
              <Text>DigiSafe Europe GmbH</Text>
              <Text>Innovationsstraße 123</Text>
              <Text>60313 Frankfurt am Main</Text>
              <Text>Germany</Text>
              <Text>VAT: DE123456789</Text>
            </View>
          </View>

          <Text style={styles.title}>Invoice</Text>

          {/* Invoice Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Invoice Details</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Invoice Number:</Text>
              <Text style={styles.value}>{registration.invoiceNumber}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Date:</Text>
              <Text style={styles.value}>
                {format(new Date(registration.createdAt.seconds * 1000), 'MMMM d, yyyy')}
              </Text>
            </View>
          </View>

          {/* Bill To */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Bill To</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>
                {registration.parentInfo.firstName} {registration.parentInfo.lastName}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{registration.parentInfo.email}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Phone:</Text>
              <Text style={styles.value}>{registration.parentInfo.phone}</Text>
            </View>
            {registration.parentInfo.address && (
              <View style={styles.row}>
                <Text style={styles.label}>Address:</Text>
                <Text style={styles.value}>
                  {registration.parentInfo.address.street}
                  {'\n'}
                  {registration.parentInfo.address.city}, {registration.parentInfo.address.postalCode}
                  {'\n'}
                  {registration.parentInfo.address.country}
                </Text>
              </View>
            )}
          </View>

          {/* Course Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Course Details</Text>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.col1}>Description</Text>
                <Text style={styles.col2}>Date</Text>
                <Text style={styles.col3}>Time</Text>
                <Text style={styles.col4}>Amount</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.col1}>{registration.courseInfo.courseName}</Text>
                <Text style={styles.col2}>{registration.courseInfo.date}</Text>
                <Text style={styles.col3}>{registration.courseInfo.time}</Text>
                <Text style={styles.col4}>€{originalPrice.toFixed(2)}</Text>
              </View>
            </View>

            {/* Price Breakdown */}
            <View style={styles.priceBreakdown}>
              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Original Price:</Text>
                <Text style={styles.priceValue}>€{originalPrice.toFixed(2)}</Text>
              </View>
              {discountPercentage > 0 && (
                <View style={styles.priceRow}>
                  <Text style={[styles.priceLabel, styles.discountHighlight]}>
                    Discount ({discountPercentage}%):
                  </Text>
                  <Text style={[styles.priceValue, styles.discountHighlight]}>
                    -€{discountAmount.toFixed(2)}
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.total}>
              <Text style={styles.totalLabel}>Total Amount:</Text>
              <Text style={styles.totalValue}>€{finalAmount.toFixed(2)}</Text>
            </View>
          </View>

          {/* Payment Status */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Information</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Payment Method:</Text>
              <Text style={styles.value}>{registration.payment.method}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Payment Status:</Text>
              <Text style={styles.value}>{registration.payment.status}</Text>
            </View>
            {registration.payment.transactionId && (
              <View style={styles.row}>
                <Text style={styles.label}>Transaction ID:</Text>
                <Text style={styles.value}>{registration.payment.transactionId}</Text>
              </View>
            )}
          </View>

          {/* Footer */}
          <Text style={styles.footer}>
            Thank you for choosing DigiSafe Europe. For any questions, please contact us at support@digisafe-europe.eu
          </Text>
        </Page>
      </Document>
    </PDFViewer>
  );
}