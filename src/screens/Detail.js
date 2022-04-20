import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import Istatistics from "../components/Istatistics";
import StatusCoin from "../components/StatusCoin";
import Contacts from "../components/Contacts";

const Detail = ({ route }) => {
    const [loading, setLoading] = useState(true),
        data = route.params.data,
        { container, scrollContainer, indicatorContainer, header, image, title, subTitle, cardContainer } = styles;
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }, []);

    return (
        !loading ?
            <SafeAreaView style={container} >
                <ScrollView style={scrollContainer}>
                    <View style={header}>
                        <Image source={{ uri: data.icon }} style={image} />
                        <Text style={title}>{data.name}</Text>
                        <Text style={subTitle}>{data.symbol}</Text>
                    </View>
                    <View style={cardContainer}>
                        <View>
                            <Istatistics data={data} />
                            <StatusCoin
                                priceChange1h={data.priceChange1h}
                                priceChange1d={data.priceChange1d}
                                priceChange1w={data.priceChange1w}
                            />
                            <Contacts
                                twitter={data.twitterUrl}
                                icon={data.icon}
                                websiteUrl={data.websiteUrl}
                                name={data.name} />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            :
            <SafeAreaView style={indicatorContainer}><ActivityIndicator animating size="large" color="white" /></SafeAreaView>
    );
},
    styles = StyleSheet.create({
        container: { flex: 1, backgroundColor: "#021B2C" },
        indicatorContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#021B2C" },
        header: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
        image: { width: 80, height: 80 },
        title: { fontSize: 30, color: "white" },
        subTitle: { fontSize: 14, color: "#ccc" },
        scrollContainer: { flex: 1 },
        cardContainer: { flex: 3 }
    });

export default Detail;
