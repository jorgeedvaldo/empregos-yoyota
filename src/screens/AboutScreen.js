import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Linking,
    Platform
} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { Ionicons, Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const AboutScreen = ({ navigation }) => {
    const handleLink = (url) => {
        Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
    };

    const renderSocialIcon = (icon, url) => (
        <TouchableOpacity onPress={() => handleLink(url)} style={styles.socialIcon}>
            <Feather name={icon} size={20} color={COLORS.primary} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Sobre Nós</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Mission Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Nossa Missão</Text>
                    <Text style={styles.text}>
                        Democratizar o acesso ao emprego em Angola, conectando talentos às melhores oportunidades através de uma plataforma inovadora, eficiente e acessível. Desde 2018, trabalhamos para que cada pessoa tenha a chance de encontrar o emprego dos seus sonhos.
                    </Text>
                </View>

                {/* What is Empregos Yoyota */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>O que é a Empregos Yoyota?</Text>
                    <Text style={styles.text}>
                        É uma plataforma que reúne oportunidades de emprego no solo angolano, tendo como fonte principal o "Jornal de Angola". A Empregos Yoyota tem ajudado muita gente a encontrar empregos no solo angolano.
                    </Text>
                    <View style={styles.highlightBox}>
                        <Text style={styles.highlightTitle}>Criada aos 5 de Dezembro de 2018</Text>
                        <Text style={styles.highlightText}>
                            Desde então, temos sido uma ponte confiável entre candidatos e empregadores, facilitando milhares de conexões profissionais em Angola.
                        </Text>
                    </View>
                </View>

                {/* Services */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Nossos Serviços</Text>

                    <View style={styles.serviceItem}>
                        <View style={styles.serviceIconContainer}>
                            <Feather name="mouse-pointer" size={24} color={COLORS.white} />
                        </View>
                        <View style={styles.serviceContent}>
                            <Text style={styles.serviceTitle}>Faça sua candidatura num clique</Text>
                            <Text style={styles.text}>
                                Neste portal, além de você encontrar informações sobre vagas de emprego, também é possível candidatar-se às vagas via e-mail. Com um clique nós enviamos a sua candidatura ao e-mail do empregador.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.serviceItem}>
                        <View style={[styles.serviceIconContainer, { backgroundColor: '#4ECDC4' }]}>
                            <Feather name="file-text" size={24} color={COLORS.white} />
                        </View>
                        <View style={styles.serviceContent}>
                            <Text style={styles.serviceTitle}>Peça-nos um currículo moderno</Text>
                            <Text style={styles.text}>
                                Sabemos a importância de ter um currículo moderno e atualizado, nós ajudamos você a ter um currículo que se destaque dos demais candidatos, e assim, tendo muita chance para ser escolhido/a na vaga.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.serviceItem}>
                        <View style={[styles.serviceIconContainer, { backgroundColor: '#FF6B6B' }]}>
                            <Feather name="trending-up" size={24} color={COLORS.white} />
                        </View>
                        <View style={styles.serviceContent}>
                            <Text style={styles.serviceTitle}>Publicite aqui o seu negócio ou serviço</Text>
                            <Text style={styles.text}>
                                Nós também ajudamos a divulgar o seu negócio ou serviço na nossa plataforma, fale connosco! Chegue a mais pessoas e expanda o seu negócio através da nossa rede.
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Team */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Nossa Equipe</Text>
                    <Text style={[styles.text, { marginBottom: SIZES.medium }]}>
                        Conheça as pessoas por trás do Empregos Yoyota, dedicadas a transformar o mercado de trabalho em Angola.
                    </Text>

                    {/* Edivaldo */}
                    <View style={styles.teamMember}>
                        <View style={styles.avatarContainer}>
                            <Text style={styles.avatarText}>EJ</Text>
                        </View>
                        <View style={styles.memberInfo}>
                            <Text style={styles.memberName}>Edivaldo Jorge</Text>
                            <Text style={styles.memberRole}>CEO & Fundador</Text>
                            <Text style={styles.memberBio}>
                                Visionário e empreendedor, Edivaldo lidera a estratégia e visão do Empregos Yoyota. Com vasta experiência em tecnologia e recursos humanos, ele é responsável por guiar a empresa rumo ao futuro do recrutamento em Angola.
                            </Text>
                            <View style={styles.socialLinks}>
                                {renderSocialIcon('instagram', 'http://instagram.com/jorgeedvaldo')}
                                {renderSocialIcon('github', 'http://github.com/jorgeedvaldo')}
                                {renderSocialIcon('linkedin', 'http://linkedin.com/in/jorgeedvaldo')}
                            </View>
                        </View>
                    </View>

                    {/* Gelson */}
                    <View style={styles.teamMember}>
                        <View style={[styles.avatarContainer, { backgroundColor: '#4ECDC4' }]}>
                            <Text style={styles.avatarText}>GS</Text>
                        </View>
                        <View style={styles.memberInfo}>
                            <Text style={styles.memberName}>Gelson Somano</Text>
                            <Text style={styles.memberRole}>Gestor de Conteúdos</Text>
                            <Text style={styles.memberBio}>
                                Especialista em comunicação e marketing digital, Gelson é responsável por toda a estratégia de conteúdo da plataforma. Ele garante que as informações sejam relevantes, atualizadas e úteis para nossa comunidade de usuários.
                            </Text>
                            <View style={styles.socialLinks}>
                                {renderSocialIcon('linkedin', 'https://www.linkedin.com/in/gelson-somano-44a130293/')}
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.copyright}>© 2025 Empregos Yoyota. Todos os direitos reservados.</Text>
                </View>
            </ScrollView>
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
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: Platform.OS === 'android' ? 50 : 60,
        paddingHorizontal: SIZES.medium,
        paddingBottom: SIZES.medium,
        backgroundColor: '#000000', // Dark header
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: SIZES.large,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    scrollContent: {
        padding: SIZES.medium,
        paddingBottom: SIZES.xxLarge,
    },
    section: {
        marginBottom: SIZES.xxLarge,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SIZES.medium,
    },
    text: {
        fontSize: SIZES.font,
        color: COLORS.textLight,
        lineHeight: 24,
    },
    highlightBox: {
        backgroundColor: COLORS.white,
        padding: SIZES.medium,
        borderRadius: SIZES.medium,
        marginTop: SIZES.medium,
        borderLeftWidth: 4,
        borderLeftColor: COLORS.primary,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    highlightTitle: {
        fontSize: SIZES.medium,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SIZES.small,
    },
    highlightText: {
        fontSize: SIZES.font,
        color: COLORS.textLight,
        lineHeight: 22,
    },
    serviceItem: {
        flexDirection: 'row',
        marginBottom: SIZES.large,
        backgroundColor: COLORS.white,
        padding: SIZES.medium,
        borderRadius: SIZES.medium,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    serviceIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SIZES.medium,
    },
    serviceContent: {
        flex: 1,
    },
    serviceTitle: {
        fontSize: SIZES.medium,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SIZES.small,
    },
    teamMember: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.medium,
        padding: SIZES.medium,
        marginBottom: SIZES.large,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    avatarContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SIZES.medium,
    },
    avatarText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    memberInfo: {
        flex: 1,
    },
    memberName: {
        fontSize: SIZES.large,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    memberRole: {
        fontSize: SIZES.font,
        color: COLORS.primary,
        fontWeight: '600',
        marginBottom: SIZES.small,
    },
    memberBio: {
        fontSize: SIZES.font,
        color: COLORS.textLight,
        lineHeight: 22,
        marginBottom: SIZES.medium,
    },
    socialLinks: {
        flexDirection: 'row',
        gap: SIZES.medium,
    },
    socialIcon: {
        padding: 8,
        backgroundColor: COLORS.background,
        borderRadius: 20,
    },
    footer: {
        alignItems: 'center',
        marginTop: SIZES.large,
    },
    copyright: {
        fontSize: SIZES.small,
        color: COLORS.gray,
    }
});

export default AboutScreen;
