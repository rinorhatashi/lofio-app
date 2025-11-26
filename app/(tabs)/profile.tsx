import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Button, LoadingSpinner } from '@/components/ui';
import { LogoCard } from '@/components/logo/LogoCard';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';
import { useAuth } from '@/hooks/useAuth';
import { dummyLogos } from '@/constants/dummyData';

export default function ProfileScreen() {
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
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>{user?.avatar || '👤'}</Text>
          </View>
          <Text style={styles.username}>{user?.username || 'Guest User'}</Text>
          {user?.email && (
            <Text style={styles.email}>{user.email}</Text>
          )}
          {user?.isGuest && (
            <Text style={styles.guestBadge}>Guest Mode</Text>
          )}
        </View>

        {/* Auth Actions */}
        {!isAuthenticated ? (
          <View style={styles.authSection}>
            <Text style={styles.authMessage}>
              Sign in to save your creations and publish to the community
            </Text>
            <Button
              title="Sign In"
              onPress={handleLogin}
              style={styles.authButton}
            />
          </View>
        ) : (
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{userLogos.length}</Text>
              <Text style={styles.statLabel}>Logos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {userLogos.reduce((sum, logo) => sum + logo.likes, 0)}
              </Text>
              <Text style={styles.statLabel}>Likes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {userLogos.filter(logo => logo.isPublished).length}
              </Text>
              <Text style={styles.statLabel}>Published</Text>
            </View>
          </View>
        )}

        {/* Creation History */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Creations</Text>
            {userLogos.length > 0 && (
              <TouchableOpacity>
                <Text style={styles.seeAll}>See All</Text>
              </TouchableOpacity>
            )}
          </View>

          {userLogos.length > 0 ? (
            <View style={styles.logosGrid}>
              {userLogos.map((logo) => (
                <View key={logo.id} style={styles.logoCardWrapper}>
                  <LogoCard
                    logo={logo}
                    onPress={() => console.log('Edit logo:', logo.id)}
                  />
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteLogo(logo.id)}
                  >
                    <Text style={styles.deleteIcon}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📝</Text>
              <Text style={styles.emptyText}>No logos created yet</Text>
              <Text style={styles.emptySubtext}>
                Start creating your first logo
              </Text>
            </View>
          )}
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Account Settings</Text>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Notifications</Text>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Privacy Policy</Text>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>Terms of Service</Text>
            <Text style={styles.settingArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingText}>About LOFIO</Text>
            <Text style={styles.settingArrow}>›</Text>
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
          <Text style={styles.footerText}>LOFIO v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
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
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.gray50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  avatar: {
    fontSize: 40,
  },
  username: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  email: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
  },
  guestBadge: {
    fontSize: Typography.xs,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.gray50,
    borderRadius: 12,
  },
  authSection: {
    padding: Spacing.lg,
    alignItems: 'center',
  },
  authMessage: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.md,
    lineHeight: Typography.lineHeight.relaxed * Typography.sm,
  },
  authButton: {
    minWidth: 200,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: Typography.xl,
    fontWeight: Typography.bold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
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
    color: Colors.text,
  },
  seeAll: {
    fontSize: Typography.sm,
    color: Colors.black,
    fontWeight: Typography.medium,
  },
  logosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  logoCardWrapper: {
    position: 'relative',
    marginBottom: Spacing.md,
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  deleteIcon: {
    fontSize: 20,
    color: Colors.black,
    fontWeight: Typography.bold,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing['2xl'],
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },
  emptyText: {
    fontSize: Typography.base,
    fontWeight: Typography.semibold,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  emptySubtext: {
    fontSize: Typography.sm,
    color: Colors.textSecondary,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingText: {
    fontSize: Typography.base,
    color: Colors.text,
  },
  settingArrow: {
    fontSize: 24,
    color: Colors.textTertiary,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
  },
  footerText: {
    fontSize: Typography.xs,
    color: Colors.textTertiary,
  },
});
