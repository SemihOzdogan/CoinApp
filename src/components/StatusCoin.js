import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { statusControl, statusColorControl } from "../util/util";

const StatusCoin = ({ priceChange1h, priceChange1d, priceChange1w }) => {
    const { container, title, subContainer, text } = styles;
    return (
        <>
            <Text style={title}>Coin Status</Text>
            <View style={container}>
                <View style={subContainer}>
                    <Text style={text}>1 HOUR</Text>
                    <Text style={{ fontSize: 16, color: statusColorControl(priceChange1h) }}>{statusControl(priceChange1h)}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                    <Text style={text}>1 DAY</Text>
                    <Text style={{ fontSize: 16, color: statusColorControl(priceChange1d) }}>{statusControl(priceChange1d)}</Text>
                </View>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
                    <Text style={text}>1 WEEK</Text>
                    <Text style={{ fontSize: 16, color: statusColorControl(priceChange1w) }}>{statusControl(priceChange1w)}</Text>
                </View>
            </View>
        </>
    )
},
    styles = StyleSheet.create({
        container: { backgroundColor: "#042A46", flexDirection: "row", marginTop: 2, padding: 10, marginHorizontal: 5, borderWidth: 1, borderRadius: 8, borderColor: "#ccc" },
        subContainer: { flex: 1, alignItems: 'center', justifyContent: "center" },
        text: { fontSize: 22, color: "white" },
        title: { fontSize: 18, color: "white", padding: 7 }
    });

export default StatusCoin;