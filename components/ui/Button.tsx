import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

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
  const isFilled = variant === 'filled';
  
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isFilled ? styles.buttonFilled : styles.buttonOutlined,
        disabled && styles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={isFilled ? Colors.white : Colors.black} />
      ) : (
        <Text
          style={[
            styles.buttonText,
            isFilled ? styles.buttonTextFilled : styles.buttonTextOutlined,
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
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  buttonFilled: {
    backgroundColor: Colors.black,
  },
  buttonOutlined: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.black,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
  },
  buttonTextFilled: {
    color: Colors.white,
  },
  buttonTextOutlined: {
    color: Colors.black,
  },
  buttonTextDisabled: {
    opacity: 0.5,
  },
});

