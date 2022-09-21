import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View, SafeAreaView, ActivityIndicator, TextInput, TouchableOpacity, Text } from "react-native";
import ListItem from "../../src/components/ListItem"
import Icon from "react-native-vector-icons/FontAwesome";
import SplashScreen from "react-native-splash-screen";
import { connect } from "react-redux";
import { getCoins } from "../redux/actions";

function Coins({ getCoins, navigation }) {

    const
        [skip, setSkip] = useState(0),
        [loading, setLoading] = useState(false),
        [loadPage, setLoadPage] = useState(true),
        [data, setData] = useState([]),
        [newData, setNewData] = useState([]),
        [dataNotFound, setDataNotFound] = useState(true),
        [text, setText] = useState(""),
        { container, indicatorContainer, footerContainer, headerContainer, headerSubContainer, headerIconContainer, hedaerBtnContainer, textInput, icon, notFound, txt } = styles,

        loadMore = () => {
            setSkip(skip + 1)
        },

        renderFooter = () => {
            if (loading) return null;
            return (
                <View style={footerContainer}>
                    <ActivityIndicator animating size="large" color="red" />
                </View>
            );
        },

        searchFilterFunction = (text) => {
            if (text.length >= 3) {
                const newData = data.filter(item => {
                    const itemData = item.name
                        ? item.name.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
                setDataNotFound(newData.length === 0 ? false : true);
                setNewData(newData);
                setText(text);
                setLoading(true)
            }
            else {
                setDataNotFound(true)
                setLoading(false)
                setNewData(data);
                setText(text);
            }
        },

        sortList = () => {
            const sortedData = [...newData].sort((a, b) => {
                return a.name > b.name;
            })
            setNewData(sortedData)
        };
    useEffect(() => {
        SplashScreen.hide();
        setTimeout(() => {
            setLoadPage(false)
        }, 1000);
        getCoins(skip, response => {
            setData([...data, ...response]);
            setNewData([...newData, ...response]);
        })
    }, [skip])

    return (
        !loadPage ?
            <SafeAreaView style={container}>
                <FlatList
                    data={newData}
                    keyExtractor={(item, index) => index}
                    onEndReached={loadMore}
                    ListFooterComponent={renderFooter}
                    ListHeaderComponent={
                        <View style={headerContainer}>
                            <View style={headerSubContainer}>
                                <TextInput
                                    value={text}
                                    onChangeText={val => searchFilterFunction(val)}
                                    placeholder="Search"
                                    placeholderTextColor="white"
                                    style={textInput}
                                />
                            </View>
                            <View style={headerIconContainer}>
                                <TouchableOpacity onPress={() => sortList()} style={hedaerBtnContainer}>
                                    <Icon name="sort" size={25} style={icon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                    renderItem={({ item }) =>
                        <ListItem
                            name={item.name}
                            symbol={item.symbol}
                            price={item.price}
                            priceBtc={item.priceBtc}
                            icon={item.icon}
                            onPress={() => navigation.navigate("Detail", {
                                data: item
                            })}
                        />

                    }
                />
                {!dataNotFound && (
                    <View style={notFound}>
                        <Text style={txt}>Kullanıcı Bulunamadı</Text>
                    </View>
                )}
            </SafeAreaView >
            : <SafeAreaView style={indicatorContainer}><ActivityIndicator animating size="large" color="white" /></SafeAreaView>

    );
}

const mapStateToProps = (state) => ({
    data: state.data,
}),
    mapDispatchToProps = { getCoins: (skip, callback) => getCoins(skip, callback) },

    styles = StyleSheet.create({
        container: { flex: 1, backgroundColor: "#2C3E50" },
        titleWrapper: { marginTop: 20, paddingHorizontal: 16 },
        largeTitle: { fontSize: 24, fontWeight: "bold" },
        divider: { height: StyleSheet.hairlineWidth, backgroundColor: "#A9ABB1", marginHorizontal: 16, marginTop: 16 },
        indicatorContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#021B2C" },
        footerContainer: { backgroundColor: "#021B2C", paddingVertical: 10, borderTopWidth: 1, borderColor: "#2C3E50" },
        headerContainer: { padding: 5, paddingBottom: 3, height: 50, backgroundColor: "#2C3E50", flexDirection: "row" },
        headerSubContainer: { flex: 5, backgroundColor: "#021B2C", borderRadius: 4, borderColor: "#aaa", borderWidth: 1 },
        headerIconContainer: { flex: 1, alignItems: "center", justifyContent: "center" },
        hedaerBtnContainer: { backgroundColor: "#021B2C", width: 50, padding: 10, borderRadius: 4, alignItems: "center" },
        textInput: { color: "white", justifyContent: "center", alignItems: "center", flex: 1, marginLeft: 10 },
        icon: { color: "#ccc" },
        notFound: { width: "100%", height: "100%", justifyContent: "center", alignItems: "center", position: "absolute" },
        txt: { color: "white" }
    });

export default connect(mapStateToProps, mapDispatchToProps)(Coins);

