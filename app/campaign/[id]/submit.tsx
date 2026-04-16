import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSubmissions } from '../../../src/context/SubmissionsContext';
import { CAMPAIGNS } from '../../../src/data/campaigns';

const URL_REGEX = /^https?:\/\/(www\.)?(tiktok\.com|instagram\.com)\/.+/i;

function Toast({ visible, message }: { visible: boolean; message: string }) {
  if (!visible) return null;
  return (
    <View style={toastStyles.container}>
      <Ionicons name="checkmark-circle" size={18} color="#00E676" />
      <Text style={toastStyles.text}>{message}</Text>
    </View>
  );
}

const toastStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: '#0E2A1A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 230, 118, 0.3)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    zIndex: 999,
  },
  text: {
    color: '#00E676',
    fontFamily: 'Sora_600SemiBold',
    fontSize: 14,
    flex: 1,
  },
});

export default function SubmitScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { addSubmission } = useSubmissions();
  const campaign = CAMPAIGNS.find((c) => c.id === id);

  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const shakeAnim = useRef(new Animated.Value(0)).current;

  function triggerShake() {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true, easing: Easing.linear }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true, easing: Easing.linear }),
      Animated.timing(shakeAnim, { toValue: 6, duration: 60, useNativeDriver: true, easing: Easing.linear }),
      Animated.timing(shakeAnim, { toValue: -6, duration: 60, useNativeDriver: true, easing: Easing.linear }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true, easing: Easing.linear }),
    ]).start();
  }

  function handleSubmit() {
    Keyboard.dismiss();
    const trimmed = url.trim();

    if (!trimmed) {
      setError('Please enter a video URL.');
      triggerShake();
      return;
    }

    if (!URL_REGEX.test(trimmed)) {
      setError('URL must be a valid TikTok or Instagram link.');
      triggerShake();
      return;
    }

    setError('');
    setSubmitting(true);

    // Simulate async save
    setTimeout(() => {
      addSubmission(id!, trimmed);
      setSubmitting(false);
      setToastVisible(true);

      // Navigate back after toast
      setTimeout(() => {
        setToastVisible(false);
        router.dismissAll();
      }, 1800);
    }, 600);
  }

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Toast visible={toastVisible} message="Video submitted successfully!" />

      <View style={styles.container}>
        {/* Campaign context */}
        {campaign && (
          <View style={styles.contextBar}>
            <View style={styles.contextBadge}>
              <Text style={styles.contextInitial}>{campaign.brand[0]}</Text>
            </View>
            <View>
              <Text style={styles.contextLabel}>Submitting for</Text>
              <Text style={styles.contextBrand}>{campaign.brand}</Text>
            </View>
            <View style={styles.contextPayout}>
              <Text style={styles.contextPayoutText}>${campaign.payout}</Text>
            </View>
          </View>
        )}

        {/* Instructions */}
        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={16} color="#00F5FF" />
          <Text style={styles.infoText}>
            Paste your TikTok or Instagram Reel URL below. Make sure your video is
            public before submitting.
          </Text>
        </View>

        {/* Input */}
        <Text style={styles.label}>Video URL</Text>
        <Animated.View style={{ transform: [{ translateX: shakeAnim }] }}>
          <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            placeholder="https://www.tiktok.com/@you/video/..."
            placeholderTextColor="#4B5563"
            value={url}
            onChangeText={(t) => {
              setUrl(t);
              if (error) setError('');
            }}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />
        </Animated.View>

        {error ? (
          <View style={styles.errorRow}>
            <Ionicons name="alert-circle-outline" size={14} color="#FF4D4D" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {/* Submit button */}
        <TouchableOpacity
          style={[styles.submitBtn, submitting && styles.submitBtnDisabled]}
          activeOpacity={0.85}
          onPress={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <Text style={styles.submitBtnText}>Submitting…</Text>
          ) : (
            <>
              <Ionicons name="cloud-upload-outline" size={18} color="#0A0A0F" />
              <Text style={styles.submitBtnText}>Submit Video</Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          Your submission will be reviewed within 48 hours. You'll see the status
          update on the My Submissions tab.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  contextBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#0E0E1A',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    padding: 14,
  },
  contextBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 245, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contextInitial: {
    color: '#00F5FF',
    fontSize: 18,
    fontFamily: 'Sora_700Bold',
  },
  contextLabel: {
    color: '#6B7280',
    fontSize: 11,
    fontFamily: 'Sora_400Regular',
  },
  contextBrand: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Sora_600SemiBold',
  },
  contextPayout: {
    marginLeft: 'auto',
    backgroundColor: 'rgba(0, 245, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 255, 0.25)',
  },
  contextPayoutText: {
    color: '#00F5FF',
    fontSize: 14,
    fontFamily: 'Sora_700Bold',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: 'rgba(0, 245, 255, 0.06)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 255, 0.15)',
    padding: 12,
  },
  infoText: {
    flex: 1,
    color: '#9BA3AF',
    fontSize: 13,
    fontFamily: 'Sora_400Regular',
    lineHeight: 19,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Sora_600SemiBold',
  },
  input: {
    backgroundColor: '#0E0E1A',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.1)',
    color: '#FFFFFF',
    fontFamily: 'Sora_400Regular',
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  inputError: {
    borderColor: 'rgba(255, 77, 77, 0.6)',
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: -8,
  },
  errorText: {
    color: '#FF4D4D',
    fontSize: 12,
    fontFamily: 'Sora_400Regular',
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#00F5FF',
    borderRadius: 16,
    paddingVertical: 16,
    marginTop: 4,
    shadowColor: '#00F5FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 10,
  },
  submitBtnDisabled: {
    opacity: 0.55,
  },
  submitBtnText: {
    color: '#0A0A0F',
    fontSize: 16,
    fontFamily: 'Sora_700Bold',
  },
  disclaimer: {
    color: '#4B5563',
    fontSize: 12,
    fontFamily: 'Sora_400Regular',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 4,
  },
});
