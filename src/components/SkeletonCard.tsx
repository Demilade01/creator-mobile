import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default function SkeletonCard() {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [shimmer]);

  const opacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <View style={styles.card}>
      <Animated.View style={[styles.content, { opacity }]}>
        {/* Top row */}
        <View style={styles.topRow}>
          <View style={styles.avatar} />
          <View style={styles.titleBlock}>
            <View style={[styles.line, { width: '60%', height: 14 }]} />
            <View style={[styles.line, { width: '35%', height: 10, marginTop: 6 }]} />
          </View>
          <View style={styles.payoutBox} />
        </View>

        {/* Description lines */}
        <View style={styles.descBlock}>
          <View style={[styles.line, { width: '100%', height: 11 }]} />
          <View style={[styles.line, { width: '80%', height: 11, marginTop: 6 }]} />
        </View>

        {/* Bottom row */}
        <View style={styles.bottomRow}>
          <View style={[styles.line, { width: 80, height: 11 }]} />
          <View style={[styles.line, { width: 60, height: 11 }]} />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 14,
    backgroundColor: '#0E0E1A',
    borderWidth: 1,
    borderColor: 'rgba(0, 245, 255, 0.08)',
    overflow: 'hidden',
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
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  titleBlock: {
    flex: 1,
  },
  payoutBox: {
    width: 56,
    height: 42,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  descBlock: {
    gap: 6,
  },
  line: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 6,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.04)',
  },
});
