import { Alert, Platform } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';

export const exportUtils = {
  // Export as PNG
  exportAsPNG: async (viewRef: any, fileName: string = 'logo.png') => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 1,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: 'image/png',
          dialogTitle: 'Save your logo',
        });
        return true;
      } else {
        Alert.alert('Error', 'Sharing is not available on this device');
        return false;
      }
    } catch (error) {
      console.error('PNG export error:', error);
      Alert.alert('Error', 'Failed to export as PNG');
      return false;
    }
  },

  // Export as SVG (simulated - would need actual SVG generation in production)
  exportAsSVG: async (svgData: string, fileName: string = 'logo.svg') => {
    try {
      // In a real app, you would generate actual SVG file
      // For now, we'll create a simple text file with SVG content
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Logo SVG</title>
          </head>
          <body>
            ${svgData}
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: 'image/svg+xml',
          dialogTitle: 'Save your logo',
        });
        return true;
      } else {
        Alert.alert('Error', 'Sharing is not available on this device');
        return false;
      }
    } catch (error) {
      console.error('SVG export error:', error);
      Alert.alert('Error', 'Failed to export as SVG');
      return false;
    }
  },

  // Export as PDF
  exportAsPDF: async (viewRef: any, fileName: string = 'logo.pdf') => {
    try {
      // Capture the view as an image first
      const imageUri = await captureRef(viewRef, {
        format: 'png',
        quality: 1,
      });

      // Create HTML with the image
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Logo PDF</title>
            <style>
              body {
                margin: 0;
                padding: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
              }
              img {
                max-width: 500px;
                width: 100%;
                height: auto;
              }
            </style>
          </head>
          <body>
            <img src="${imageUri}" alt="Logo" />
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Save your logo',
        });
        return true;
      } else {
        Alert.alert('Error', 'Sharing is not available on this device');
        return false;
      }
    } catch (error) {
      console.error('PDF export error:', error);
      Alert.alert('Error', 'Failed to export as PDF');
      return false;
    }
  },
};

