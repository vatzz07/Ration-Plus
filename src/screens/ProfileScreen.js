import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import { useApp } from '../context/AppContext';
import { colors, spacing, typography, elevation } from '../theme/theme';

const ProfileScreen = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const { userData, logout } = useApp();

  const handleLogout = async () => {
    Alert.alert(
      t('profile.logout'),
      'Are you sure you want to logout?',
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('profile.logout'),
          style: 'destructive',
          onPress: async () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            await logout();
          },
        },
      ]
    );
  };

  const menuItems = [
    {
      icon: 'lock-outline',
      label: 'Change Password',
      color: '#E3F2FD',
      iconColor: '#2196F3',
      onPress: () => { }
    },
    {
      icon: 'bell-outline',
      label: 'Manage Notifications',
      color: '#F3E5F5',
      iconColor: '#9C27B0',
      onPress: () => { }
    },
    {
      icon: 'translate',
      label: 'Language',
      value: 'English',
      color: '#FFF3E0',
      iconColor: '#FF9800',
      onPress: () => { }
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <MaterialCommunityIcons name="cog" size={24} color={colors.primaryDark} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Profile Card */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            {/* Placeholder for Avatar Image - In a real app, use Image component */}
            <View style={styles.avatarPlaceholder}>
              <MaterialCommunityIcons name="account" size={48} color={colors.textBody} />
            </View>
            <TouchableOpacity style={styles.editButton}>
              <MaterialCommunityIcons name="pencil" size={16} color={colors.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{userData.familyHead || 'Rajesh Kumar'}</Text>
          <View style={styles.statusChip}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Active Beneficiary</Text>
          </View>
        </View>

        {/* ID Cards Row */}
        <View style={styles.idCardsRow}>
          <View style={styles.idCard}>
            <Text style={styles.idLabel}>RATION CARD NO</Text>
            <Text style={styles.idValue}>{userData.rationCardNumber || 'MH-12-3456'}</Text>
          </View>
          <View style={[styles.idCard, { marginLeft: spacing.lg }]}>
            <Text style={styles.idLabel}>FPS SHOP ID</Text>
            <Text style={styles.idValue}>TN-CH-450</Text>
          </View>
        </View>

        {/* Personal Info Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>PERSONAL INFO</Text>
          <TouchableOpacity>
            <Text style={styles.editAction}>Edit Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <View style={[styles.iconCircle, { backgroundColor: '#F3F4F6' }]}>
              <MaterialCommunityIcons name="phone" size={20} color={colors.textBody} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Mobile Number</Text>
              <Text style={styles.infoValue}>+91 98765 43210</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={[styles.iconCircle, { backgroundColor: '#F3F4F6' }]}>
              <MaterialCommunityIcons name="email" size={20} color={colors.textBody} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email Address</Text>
              <Text style={styles.infoValue}>rajesh.k@example.com</Text>
            </View>
          </View>

          <View style={[styles.infoRow, { borderBottomWidth: 0 }]}>
            <View style={[styles.iconCircle, { backgroundColor: '#F3F4F6' }]}>
              <MaterialCommunityIcons name="map-marker" size={20} color={colors.textBody} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Registered Address</Text>
              <Text style={styles.infoValue}>12/B, Green View Apartments, Gandhi Road, T. Nagar, Chennai - 600017</Text>
            </View>
          </View>
        </View>

        {/* Settings Section */}
        <Text style={[styles.sectionTitle, { marginTop: spacing['2xl'] }]}>SETTINGS</Text>
        <View style={styles.settingsContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.menuItem, index === menuItems.length - 1 && { borderBottomWidth: 0 }]}
              onPress={item.onPress}
            >
              <View style={[styles.iconCircle, { backgroundColor: item.color }]}>
                <MaterialCommunityIcons name={item.icon} size={20} color={item.iconColor} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {item.value && <Text style={styles.menuValue}>{item.value}</Text>}
                <MaterialCommunityIcons name="chevron-right" size={20} color="#D1D5DB" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={20} color={colors.error} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>App Version 2.4.0 (Build 203)</Text>

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
  settingsButton: {
    padding: spacing.xs,
  },
  content: {
    paddingHorizontal: spacing['2xl'],
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
    marginTop: spacing.md,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: spacing.lg,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0', // Placeholder gray
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#B3DE9C', // Using primary color for border
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1F2937',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.backgroundLight,
  },
  userName: {
    ...typography.h2,
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  statusChip: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: spacing.lg,
    paddingVertical: 6,
    borderRadius: 999,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
    marginRight: 6,
  },
  statusText: {
    ...typography.caption,
    color: colors.success,
    fontWeight: '600',
  },
  idCardsRow: {
    flexDirection: 'row',
    marginBottom: spacing['2xl'],
  },
  idCard: {
    flex: 1,
    backgroundColor: colors.white,
    padding: spacing.lg,
    borderRadius: 20,
    alignItems: 'center',
    ...elevation.sm,
  },
  idLabel: {
    ...typography.overline,
    color: colors.textBody,
    marginBottom: 4,
    fontSize: 10,
  },
  idValue: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.textDark,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.overline,
    fontSize: 12,
    color: colors.textBody,
    letterSpacing: 1,
  },
  editAction: {
    ...typography.bodySmall,
    color: '#8BC34A',
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: spacing.lg,
    ...elevation.sm,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    alignItems: 'flex-start',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.lg,
  },
  infoContent: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 40,
  },
  infoLabel: {
    ...typography.caption,
    color: colors.textBody,
    marginBottom: 2,
  },
  infoValue: {
    ...typography.body,
    color: colors.textDark,
    fontWeight: '500',
  },
  settingsContainer: {
    backgroundColor: colors.white,
    borderRadius: 24,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    marginTop: spacing.lg,
    ...elevation.sm,
    marginBottom: spacing['2xl'],
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuLabel: {
    ...typography.body,
    flex: 1,
    color: colors.textDark,
    fontWeight: '500',
  },
  menuValue: {
    ...typography.bodySmall,
    color: colors.textBody,
    marginRight: spacing.sm,
  },
  logoutButton: {
    backgroundColor: '#FEE2E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    marginBottom: spacing.xl,
  },
  logoutText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.error,
    marginLeft: spacing.sm,
  },
  versionText: {
    ...typography.caption,
    color: colors.textBody,
    textAlign: 'center',
    marginBottom: spacing.lg,
  }
});

export default ProfileScreen;
