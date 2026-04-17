import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import VideoPlayerModal from '../../src/components/VideoPlayerModal';
import VideoThumbnail from '../../src/components/VideoThumbnail';
import { CAMPAIGNS } from '../../src/data/campaigns';

export default function CampaignDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const campaign = CAMPAIGNS.find((c) => c.id === id);

  const [videoModalVisible, setVideoModalVisible] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');

  if (!campaign) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Campaign not found.</Text>
      </View>
    );
  }

  const msLeft = new Date(campaign.deadline).getTime() - Date.now();
  const daysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24));
  const deadlineColor =
    daysLeft <= 1 ? '#FF4D4D' : daysLeft <= 3 ? '#FFB800' : '#00E676';

  const handleExampleVideoPress = (idx: number) => {
    const videoUrl = campaign.exampleVideoUrls[idx % campaign.exampleVideoUrls.length];
    setSelectedVideoUrl(videoUrl);
    setVideoModalVisible(true);
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <View style={styles.brandBadge}>
            <Text style={styles.brandInitial}>{campaign.brand[0]}</Text>
          </View>
          <View style={styles.heroMeta}>
            <Text style={styles.brandName}>{campaign.brand}</Text>
            <View style={styles.heroRow}>
              <View style={styles.categoryTag}>
                <Text style={styles.categoryText}>{campaign.category}</Text>
              </View>
              <View style={styles.payoutBadge}>
                <Text style={styles.payoutText}>${campaign.payout}/video</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Deadline */}
        <View style={[styles.deadlineBar, { borderColor: `${deadlineColor}33` }]}>
          <Ionicons name="time-outline" size={15} color={deadlineColor} />
          <Text style={[styles.deadlineText, { color: deadlineColor }]}>
            {daysLeft <= 0
            ? 'Deadline passed'
            : daysLeft === 1
            ? '1 day left — submit soon!'
            : `${daysLeft} days left to submit`}
        </Text>
      </View>

      {/* Description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About this campaign</Text>
        <Text style={styles.bodyText}>{campaign.description}</Text>
      </View>

      {/* Instructions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What to create</Text>
        <View style={styles.instructionList}>
          {campaign.instructions.map((instruction, idx) => (
            <View key={idx} style={styles.instructionItem}>
              <View style={styles.instructionBullet}>
                <Text style={styles.instructionNumber}>{idx + 1}</Text>
              </View>
              <Text style={styles.instructionText}>{instruction}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Example thumbnails */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Example videos</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.thumbnailRow}
        >
          {campaign.exampleThumbnails.map((color, idx) => (
            <VideoThumbnail
              key={idx}
              color={color}
              onPress={() => handleExampleVideoPress(idx)}
            />
          ))}
        </ScrollView>
      </View>

      {/* CTA */}
      <TouchableOpacity
        style={styles.cta}
        activeOpacity={0.85}
        onPress={() => router.push(`/campaign/${campaign.id}/submit`)}
      >
        <Ionicons name="cloud-upload-outline" size={20} color="#0A0A0F" />
        <Text style={styles.ctaText}>Submit a Video</Text>
      </TouchableOpacity>
    </ScrollView>

    <VideoPlayerModal
      visible={videoModalVisible}
      videoUrl={selectedVideoUrl}
      title={`${campaign.brand} - Example Video`}
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
    padding: 20,
    paddingBottom: 48,
    gap: 24,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0A0A0F',
  },
  notFoundText: {
    color: '#6B7280',
    fontFamily: 'Sora_400Regular',
    fontSize: 15,
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  brandBadge: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 245, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(0, 245, 255, 0.3)',
  },
  brandInitial: {
    color: '#00F5FF',
    fontSize: 26,
    fontFamily: 'Sora_700Bold',
  },
  heroMeta: {
    flex: 1,
    gap: 8,
  },
  brandName: {
    color: '#FFFFFF',
    fontSize: 22,
    fontFamily: 'Sora_700Bold',
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  categoryTag: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  categoryText: {
    color: '#9BA3AF',
    fontSize: 12,
    fontFamily: 'Sora_400Regular',
  },
  payoutBadge: {
    backgroundColor: 'rgba(0, 245, 255, 0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 255, 0.3)',
  },
  payoutText: {
    color: '#00F5FF',
    fontSize: 12,
    fontFamily: 'Sora_700Bold',
  },
  deadlineBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#0E0E1A',
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
  },
  deadlineText: {
    fontSize: 13,
    fontFamily: 'Sora_600SemiBold',
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 11,
    fontFamily: 'Sora_600SemiBold',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  bodyText: {
    color: '#D1D5DB',
    fontSize: 14,
    fontFamily: 'Sora_400Regular',
    lineHeight: 22,
  },
  instructionList: {
    gap: 12,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  instructionBullet: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(0, 245, 255, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
    flexShrink: 0,
  },
  instructionNumber: {
    color: '#00F5FF',
    fontSize: 11,
    fontFamily: 'Sora_700Bold',
  },
  instructionText: {
    flex: 1,
    color: '#D1D5DB',
    fontSize: 14,
    fontFamily: 'Sora_400Regular',
    lineHeight: 21,
  },
  thumbnailRow: {
    gap: 12,
    paddingRight: 4,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#00F5FF',
    borderRadius: 16,
    paddingVertical: 16,
    shadowColor: '#00F5FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  ctaText: {
    color: '#0A0A0F',
    fontSize: 16,
    fontFamily: 'Sora_700Bold',
  },
});
