import { useState, useRef } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Button } from '@/components/ui';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';
import { exportUtils } from '@/utils/export';

export default function ExportScreen() {
  const { format, templateId } = useLocalSearchParams<{ format: string; templateId: string }>();
  const [isExporting, setIsExporting] = useState(false);
  const logoRef = useRef(null);

  const handleExport = async () => {
    if (!logoRef.current) {
      Alert.alert('Error', 'Logo preview not ready');
      return;
    }

    setIsExporting(true);
    try {
      let success = false;

      switch (format) {
        case 'png':
          success = await exportUtils.exportAsPNG(logoRef.current);
          break;
        case 'svg':
          success = await exportUtils.exportAsSVG('<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="black"/></svg>');
          break;
        case 'pdf':
          success = await exportUtils.exportAsPDF(logoRef.current);
          break;
        default:
          Alert.alert('Error', 'Invalid export format');
      }

      if (success) {
        Alert.alert('Success', 'Logo exported successfully!', [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]);
      }
    } catch (error) {
      console.error('Export error:', error);
      Alert.alert('Error', 'Failed to export logo');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Export Logo</Text>
        <Text style={styles.subtitle}>
          Format: {format?.toUpperCase()}
        </Text>
      </View>

      <View style={styles.content}>
        <View ref={logoRef} style={styles.logoPreview} collapsable={false}>
          <Text style={styles.logoText}>LOGO</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.infoText}>
            Your logo will be exported as {format?.toUpperCase()} format.
          </Text>
          <Text style={styles.infoText}>
            You can save it to your device or share it with others.
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title="Cancel"
          onPress={() => router.back()}
          variant="outlined"
          style={styles.button}
        />
        <Button
          title={isExporting ? 'Exporting...' : 'Export'}
          onPress={handleExport}
          loading={isExporting}
          style={styles.button}
        />
      </View>
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
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
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
  },
  logoPreview: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: Colors.gray50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  logoText: {
    fontSize: 64,
    fontWeight: Typography.bold,
    color: Colors.black,
  },
  info: {
    padding: Spacing.md,
    backgroundColor: Colors.gray50,
    borderRadius: 8,
  },
  infoText: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeight.relaxed * Typography.sm,
    marginBottom: Spacing.xs,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: Spacing.md,
  },
  button: {
    flex: 1,
  },
});

