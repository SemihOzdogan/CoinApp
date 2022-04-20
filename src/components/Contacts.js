import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Linking } from "react-native";

const Contacts = ({ twitter, websiteUrl, icon, name }) => {
    const { container, title, subContainer, pressContainer, imageContainer, text } = styles;
    return (
        <>
            <Text style={title}>Contacts</Text>
            <View style={container}>
                <View style={subContainer}>
                    <TouchableOpacity onPress={() => Linking.openURL(twitter)} style={pressContainer} >
                        <Image source={require("../img/twitter.png")} style={imageContainer} />
                        <Text style={text}>Twitter</Text>
                    </TouchableOpacity>
                </View>
                <View style={subContainer}>
                    <TouchableOpacity onPress={() => Linking.openURL(websiteUrl)} style={pressContainer} >
                        <Image source={{ uri: icon }} style={imageContainer} />
                        <Text style={text}>{name}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
},
    styles = StyleSheet.create({
        title: { fontSize: 18, color: "white", padding: 7, textAlign: "center", padding: 10 },
        container: { backgroundColor: "#042A46", marginTop: 2, padding: 10, flexDirection: "row" },
        subContainer: { flex: 1, alignItems: 'center', justifyContent: "center" },
        pressContainer: { flexDirection: "row", alignItems: "center" },
        imageContainer: { width: 50, height: 50 },
        text: { fontSize: 16, color: "white", marginLeft: 10 }
    });

export default Contacts;

