import React, { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import { useApp } from '../context/AppContext';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, borderRadius, typography, elevation, gradients } from '../theme/theme';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const { googleLogin } = useApp();
  const { t, i18n } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: '145439381848-jasq21d6bm130a94q52m2ju6mg8dn8um.apps.googleusercontent.com',
    iosClientId: '145439381848-h7o3bd3pfbc9pk747spk9a2169r1661p.apps.googleusercontent.com',
    webClientId: '145439381848-gh9olrnih86qp88tqji7psvhqhhs8g6q.apps.googleusercontent.com',
    webClientId: '145439381848-gh9olrnih86qp88tqji7psvhqhhs8g6q.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      googleLogin(id_token).catch(err => console.log('Google login failed', err));
    }
  }, [response]);
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    promptAsync();
  };

  const handleGetOtp = () => {
    if (phoneNumber.length < 10) {
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setShowOtp(true);
    // In production, send OTP via API
  };

  const handleVerifyOtp = () => {
    if (otp.length < 4) {
      return;
    }
    setLoading(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('RationCardAuth');
    }, 1500);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top Section with Gradient - INCREASE HEIGHT */}
          <LinearGradient
            colors={[colors.backgroundLight, colors.white]}
            style={styles.topSection}
          >
            <View style={styles.logoContainer}>
              <MaterialCommunityIcons
                name="wheat"
                size={40}
                color={colors.primary}
              />
            </View>
            <Text style={styles.welcomeText}>Welcome</Text>
            <Text style={styles.subtitle}>Sign in to your account</Text>
          </LinearGradient>

          {/* Center Card Section */}
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <TouchableOpacity
                style={styles.googleButton}
                onPress={handleGoogleLogin}
                activeOpacity={0.8}
              >
                <MaterialCommunityIcons
                  name="google"
                  size={24}
                  color={colors.textDark}
                />
                <Text style={styles.googleButtonText}>Continue with Google</Text>
              </TouchableOpacity>

              {/* DEV BYPASS: Since Google Login requires native build/proxy in Expo Go */}
              <TouchableOpacity
                onPress={() => {
                  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                  navigation.replace('RationCardAuth');
                }}
                style={{ alignSelf: 'center', marginBottom: 10 }}
              >
                <Text style={{ color: colors.textBody, fontSize: 12, textDecorationLine: 'underline' }}>
                  (Dev) Skip Login
                </Text>
              </TouchableOpacity>

              {/* OR Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Phone Number Input */}
              <View style={styles.inputLabelContainer}>
                <Text style={styles.inputLabel}>Phone Number</Text>
              </View>
              <View style={styles.phoneInputContainer}>
                <View style={styles.phonePrefix}>
                  <Text style={styles.phonePrefixText}>+91</Text>
                </View>
                <TextInput
                  style={styles.phoneInput}
                  placeholder="Enter 10-digit number"
                  placeholderTextColor={colors.textBody}
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              </View>

              {showOtp && (
                <View style={styles.otpContainer}>
                  <Text style={styles.inputLabel}>OTP Verification</Text>
                  <TextInput
                    style={styles.otpInput}
                    placeholder="Enter 4-digit OTP"
                    placeholderTextColor={colors.textBody}
                    value={otp}
                    onChangeText={setOtp}
                    keyboardType="number-pad"
                    maxLength={4}
                  />
                </View>
              )}

              {!showOtp ? (
                <TouchableOpacity
                  style={[
                    styles.primaryButton,
                    phoneNumber.length < 10 && styles.buttonDisabled,
                  ]}
                  onPress={handleGetOtp}
                  disabled={phoneNumber.length < 10}
                  activeOpacity={0.8}
                >
                  <Text style={styles.primaryButtonText}>Get OTP</Text>
                  <MaterialCommunityIcons name="arrow-right" size={20} color={colors.white} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.primaryButton,
                    (otp.length < 4 || loading) && styles.buttonDisabled,
                  ]}
                  onPress={handleVerifyOtp}
                  disabled={otp.length < 4 || loading}
                  activeOpacity={0.8}
                >
                  {loading ? (
                    <Text style={styles.primaryButtonText}>Verifying...</Text>
                  ) : (
                    <Text style={styles.primaryButtonText}>Verify & Login</Text>
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Bottom Section */}
          <View style={styles.bottomSection}>
            <Text style={styles.termsText}>
              By continuing, you agree to our{' '}
              <Text style={styles.linkText}>Terms</Text> &{' '}
              <Text style={styles.linkText}>Privacy Policy</Text>
            </Text>

            {/* Language Selector */}
            <View style={styles.languageContainer}>
              <TouchableOpacity
                style={[
                  styles.languageButton,
                  i18n.language === 'ta' && styles.languageButtonActive,
                ]}
                onPress={() => changeLanguage('ta')}
              >
                <Text style={styles.languageText}>🇮🇳 தமிழ்</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.languageButton,
                  i18n.language === 'en' && styles.languageButtonActive,
                ]}
                onPress={() => changeLanguage('en')}
              >
                <Text style={styles.languageText}>English</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.languageButton,
                  i18n.language === 'hi' && styles.languageButtonActive,
                ]}
                onPress={() => changeLanguage('hi')}
              >
                <Text style={styles.languageText}>हिंदी</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  topSection: {
    paddingTop: spacing['4xl'],
    paddingHorizontal: spacing['2xl'],
    paddingBottom: spacing['4xl'],
    minHeight: 280,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    ...elevation.md,
  },
  logoContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
    ...elevation.sm,
  },
  welcomeText: {
    ...typography.h1,
    color: colors.textDark,
    marginBottom: spacing.xs,
    fontSize: 32,
  },
  subtitle: {
    ...typography.body,
    color: colors.textBody,
    fontSize: 16,
  },
  cardContainer: {
    paddingHorizontal: spacing['2xl'],
    marginTop: -40,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: spacing['2xl'],
    ...elevation.lg,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F9FC',
    borderRadius: 16,
    paddingVertical: spacing.lg,
    marginBottom: spacing.xl,
  },
  googleButtonText: {
    ...typography.body,
    color: colors.textDark,
    fontWeight: '600',
    marginLeft: spacing.md,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    ...typography.caption,
    color: colors.textBody,
    marginHorizontal: spacing.md,
    fontWeight: '600',
  },
  inputLabelContainer: {
    marginBottom: spacing.sm,
  },
  inputLabel: {
    ...typography.bodySmall,
    color: colors.textDark,
    fontWeight: '600',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
    backgroundColor: '#F7F9FC',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  phonePrefix: {
    paddingHorizontal: spacing.lg,
    justifyContent: 'center',
    backgroundColor: '#EDF1F7',
  },
  phonePrefixText: {
    ...typography.body,
    color: colors.textDark,
    fontWeight: '600',
  },
  phoneInput: {
    flex: 1,
    ...typography.body,
    color: colors.textDark,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  otpContainer: {
    marginBottom: spacing.lg,
  },
  otpInput: {
    backgroundColor: '#F7F9FC',
    borderRadius: 16,
    ...typography.body,
    color: colors.textDark,
    paddingVertical: spacing.lg,
    textAlign: 'center',
    letterSpacing: 8,
    fontSize: 20,
    fontWeight: 'bold',
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: colors.primaryDark,
    borderRadius: 16,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    ...elevation.sm,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    gap: spacing.sm,
  },
  primaryButtonText: {
    ...typography.body,
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
    backgroundColor: '#A0A0A0',
    shadowOpacity: 0,
  },
  bottomSection: {
    paddingHorizontal: spacing['2xl'],
    paddingTop: spacing['3xl'],
    paddingBottom: spacing['3xl'],
    alignItems: 'center',
  },
  termsText: {
    ...typography.caption,
    color: colors.textBody,
    textAlign: 'center',
    marginBottom: spacing['2xl'],
    lineHeight: 20,
  },
  linkText: {
    color: colors.primaryDark,
    fontWeight: '600',
  },
  languageContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  languageButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
  },
  languageButtonActive: {
    backgroundColor: '#EDF6EC',
    borderColor: colors.primary,
  },
  languageText: {
    ...typography.bodySmall,
    color: colors.textDark,
    fontWeight: '500',
  },
});

export default LoginScreen;
