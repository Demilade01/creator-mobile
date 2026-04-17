import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import React, { useState } from 'react';
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
  videoUrl: string;
  title?: string;
  onClose: () => void;
}

export default function VideoPlayerModal({
  visible,
  videoUrl,
  title,
  onClose,
}: VideoPlayerModalProps) {
  const [isLoading, setIsLoading] = useState(true);

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

        {/* Video Player using WebView */}
        <View style={styles.videoContainer}>
          <WebView
            style={styles.video}
            source={{ uri: videoUrl }}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
            scalesPageToFit
          />
          {isLoading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#00F5FF" />
            </View>
          )}
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
});
