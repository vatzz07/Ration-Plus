import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { colors, spacing, borderRadius, typography, elevation } from '../theme/theme';

const { width } = Dimensions.get('window');

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const { userData, submitDeliveryRequest } = useApp();

  // State
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [proofImage, setProofImage] = useState(null);
  const [items, setItems] = useState({ Rice: 5, Wheat: 2, Sugar: 1 });
  const [address, setAddress] = useState('12/B, Green View Apartments, Gandhi Road, T. Nagar, Chennai - 600017');
  const [instructions, setInstructions] = useState('');

  // Mock Date for demo
  const deliveryDate = "15 Oct 2023";

  const categories = [
    { id: 'senior', label: 'Senior Citizen', icon: 'human-cane', subtitle: 'Above 60 years of age' },
    { id: 'disabled', label: 'Person with Disability', icon: 'wheelchair-accessibility', subtitle: 'Min 40% disability' },
    { id: 'pregnant', label: 'Pregnant Women', icon: 'mother-nurse', subtitle: 'With valid medical proof' },
  ];

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigation.goBack();
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProofImage(result.assets[0].uri);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const handleStep1Continue = () => {
    if (!selectedCategory) {
      Alert.alert("Select Category", "Please select a category to proceed.");
      return;
    }
    setCurrentStep(2);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleStep2Submit = () => {
    if (!proofImage) {
      Alert.alert("Upload Proof", "Please upload a proof document.");
      return;
    }
    // Simulate verification
    Alert.alert("Verification", "Document submitted successfully!", [
      { text: "OK", onPress: () => setCurrentStep(3) }
    ]);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const handleRequestDelivery = () => {
    submitDeliveryRequest({
      items,
      category: selectedCategory,
      date: deliveryDate,
      address
    });
    Alert.alert("Success", "Delivery Requested Successfully!");
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    navigation.goBack();
  };

  const updateItem = (item, delta) => {
    setItems(prev => ({
      ...prev,
      [item]: Math.max(0, prev[item] + delta)
    }));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  // Components
  const Stepper = () => (
    <View style={styles.stepperContainer}>
      <View style={styles.stepWrapper}>
        <View style={[styles.stepCircle, currentStep >= 1 ? styles.stepActive : styles.stepInactive]}>
          {currentStep > 1 ? <MaterialCommunityIcons name="check" size={16} color="#FFF" /> : <Text style={styles.stepNumberActive}>1</Text>}
        </View>
        <Text style={[styles.stepLabel, currentStep >= 1 && styles.stepLabelActive]}>CHECK</Text>
      </View>
      <View style={[styles.stepLine, currentStep >= 2 && styles.stepLineActive]} />
      <View style={styles.stepWrapper}>
        <View style={[styles.stepCircle, currentStep >= 2 ? styles.stepActive : styles.stepInactive]}>
          {currentStep > 2 ? <MaterialCommunityIcons name="check" size={16} color="#FFF" /> : <Text style={currentStep === 2 ? styles.stepNumberActive : styles.stepNumberInactive}>2</Text>}
        </View>
        <Text style={[styles.stepLabel, currentStep >= 2 && styles.stepLabelActive]}>VERIFY</Text>
      </View>
      <View style={[styles.stepLine, currentStep >= 3 && styles.stepLineActive]} />
      <View style={styles.stepWrapper}>
        <View style={[styles.stepCircle, currentStep >= 3 ? styles.stepActive : styles.stepInactive]}>
          <Text style={currentStep === 3 ? styles.stepNumberActive : styles.stepNumberInactive}>3</Text>
        </View>
        <Text style={[styles.stepLabel, currentStep >= 3 && styles.stepLabelActive]}>REQUEST</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{currentStep === 3 ? 'Request Delivery' : 'Home Delivery'}</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="help-circle" size={24} color="#757575" />
        </TouchableOpacity>
      </View>

      {/* Stepper (Only for Step 1 & 2 usually, but design shows it on both, let's keep it consistent or hide on Step 3 if design implies different header. Design 3 shows 'Request Delivery' title without stepper? No, Wait. Design 1 (Step 3) shows title 'Request Delivery' with NO stepper. Design 2/3 show stepper. Using stepper for 1 & 2. Step 3 replaces it with title 'Request Delivery'? Actually Design 1 is 'Request Delivery' screen with back button. Design 2 & 3 share 'Home Delivery' header with stepper. So Step 3 hides stepper.) */}
      {currentStep < 3 && <Stepper />}

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Step 1: Check Content */}
        {currentStep === 1 && (
          <>
            <View style={styles.infoBanner}>
              <View style={styles.infoIcon}>
                <MaterialCommunityIcons name="information-variant" size={20} color="#1565C0" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoTitle}>Eligibility Check</Text>
                <Text style={styles.infoDesc}>Home delivery is available for specific beneficiaries. Select your category below to verify eligibility and proceed.</Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Select Category</Text>

            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                style={styles.categoryCard}
                onPress={() => setSelectedCategory(cat.id)}
                activeOpacity={0.8}
              >
                <View style={[styles.catIconContainer, { backgroundColor: '#FFF3E0' }]}>
                  <MaterialCommunityIcons name={cat.icon} size={28} color="#FF9800" />
                </View>
                <View style={styles.catInfo}>
                  <Text style={styles.catTitle}>{cat.label}</Text>
                  <Text style={styles.catSubtitle}>{cat.subtitle}</Text>
                </View>
                <View style={[styles.radioOuter, selectedCategory === cat.id && styles.radioOuterSelected]}>
                  {selectedCategory === cat.id && <View style={styles.radioInner} />}
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}

        {/* Step 2: Verify Content */}
        {currentStep === 2 && (
          <>
            <View style={styles.selectedCatCard}>
              <View style={[styles.catIconContainer, { backgroundColor: '#FFF3E0' }]}>
                <MaterialCommunityIcons name={categories.find(c => c.id === selectedCategory)?.icon} size={28} color="#FF9800" />
              </View>
              <View style={styles.catInfo}>
                <Text style={styles.catSubtitleUpper}>SELECTED CATEGORY</Text>
                <Text style={styles.catTitle}>{categories.find(c => c.id === selectedCategory)?.label}</Text>
              </View>
              <TouchableOpacity onPress={() => setCurrentStep(1)} style={styles.changeButton}>
                <Text style={styles.changeText}>Change</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.uploadTitle}>Upload Proof Document</Text>
            <Text style={styles.uploadDesc}>To verify your eligibility as a Senior Citizen, please upload a clear copy of your Aadhaar card or Age proof document.</Text>

            <TouchableOpacity onPress={pickImage} activeOpacity={0.9}>
              <LinearGradient
                colors={['#FFF5C0', '#FFE082']} // Gold gradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.uploadCard}
              >
                {proofImage ? (
                  <Image source={{ uri: proofImage }} style={styles.uploadedImage} resizeMode="cover" />
                ) : (
                  <>
                    <View style={styles.uploadIconCircle}>
                      <MaterialCommunityIcons name="cloud-upload" size={32} color="#7CB342" />
                    </View>
                    <Text style={styles.uploadPrompt}>Tap to upload document</Text>
                    <Text style={styles.uploadHint}>PDF, JPG or PNG (Max 5MB)</Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.addressCard}>
              <View style={styles.addressIcon}>
                <MaterialCommunityIcons name="map-marker" size={24} color="#2962FF" />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.addressHeaderRow}>
                  <Text style={styles.addressTitle}>Delivery Address</Text>
                  <TouchableOpacity>
                    <Text style={styles.changeLink}>Change Address</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.addressText}>{address}</Text>
              </View>
            </View>
          </>
        )}

        {/* Step 3: Request Content */}
        {currentStep === 3 && (
          <>
            <View style={styles.verifiedBanner}>
              <View style={styles.verifiedIcon}>
                <MaterialCommunityIcons name="check" size={20} color="#FFF" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.verifiedTitle}>Eligibility Verified</Text>
                <Text style={styles.verifiedDesc}>You are eligible for home delivery benefits. Proceed to select your ration items.</Text>
              </View>
            </View>

            <View style={styles.sectionHeaderRow}>
              <View style={styles.itemsIconCircle}>
                <MaterialCommunityIcons name="basket" size={20} color="#FF5722" />
              </View>
              <Text style={styles.sectionTitleNoMargin}>Select Ration Items</Text>
            </View>

            {Object.keys(items).map((key) => (
              <View key={key} style={styles.itemRow}>
                <View>
                  <Text style={styles.itemName}>{key}</Text>
                  <Text style={styles.itemDetails}>Max {key === 'Rice' ? '10kg' : key === 'Wheat' ? '5kg' : '2kg'} • ₹{key === 'Rice' ? '3' : key === 'Wheat' ? '2' : '15'}/kg</Text>
                </View>
                <View style={styles.counter}>
                  <TouchableOpacity style={styles.counterBtn} onPress={() => updateItem(key, -1)}>
                    <MaterialCommunityIcons name="minus" size={16} color="#000" />
                  </TouchableOpacity>
                  <Text style={styles.counterVal}>{items[key]}</Text>
                  <TouchableOpacity style={styles.counterBtn} onPress={() => updateItem(key, 1)}>
                    <MaterialCommunityIcons name="plus" size={16} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <Text style={styles.sectionLabel}>PREFERRED DELIVERY DATE</Text>
            <View style={styles.datePicker}>
              <Text style={styles.dateText}>{deliveryDate}</Text>
              <MaterialCommunityIcons name="calendar" size={20} color="#757575" />
            </View>

            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionLabel}>DELIVERY ADDRESS</Text>
              <TouchableOpacity style={styles.editBtn}><Text style={styles.editText}>Edit</Text></TouchableOpacity>
            </View>
            <View style={styles.addressCardSimple}>
              <View style={styles.pinIcon}>
                <MaterialCommunityIcons name="map-marker" size={18} color="#555" />
              </View>
              <Text style={styles.addressTextSimple}>{address}</Text>
            </View>

            <Text style={styles.sectionLabel}>SPECIAL INSTRUCTIONS (OPTIONAL)</Text>
            <TextInput
              style={styles.instructionInput}
              placeholder="e.g., Call before reaching, Leave at door..."
              multiline
              numberOfLines={4}
              maxLength={100}
              value={instructions}
              onChangeText={setInstructions}
            />
            <Text style={styles.charCount}>{instructions.length}/100</Text>

            {/* Spacer for sticky footer */}
            <View style={{ height: 100 }} />
          </>
        )}
      </ScrollView>

      {/* Footers */}
      {currentStep === 1 && (
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.fullWidthButton} onPress={handleStep1Continue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentStep === 2 && (
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.fullWidthButton} onPress={handleStep2Submit}>
            <Text style={styles.buttonText}>Submit for Verification</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentStep === 3 && (
        <View style={styles.stickyFooter3}>
          <View style={styles.summaryRow}>
            <View>
              <Text style={styles.summaryLabel}>SUMMARY</Text>
              <Text style={styles.summaryValue}>3 Items • 8kg Total</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.summaryLabel}>DELIVERY ON</Text>
              <Text style={styles.summaryValue}>{deliveryDate}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.requestButton} onPress={handleRequestDelivery}>
            <Text style={styles.buttonText}>Request Delivery</Text>
            <MaterialCommunityIcons name="arrow-right" size={20} color="#FFF" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        </View>
      )}
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerTitle: {
    ...typography.h3,
    color: colors.textDark,
  },
  backButton: {
    padding: 4,
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing['2xl'],
  },
  stepWrapper: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  stepActive: {
    backgroundColor: '#8BC34A', // Greenish
  },
  stepInactive: {
    backgroundColor: '#E0E0E0',
  },
  stepNumberActive: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepNumberInactive: {
    color: '#757575',
    fontSize: 12,
    fontWeight: 'bold',
  },
  stepLabel: {
    fontSize: 10,
    color: '#9E9E9E',
    fontWeight: '600',
  },
  stepLabelActive: {
    color: '#8BC34A',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 8,
    marginBottom: 14,
  },
  stepLineActive: {
    backgroundColor: '#8BC34A',
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 20,
  },
  infoBanner: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    padding: spacing.lg,
    borderRadius: 12,
    marginBottom: spacing.xl,
  },
  infoIcon: {
    marginRight: spacing.md,
    marginTop: 2,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1565C0',
    marginBottom: 4,
  },
  infoDesc: {
    fontSize: 14,
    color: '#1565C0',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: spacing.lg,
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: spacing.lg,
    borderRadius: 20,
    marginBottom: spacing.md,
    ...elevation.sm,
  },
  catIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  catInfo: {
    flex: 1,
  },
  catTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
  },
  catSubtitle: {
    fontSize: 12,
    color: '#757575',
    marginTop: 2,
  },
  catSubtitleUpper: {
    fontSize: 10,
    color: '#757575',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: '#4CAF50', // Selected Green
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
  },
  footerContainer: {
    padding: spacing['2xl'],
    backgroundColor: 'transparent',
  },
  fullWidthButton: {
    backgroundColor: '#8BC34A',
    paddingVertical: 16,
    borderRadius: 24, // High pills
    alignItems: 'center',
    ...elevation.md,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  // Step 2 specifics
  selectedCatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: spacing.lg,
    borderRadius: 20,
    marginBottom: spacing.xl,
    ...elevation.sm,
  },
  changeButton: {
    backgroundColor: '#F1F8E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  changeText: {
    color: '#7CB342', // Green text
    fontSize: 12,
    fontWeight: '600',
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
    marginBottom: spacing.sm,
  },
  uploadDesc: {
    fontSize: 14,
    color: '#616161',
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  uploadCard: {
    width: '100%',
    height: 220,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  uploadIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    ...elevation.sm,
  },
  uploadPrompt: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  uploadHint: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  addressCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: spacing.lg,
    borderRadius: 20,
    ...elevation.sm,
  },
  addressIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  addressHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  addressTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textDark,
  },
  changeLink: {
    fontSize: 12,
    color: '#7CB342', // Green
    fontWeight: '600',
  },
  addressText: {
    fontSize: 13,
    color: '#616161',
    lineHeight: 18,
  },
  // Step 3
  verifiedBanner: {
    flexDirection: 'row',
    backgroundColor: '#E8F5E9',
    padding: spacing.lg,
    borderRadius: 16,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  verifiedIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  verifiedTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 4,
  },
  verifiedDesc: {
    fontSize: 13,
    color: '#2E7D32',
    lineHeight: 18,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  itemsIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FBE9E7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  sectionTitleNoMargin: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textDark,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: spacing.lg,
    borderRadius: 16,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textDark,
  },
  itemDetails: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 2,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 8,
    padding: 2,
  },
  counterBtn: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  counterVal: {
    width: 30,
    textAlign: 'center',
    fontWeight: '600',
  },
  sectionLabel: {
    fontSize: 12,
    color: '#757575',
    fontWeight: '700',
    marginBottom: spacing.sm,
    marginTop: spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: spacing.lg,
    borderRadius: 16,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  dateText: {
    fontSize: 16,
    color: colors.textDark,
    fontWeight: '500',
  },
  editBtn: {
    backgroundColor: '#F1F8E9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 'auto',
  },
  editText: {
    color: '#7CB342',
    fontSize: 12,
    fontWeight: '700',
  },
  addressCardSimple: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: spacing.lg,
    borderRadius: 16,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  pinIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  addressTextSimple: {
    flex: 1,
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
  instructionInput: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: spacing.lg,
    height: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    fontSize: 14,
  },
  charCount: {
    textAlign: 'right',
    fontSize: 10,
    color: '#BDBDBD',
    marginTop: 4,
  },
  stickyFooter3: {
    position: 'absolute',
    bottom: 20, // Floating effect
    left: 16,
    right: 16,
    backgroundColor: '#1A231A', // Dark footer as per design
    borderRadius: 24,
    padding: spacing.lg,
    paddingBottom: spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
  },
  summaryLabel: {
    color: '#757575', // Light grey on dark
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 2,
  },
  summaryValue: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  requestButton: {
    flexDirection: 'row',
    backgroundColor: '#8BC34A', // Bright green button
    paddingVertical: 14,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DeliveryScreen;
