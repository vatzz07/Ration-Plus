import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { colors, spacing, typography, elevation } from '../theme/theme';

const TransactionsScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const transactions = [
    {
      id: '1',
      date: '15 Oct, Sun',
      time: '10:30 AM',
      txnId: '#TXN8821',
      status: 'COLLECTED',
      statusColor: '#E8F5E9',
      statusTextColor: '#2E7D32',
      items: [
        { name: 'Rice (PHH)', qty: '10 kg', icon: 'grain', color: '#FFECDA', iconColor: '#FF7043' },
        { name: 'Wheat', qty: '5 kg', icon: 'barley', color: '#FFF8E1', iconColor: '#FFA000' },
        { name: 'Sugar', qty: '1 kg', icon: 'cube-outline', color: '#E3F2FD', iconColor: '#42A5F5' },
      ],
      shopName: 'Fair Price Shop #1204',
      shopAddress: '12/B, Gandhi Road, T. Nagar, Chennai',
      month: 'October 2023',
    },
    {
      id: '2',
      date: '12 Sep, Tue',
      time: '04:15 PM',
      txnId: '#TXN7554',
      status: 'COLLECTED',
      statusColor: '#E8F5E9',
      statusTextColor: '#2E7D32',
      items: [
        { name: 'Rice (PHH)', qty: '10 kg', icon: 'grain', color: '#FFECDA', iconColor: '#FF7043' },
        { name: 'Kerosene', qty: '2 L', icon: 'water-outline', color: '#F3E5F5', iconColor: '#AB47BC' },
      ],
      shopName: 'Fair Price Shop #1204',
      shopAddress: '12/B, Gandhi Road, T. Nagar, Chennai',
      month: 'September 2023',
    },
    {
      id: '3',
      date: '01 Sep, Fri',
      time: '09:00 AM',
      requestType: 'Delivery Request',
      status: 'CANCELLED',
      statusColor: '#F3F4F6',
      statusTextColor: '#6B7280',
      iconStatus: 'close-circle',
      items: [
        { name: 'Wheat', qty: '5 kg', icon: 'barley', color: '#FFF8E1', iconColor: '#FFA000' },
      ],
      isDelivery: true,
      deliveryReason: 'Request cancelled by user',
    }
  ];

  const renderTransactionItem = ({ item }) => {
    return (
      <View style={styles.transactionCard}>
        {/* Header */}
        <View style={styles.cardHeader}>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.dateText}>{item.date}</Text>
              <View style={[styles.statusDot, { backgroundColor: item.statusTextColor === '#2E7D32' ? colors.success : '#9CA3AF' }]} />
            </View>
            <Text style={styles.timeText}>
              {item.time} • {item.isDelivery ? item.requestType : `ID ${item.txnId}`}
            </Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: item.statusColor }]}>
            {item.status === 'CANCELLED' && <MaterialCommunityIcons name="close-circle" size={14} color={item.statusTextColor} style={{ marginRight: 4 }} />}
            {item.status === 'COLLECTED' && <MaterialCommunityIcons name="check-circle" size={14} color={item.statusTextColor} style={{ marginRight: 4 }} />}
            <Text style={[styles.statusText, { color: item.statusTextColor }]}>{item.status}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Items List */}
        <View style={styles.itemsList}>
          {item.items.map((prod, index) => (
            <View key={index} style={styles.productRow}>
              <View style={[styles.itemIcon, { backgroundColor: prod.color }]}>
                <MaterialCommunityIcons name={prod.icon} size={18} color={prod.iconColor} />
              </View>
              <Text style={styles.productName}>{prod.name}</Text>
              <Text style={styles.productQty}>{prod.qty}</Text>
            </View>
          ))}
        </View>

        {/* Footer (Shop or Delivery info) */}
        <View style={styles.footerContainer}>
          <View style={styles.shopInfoBox}>
            <MaterialCommunityIcons
              name={item.isDelivery ? "truck-delivery" : "store"}
              size={20}
              color={colors.textBody}
            />
            <View style={{ marginLeft: spacing.lg, flex: 1 }}>
              <Text style={styles.shopName}>
                {item.isDelivery ? 'Home Delivery' : item.shopName}
              </Text>
              <Text style={styles.shopAddress}>
                {item.isDelivery ? item.deliveryReason : item.shopAddress}
              </Text>
            </View>
          </View>
        </View>

      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transactions</Text>
        <TouchableOpacity style={styles.helpButton} onPress={() => navigation.navigate('Help')}>
          <MaterialCommunityIcons name="help-circle" size={24} color={colors.textBody} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Filter History */}
        <View style={styles.filterSection}>
          <Text style={styles.filterLabel}>FILTER HISTORY</Text>
          <TouchableOpacity style={styles.datePicker}>
            <Text style={styles.datePickerText}>October 2023</Text>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <MaterialCommunityIcons name="calendar-blank" size={20} color={colors.textDark} />
              <MaterialCommunityIcons name="calendar-month" size={20} color={colors.textBody} />
            </View>
          </TouchableOpacity>
        </View>

        {/* October 2023 List */}
        <Text style={styles.monthTitle}>October 2023</Text>
        {renderTransactionItem({ item: transactions[0] })}

        {/* September 2023 List */}
        <Text style={styles.monthTitle}>September 2023</Text>
        {renderTransactionItem({ item: transactions[1] })}
        {renderTransactionItem({ item: transactions[2] })}

      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing['2xl'],
    paddingVertical: spacing.lg,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.textDark,
  },
  helpButton: {
    padding: spacing.xs,
  },
  content: {
    paddingHorizontal: spacing['2xl'],
    paddingBottom: 100,
  },
  filterSection: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: spacing.lg,
    marginTop: spacing.sm,
    marginBottom: spacing['2xl'],
    ...elevation.sm,
  },
  filterLabel: {
    ...typography.overline,
    color: colors.textBody,
    marginBottom: spacing.sm,
    letterSpacing: 1,
  },
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: spacing.md,
  },
  datePickerText: {
    ...typography.body,
    fontWeight: '500',
    color: colors.textDark,
  },
  monthTitle: {
    ...typography.body,
    color: colors.textBody,
    marginBottom: spacing.lg,
    fontWeight: '600',
    marginTop: spacing.md,
  },
  transactionCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...elevation.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  dateText: {
    ...typography.h4,
    fontSize: 18,
    color: colors.textDark,
    marginRight: spacing.xs,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 2,
  },
  timeText: {
    ...typography.caption,
    color: colors.textBody,
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    ...typography.caption,
    fontWeight: '700',
    fontSize: 10,
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: spacing.lg,
  },
  itemsList: {
    marginBottom: spacing.lg,
    gap: spacing.lg,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  productName: {
    ...typography.body,
    color: colors.textDark,
    flex: 1,
    fontWeight: '500',
  },
  productQty: {
    ...typography.body,
    color: colors.textDark,
    fontWeight: '600',
  },
  footerContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: spacing.md,
  },
  shopInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopName: {
    ...typography.bodySmall,
    fontWeight: '600',
    color: colors.textDark,
  },
  shopAddress: {
    ...typography.caption,
    color: colors.textBody,
    marginTop: 2,
  }
});

export default TransactionsScreen;
