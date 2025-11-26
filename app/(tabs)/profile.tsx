import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Button, LoadingSpinner } from '@/components/ui';
import { LogoCard } from '@/components/logo/LogoCard';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/contexts/ThemeContext';
import { dummyLogos } from '@/constants/dummyData';

export default function ProfileScreen() {
  const { theme } = useTheme();
  const { user, isAuthenticated, isLoading, logout, continueAsGuest } = useAuth();
  const [userLogos, setUserLogos] = useState(dummyLogos.slice(0, 4));

  useEffect(() => {
    if (!isLoading && !user) {
      continueAsGuest();
    }
  }, [isLoading, user]);

  const handleLogin = () => {
    router.push('/auth/login');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            continueAsGuest();
          },
        },
      ]
    );
  };

  const handleDeleteLogo = (logoId: string) => {
    Alert.alert(
      'Delete Logo',
      'Are you sure you want to delete this logo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setUserLogos(userLogos.filter(logo => logo.id !== logoId));
          },
        },
      ]
    );
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]} edges={['top']}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={[styles.avatarContainer, { backgroundColor: theme.surface }]}>
            <Ionicons name="person" size={40} color={theme.text} />
          </View>
          <Text style={[styles.username, { color: theme.text }]}>
            {user?.username || 'Guest User'}
          </Text>
          {user?.email && (
            <Text style={[styles.email, { color: theme.textSecondary }]}>{user.email}</Text>
          )}
          {user?.isGuest && (
            <View style={[styles.guestBadge, { backgroundColor: theme.surface }]}>
              <Ionicons name="eye-off-outline" size={14} color={theme.textSecondary} />
              <Text style={[styles.guestBadgeText, { color: theme.textSecondary }]}>
                Guest Mode
              </Text>
            </View>
          )}
        </View>

        {/* Auth Actions */}
        {!isAuthenticated ? (
          <View style={styles.authSection}>
            <View style={[styles.authCard, { backgroundColor: theme.surface }]}>
              <Ionicons name="lock-closed-outline" size={48} color={theme.textSecondary} />
              <Text style={[styles.authMessage, { color: theme.text }]}>
                Sign in to save your creations
              </Text>
              <Text style={[styles.authSubmessage, { color: theme.textSecondary }]}>
                and publish to the community
              </Text>
              <Button
                title="Sign In"
                onPress={handleLogin}
                style={styles.authButton}
              />
            </View>
          </View>
        ) : (
          <View style={styles.statsContainer}>
            <View style={[styles.statItem, { backgroundColor: theme.surface }]}>
              <Ionicons name="images-outline" size={24} color={theme.text} />
              <Text style={[styles.statValue, { color: theme.text }]}>{userLogos.length}</Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Logos</Text>
            </View>
            <View style={[styles.statItem, { backgroundColor: theme.surface }]}>
              <Ionicons name="heart-outline" size={24} color={theme.text} />
              <Text style={[styles.statValue, { color: theme.text }]}>
                {userLogos.reduce((sum, logo) => sum + logo.likes, 0)}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Likes</Text>
            </View>
            <View style={[styles.statItem, { backgroundColor: theme.surface }]}>
              <Ionicons name="cloud-upload-outline" size={24} color={theme.text} />
              <Text style={[styles.statValue, { color: theme.text }]}>
                {userLogos.filter(logo => logo.isPublished).length}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Published</Text>
            </View>
          </View>
        )}

        {/* Creation History */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>My Creations</Text>
            {userLogos.length > 0 && (
              <TouchableOpacity>
                <Text style={[styles.seeAll, { color: theme.text }]}>See All</Text>
              </TouchableOpacity>
            )}
          </View>

          {userLogos.length > 0 ? (
            <View style={styles.logosGrid}>
              {userLogos.map((logo, index) => (
                <View key={logo.id} style={styles.logoCardWrapper}>
                  <LogoCard
                    logo={logo}
                    onPress={() => console.log('Edit logo:', logo.id)}
                    index={index}
                  />
                  <TouchableOpacity
                    style={[styles.deleteButton, { backgroundColor: theme.card }]}
                    onPress={() => handleDeleteLogo(logo.id)}
                  >
                    <Ionicons name="close" size={16} color={theme.text} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <View style={[styles.emptyState, { backgroundColor: theme.surface }]}>
              <Ionicons name="create-outline" size={64} color={theme.textTertiary} />
              <Text style={[styles.emptyText, { color: theme.text }]}>No logos created yet</Text>
              <Text style={[styles.emptySubtext, { color: theme.textSecondary }]}>
                Start creating your first logo
              </Text>
            </View>
          )}
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Settings</Text>
          
          <TouchableOpacity style={[styles.settingItem, { borderBottomColor: theme.border }]}>
            <Ionicons name="person-outline" size={20} color={theme.text} />
            <Text style={[styles.settingText, { color: theme.text }]}>Account Settings</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.textTertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, { borderBottomColor: theme.border }]}>
            <Ionicons name="notifications-outline" size={20} color={theme.text} />
            <Text style={[styles.settingText, { color: theme.text }]}>Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.textTertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, { borderBottomColor: theme.border }]}>
            <Ionicons name="shield-outline" size={20} color={theme.text} />
            <Text style={[styles.settingText, { color: theme.text }]}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.textTertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, { borderBottomColor: theme.border }]}>
            <Ionicons name="document-text-outline" size={20} color={theme.text} />
            <Text style={[styles.settingText, { color: theme.text }]}>Terms of Service</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.textTertiary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, { borderBottomColor: 'transparent' }]}>
            <Ionicons name="information-circle-outline" size={20} color={theme.text} />
            <Text style={[styles.settingText, { color: theme.text }]}>About LOFIO</Text>
            <Ionicons name="chevron-forward" size={20} color={theme.textTertiary} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        {isAuthenticated && (
          <View style={styles.section}>
            <Button
              title="Logout"
              onPress={handleLogout}
              variant="outlined"
            />
          </View>
        )}

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.textTertiary }]}>LOFIO v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xl,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  username: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    marginBottom: Spacing.xs,
  },
  email: {
    fontSize: Typography.sm,
  },
  guestBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: 12,
  },
  guestBadgeText: {
    fontSize: Typography.xs,
    fontWeight: Typography.medium,
  },
  authSection: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  authCard: {
    padding: Spacing.xl,
    borderRadius: 16,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  authMessage: {
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
    textAlign: 'center',
    marginTop: Spacing.md,
  },
  authSubmessage: {
    fontSize: Typography.sm,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  authButton: {
    minWidth: 200,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: 16,
    gap: Spacing.xs,
  },
  statValue: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
  },
  statLabel: {
    fontSize: Typography.xs,
  },
  section: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.lg,
    fontWeight: Typography.bold,
  },
  seeAll: {
    fontSize: Typography.sm,
    fontWeight: Typography.semibold,
  },
  logosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  logoCardWrapper: {
    position: 'relative',
    width: '48%',
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing['2xl'],
    borderRadius: 16,
    gap: Spacing.sm,
  },
  emptyText: {
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
  },
  emptySubtext: {
    fontSize: Typography.sm,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    gap: Spacing.md,
  },
  settingText: {
    flex: 1,
    fontSize: Typography.base,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  footerText: {
    fontSize: Typography.xs,
  },
});
