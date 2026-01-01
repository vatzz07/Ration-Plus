import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { useApp } from '../context/AppContext';
import { colors, spacing, typography, elevation } from '../theme/theme';
import * as Haptics from 'expo-haptics';
import MapView, { UrlTile, Marker } from 'react-native-maps';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { userData, stockData } = useApp();

  const firstName = userData.familyHead?.split(' ')[0] || 'Srivatsan';
  const displayCardNumber = userData.rationCardNumber ?
    `Card #${userData.rationCardNumber.slice(-4)}` : 'Card #1234 .... 9012';

  const quickActions = [
    {
      icon: 'truck-delivery',
      label: 'Request\nDelivery',
      subtext: 'Only for disabled elder \nand pregnant women',
      onPress: () => navigation.navigate('DeliveryTab'),
      color: '#E3F2FD',
      iconColor: '#2196F3', // Blue
    },
    {
      icon: 'package-variant-closed', // Box icon
      label: 'Stock Status',
      subtext: 'Check availability',
      onPress: () => navigation.navigate('Stock'),
      color: '#FFF3E0',
      iconColor: '#FF9800', // Orange
    },
    {
      icon: 'history',
      label: 'Transactions',
      subtext: 'Past purchase history',
      onPress: () => navigation.navigate('TrackerTab'),
      color: '#F3E5F5',
      iconColor: '#9C27B0', // Purple
    },
    {
      icon: 'face-agent', // Support/Headset
      label: 'Support',
      subtext: 'Help & grievances',
      onPress: () => navigation.navigate('Help'),
      color: '#E0F2F1',
      iconColor: '#009688', // Teal
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.welcomeLabel}>WELCOME BACK</Text>
            <Text style={styles.userName}>{firstName}</Text>
            <View style={styles.cardInfoRow}>
              <View style={styles.statusDot} />
              <Text style={styles.cardInfoText}>{displayCardNumber}</Text>
            </View>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton}>
              <MaterialCommunityIcons name="bell" size={24} color={colors.textDark} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileAvatar} onPress={() => navigation.navigate('ProfileTab')}>
              <MaterialCommunityIcons name="account" size={24} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Ration Shop Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Ration Shop</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Stock')}>
            <Text style={styles.viewDetails}>View Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mapCard}>
          {/* Map Placeholder/Image Area */}
          <View style={styles.mapPreview}>
            <MapView
              key="home_map_view"
              style={StyleSheet.absoluteFill}
              initialRegion={{
                latitude: 13.0418,
                longitude: 80.2341,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              scrollEnabled={false}
              zoomEnabled={false}
              pointerEvents="none"
              liteMode={true}
            >
              <UrlTile
                urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maximumZ={19}
                flipY={false}
              />
              <Marker
                coordinate={{ latitude: 13.0418, longitude: 80.2341 }}
              >
                <View style={styles.mapPin}>
                  <MaterialCommunityIcons name="map-marker" size={20} color="#F44336" />
                  <Text style={styles.mapPinText}>{stockData?.shopName || 'T.Nagar Branch'}</Text>
                </View>
              </Marker>
            </MapView>
          </View>

          <View style={styles.mapCardFooter}>
            <View style={styles.statusRow}>
              <View style={[styles.statusDot, { backgroundColor: '#4CAF50' }]} />
              <Text style={styles.shopStatusText}>Open until 8:00 PM</Text>
            </View>
            <Text style={styles.distanceText}>0.8 km away</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={[styles.sectionTitle, { marginBottom: spacing.lg, marginTop: spacing.xl }]}>Quick Actions</Text>
        <View style={styles.grid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.actionCard}
              onPress={() => {
                Haptics.selectionAsync();
                action.onPress();
              }}
            >
              <View style={[styles.iconCircle, { backgroundColor: action.color }]}>
                <MaterialCommunityIcons name={action.icon} size={24} color={action.iconColor} />
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
              <Text style={styles.actionSubtext}>{action.subtext}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Upcoming Distribution Banner */}
        <TouchableOpacity style={styles.darkBanner} onPress={() => navigation.navigate('Quota')}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerLabel}>Upcoming Distribution</Text>
            <Text style={styles.bannerTitle}>Sugar & Rice available from 15th</Text>
          </View>
          <MaterialCommunityIcons name="arrow-right" size={24} color={colors.white} />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // Light gray background
  },
  content: {
    padding: spacing.xl,
    paddingBottom: 120, // Space for bottom tab
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing['2xl'],
    marginTop: spacing.md,
  },
  welcomeLabel: {
    ...typography.overline,
    color: colors.textBody,
    marginBottom: 4,
    fontSize: 10,
    letterSpacing: 1,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 8,
  },
  cardInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 8,
  },
  cardInfoText: {
    ...typography.caption,
    fontSize: 13,
    color: colors.textBody,
    fontWeight: '500',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: spacing.lg,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textDark,
  },
  viewDetails: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8BC34A',
  },
  mapCard: {
    backgroundColor: colors.white,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: spacing.xl,
    ...elevation.sm,
    padding: 12, // Padding inside the card
  },
  mapPreview: {
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: '#E0E0E0',
  },
  mapBackground: {
    flex: 1,
    backgroundColor: '#D1E8D5', // Light map-like green
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPin: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
    ...elevation.sm,
  },
  mapPinText: {
    ...typography.caption,
    fontWeight: 'bold',
    color: colors.textDark,
    marginLeft: 6,
  },
  mapCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shopStatusText: {
    fontSize: 12,
    color: colors.textBody,
    fontWeight: '500',
  },
  distanceText: {
    fontSize: 12,
    color: colors.textDark,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  actionCard: {
    width: '48%', // Two columns
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...elevation.sm,
    minHeight: 140, // Ensure ample height
    justifyContent: 'space-between',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  actionLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.textDark,
    marginBottom: 4,
    lineHeight: 20,
  },
  actionSubtext: {
    fontSize: 11,
    color: '#9CA3AF',
    lineHeight: 14,
  },
  darkBanner: {
    backgroundColor: '#111827', // Almost black
    borderRadius: 24,
    padding: spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bannerContent: {
    flex: 1,
  },
  bannerLabel: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.white,
  },
});

export default HomeScreen;
