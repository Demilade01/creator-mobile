import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Campaign } from '../types';

interface CampaignCardProps {
  campaign: Campaign;
}

function getDeadlineInfo(deadline: string): { label: string; color: string } {
  const msLeft = new Date(deadline).getTime() - Date.now();
  const daysLeft = Math.ceil(msLeft / (1000 * 60 * 60 * 24));

  if (daysLeft <= 1) {
    return { label: daysLeft <= 0 ? 'Expired' : '1 day left', color: '#FF4D4D' };
  } else if (daysLeft <= 3) {
    return { label: `${daysLeft} days left`, color: '#FFB800' };
  } else {
    return { label: `${daysLeft} days left`, color: '#00E676' };
  }
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const router = useRouter();
  const deadline = getDeadlineInfo(campaign.deadline);

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => router.push(`/campaign/${campaign.id}`)}
      style={styles.card}
    >
      {/* Glow border overlay */}
      <View style={styles.glowBorder} />

      <View style={styles.content}>
        {/* Top row */}
        <View style={styles.topRow}>
          <View style={styles.brandBadge}>
            <Text style={styles.brandInitial}>{campaign.brand[0]}</Text>
          </View>
          <View style={styles.brandInfo}>
            <Text style={styles.brandName}>{campaign.brand}</Text>
            <View style={styles.categoryTag}>
              <Text style={styles.categoryText}>{campaign.category}</Text>
            </View>
          </View>
          <View style={styles.payoutBadge}>
            <Text style={styles.payoutAmount}>${campaign.payout}</Text>
            <Text style={styles.payoutLabel}>/video</Text>
          </View>
        </View>

        {/* Description snippet */}
        <Text style={styles.description} numberOfLines={2}>
          {campaign.description}
        </Text>

        {/* Bottom row */}
        <View style={styles.bottomRow}>
          <View style={styles.deadlineRow}>
            <Ionicons name="time-outline" size={13} color={deadline.color} />
            <Text style={[styles.deadlineText, { color: deadline.color }]}>
              {deadline.label}
            </Text>
          </View>
          <View style={styles.ctaHint}>
            <Text style={styles.ctaHintText}>View brief</Text>
            <Ionicons name="chevron-forward" size={13} color="#00F5FF" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 14,
    backgroundColor: '#0E0E1A',
    overflow: 'hidden',
    // Shadow for iOS
    shadowColor: '#00F5FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    // Elevation for Android
    elevation: 8,
  },
  glowBorder: {
    position: 'absolute',
    inset: 0,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 255, 0.25)',
  },
  content: {
    padding: 16,
    gap: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brandBadge: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 245, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 255, 0.3)',
  },
  brandInitial: {
    color: '#00F5FF',
    fontSize: 18,
    fontFamily: 'Sora_700Bold',
  },
  brandInfo: {
    flex: 1,
    gap: 4,
  },
  brandName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Sora_600SemiBold',
  },
  categoryTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  categoryText: {
    color: '#9BA3AF',
    fontSize: 11,
    fontFamily: 'Sora_400Regular',
  },
  payoutBadge: {
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 245, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 255, 0.3)',
  },
  payoutAmount: {
    color: '#00F5FF',
    fontSize: 17,
    fontFamily: 'Sora_700Bold',
    lineHeight: 20,
  },
  payoutLabel: {
    color: 'rgba(0, 245, 255, 0.6)',
    fontSize: 10,
    fontFamily: 'Sora_400Regular',
  },
  description: {
    color: '#9BA3AF',
    fontSize: 13,
    fontFamily: 'Sora_400Regular',
    lineHeight: 19,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.06)',
  },
  deadlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  deadlineText: {
    fontSize: 12,
    fontFamily: 'Sora_600SemiBold',
  },
  ctaHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ctaHintText: {
    color: '#00F5FF',
    fontSize: 12,
    fontFamily: 'Sora_500Medium',
  },
});
