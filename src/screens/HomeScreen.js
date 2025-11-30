import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TextInput,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Dimensions,
    Platform,
    Alert,
    BackHandler
} from 'react-native';
import { COLORS, SIZES } from '../constants/theme';
import { fetchJobs } from '../api/jobs';
import JobCard from '../components/JobCard';
import { Search, MapPin, LogOut, Info } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const CATEGORIES = [
    "Todos",
    "Admininistração e Gestão", "Administrativo e Secretariado", "Agropecuária e Pesca",
    "Alimentação e Nutrição", "Ambiente", "Arquitectura", "Atendimento ao Cliente",
    "Auditoria", "Aviação", "Banca e Seguros", "Beleza", "Comercial", "Comunicação Social",
    "Concurso Público", "Construção Civil", "Consultoria", "Contabilidade", "Costura",
    "Cozinha", "Culinária", "Design", "Desportos", "Economia", "Educação e Ensino",
    "Electricidade", "Engenharia", "Estágio", "Estética", "Farmácia", "Finanças",
    "Fotografia e Vídeo", "Freelancer", "Hotelaria e Turismo", "Informática e Tecnologias",
    "Jurídico", "Línguas", "Logística", "Marketing Digital", "Marketing e Publicidade",
    "Mecánica", "Medicina", "Petrolífero", "Recursos Humanos", "Transportes"
];

const HomeScreen = ({ navigation }) => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    // Filters
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("Todos");
    const [locationQuery, setLocationQuery] = useState('');

    const loadJobs = async (pageNum = 1, shouldRefresh = false) => {
        if (loading) return;
        setLoading(true);
        try {
            const data = await fetchJobs(pageNum);
            const newJobs = data.data.data;

            if (shouldRefresh) {
                setJobs(newJobs);
            } else {
                setJobs(prev => [...prev, ...newJobs]);
            }

            setHasMore(!!data.data.next_page_url);
            setPage(pageNum);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadJobs();
    }, []);

    // Filter Logic
    useEffect(() => {
        let result = jobs;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(job =>
                job.title.toLowerCase().includes(query) ||
                job.company.toLowerCase().includes(query)
            );
        }

        if (locationQuery) {
            const query = locationQuery.toLowerCase();
            result = result.filter(job =>
                job.province && job.province.toLowerCase().includes(query)
            );
        }

        if (selectedCategory !== "Todos") {
            result = result.filter(job =>
                job.categories && job.categories.some(cat => cat.name === selectedCategory)
            );
        }

        setFilteredJobs(result);
    }, [jobs, searchQuery, selectedCategory, locationQuery]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadJobs(1, true);
    }, []);

    const loadMore = () => {
        if (hasMore && !loading) {
            loadJobs(page + 1);
        }
    };

    const handleExit = () => {
        Alert.alert(
            "Sair do Aplicativo",
            "Tem a certeza que deseja sair?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sair",
                    onPress: () => BackHandler.exitApp()
                }
            ]
        );
    };

    const renderHeader = () => (
        <View>
            {/* Dark Header Background */}
            <View style={styles.darkHeader}>
                <View style={styles.topBar}>
                    <View>
                        <Text style={styles.greeting}>Olá, Bem-vindo 👋</Text>
                        <Text style={styles.headerTitle}>Encontre o seu{'\n'}emprego ideal</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('About')}>
                            <Info size={24} color={COLORS.white} />
                        </TouchableOpacity>
                        {Platform.OS === 'android' && (
                            <TouchableOpacity style={styles.iconButton} onPress={handleExit}>
                                <LogOut size={24} color={COLORS.white} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>

            {/* Floating Search Box */}
            <View style={styles.floatingSearchContainer}>
                <View style={styles.inputRow}>
                    <Search size={20} color={COLORS.textLight} />
                    <TextInput
                        style={styles.input}
                        placeholder="Pesquisar cargo..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor={COLORS.textLight}
                    />
                </View>
                <View style={styles.divider} />
                <View style={styles.inputRow}>
                    <MapPin size={20} color={COLORS.textLight} />
                    <TextInput
                        style={styles.input}
                        placeholder="Localização..."
                        value={locationQuery}
                        onChangeText={setLocationQuery}
                        placeholderTextColor={COLORS.textLight}
                    />
                </View>

                <TouchableOpacity style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>Pesquisar Vaga</Text>
                </TouchableOpacity>
            </View>

            {/* Categories */}
            <View style={styles.categoriesContainer}>
                <Text style={styles.sectionTitle}>Categorias</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContent}>
                    {CATEGORIES.map((cat, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.categoryChip,
                                selectedCategory === cat && styles.categoryChipSelected
                            ]}
                            onPress={() => setSelectedCategory(cat)}
                        >
                            <Text style={[
                                styles.categoryText,
                                selectedCategory === cat && styles.categoryTextSelected
                            ]}>
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <View style={styles.listHeader}>
                <Text style={styles.sectionTitle}>Vagas disponíveis</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <FlatList
                data={filteredJobs}
                renderItem={({ item }) => (
                    <JobCard
                        job={item}
                        onPress={() => navigation.navigate('JobDetails', { job: item })}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={renderHeader}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.primary]} tintColor={COLORS.white} />
                }
                ListFooterComponent={loading && <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />}
                ListEmptyComponent={!loading && (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Nenhuma vaga encontrada.</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    darkHeader: {
        backgroundColor: '#000000', // Black header
        paddingTop: Platform.OS === 'android' ? 50 : 60,
        paddingHorizontal: SIZES.medium,
        paddingBottom: 80, // Space for floating box
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    greeting: {
        color: COLORS.gray,
        fontSize: SIZES.font,
        marginBottom: SIZES.base,
    },
    headerTitle: {
        color: COLORS.white,
        fontSize: 28,
        fontWeight: 'bold',
        lineHeight: 36,
    },
    iconButton: {
        padding: 8,
    },
    floatingSearchContainer: {
        backgroundColor: COLORS.white,
        marginHorizontal: SIZES.medium,
        marginTop: -60, // Overlap
        borderRadius: SIZES.medium,
        padding: SIZES.medium,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SIZES.small,
    },
    input: {
        flex: 1,
        marginLeft: SIZES.small,
        fontSize: SIZES.medium,
        color: COLORS.text,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.lightGray,
        marginVertical: 4,
    },
    searchButton: {
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.small,
        paddingVertical: SIZES.medium,
        alignItems: 'center',
        marginTop: SIZES.small,
    },
    searchButtonText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: SIZES.medium,
    },
    categoriesContainer: {
        marginTop: SIZES.large,
    },
    categoriesContent: {
        paddingHorizontal: SIZES.medium,
    },
    categoryChip: {
        paddingHorizontal: SIZES.medium,
        paddingVertical: 8,
        backgroundColor: COLORS.white,
        borderRadius: 8,
        marginRight: SIZES.small,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
    },
    categoryChipSelected: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    categoryText: {
        fontSize: SIZES.font,
        color: COLORS.textLight,
    },
    categoryTextSelected: {
        color: COLORS.white,
        fontWeight: '600',
    },
    listHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SIZES.medium,
        marginTop: SIZES.large,
        marginBottom: SIZES.small,
    },
    sectionTitle: {
        fontSize: SIZES.large,
        fontWeight: 'bold',
        color: COLORS.text,
        marginLeft: SIZES.medium,
    },
    seeAll: {
        color: COLORS.primary, // Or blue if preferred
        fontSize: SIZES.font,
    },
    listContent: {
        paddingBottom: SIZES.xxLarge,
    },
    loader: {
        marginVertical: SIZES.medium,
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: SIZES.xxLarge,
    },
    emptyText: {
        color: COLORS.textLight,
        fontSize: SIZES.medium,
    }
});

export default HomeScreen;
