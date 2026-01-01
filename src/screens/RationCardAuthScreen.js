import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import { colors, spacing, borderRadius, typography, elevation } from '../theme/theme';
import { useApp } from '../context/AppContext';

const RationCardAuthScreen = ({ navigation }) => {
  const { login } = useApp();
  const [rationCardNumber, setRationCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [familySize, setFamilySize] = useState(1);
  const [cardType, setCardType] = useState('APL');
  const [cardImage, setCardImage] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const shakeAnim = React.useRef(new Animated.Value(0)).current;

  const cardTypes = [
    { value: 'AAY', label: 'AAY (Antyodaya Anna Yojana)' },
    { value: 'BPL', label: 'BPL (Below Poverty Line)' },
    { value: 'APL', label: 'APL (Above Poverty Line)' },
  ];

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please grant camera roll permissions');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setCardImage(result.assets[0].uri);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!rationCardNumber.trim()) {
      newErrors.rationCardNumber = 'Ration card number is required';
    }
    // Strict validation removed as per user request
    if (!cardHolderName.trim()) {
      newErrors.cardHolderName = 'Card holder name is required';
    }
    if (familySize < 1 || familySize > 20) {
      newErrors.familySize = 'Family size must be between 1 and 20';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      // Shake animation
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return;
    }

    if (!confirmed) {
      Alert.alert('Confirmation Required', 'Please confirm that the details are correct');
      return;
    }

    setLoading(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // Simulate API call
    setTimeout(async () => {
      setLoading(false);
      await login();
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="arrow-left" size={24} color={colors.textDark} />
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Step 2 of 2</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '100%' }]} />
          </View>
        </View>

        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="card-account-details"
              size={64}
              color={colors.primary}
            />
          </View>
          <Text style={styles.title}>Link Your Ration Card</Text>
          <Text style={styles.subtitle}>
            Enter your ration card details to continue
          </Text>
        </View>

        {/* Form Card */}
        <Animated.View
          style={[
            styles.formCard,
            {
              transform: [{ translateX: shakeAnim }],
            },
          ]}
        >
          {/* Ration Card Number */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ration Card Number</Text>
            <TextInput
              style={[
                styles.input,
                errors.rationCardNumber && styles.inputError,
              ]}
              placeholder="TN-01-XXX-XXXXXX"
              placeholderTextColor={colors.textBody}
              value={rationCardNumber}
              onChangeText={(text) => {
                setRationCardNumber(text.toUpperCase());
                setErrors({ ...errors, rationCardNumber: '' });
              }}
              autoCapitalize="characters"
            />
            <Text style={styles.helperText}>
              Enter your Ration Card Number
            </Text>
            {errors.rationCardNumber && (
              <Text style={styles.errorText}>{errors.rationCardNumber}</Text>
            )}
          </View>

          {/* Card Holder Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Card Holder Name</Text>
            <TextInput
              style={[
                styles.input,
                errors.cardHolderName && styles.inputError,
              ]}
              placeholder="As per ration card"
              placeholderTextColor={colors.textBody}
              value={cardHolderName}
              onChangeText={(text) => {
                setCardHolderName(text);
                setErrors({ ...errors, cardHolderName: '' });
              }}
              autoCapitalize="words"
            />
            {errors.cardHolderName && (
              <Text style={styles.errorText}>{errors.cardHolderName}</Text>
            )}
          </View>

          {/* Family Size */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Number of Family Members</Text>
            <View style={styles.stepperContainer}>
              <TouchableOpacity
                style={styles.stepperButton}
                onPress={() => {
                  if (familySize > 1) {
                    setFamilySize(familySize - 1);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }
                }}
                disabled={familySize <= 1}
              >
                <MaterialCommunityIcons
                  name="minus"
                  size={20}
                  color={familySize <= 1 ? colors.border : colors.primary}
                />
              </TouchableOpacity>
              <Text style={styles.stepperValue}>{familySize}</Text>
              <TouchableOpacity
                style={styles.stepperButton}
                onPress={() => {
                  if (familySize < 20) {
                    setFamilySize(familySize + 1);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }
                }}
                disabled={familySize >= 20}
              >
                <MaterialCommunityIcons
                  name="plus"
                  size={20}
                  color={familySize >= 20 ? colors.border : colors.primary}
                />
              </TouchableOpacity>
            </View>
            {errors.familySize && (
              <Text style={styles.errorText}>{errors.familySize}</Text>
            )}
          </View>

          {/* Card Type */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Card Type</Text>
            <View style={styles.radioGroup}>
              {cardTypes.map((type) => (
                <TouchableOpacity
                  key={type.value}
                  style={styles.radioOption}
                  onPress={() => {
                    setCardType(type.value);
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                >
                  <View
                    style={[
                      styles.radioCircle,
                      cardType === type.value && styles.radioCircleActive,
                    ]}
                  >
                    {cardType === type.value && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                  <Text style={styles.radioLabel}>{type.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Upload Card Photo */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Upload Ration Card Photo</Text>
            <TouchableOpacity
              style={styles.uploadContainer}
              onPress={pickImage}
              activeOpacity={0.7}
            >
              {cardImage ? (
                <Image source={{ uri: cardImage }} style={styles.cardImage} />
              ) : (
                <>
                  <MaterialCommunityIcons
                    name="cloud-upload"
                    size={48}
                    color={colors.primary}
                  />
                  <Text style={styles.uploadText}>Tap to upload card photo</Text>
                  <Text style={styles.uploadHint}>Max 5MB</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          {/* Confirmation Checkbox */}
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => {
              setConfirmed(!confirmed);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.checkbox,
                confirmed && styles.checkboxActive,
              ]}
            >
              {confirmed && (
                <MaterialCommunityIcons
                  name="check"
                  size={20}
                  color={colors.white}
                />
              )}
            </View>
            <Text style={styles.checkboxLabel}>
              I confirm the details are correct
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!confirmed || loading) && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!confirmed || loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <Text style={styles.submitButtonText}>Verifying...</Text>
          ) : (
            <Text style={styles.submitButtonText}>Verify & Continue</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContent: {
    padding: spacing['2xl'],
    paddingTop: 60, // Add space for back button
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: spacing['2xl'],
    zIndex: 10,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#F7F9FC',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  progressContainer: {
    marginBottom: spacing['2xl'],
  },
  progressText: {
    ...typography.bodySmall,
    color: colors.textBody,
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h2,
    color: colors.textDark,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.textBody,
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing['2xl'],
    ...elevation.md,
    marginBottom: spacing['2xl'],
  },
  inputGroup: {
    marginBottom: spacing.xl,
  },
  label: {
    ...typography.bodySmall,
    color: colors.textDark,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  input: {
    ...typography.body,
    color: colors.textDark,
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
    paddingVertical: spacing.md,
    paddingBottom: spacing.sm,
  },
  inputError: {
    borderBottomColor: colors.error,
  },
  helperText: {
    ...typography.caption,
    color: colors.textBody,
    marginTop: spacing.xs,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    marginTop: spacing.xs,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  stepperButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepperValue: {
    ...typography.h3,
    color: colors.textDark,
    marginHorizontal: spacing.xl,
    minWidth: 40,
    textAlign: 'center',
  },
  radioGroup: {
    marginTop: spacing.sm,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white,
  },
  radioLabel: {
    ...typography.body,
    color: colors.textDark,
  },
  uploadContainer: {
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: borderRadius.md,
    padding: spacing['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
    marginTop: spacing.sm,
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: borderRadius.md,
    resizeMode: 'contain',
  },
  uploadText: {
    ...typography.body,
    color: colors.textDark,
    marginTop: spacing.md,
  },
  uploadHint: {
    ...typography.caption,
    color: colors.textBody,
    marginTop: spacing.xs,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.border,
    marginRight: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkboxLabel: {
    ...typography.body,
    color: colors.textDark,
    flex: 1,
  },
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    ...elevation.sm,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    ...typography.body,
    color: colors.white,
    fontWeight: '600',
  },
});

export default RationCardAuthScreen;

