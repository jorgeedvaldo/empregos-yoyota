import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants/theme';
import { MapPin, Clock, Briefcase } from 'lucide-react-native';
import { formatDistanceToNow } from 'date-fns';
import { pt } from 'date-fns/locale';

const JobCard = ({ job, onPress }) => {
    const timeAgo = job.created_at
        ? formatDistanceToNow(new Date(job.created_at), { addSuffix: true, locale: pt })
        : '';

    // Handle image URL - ensure it's a full URL if relative
    const imageUrl = job.photo && job.photo.startsWith('http')
        ? job.photo
        : `https://ao.empregosyoyota.net/storage/${job.photo}`;

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.header}>
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.logo}
                    resizeMode="cover"
                />
                <View style={styles.headerContent}>
                    <Text style={styles.title} numberOfLines={2}>{job.title}</Text>
                    <Text style={styles.company} numberOfLines={1}>{job.company}</Text>
                </View>
            </View>

            <View style={styles.details}>
                <View style={styles.detailItem}>
                    <MapPin size={14} color={COLORS.textLight} />
                    <Text style={styles.detailText} numberOfLines={1}>{job.province}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Clock size={14} color={COLORS.textLight} />
                    <Text style={styles.detailText}>{timeAgo}</Text>
                </View>
            </View>

            <View style={styles.footer}>
                {job.categories && job.categories.slice(0, 2).map((cat) => (
                    <View key={cat.id} style={styles.badge}>
                        <Text style={styles.badgeText}>{cat.name}</Text>
                    </View>
                ))}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.white,
        borderRadius: 16, // More rounded
        padding: SIZES.medium,
        marginBottom: SIZES.medium,
        marginHorizontal: SIZES.medium, // Add horizontal margin so it's not glued
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 0, // Remove border for cleaner look
    },
    header: {
        flexDirection: 'row',
        marginBottom: SIZES.small,
    },
    logo: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: COLORS.gray,
    },
    headerContent: {
        flex: 1,
        marginLeft: SIZES.small,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    company: {
        fontSize: 14,
        color: COLORS.textLight,
    },
    details: {
        flexDirection: 'row',
        marginBottom: SIZES.small,
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: SIZES.medium,
        marginBottom: 4,
    },
    detailText: {
        fontSize: 12,
        color: COLORS.textLight,
        marginLeft: 4,
    },
    footer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    badge: {
        backgroundColor: COLORS.background,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
        marginRight: 8,
        marginBottom: 4,
    },
    badgeText: {
        fontSize: 10,
        color: COLORS.mediumGray,
        fontWeight: '500',
    },
});

export default memo(JobCard);
