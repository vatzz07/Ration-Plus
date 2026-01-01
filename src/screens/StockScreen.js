import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { colors, spacing, typography, elevation } from '../theme/theme';

const StockScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('All Items');
    const [searchQuery, setSearchQuery] = useState('');

    const stockItems = [
        {
            id: 1,
            name: 'Rice (PHH)',
            allocated: '1500kg',
            current: '850 kg',
            status: 'In Stock',
            icon: 'grain', // Using grain icon for rice representation
            color: '#E8F5E9',
            iconColor: '#2E7D32',
        },
        {
            id: 2,
            name: 'Wheat',
            allocated: '800kg',
            current: '45 kg',
            status: 'Low Stock',
            icon: 'barley',
            color: '#FFF8E1',
            iconColor: '#F57F17',
        },
        {
            id: 3,
            name: 'Sugar',
            allocated: '200kg',
            current: '0 kg',
            status: 'Out of Stock',
            icon: 'cube-outline',
            color: '#F5F5F5',
            iconColor: '#757575',
        },
        {
            id: 4,
            name: 'Tur Dal',
            allocated: '300kg',
            current: '120 kg',
            status: 'In Stock',
            icon: 'seed',
            color: '#E8F5E9',
            iconColor: '#2E7D32',
        },
        {
            id: 5,
            name: 'Palm Oil',
            allocated: '500L',
            current: '210 L',
            status: 'In Stock',
            icon: 'water-outline',
            color: '#E3F2FD',
            iconColor: '#1565C0',
        },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'In Stock':
                return { bg: '#E8F5E9', text: '#2E7D32' };
            case 'Low Stock':
                return { bg: '#FFF8E1', text: '#F57F17' };
            case 'Out of Stock':
                return { bg: '#FFEBEE', text: '#C62828' };
            default:
                return { bg: '#F5F5F5', text: '#757575' };
        }
    };

    const filteredItems = stockItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color={colors.textDark} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Stock Status</Text>
                <TouchableOpacity style={styles.notificationButton}>
                    <MaterialCommunityIcons name="bell-outline" size={24} color={colors.textDark} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Search Bar */}
                <View style={styles.searchRow}>
                    <View style={styles.searchContainer}>
                        <MaterialCommunityIcons name="magnify" size={24} color="#9CA3AF" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search items..."
                            placeholderTextColor="#9CA3AF"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                    <TouchableOpacity style={styles.filterButton}>
                        <MaterialCommunityIcons name="tune" size={24} color={colors.textDark} />
                    </TouchableOpacity>
                </View>

                {/* Ration Shop Card */}
                <View style={styles.shopCard}>
                    <View style={styles.shopHeader}>
                        <View style={styles.shopIconRow}>
                            <MaterialCommunityIcons name="store" size={20} color={colors.primaryDark} />
                            <Text style={styles.shopOverline}>YOUR RATION SHOP</Text>
                        </View>
                        <TouchableOpacity style={styles.changeButton}>
                            <Text style={styles.changeButtonText}>Change</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.shopName}>FPS #8902 - Gandhi Road</Text>
                    <Text style={styles.shopTime}>Open today until 6:00 PM</Text>

                    <View style={styles.shopFooter}>
                        <Text style={styles.lastUpdated}>Last updated: <Text style={{ fontWeight: '600', color: colors.textDark }}>10 mins ago</Text></Text>
                        <TouchableOpacity style={styles.refreshButton}>
                            <MaterialCommunityIcons name="refresh" size={16} color={colors.primaryDark} />
                            <Text style={styles.refreshText}>Refresh</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Tabs */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
                    {['All Items', 'Grains', 'Essentials', 'Others'].map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[
                                styles.tab,
                                activeTab === tab && styles.activeTab
                            ]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[
                                styles.tabText,
                                activeTab === tab && styles.activeTabText
                            ]}>{tab}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <Text style={styles.sectionTitle}>CURRENT AVAILABILITY</Text>

                {/* Stock Items List */}
                <View style={styles.listContainer}>
                    {filteredItems.map((item) => {
                        const statusStyle = getStatusColor(item.status);
                        return (
                            <View key={item.id} style={styles.itemCard}>
                                <View style={[styles.itemIconBg, { backgroundColor: '#F9FAFB' }]}>
                                    <MaterialCommunityIcons name={item.icon} size={28} color={item.iconColor} />
                                </View>
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemAllocated}>Allocated: {item.allocated}</Text>
                                </View>
                                <View style={styles.itemRight}>
                                    <View style={[styles.statusChip, { backgroundColor: statusStyle.bg }]}>
                                        <View style={[styles.statusDot, { backgroundColor: statusStyle.text }]} />
                                        <Text style={[styles.statusText, { color: statusStyle.text }]}>{item.status}</Text>
                                    </View>
                                    <Text style={styles.itemQuantity}>{item.current}</Text>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>

            {/* Bottom Floating Card */}
            <View style={styles.bottomCard}>
                <TouchableOpacity style={styles.contactButton}>
                    <MaterialCommunityIcons name="phone" size={24} color={colors.textDark} />
                    <View style={{ marginLeft: spacing.sm }}>
                        <Text style={styles.contactTitle}>Contact</Text>
                        <Text style={styles.contactSubtitle}>Shop</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.mapButton}>
                    <MaterialCommunityIcons name="map-marker" size={24} color="#FFF" />
                    <Text style={styles.mapButtonText}>View on Map</Text>
                </TouchableOpacity>
            </View>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing['2xl'],
        paddingVertical: spacing.lg,
        backgroundColor: colors.backgroundLight,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerTitle: {
        ...typography.h3,
        color: colors.textDark,
    },
    notificationButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    content: {
        paddingHorizontal: spacing['2xl'],
        paddingBottom: 100,
    },
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.xl,
        marginTop: spacing.sm,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 16,
        paddingHorizontal: spacing.lg,
        height: 52,
        marginRight: spacing.md,
        ...elevation.sm,
    },
    searchInput: {
        flex: 1,
        marginLeft: spacing.md,
        ...typography.body,
        color: colors.textDark,
    },
    filterButton: {
        width: 52,
        height: 52,
        backgroundColor: colors.white,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        ...elevation.sm,
    },
    shopCard: {
        backgroundColor: '#F1F8E9', // Light green background for shop card
        borderRadius: 24,
        padding: spacing.xl,
        marginBottom: spacing.xl,
        borderWidth: 1,
        borderColor: '#DCEDC8',
    },
    shopHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    shopIconRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    shopOverline: {
        ...typography.overline,
        color: colors.primaryDark,
        marginLeft: spacing.xs,
        fontSize: 11,
        fontWeight: '700',
    },
    changeButton: {
        backgroundColor: colors.white,
        paddingHorizontal: spacing.md,
        paddingVertical: 6,
        borderRadius: 20,
    },
    changeButtonText: {
        ...typography.caption,
        color: colors.primaryDark,
        fontWeight: '600',
    },
    shopName: {
        ...typography.h3,
        color: colors.textDark,
        marginBottom: 4,
    },
    shopTime: {
        ...typography.bodySmall,
        color: colors.textBody,
        marginBottom: spacing.lg,
    },
    shopFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
        paddingTop: spacing.lg,
    },
    lastUpdated: {
        ...typography.caption,
        color: colors.textBody,
    },
    refreshButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    refreshText: {
        ...typography.caption,
        color: colors.primaryDark,
        fontWeight: '600',
        marginLeft: 4,
    },
    tabsContainer: {
        marginBottom: spacing.xl,
        paddingRight: spacing['2xl'],
    },
    tab: {
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.sm + 4,
        borderRadius: 25,
        backgroundColor: colors.white,
        marginRight: spacing.md,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    activeTab: {
        backgroundColor: colors.textDark, // Black/Dark background for active tab
    },
    tabText: {
        ...typography.bodySmall,
        color: colors.textBody,
        fontWeight: '600',
    },
    activeTabText: {
        color: colors.white,
    },
    sectionTitle: {
        ...typography.caption,
        color: colors.textBody,
        letterSpacing: 1,
        marginBottom: spacing.lg,
        fontWeight: '600',
    },
    listContainer: {
        gap: spacing.lg,
    },
    itemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        padding: spacing.lg,
        borderRadius: 24,
        ...elevation.sm,
    },
    itemIconBg: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.lg,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        ...typography.h4,
        color: colors.textDark,
        marginBottom: 4,
    },
    itemAllocated: {
        ...typography.caption,
        color: colors.textBody,
    },
    itemRight: {
        alignItems: 'flex-end',
    },
    statusChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        marginBottom: spacing.xs,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    statusText: {
        ...typography.caption,
        fontWeight: '600',
        fontSize: 10,
    },
    itemQuantity: {
        ...typography.h3,
        color: colors.textDark,
        fontWeight: 'bold',
    },
    bottomCard: {
        position: 'absolute',
        bottom: 24,
        left: spacing['2xl'],
        right: spacing['2xl'],
        backgroundColor: colors.white,
        borderRadius: 32,
        padding: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        ...elevation.lg,
        justifyContent: 'space-between',
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
    },
    contactTitle: {
        ...typography.caption,
        color: colors.textDark,
        fontWeight: 'bold',
    },
    contactSubtitle: {
        ...typography.caption,
        color: colors.textDark,
    },
    mapButton: {
        backgroundColor: '#8BC34A', // Light Green
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing['2xl'],
        borderRadius: 24,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginLeft: spacing.lg,
        justifyContent: 'center',
    },
    mapButtonText: {
        ...typography.body,
        color: colors.white,
        fontWeight: 'bold',
        marginLeft: spacing.sm,
    },
});

export default StockScreen;
