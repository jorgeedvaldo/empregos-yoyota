import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Linking,
    Image,
    Dimensions,
    Share,
    Platform
} from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants/theme';
import { MapPin, Clock, Briefcase, Share2, ArrowLeft, ExternalLink } from 'lucide-react-native';
import RenderHtml from 'react-native-render-html';
import { formatDistanceToNow } from 'date-fns';
import { pt } from 'date-fns/locale';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const JobDetailsScreen = ({ route, navigation }) => {
    const { job } = route.params;

    const timeAgo = job.created_at
        ? formatDistanceToNow(new Date(job.created_at), { addSuffix: true, locale: pt })
        : '';

    const imageUrl = job.photo && job.photo.startsWith('http')
        ? job.photo
        : `https://ao.empregosyoyota.net/storage/${job.photo}`;

    const handleApply = () => {
        if (job.email_or_link) {
            if (job.email_or_link.includes('@')) {
                Linking.openURL(`mailto:${job.email_or_link}`);
            } else {
                let url = job.email_or_link;
                if (!url.startsWith('http')) {
                    url = `https://${url}`;
                }
                Linking.openURL(url);
            }
        }
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Confira esta vaga de ${job.title} na ${job.company}: https://ao.empregosyoyota.net/job/${job.slug}`,
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    const tagsStyles = {
        p: {
            fontSize: 15,
            color: COLORS.text,
            lineHeight: 24,
            marginBottom: SIZES.small,
        },
        h2: {
            fontSize: 18,
            fontWeight: 'bold',
            color: COLORS.text,
            marginTop: SIZES.medium,
            marginBottom: SIZES.small,
        },
        h3: {
            fontSize: 16,
            fontWeight: 'bold',
            color: COLORS.text,
            marginTop: SIZES.small,
            marginBottom: SIZES.small,
        },
        li: {
            fontSize: 15,
            color: COLORS.text,
            marginBottom: 4,
        },
        a: {
            color: COLORS.accent, // Use accent color for links
            textDecorationLine: 'underline',
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Dark Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                    <ArrowLeft size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Detalhes</Text>
                <TouchableOpacity onPress={handleShare} style={styles.iconButton}>
                    <Share2 size={24} color={COLORS.white} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Job Header Info */}
                <View style={styles.jobHeader}>
                    <Image source={{ uri: imageUrl }} style={styles.logo} resizeMode="cover" />
                    <Text style={styles.title}>{job.title}</Text>
                    <Text style={styles.company}>{job.company}</Text>

                    <View style={styles.metaContainer}>
                        <View style={styles.metaItem}>
                            <MapPin size={16} color={COLORS.textLight} />
                            <Text style={styles.metaText}>{job.province}</Text>
                        </View>
                        <View style={styles.metaItem}>
                            <Clock size={16} color={COLORS.textLight} />
                            <Text style={styles.metaText}>{timeAgo}</Text>
                        </View>
                    </View>

                    <View style={styles.categories}>
                        {job.categories && job.categories.map((cat) => (
                            <View key={cat.id} style={styles.badge}>
                                <Text style={styles.badgeText}>{cat.name}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.divider} />

                {/* Description */}
                <View style={styles.descriptionContainer}>
                    <Text style={styles.sectionTitle}>Descrição da Vaga</Text>
                    <RenderHtml
                        contentWidth={width - SIZES.medium * 2}
                        source={{ html: job.description }}
                        tagsStyles={tagsStyles}
                        baseStyle={{ color: COLORS.text }}
                    />
                </View>
            </ScrollView>

            {/* Footer Action */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                    <Text style={styles.applyButtonText}>Candidatar-se Agora</Text>
                    <ExternalLink size={20} color={COLORS.white} style={{ marginLeft: SIZES.small }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Platform.OS === 'android' ? 50 : 60,
        paddingHorizontal: SIZES.medium,
        paddingBottom: SIZES.medium,
        backgroundColor: '#000000', // Dark header
    },
    headerTitle: {
        fontSize: SIZES.large,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    iconButton: {
        padding: 8,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    jobHeader: {
        alignItems: 'center',
        padding: SIZES.large,
        backgroundColor: COLORS.white,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        marginBottom: SIZES.medium,
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 20,
        marginBottom: SIZES.medium,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.text,
        textAlign: 'center',
        marginBottom: 8,
    },
    company: {
        fontSize: 16,
        color: COLORS.textLight,
        marginBottom: SIZES.medium,
    },
    metaContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: SIZES.medium,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: SIZES.small,
    },
    metaText: {
        marginLeft: 4,
        color: COLORS.textLight,
        fontSize: 14,
    },
    categories: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    badge: {
        backgroundColor: COLORS.background,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        margin: 4,
    },
    badgeText: {
        fontSize: 12,
        color: COLORS.mediumGray,
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.lightGray,
        marginHorizontal: SIZES.large,
        opacity: 0.5,
    },
    descriptionContainer: {
        padding: SIZES.large,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SIZES.medium,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.white,
        padding: SIZES.large,
        borderTopWidth: 1,
        borderTopColor: COLORS.lightGray,
        paddingBottom: Platform.OS === 'ios' ? 34 : SIZES.large,
    },
    applyButton: {
        backgroundColor: COLORS.primary, // Black
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 16,
    },
    applyButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default JobDetailsScreen;
