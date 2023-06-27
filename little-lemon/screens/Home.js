import React, {
    useState,
    useEffect,
    useCallback,
    useMemo
} from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
} from 'react-native';
import { Searchbar } from "react-native-paper";
import debounce from "lodash.debounce";
import Header from './components/Header';
import Hero from './components/Hero';
import Filters from './components/Filters';
import { useUpdateEffect } from '../utils';
import {
    createTable,
    getMenuItems,
    saveMenuItems,
    filterByQueryAndCategories,
} from '../database';

const API_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
const sections = ['Starters', 'Mains', 'Desserts', 'Drinks'];

const Item = ({ item }) => (
    <View style={styles.itemContainer}>
        <View style={styles.textContainer}>
            <Text style={styles.titleText}>{item.name}</Text>
            <Text style={styles.descriptionText} numberOfLines={2}>
                {item.description}
            </Text>
            <Text style={styles.priceText}>${item.price}</Text>
        </View>
        <Image
            source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true` }}
            style={styles.image}
        />
    </View>
);

const Home = () => {
    const [data, setData] = useState([]);
    const [filterSelections, setFilterSelections] = useState(sections.map(() => true));
    const [searchBarText, setSearchBarText] = useState("");
    const [query, setQuery] = useState('');

    const fetchData = async () => {
        try {
            const response = await fetch(API_URL);
            const json = await response.json();
            return json.menu;
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                await createTable();
                let menuItems = await getMenuItems();

                if (!menuItems.length) {
                    menuItems = await fetchData();
                    saveMenuItems(menuItems);
                }

                setData(menuItems);
            } catch (e) {
                Alert.alert(e.message);
            }
        })();
    }, []);

    useUpdateEffect(() => {
        (async () => {
            const activeCategories = sections.filter((s, i) => filterSelections[i]);
            try {
                const menuItems = await filterByQueryAndCategories(
                    query,
                    activeCategories
                );
                setData(menuItems);
            } catch (e) {
                Alert.alert(e.message);
            }
        })();
    }, [filterSelections, query]);

    const handleFiltersChange = async (index) => {
        const arrayCopy = [...filterSelections];
        arrayCopy[index] = !filterSelections[index];
        setFilterSelections(arrayCopy);
    };

    const lookup = useCallback((q) => {
        setQuery(q);
    }, []);

    const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

    const handleSearchChange = (text) => {
        setSearchBarText(text);
        debouncedLookup(text);
    };

    return (
        <View>
            <Header showAvatar={true} />
            <Hero />
            <View style={styles.hero}>
                <Searchbar
                    placeholder="Search"
                    placeholderTextColor="rgba(0, 0, 0, 0.5)"
                    iconColor="#333333"
                    inputStyle={{ color: "#333333" }}
                    style={styles.searchBar}
                    onChangeText={handleSearchChange}
                    value={searchBarText}
                />
            </View>
            <Filters
                selections={filterSelections}
                onChange={handleFiltersChange}
                sections={sections}
            />
            <FlatList
                data={data}
                keyExtractor={item => item.name}
                renderItem={Item}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    hero: {
        backgroundColor: '#495E57',
    },
    searchBar: {
        marginBottom: 10,
        marginHorizontal: 10,
        backgroundColor: "#EDEFEE",
        borderRadius: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
    textContainer: {
        flex: 1,
        marginRight: 10,
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    descriptionText: {
        fontSize: 14,
        color: 'gray',
        marginVertical: 5,
    },
    priceText: {
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.8)',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 5,
    },
});

export default Home;