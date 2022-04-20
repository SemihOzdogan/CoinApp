import React from "react";
import { Text, StyleSheet } from "react-native";
import IstatisticItem from "../components/IstatisticItem";
import { formatToCurrency } from "../util/util";

const Istatistics = ({ data }) => {
    return (
        <>
            <Text style={styles.text}>Coin Istatistics</Text>
            <IstatisticItem title="Rank" value={data.rank} />
            <IstatisticItem title="Market Cap" value={"$ " + formatToCurrency(data.marketCap)} />
            <IstatisticItem title="Price" value={"$ " + formatToCurrency(data.price)} />
            <IstatisticItem title="Supply" value={"$ " + formatToCurrency(data.totalSupply)} />
            <IstatisticItem title="Available Supply" value={"$ " + formatToCurrency(data.availableSupply)} />
            <IstatisticItem title="Volume" value={"$ " + formatToCurrency(data.volume)} />
        </>
    )
},
    styles = StyleSheet.create({
        text: { fontSize: 18, color: "white", padding: 7 }
    });

export default Istatistics;