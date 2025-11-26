import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Button, LoadingSpinner } from '@/components/ui';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';
import { dummyTemplates } from '@/constants/dummyData';

export default function CreateScreen() {
  const [logoText, setLogoText] = useState('');
  const [selectedColor, setSelectedColor] = useState(Colors.black);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  const colorOptions = [
    Colors.black,
    Colors.gray600,
    Colors.gray400,
    Colors.white,
  ];

  const handleGenerateWithAI = () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      // Select a random template as the "AI generated" result
      const randomTemplate = dummyTemplates[Math.floor(Math.random() * dummyTemplates.length)];
      setSelectedTemplate(randomTemplate.id);
    }, 2000);
  };

  const handleExport = () => {
    setShowExportModal(true);
  };

  const handleExportFormat = (format: 'svg' | 'png' | 'pdf') => {
    setShowExportModal(false);
    // Navigate to export screen
    router.push({
      pathname: '/logo/export',
      params: { format, templateId: selectedTemplate || '' },
    });
  };

  if (isGenerating) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingSpinner />
        <Text style={styles.loadingText}>Generating your logo with AI...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Logo</Text>
        <Text style={styles.subtitle}>Design your perfect logo</Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Preview Area */}
        <View style={styles.previewContainer}>
          <View style={styles.preview}>
            {selectedTemplate ? (
              <Text style={[styles.previewText, { color: selectedColor }]}>
                {logoText || 'LOGO'}
              </Text>
            ) : (
              <Text style={styles.previewPlaceholder}>Your logo preview</Text>
            )}
          </View>
        </View>

        {/* Text Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Logo Text</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your logo text"
            placeholderTextColor={Colors.gray400}
            value={logoText}
            onChangeText={setLogoText}
            maxLength={20}
          />
        </View>

        {/* Color Picker */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Color</Text>
          <View style={styles.colorGrid}>
            {colorOptions.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorOption,
                  { backgroundColor: color },
                  color === selectedColor && styles.colorOptionSelected,
                  color === Colors.white && styles.colorOptionWhite,
                ]}
                onPress={() => setSelectedColor(color)}
                activeOpacity={0.7}
              />
            ))}
          </View>
        </View>

        {/* Templates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Templates</Text>
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
                  selectedTemplate === template.id && styles.templateCardSelected,
                ]}
                onPress={() => setSelectedTemplate(template.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.templateIcon}>{template.previewImage}</Text>
                <Text style={styles.templateName} numberOfLines={1}>
                  {template.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* AI Generation */}
        <View style={styles.section}>
          <Button
            title="✨ Generate with AI"
            onPress={handleGenerateWithAI}
            variant="outlined"
          />
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
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Export Format</Text>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleExportFormat('svg')}
            >
              <Text style={styles.modalOptionText}>SVG (Vector)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleExportFormat('png')}
            >
              <Text style={styles.modalOptionText}>PNG (Image)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={() => handleExportFormat('pdf')}
            >
              <Text style={styles.modalOptionText}>PDF (Document)</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setShowExportModal(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
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
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  title: {
    fontSize: Typography['2xl'],
    fontWeight: Typography.bold,
    color: Colors.black,
  },
  subtitle: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
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
    marginTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  preview: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: Colors.gray50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewText: {
    fontSize: 48,
    fontWeight: Typography.bold,
  },
  previewPlaceholder: {
    fontSize: Typography.base,
    color: Colors.textTertiary,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    fontSize: Typography.base,
    color: Colors.text,
    backgroundColor: Colors.white,
  },
  colorGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorOptionSelected: {
    borderColor: Colors.black,
    borderWidth: 3,
  },
  colorOptionWhite: {
    borderWidth: 1,
    borderColor: Colors.border,
  },
  templatesContainer: {
    gap: Spacing.md,
  },
  templateCard: {
    width: 100,
    aspectRatio: 1,
    backgroundColor: Colors.gray50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.sm,
  },
  templateCardSelected: {
    borderColor: Colors.black,
    borderWidth: 2,
  },
  templateIcon: {
    fontSize: 32,
    marginBottom: Spacing.xs,
  },
  templateName: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  loadingText: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
    marginTop: Spacing.lg,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: Colors.blackOpacity50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.lg,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.lg,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    color: Colors.text,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  modalOption: {
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalOptionText: {
    fontSize: Typography.base,
    color: Colors.text,
    textAlign: 'center',
  },
  modalCancel: {
    paddingVertical: Spacing.md,
    marginTop: Spacing.sm,
  },
  modalCancelText: {
    fontSize: Typography.base,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
