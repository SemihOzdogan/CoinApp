import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View, SafeAreaView, ActivityIndicator, TextInput, TouchableOpacity } from "react-native";
import ListItem from "../../src/components/ListItem"
import Icon from "react-native-vector-icons/FontAwesome";
import SplashScreen from "react-native-splash-screen";
import { connect } from "react-redux";
import { getCoins } from "../redux/actions";

function Coins(props) {

    const
        [skip, setSkip] = useState(0),
        [loading, setLoading] = useState(false),
        [loadPage, setLoadPage] = useState(true),
        [text, setText] = useState(""),
        { container, indicatorContainer, footerContainer, headerContainer, headerSubContainer, headerIconContainer, hedaerBtnContainer, textInput, icon } = styles,

        loadMore = () => {
            setSkip(skip + 1)
        },

        renderFooter = () => {
            if (loading) return null;
            return (
                <View style={footerContainer}>
                    <ActivityIndicator animating size="large" color="white" />
                </View>
            );
        },

        searchFilterFunction = (text) => {
            setText(text)
            console.log(text);
        },

        sortList = () => {
            console.log("sorting");
        };

    useEffect(() => {
        SplashScreen.hide();
        setTimeout(() => {
            setLoadPage(false)
        }, 1000);
        props.getCoins(skip)
    }, [skip])

    return (
        !loadPage ?
            <SafeAreaView style={container}>
                <FlatList
                    data={props.data}
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
                                <TouchableOpacity onPress={sortList} style={hedaerBtnContainer}>
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
                            onPress={() => props.navigation.navigate("Detail", {
                                data: item
                            })}
                        />
                    }
                />
            </SafeAreaView >
            : <SafeAreaView style={indicatorContainer}><ActivityIndicator animating size="large" color="white" /></SafeAreaView>

    );
}

const mapStateToProps = (state) => ({
    data: state.data,
}),
    mapDispatchToProps = { getCoins },

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
        textInput: { color: "white" },
        icon: { color: "#ccc" }
    });

export default connect(mapStateToProps, mapDispatchToProps)(Coins);

