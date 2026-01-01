import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import { colors, borderRadius, spacing, typography, elevation } from '../theme/theme';

const CommodityCard = ({ item, onPress }) => {
  const { t } = useTranslation();

  const getStatusColor = () => {
    switch (item.status) {
      case 'available':
        return colors.success;
      case 'low':
        return colors.warning;
      case 'out':
        return colors.error;
      default:
        return colors.textBody;
    }
  };

  const getStatusText = () => {
    switch (item.status) {
      case 'available':
        return 'Available';
      case 'low':
        return 'Low Stock';
      case 'out':
        return 'Out of Stock';
      default:
        return '';
    }
  };

  const getItemIcon = () => {
    switch (item.name.toLowerCase()) {
      case 'rice':
        return 'rice';
      case 'wheat':
        return 'wheat';
      case 'sugar':
        return 'cube-outline';
      default:
        return 'package-variant';
    }
  };

  // Calculate quantity indicator dots (10 dots total)
  const maxQuantity = 50; // Assuming max quantity for visualization
  const filledDots = Math.min(Math.round((item.quantity / maxQuantity) * 10), 10);
  const emptyDots = 10 - filledDots;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (onPress) onPress();
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.8}
      accessibilityLabel={`${item.name} ${getStatusText()}`}
    >
      {/* Icon Section */}
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={getItemIcon()}
          size={64}
          color={colors.primary}
        />
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        <Text style={styles.itemName}>{t(`common.${item.name.toLowerCase()}`)}</Text>

        {/* Quantity Indicator Dots */}
        <View style={styles.dotsContainer}>
          {Array.from({ length: filledDots }).map((_, i) => (
            <View key={`filled-${i}`} style={[styles.dot, styles.dotFilled]} />
          ))}
          {Array.from({ length: emptyDots }).map((_, i) => (
            <View key={`empty-${i}`} style={[styles.dot, styles.dotEmpty]} />
          ))}
        </View>

        {/* Quantity Text */}
        <Text style={styles.quantity}>{item.quantity} {item.unit}</Text>

        {/* Status Pill */}
        <View style={[styles.statusPill, { backgroundColor: getStatusColor() }]}>
          <MaterialCommunityIcons
            name={item.status === 'available' ? 'check' : item.status === 'low' ? 'alert' : 'close'}
            size={12}
            color={colors.white}
          />
          <Text style={styles.statusText}>{getStatusText()}</Text>
        </View>

        {/* Timestamp */}
        <Text style={styles.timestamp}>Last updated: 2 hours ago</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 200,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    marginRight: spacing.md,
    overflow: 'hidden',
    ...elevation.md,
  },
  iconContainer: {
    width: '100%',
    height: 100,
    backgroundColor: colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: spacing.md,
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    ...typography.h4,
    color: colors.textDark,
    marginBottom: spacing.sm,
  },
  dotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.xs,
    gap: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 2,
  },
  dotFilled: {
    backgroundColor: colors.primary,
  },
  dotEmpty: {
    backgroundColor: colors.border,
  },
  quantity: {
    ...typography.body,
    color: colors.textDark,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    marginBottom: spacing.xs,
    gap: 4,
  },
  statusText: {
    ...typography.caption,
    color: colors.white,
    fontWeight: '600',
  },
  timestamp: {
    ...typography.overline,
    color: colors.textBody,
  },
});

export default CommodityCard;
