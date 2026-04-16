import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface VideoThumbnailProps {
  /** Hex colour string used as placeholder background */
  color: string;
  onPress?: () => void;
}

export default function VideoThumbnail({ color, onPress }: VideoThumbnailProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.container, { backgroundColor: color }]}
    >
      {/* Gradient-ish overlay */}
      <View style={styles.overlay} />

      {/* Play button */}
      <View style={styles.playButton}>
        <Ionicons name="play" size={22} color="#0A0A0F" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 255, 0.2)',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#00F5FF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 3, // optical centering of play icon
    // Shadow
    shadowColor: '#00F5FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },
});
