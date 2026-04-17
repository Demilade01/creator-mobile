import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import VideoPlayerModal from '../../src/components/VideoPlayerModal';
import StatusChip from '../../src/components/StatusChip';
import { CAMPAIGNS } from '../../src/data/campaigns';
import { useSubmissions } from '../../src/context/SubmissionsContext';
import { Submission } from '../../src/types';

function truncateUrl(url: string, maxLen = 40): string {
  if (url.length <= maxLen) return url;
  return url.slice(0, maxLen) + '…';
}

function SubmissionRow({ submission, onPlayPress }: { submission: Submission; onPlayPress: () => void }) {
  const campaign = CAMPAIGNS.find((c) => c.id === submission.campaignId);

  return (
    <View style={styles.submissionRow}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPlayPress}
        style={styles.submissionContent}
      >
        <View style={styles.submissionInfo}>
          <Text style={styles.campaignName}>{campaign?.brand ?? 'Unknown'}</Text>
          <Text style={styles.urlText}>{truncateUrl(submission.url)}</Text>
          <Text style={styles.dateText}>
            {new Date(submission.submittedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </Text>
        </View>
        <View style={styles.playIcon}>
          <Ionicons name="play-circle-outline" size={20} color="#00F5FF" />
        </View>
      </TouchableOpacity>
      <StatusChip status={submission.status} />
    </View>
  );
}

export default function SubmissionsScreen() {
  const { submissions } = useSubmissions();
  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');
  const [selectedCampaignBrand, setSelectedCampaignBrand] = useState('');

  const handlePlayVideo = (url: string, brand: string) => {
    setSelectedVideoUrl(url);
    setSelectedCampaignBrand(brand);
    setVideoModalVisible(true);
  };

  if (submissions.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyIcon}>📭</Text>
        <Text style={styles.emptyTitle}>No submissions yet</Text>
        <Text style={styles.emptySubtitle}>
          Head to a campaign and tap "Submit a Video" to get started.
        </Text>
      </View>
    );
  }

  // Group by campaignId
  const grouped = submissions.reduce<Record<string, Submission[]>>((acc, sub) => {
    if (!acc[sub.campaignId]) acc[sub.campaignId] = [];
    acc[sub.campaignId].push(sub);
    return acc;
  }, {});

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.summary}>
          {submissions.length} submission{submissions.length !== 1 ? 's' : ''} across{' '}
          {Object.keys(grouped).length} campaign{Object.keys(grouped).length !== 1 ? 's' : ''}
        </Text>

        {Object.entries(grouped).map(([campaignId, subs]) => {
          const campaign = CAMPAIGNS.find((c) => c.id === campaignId);
          return (
            <View key={campaignId} style={styles.group}>
              <View style={styles.groupHeader}>
                <View style={styles.groupDot} />
                <Text style={styles.groupTitle}>{campaign?.brand ?? campaignId}</Text>
                <View style={styles.groupBadge}>
                  <Text style={styles.groupBadgeText}>{subs.length}</Text>
                </View>
              </View>

              <View style={styles.groupCard}>
                {subs.map((sub, idx) => (
                  <View key={sub.id}>
                    <SubmissionRow
                      submission={sub}
                      onPlayPress={() => handlePlayVideo(sub.url, campaign?.brand ?? 'Unknown')}
                    />
                    {idx < subs.length - 1 && <View style={styles.divider} />}
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>

      <VideoPlayerModal
        visible={videoModalVisible}
        videoUrl={selectedVideoUrl}
        title={`${selectedCampaignBrand} - Submission`}
        onClose={() => setVideoModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  content: {
    padding: 16,
    paddingBottom: 40,
    gap: 24,
  },
  summary: {
    color: '#6B7280',
    fontSize: 13,
    fontFamily: 'Sora_400Regular',
    marginBottom: -8,
  },
  group: {
    gap: 10,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  groupDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00F5FF',
  },
  groupTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Sora_600SemiBold',
    flex: 1,
  },
  groupBadge: {
    backgroundColor: 'rgba(0, 245, 255, 0.12)',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  groupBadgeText: {
    color: '#00F5FF',
    fontSize: 12,
    fontFamily: 'Sora_600SemiBold',
  },
  groupCard: {
    backgroundColor: '#0E0E1A',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    overflow: 'hidden',
  },
  submissionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  submissionContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  playIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 245, 255, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submissionInfo: {
    flex: 1,
    gap: 3,
  },
  campaignName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Sora_600SemiBold',
  },
  urlText: {
    color: '#6B7280',
    fontSize: 12,
    fontFamily: 'Sora_400Regular',
  },
  dateText: {
    color: '#4B5563',
    fontSize: 11,
    fontFamily: 'Sora_400Regular',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginHorizontal: 14,
  },
  submissionActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  empty: {
    flex: 1,
    backgroundColor: '#0A0A0F',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    gap: 12,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Sora_600SemiBold',
    textAlign: 'center',
  },
  emptySubtitle: {
    color: '#6B7280',
    fontSize: 14,
    fontFamily: 'Sora_400Regular',
    textAlign: 'center',
    lineHeight: 21,
  },
});
