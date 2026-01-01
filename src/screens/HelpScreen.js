import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    LayoutAnimation,
    Platform,
    UIManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { colors, spacing, typography, elevation } from '../theme/theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FAQItem = ({ question, answer, isOpen, toggle }) => {
    return (
        <View style={styles.faqItem}>
            <TouchableOpacity
                style={styles.faqHeader}
                onPress={toggle}
                activeOpacity={0.7}
            >
                <Text style={styles.faqQuestion}>{question}</Text>
                <MaterialCommunityIcons
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={24}
                    color={colors.textBody}
                />
            </TouchableOpacity>
            {isOpen && (
                <View style={styles.faqBody}>
                    <Text style={styles.faqAnswer}>{answer}</Text>
                </View>
            )}
        </View>
    );
};

const HelpScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const [openFAQ, setOpenFAQ] = useState(null);

    const toggleFAQ = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setOpenFAQ(openFAQ === index ? null : index);
    };

    const faqs = [
        {
            question: "How do I add a new family member?",
            answer: "You can request to add a new family member by visiting your circle office with the birth certificate and Aadhaar card of the new member. Currently, online addition is pending approval."
        },
        {
            question: "What documents are needed for address change?",
            answer: "Valid proof of new address such as Gas Bill, Electricity Bill, or Rental Agreement along with your existing Ration Card copy."
        },
        {
            question: "Ration shop is closed during hours?",
            answer: "If the shop is closed during designated hours, you can file a complaint immediately using the Grievance Redressal feature below or call the helpline 1967."
        }
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color={colors.textDark} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Help & Support</Text>
                <TouchableOpacity style={styles.historyButton}>
                    <MaterialCommunityIcons name="history" size={24} color={colors.textDark} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <MaterialCommunityIcons name="magnify" size={24} color="#9CA3AF" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for issues..."
                        placeholderTextColor="#9CA3AF"
                    />
                </View>

                <Text style={styles.sectionTitle}>CONTACT SUPPORT</Text>

                {/* Support Options */}
                <View style={styles.supportRow}>
                    <TouchableOpacity style={styles.supportCard}>
                        <View style={[styles.iconCircle, { backgroundColor: '#E8F5E9' }]}>
                            <MaterialCommunityIcons name="phone-in-talk" size={24} color="#4CAF50" />
                        </View>
                        <Text style={styles.supportLabel}>Helpline</Text>
                        <Text style={styles.supportValue}>1967</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.supportCard}>
                        <View style={[styles.iconCircle, { backgroundColor: '#E3F2FD' }]}>
                            <MaterialCommunityIcons name="message-text" size={24} color="#2196F3" />
                        </View>
                        <Text style={styles.supportLabel}>Live Chat</Text>
                        <Text style={styles.supportValue}>Chat Now</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.emailCard}>
                    <View style={[styles.iconCircle, { backgroundColor: '#FFF3E0' }]}>
                        <MaterialCommunityIcons name="email" size={24} color="#FF9800" />
                    </View>
                    <View style={styles.emailContent}>
                        <Text style={styles.supportLabel}>Email Support</Text>
                        <Text style={styles.supportValue}>support@pds.gov.in</Text>
                    </View>
                    <MaterialCommunityIcons name="chevron-right" size={24} color="#D1D5DB" />
                </TouchableOpacity>

                {/* Grievance Card */}
                <View style={styles.grievanceCard}>
                    <View style={styles.grievanceHeader}>
                        <View>
                            <Text style={styles.grievanceTitle}>Grievance Redressal</Text>
                            <Text style={styles.grievanceSubtitle}>Face an issue with ration distribution? File a formal complaint.</Text>
                        </View>
                        <View style={styles.grievanceIcon}>
                            <MaterialCommunityIcons name="gavel" size={20} color="#FFF" />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.complaintButton}>
                        <Text style={styles.complaintButtonText}>File a Complaint</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>FREQUENTLY ASKED QUESTIONS</Text>

                {/* FAQs */}
                <View style={styles.faqList}>
                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                            isOpen={openFAQ === index}
                            toggle={() => toggleFAQ(index)}
                        />
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
    historyButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    content: {
        paddingHorizontal: spacing['2xl'],
        paddingBottom: spacing['4xl'],
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 30, // Pill shape
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        marginTop: spacing.sm,
        marginBottom: spacing['2xl'],
        ...elevation.sm,
    },
    searchInput: {
        flex: 1,
        marginLeft: spacing.md,
        ...typography.body,
        color: colors.textDark,
    },
    sectionTitle: {
        ...typography.caption,
        color: colors.textBody,
        letterSpacing: 1,
        marginBottom: spacing.lg,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    supportRow: {
        flexDirection: 'row',
        gap: spacing.lg,
        marginBottom: spacing.lg,
    },
    supportCard: {
        flex: 1,
        backgroundColor: colors.white,
        borderRadius: 24,
        padding: spacing.lg,
        ...elevation.sm,
    },
    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    supportLabel: {
        ...typography.caption,
        color: colors.textBody,
        marginBottom: 4,
    },
    supportValue: {
        ...typography.h4,
        color: colors.textDark,
        fontWeight: 'bold',
    },
    emailCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 24,
        padding: spacing.lg,
        marginBottom: spacing['2xl'],
        ...elevation.sm,
    },
    emailContent: {
        flex: 1,
        marginLeft: spacing.lg,
    },
    grievanceCard: {
        backgroundColor: '#1F2937', // Dark slate/black
        borderRadius: 24,
        padding: spacing['2xl'],
        marginBottom: spacing['2xl'],
        ...elevation.md,
    },
    grievanceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.xl,
    },
    grievanceTitle: {
        ...typography.h3,
        color: colors.white,
        marginBottom: spacing.xs,
    },
    grievanceSubtitle: {
        ...typography.bodySmall,
        color: '#9CA3AF',
        maxWidth: '85%',
    },
    grievanceIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#374151',
        justifyContent: 'center',
        alignItems: 'center',
    },
    complaintButton: {
        backgroundColor: '#8BC34A',
        borderRadius: 999,
        paddingVertical: spacing.md,
        alignItems: 'center',
    },
    complaintButtonText: {
        ...typography.body,
        color: colors.white,
        fontWeight: 'bold',
    },
    faqList: {
        gap: spacing.md,
    },
    faqItem: {
        backgroundColor: colors.white,
        borderRadius: 20,
        overflow: 'hidden',
        ...elevation.sm,
    },
    faqHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing.lg,
    },
    faqQuestion: {
        ...typography.body,
        color: colors.textDark,
        flex: 1,
        fontWeight: '500',
        marginRight: spacing.md,
    },
    faqBody: {
        paddingHorizontal: spacing.lg,
        paddingBottom: spacing.lg,
    },
    faqAnswer: {
        ...typography.bodySmall,
        color: colors.textBody,
        lineHeight: 20,
    },
});

export default HelpScreen;
