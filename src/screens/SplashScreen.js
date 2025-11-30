import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withSequence,
    withDelay,
    runOnJS
} from 'react-native-reanimated';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { StatusBar } from 'expo-status-bar';

const SplashScreen = ({ navigation }) => {
    const opacity = useSharedValue(0);
    const scale = useSharedValue(0.8);

    useEffect(() => {
        opacity.value = withSequence(
            withTiming(1, { duration: 1000 }),
            withDelay(1500, withTiming(0, { duration: 500 }, (finished) => {
                if (finished) {
                    runOnJS(navigation.replace)('Home');
                }
            }))
        );
        scale.value = withTiming(1, { duration: 1000 });
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ scale: scale.value }],
        };
    });

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Animated.View style={[styles.content, animatedStyle]}>
                {/* We can use an image here if available, or just text for now */}
                <Text style={styles.logoText}>EMPREGOS<Text style={styles.logoHighlight}>YOYOTA</Text></Text>
                <Text style={styles.tagline}>Encontre o seu emprego ideal</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.secondary, // Black background as per design
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
    },
    logoText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.white,
        letterSpacing: 2,
    },
    logoHighlight: {
        color: COLORS.white, // Or primary if we want to highlight, but design showed white text
        fontWeight: '300',
    },
    tagline: {
        marginTop: SIZES.medium,
        color: COLORS.gray,
        fontSize: SIZES.medium,
        letterSpacing: 1,
    },
});

export default SplashScreen;
