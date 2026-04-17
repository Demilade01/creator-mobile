import { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CampaignCard from '../../src/components/CampaignCard';
import SkeletonCard from '../../src/components/SkeletonCard';
import { CAMPAIGNS } from '../../src/data/campaigns';
import { useSubmissions } from '../../src/context/SubmissionsContext';

const SKELETON_COUNT = 4;

export default function CampaignsScreen() {
  const [loading, setLoading] = useState(true);
  const { submissions } = useSubmissions();

  // Fake 300 ms loading delay
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, []);

  const activeCampaigns = new Set(submissions.map((s) => s.campaignId)).size;
  const pendingEarnings = submissions
    .filter((s) => s.status === 'pending')
    .reduce((sum, s) => {
      const camp = CAMPAIGNS.find((c) => c.id === s.campaignId);
      return sum + (camp?.payout ?? 0);
    }, 0);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Stats header */}
      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{activeCampaigns}</Text>
          <Text style={styles.statLabel}>Active campaigns</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>${pendingEarnings}</Text>
          <Text style={styles.statLabel}>Pending earnings</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Available Campaigns</Text>

      {loading
        ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <SkeletonCard key={i} />
          ))
        : CAMPAIGNS.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  content: {
    paddingTop: 8,
    paddingBottom: 32,
  },
  statsBar: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: '#0E0E1A',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 255, 0.15)',
    overflow: 'hidden',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    gap: 4,
  },
  statValue: {
    color: '#00F5FF',
    fontSize: 22,
    fontFamily: 'Sora_700Bold',
  },
  statLabel: {
    color: '#6B7280',
    fontSize: 12,
    fontFamily: 'Sora_400Regular',
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(0, 245, 255, 0.12)',
    marginVertical: 12,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Sora_600SemiBold',
    marginHorizontal: 16,
    marginBottom: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    opacity: 0.5,
  },
});
