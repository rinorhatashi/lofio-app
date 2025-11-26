import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Button, LoadingSpinner } from '@/components/ui';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';
import { dummyTemplates } from '@/constants/dummyData';
import { useTheme } from '@/contexts/ThemeContext';

export default function CreateScreen() {
  const { theme } = useTheme();
  const [logoText, setLogoText] = useState('');
  const [selectedColor, setSelectedColor] = useState(theme.text);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const colorOptions = [
    { color: '#000000', name: 'Black' },
    { color: '#FFFFFF', name: 'White' },
    { color: '#666666', name: 'Gray' },
    { color: '#FF0000', name: 'Red' },
    { color: '#0000FF', name: 'Blue' },
  ];

  const handleGenerateWithAI = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const randomTemplate = dummyTemplates[Math.floor(Math.random() * dummyTemplates.length)];
      setSelectedTemplate(randomTemplate.id);
    }, 2000);
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  const handleExportFormat = (format: 'svg' | 'png' | 'pdf') => {
    setShowExportModal(false);
    router.push({
      pathname: '/logo/export',
      params: { format, templateId: selectedTemplate || '' },
    });
  };

  if (isGenerating) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.background }]}>
        <LoadingSpinner />
        <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
          Generating your logo with AI...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: theme.text }]}>Create Logo</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Design your perfect logo
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Preview Area */}
        <View style={[styles.previewContainer, { backgroundColor: theme.surface, borderColor: theme.border }]}>
          {selectedTemplate ? (
            <Text style={[styles.previewText, { color: selectedColor }]}>
              {logoText || 'LOGO'}
            </Text>
          ) : (
            <View style={styles.placeholderContent}>
              <Ionicons name="image-outline" size={64} color={theme.textTertiary} />
              <Text style={[styles.previewPlaceholder, { color: theme.textSecondary }]}>
                Your logo preview
              </Text>
            </View>
          )}
        </View>

        {/* Text Input */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="text-outline" size={20} color={theme.text} />
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Logo Text</Text>
          </View>
          <TextInput
            style={[styles.textInput, { backgroundColor: theme.surface, borderColor: theme.border, color: theme.text }]}
            placeholder="Enter your logo text"
            placeholderTextColor={theme.textTertiary}
            value={logoText}
            onChangeText={setLogoText}
            maxLength={20}
          />
        </View>

        {/* Color Picker */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="color-palette-outline" size={20} color={theme.text} />
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Color</Text>
          </View>
          <View style={styles.colorGrid}>
            {colorOptions.map((item) => (
              <TouchableOpacity
                key={item.color}
                style={[
                  styles.colorOption,
                  { backgroundColor: item.color },
                  selectedColor === item.color && styles.colorOptionSelected,
                  item.color === '#FFFFFF' && { borderWidth: 1, borderColor: theme.border },
                ]}
                onPress={() => setSelectedColor(item.color)}
                activeOpacity={0.7}
              >
                {selectedColor === item.color && (
                  <Ionicons
                    name="checkmark"
                    size={20}
                    color={item.color === '#FFFFFF' ? '#000000' : '#FFFFFF'}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Templates */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="apps-outline" size={20} color={theme.text} />
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Templates</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.templatesContainer}
          >
            {dummyTemplates.slice(0, 6).map((template) => (
              <TouchableOpacity
                key={template.id}
                style={[
                  styles.templateCard,
                  { backgroundColor: theme.surface, borderColor: theme.border },
                  selectedTemplate === template.id && { borderColor: theme.text, borderWidth: 2 },
                ]}
                onPress={() => setSelectedTemplate(template.id)}
                activeOpacity={0.7}
              >
                <View style={styles.templateIconContainer}>
                  <Ionicons name="shapes-outline" size={32} color={theme.text} />
                </View>
                <Text style={[styles.templateName, { color: theme.textSecondary }]} numberOfLines={1}>
                  {template.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* AI Generation */}
        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.aiButton, { backgroundColor: theme.surface, borderColor: theme.border }]}
            onPress={handleGenerateWithAI}
            activeOpacity={0.7}
          >
            <Ionicons name="sparkles-outline" size={24} color={theme.text} />
            <Text style={[styles.aiButtonText, { color: theme.text }]}>Generate with AI</Text>
          </TouchableOpacity>
        </View>

        {/* Export Button */}
        {selectedTemplate && (
          <View style={styles.section}>
            <Button title="Export Logo" onPress={handleExport} />
          </View>
        )}
      </ScrollView>

      {/* Export Modal */}
      <Modal
        visible={showExportModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowExportModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowExportModal(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Export Format</Text>
            
            <TouchableOpacity
              style={[styles.modalOption, { borderBottomColor: theme.border }]}
              onPress={() => handleExportFormat('svg')}
            >
              <Ionicons name="code-outline" size={24} color={theme.text} />
              <View style={styles.modalOptionTextContainer}>
                <Text style={[styles.modalOptionText, { color: theme.text }]}>SVG</Text>
                <Text style={[styles.modalOptionSubtext, { color: theme.textSecondary }]}>Vector format</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalOption, { borderBottomColor: theme.border }]}
              onPress={() => handleExportFormat('png')}
            >
              <Ionicons name="image-outline" size={24} color={theme.text} />
              <View style={styles.modalOptionTextContainer}>
                <Text style={[styles.modalOptionText, { color: theme.text }]}>PNG</Text>
                <Text style={[styles.modalOptionSubtext, { color: theme.textSecondary }]}>Image format</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalOption, { borderBottomColor: 'transparent' }]}
              onPress={() => handleExportFormat('pdf')}
            >
              <Ionicons name="document-outline" size={24} color={theme.text} />
              <View style={styles.modalOptionTextContainer}>
                <Text style={[styles.modalOptionText, { color: theme.text }]}>PDF</Text>
                <Text style={[styles.modalOptionSubtext, { color: theme.textSecondary }]}>Document format</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setShowExportModal(false)}
            >
              <Text style={[styles.modalCancelText, { color: theme.textSecondary }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: Typography['2xl'],
    fontWeight: Typography.bold,
  },
  subtitle: {
    fontSize: Typography.sm,
    marginTop: Spacing.xs,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  previewContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  previewText: {
    fontSize: 56,
    fontWeight: Typography.bold,
    letterSpacing: 2,
  },
  placeholderContent: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  previewPlaceholder: {
    fontSize: Typography.base,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    fontSize: Typography.base,
  },
  colorGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  colorOption: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorOptionSelected: {
    borderWidth: 3,
    borderColor: '#000',
  },
  templatesContainer: {
    gap: Spacing.md,
  },
  templateCard: {
    width: 120,
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.sm,
  },
  templateIconContainer: {
    marginBottom: Spacing.sm,
  },
  templateName: {
    fontSize: Typography.xs,
    textAlign: 'center',
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    borderRadius: 12,
    borderWidth: 1,
  },
  aiButtonText: {
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: Typography.base,
    marginTop: Spacing.lg,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  modalContent: {
    borderRadius: 20,
    padding: Spacing.lg,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    gap: Spacing.md,
  },
  modalOptionTextContainer: {
    flex: 1,
  },
  modalOptionText: {
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
  },
  modalOptionSubtext: {
    fontSize: Typography.xs,
    marginTop: 2,
  },
  modalCancel: {
    paddingVertical: Spacing.md,
    marginTop: Spacing.sm,
    alignItems: 'center',
  },
  modalCancelText: {
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
  },
});
