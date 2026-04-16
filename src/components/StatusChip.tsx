import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SubmissionStatus } from '../types';

interface StatusChipProps {
  status: SubmissionStatus;
}

const STATUS_CONFIG: Record<
  SubmissionStatus,
  { label: string; backgroundColor: string; textColor: string; dotColor: string }
> = {
  pending: {
    label: 'Pending',
    backgroundColor: 'rgba(255, 184, 0, 0.12)',
    textColor: '#FFB800',
    dotColor: '#FFB800',
  },
  approved: {
    label: 'Approved',
    backgroundColor: 'rgba(0, 230, 118, 0.12)',
    textColor: '#00E676',
    dotColor: '#00E676',
  },
  rejected: {
    label: 'Rejected',
    backgroundColor: 'rgba(255, 77, 77, 0.12)',
    textColor: '#FF4D4D',
    dotColor: '#FF4D4D',
  },
};

export default function StatusChip({ status }: StatusChipProps) {
  const config = STATUS_CONFIG[status];

  return (
    <View style={[styles.chip, { backgroundColor: config.backgroundColor }]}>
      <View style={[styles.dot, { backgroundColor: config.dotColor }]} />
      <Text style={[styles.label, { color: config.textColor }]}>{config.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Sora_600SemiBold',
  },
});
