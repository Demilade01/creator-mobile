import { Ionicons } from '@expo/vector-icons';
import * as VideoPlayer from 'expo-video';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useState, useEffect } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';

interface VideoPlayerModalProps {
  visible: boolean;
  videoUrl: string | number;
  title?: string;
  onClose: () => void;
}

function getVideoUri(video: string | number): string {
  // If it's a require() result (number), return as is (Expo handles it)
  if (typeof video === 'number') {
    return video as any;
  }
  // Otherwise it's already a URL string
  return video;
}

export default function VideoPlayerModal({
  visible,
  videoUrl,
  title,
  onClose,
}: VideoPlayerModalProps) {
  const player = useVideoPlayer(getVideoUri(videoUrl));
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (visible && player) {
      player.play();
      setIsPlaying(true);
      setIsLoading(false);
    }
  }, [visible]);

  const togglePlayPause = () => {
    if (player.playing) {
      player.pause();
      setIsPlaying(false);
    } else {
      player.play();
      setIsPlaying(true);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} hitSlop={8}>
            <Ionicons name="chevron-down" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.title} numberOfLines={1}>
            {title || 'Video'}
          </Text>
          <View style={{ width: 28 }} />
        </View>

        {/* Video Player */}
        <View style={styles.videoContainer}>
          <VideoView
            style={styles.video}
            player={player}
          />
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#00F5FF" />
            </View>
          )}
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={togglePlayPause}
            hitSlop={12}
          >
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={24}
              color="#00F5FF"
            />
          </TouchableOpacity>

          <Text style={styles.urlText} numberOfLines={1}>
            Example Video
          </Text>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={onClose}
            hitSlop={12}
          >
            <Ionicons name="close" size={24} color="#FF4D4D" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.07)',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Sora_600SemiBold',
    flex: 1,
    textAlign: 'center',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    height: '100%',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.07)',
  },
  controlButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 245, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  urlText: {
    flex: 1,
    color: '#6B7280',
    fontSize: 12,
    fontFamily: 'Sora_400Regular',
  },
});
