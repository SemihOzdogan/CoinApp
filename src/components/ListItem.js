import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { formatToCurrency } from "../util/util";

const ListItem = ({ name, symbol, price, icon, onPress, priceBtc }) => {
    const priceChangeColor = price > 0 ? '#34C759' : '#FF3B30',
        { container, leftContainer, image, titleContainer, title, subtitle, rightContainer } = styles;
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={container}>
                <View style={leftContainer}>
                    <Image source={{ uri: icon }} style={image} />
                    <View style={titleContainer}>
                        <Text style={title}>{name}</Text>
                        <Text style={subtitle}>{symbol.toUpperCase()}</Text>
                    </View>
                </View>

                <View style={rightContainer}>
                    <Text style={title}>${formatToCurrency(price)}</Text>
                    <Text style={[subtitle, { color: priceChangeColor }]}>{priceBtc.toFixed(2)}%</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
},
    styles = StyleSheet.create({
        container: { borderColor: "#bbb", paddingHorizontal: 16, paddingVertical: 10, marginTop: 2, flexDirection: "row", justifyContent: "space-between", backgroundColor: "#021B2C" },
        leftContainer: { flexDirection: "row", alignItems: 'center' },
        image: { height: 35, width: 35 },
        titleContainer: { marginLeft: 15 },
        title: { fontSize: 18, color: "white" },
        subtitle: { marginTop: 4, fontSize: 14, color: "#A9ABB1" },
        rightContainer: { alignItems: 'flex-end' }
    });

export default ListItem;

