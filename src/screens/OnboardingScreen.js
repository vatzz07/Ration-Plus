import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import { useApp } from '../context/AppContext';
import { colors, spacing, borderRadius, typography, elevation } from '../theme/theme';

const { width } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { completeOnboarding } = useApp();
  const [currentPage, setCurrentPage] = useState(0);
  const scrollViewRef = useRef(null);

  const pages = [
    {
      icon: 'phone-in-talk',
      title: 'Check Stock Anytime',
      description: 'View real-time stock availability at your nearest ration shop. Get instant updates on rice, wheat, and sugar availability.',
      illustration: '📱',
    },
    {
      icon: 'chart-line-variant',
      title: 'Track Your Quota',
      description: 'Monitor your monthly consumption and remaining quota. Stay informed about your ration card usage with detailed analytics.',
      illustration: '📊',
    },
    {
      icon: 'truck-delivery',
      title: 'Request Home Delivery',
      description: 'Get your rations delivered to your doorstep. Available for senior citizens, disabled persons, and pregnant women.',
      illustration: '🚚',
    },
  ];

  const handleNext = async () => {
    if (currentPage < pages.length - 1) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      scrollViewRef.current?.scrollTo({
        x: nextPage * width,
        animated: true,
      });
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      await completeOnboarding();
    }
  };

  const handleSkip = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await completeOnboarding();
  };

  const handleBack = () => {
    if (currentPage > 0) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      scrollViewRef.current?.scrollTo({
        x: prevPage * width,
        animated: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Back Button - Top Left */}
      <TouchableOpacity
        style={[
          styles.topBackButton,
          currentPage === 0 && { opacity: 0, pointerEvents: 'none' }
        ]}
        onPress={handleBack}
        disabled={currentPage === 0}
      >
        <MaterialCommunityIcons
          name="arrow-left"
          size={24}
          color={colors.textDark}
        />
      </TouchableOpacity>

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false} // Disable manual swipe if we rely on buttons, or keep enabled
        onMomentumScrollEnd={(e) => {
          const page = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentPage(page);
        }}
      >
        {pages.map((page, index) => (
          <View key={index} style={styles.page}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name={page.icon}
                size={100}
                color={colors.primary}
              />
            </View>
            <Text style={styles.pageTitle}>{page.title}</Text>
            <Text style={styles.pageDescription}>{page.description}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.dots}>
          {pages.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentPage === index && styles.dotActive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>
            {currentPage === pages.length - 1 ? 'Get Started' : 'Next'}
          </Text>
          <MaterialCommunityIcons
            name="arrow-right"
            size={20}
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  skipButton: {
    position: 'absolute',
    top: 16,
    right: spacing['2xl'],
    zIndex: 1,
    padding: spacing.sm,
  },
  topBackButton: {
    position: 'absolute',
    top: 16,
    left: spacing['2xl'],
    zIndex: 1,
    padding: spacing.sm,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#F7F9FC',
  },
  skipText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
  page: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing['2xl'],
  },
  iconContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  pageTitle: {
    ...typography.h1,
    color: colors.textDark,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  pageDescription: {
    ...typography.body,
    color: colors.textBody,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
    lineHeight: 24,
  },
  footer: {
    padding: spacing['2xl'],
    alignItems: 'center',
    paddingBottom: spacing['3xl'],
  },
  dots: {
    flexDirection: 'row',
    marginBottom: spacing['2xl'],
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: colors.primary,
    width: 24,
    height: 8,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing['3xl'],
    paddingVertical: spacing.lg,
    borderRadius: borderRadius.lg,
    minWidth: 200,
    justifyContent: 'center',
    ...elevation.sm,
  },
  nextButtonText: {
    ...typography.body,
    color: '#FFFFFF',
    fontWeight: '600',
    marginRight: spacing.sm,
  },
});

export default OnboardingScreen;
