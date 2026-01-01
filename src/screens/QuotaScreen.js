import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { colors, spacing, typography, elevation } from '../theme/theme';

const { width } = Dimensions.get('window');

const QuotaScreen = ({ navigation }) => {
    const { t } = useTranslation();

    // Hardcoded data for Monthly Quota illustration
    const quotaSummary = {
        allocated: 35,
        drawn: 15,
        balance: 20,
        unit: 'kg'
    };

    const entitlements = [
        {
            id: 1,
            name: 'Rice (PHH)',
            price: '₹3.00 / kg',
            allocated: 20,
            drawn: 10,
            unit: 'kg',
            icon: 'grain',
            color: '#FFECDA',
            iconColor: '#FF7043',
            progressColor: '#8BC34A',
            secondaryText: '10 kg left'
        },
        {
            id: 2,
            name: 'Wheat',
            price: '₹2.00 / kg',
            allocated: 10,
            drawn: 0,
            unit: 'kg',
            icon: 'barley',
            color: '#FFF8E1',
            iconColor: '#FFA000',
            progressColor: '#8BC34A',
            secondaryText: '10 kg left'
        },
        {
            id: 3,
            name: 'Sugar',
            price: '₹13.50 / kg',
            allocated: 2,
            drawn: 2,
            unit: 'kg',
            icon: 'cube-outline',
            color: '#E3F2FD',
            iconColor: '#42A5F5',
            progressColor: '#90A4AE', // Fully drawn - greyed out style
            secondaryText: '0 kg left',
            fullyDrawn: true
        },
        {
            id: 4,
            name: 'Kerosene',
            price: '₹25.00 / L',
            allocated: 5,
            drawn: 2,
            unit: 'L',
            icon: 'water-outline',
            color: '#F3E5F5',
            iconColor: '#AB47BC',
            progressColor: '#8BC34A',
            secondaryText: '3 L left'
        }
    ];

    const renderProgressBar = (drawn, total, color, isFullyDrawn) => {
        const percentage = (drawn / total) * 100;
        return (
            <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground}>
                    <View
                        style={[
                            styles.progressBarFill,
                            {
                                width: `${percentage}%`,
                                backgroundColor: isFullyDrawn ? '#9CA3AF' : color
                            }
                        ]}
                    />
                </View>
                {isFullyDrawn && (
                    <View style={styles.fullyDrawnBadge}>
                        <MaterialCommunityIcons name="check-circle" size={16} color={colors.success} />
                        <Text style={styles.fullyDrawnText}>FULLY DRAWN</Text>
                    </View>
                )}
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
                <Text style={styles.headerTitle}>Monthly Quota</Text>
                <TouchableOpacity style={styles.historyButton} onPress={() => navigation.navigate('TrackerTab')}>
                    <MaterialCommunityIcons name="history" size={24} color={colors.textBody} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                {/* Period Selector */}
                <View style={styles.periodSection}>
                    <Text style={styles.periodLabel}>CURRENT PERIOD</Text>
                    <View style={styles.periodRow}>
                        <TouchableOpacity style={styles.periodSelector}>
                            <Text style={styles.periodText}>October 2023</Text>
                            <MaterialCommunityIcons name="chevron-down" size={24} color={colors.textDark} />
                        </TouchableOpacity>
                        <View style={styles.activeBadge}>
                            <Text style={styles.activeBadgeText}>Active</Text>
                        </View>
                    </View>
                </View>

                {/* Summary Cards */}
                <View style={styles.summaryContainer}>
                    <View style={styles.summaryCard}>
                        <Text style={styles.summaryLabel}>ALLOCATED</Text>
                        <View style={styles.summaryValueRow}>
                            <Text style={styles.summaryValue}>{quotaSummary.allocated}</Text>
                            <Text style={styles.summaryUnit}>{quotaSummary.unit}</Text>
                        </View>
                    </View>

                    <View style={styles.summaryCard}>
                        <Text style={[styles.summaryLabel, { color: '#EF5350' }]}>DRAWN</Text>
                        <View style={styles.summaryValueRow}>
                            <Text style={[styles.summaryValue, { color: '#EF5350' }]}>{quotaSummary.drawn}</Text>
                            <Text style={[styles.summaryUnit, { color: '#EF5350' }]}>{quotaSummary.unit}</Text>
                        </View>
                    </View>

                    <View style={[styles.summaryCard, styles.balanceCard]}>
                        <Text style={[styles.summaryLabel, { color: '#FFF' }]}>BALANCE</Text>
                        <View style={styles.summaryValueRow}>
                            <Text style={[styles.summaryValue, { color: '#FFF' }]}>{quotaSummary.balance}</Text>
                            <Text style={[styles.summaryUnit, { color: '#FFF' }]}>{quotaSummary.unit}</Text>
                        </View>
                    </View>
                </View>

                {/* Entitlements List */}
                <View style={styles.entitlementsHeader}>
                    <Text style={styles.sectionTitle}>ENTITLEMENTS</Text>
                    <Text style={styles.itemCount}>{entitlements.length} Items</Text>
                </View>

                <View style={styles.entitlementsList}>
                    {entitlements.map((item) => (
                        <View key={item.id} style={styles.entitlementCard}>
                            <View style={styles.cardHeader}>
                                <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                                    <MaterialCommunityIcons name={item.icon} size={28} color={item.iconColor} />
                                </View>
                                <View style={styles.headerInfo}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemPrice}>{item.price}</Text>
                                </View>
                                <View style={styles.balanceInfo}>
                                    <Text style={[styles.balanceText, { color: item.fullyDrawn ? '#9CA3AF' : '#8BC34A' }]}>
                                        {item.secondaryText.split(' ')[0]}
                                        <Text style={{ fontWeight: '400', color: colors.textBody }}> {item.secondaryText.split(' ').slice(1).join(' ')}</Text>
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.progressSection}>
                                <View style={styles.progressLabels}>
                                    <Text style={styles.progressLabelLeft}>Drawn: <Text style={{ fontWeight: '600', color: colors.textDark }}>{item.drawn} {item.unit}</Text></Text>
                                    {!item.fullyDrawn && (
                                        <Text style={styles.progressLabelRight}>Total: {item.allocated} {item.unit}</Text>
                                    )}
                                </View>
                                {renderProgressBar(item.drawn, item.allocated, item.progressColor, item.fullyDrawn)}
                                {item.fullyDrawn && (
                                    <View style={styles.fullyDrawnFooter}>
                                        <Text style={styles.progressLabelRight}>Total: {item.drawn} {item.unit}</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    ))}
                </View>

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
    historyButton: {
        padding: spacing.xs,
    },
    content: {
        paddingHorizontal: spacing['2xl'],
        paddingBottom: 100,
    },
    periodSection: {
        marginTop: spacing.md,
        marginBottom: spacing['2xl'],
    },
    periodLabel: {
        ...typography.overline,
        color: colors.textBody,
        marginBottom: spacing.xs,
    },
    periodRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    periodSelector: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    periodText: {
        ...typography.h2,
        color: colors.textDark,
        marginRight: spacing.xs,
    },
    activeBadge: {
        backgroundColor: '#E8F5E9',
        paddingHorizontal: spacing.lg,
        paddingVertical: 6,
        borderRadius: 999,
    },
    activeBadgeText: {
        ...typography.caption,
        color: '#2E7D32',
        fontWeight: '600',
    },
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing['3xl'],
    },
    summaryCard: {
        width: (width - spacing['2xl'] * 2 - spacing.md * 2) / 3,
        backgroundColor: colors.white,
        borderRadius: 24,
        padding: spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        ...elevation.sm,
    },
    balanceCard: {
        backgroundColor: '#8BC34A', // Green background
    },
    summaryLabel: {
        ...typography.overline,
        fontSize: 10,
        color: colors.textBody,
        marginBottom: spacing.sm,
    },
    summaryValueRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    summaryValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.textDark,
    },
    summaryUnit: {
        fontSize: 14,
        fontWeight: '500',
        color: colors.textBody,
        marginLeft: 2,
    },
    entitlementsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    sectionTitle: {
        ...typography.caption,
        fontSize: 12,
        fontWeight: '600',
        color: colors.textBody,
        letterSpacing: 1,
    },
    itemCount: {
        ...typography.caption,
        color: colors.textBody,
    },
    entitlementsList: {
        gap: spacing.lg,
    },
    entitlementCard: {
        backgroundColor: colors.white,
        borderRadius: 28,
        padding: spacing.xl,
        ...elevation.sm,
    },
    cardHeader: {
        flexDirection: 'row',
        marginBottom: spacing.lg,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.lg,
    },
    headerInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    itemName: {
        ...typography.h4,
        color: colors.textDark,
        marginBottom: 4,
    },
    itemPrice: {
        ...typography.caption,
        color: colors.textBody,
    },
    balanceInfo: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    balanceText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    progressSection: {
        marginTop: spacing.xs,
    },
    progressLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.sm,
    },
    progressLabelLeft: {
        ...typography.caption,
        color: colors.textBody,
    },
    progressLabelRight: {
        ...typography.caption,
        color: colors.textBody,
    },
    progressBarContainer: {
        height: 8, // Thin progress bar
        justifyContent: 'center',
    },
    progressBarBackground: {
        height: 8,
        backgroundColor: '#F3F4F6',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 4,
    },
    fullyDrawnBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: spacing.sm,
    },
    fullyDrawnText: {
        ...typography.caption,
        color: colors.success,
        fontWeight: 'bold',
        marginLeft: 4,
        fontSize: 10,
    },
    fullyDrawnFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 4,
    }
});

export default QuotaScreen;
