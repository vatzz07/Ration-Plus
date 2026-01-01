import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { colors, borderRadius, spacing } from '../theme/theme';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const QuotaCard = ({ item, quota }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const rotation = useSharedValue(0);

  const toggleExpanded = () => {
    setExpanded(!expanded);
    rotation.value = withTiming(expanded ? 0 : 180, { duration: 200 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const total = quota.allocated;
  const used = quota.used;
  const remaining = quota.remaining;
  const usedPercentage = (used / total) * 100;
  const remainingPercentage = (remaining / total) * 100;

  const getItemIcon = () => {
    switch (item.toLowerCase()) {
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

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.header}
        onPress={toggleExpanded}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons
            name={getItemIcon()}
            size={24}
            color={colors.primary}
          />
          <Text style={styles.itemName}>{t(`common.${item.toLowerCase()}`)}</Text>
        </View>
        <Animated.View style={animatedStyle}>
          <MaterialCommunityIcons
            name="chevron-down"
            size={24}
            color={colors.textSecondary}
          />
        </Animated.View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.content}>
          <View style={styles.quotaRow}>
            <Text style={styles.label}>{t('tracker.allocated')}:</Text>
            <Text style={styles.value}>{total} {t('tracker.kg')}</Text>
          </View>
          <View style={styles.quotaRow}>
            <Text style={styles.label}>{t('tracker.used')}:</Text>
            <Text style={styles.value}>{used} {t('tracker.kg')}</Text>
          </View>
          <View style={styles.quotaRow}>
            <Text style={styles.label}>{t('tracker.remaining')}:</Text>
            <Text style={[styles.value, { color: colors.success }]}>
              {remaining} {t('tracker.kg')}
            </Text>
          </View>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressUsed,
                  { width: `${usedPercentage}%` },
                ]}
              />
              <View
                style={[
                  styles.progressRemaining,
                  { width: `${remainingPercentage}%` },
                ]}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginLeft: spacing.sm,
  },
  content: {
    padding: spacing.md,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  quotaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  progressContainer: {
    marginTop: spacing.sm,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  progressUsed: {
    height: '100%',
    backgroundColor: colors.textSecondary,
  },
  progressRemaining: {
    height: '100%',
    backgroundColor: colors.success,
  },
});

export default QuotaCard;

