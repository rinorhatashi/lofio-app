import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';
import { useTheme } from '@/contexts/ThemeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'filled' | 'outlined';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button = ({
  title,
  onPress,
  variant = 'filled',
  disabled = false,
  loading = false,
  style,
  textStyle,
}: ButtonProps) => {
  const { theme } = useTheme();
  const isFilled = variant === 'filled';
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: isFilled ? theme.text : theme.background,
          borderColor: theme.text,
          borderWidth: isFilled ? 0 : 1,
        },
        disabled && styles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={isFilled ? theme.background : theme.text} />
      ) : (
        <Text
          style={[
            styles.buttonText,
            { color: isFilled ? theme.background : theme.text },
            disabled && styles.buttonTextDisabled,
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
  },
  buttonTextDisabled: {
    opacity: 0.5,
  },
});

