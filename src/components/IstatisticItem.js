import React from "react";
import { View, Text, StyleSheet } from "react-native";

const IstatisticItem = ({ title, value }) => {
    const { container, leftContainer, rightContainer, text } = styles;
    return (
        <View style={container}>
            <View style={leftContainer}>
                <Text style={text}>{title}</Text>
            </View>
            <View style={rightContainer}>
                <Text style={text}>{value}</Text>
            </View>
        </View>
    )
},
    styles = StyleSheet.create({
        container: { backgroundColor: "#042A46", flexDirection: "row", marginTop: 2, padding: 3 },
        leftContainer: { flex: 1, marginLeft: 5 },
        rightContainer: { flex: 1, alignItems: "flex-end", marginRight: 5 },
        text: { fontSize: 16, fontWeight: "300", color: "white" }
    });
    
export default IstatisticItem;

