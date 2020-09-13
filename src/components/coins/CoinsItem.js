import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import Colors from '../../res/colors';

const CoinsItem = ({ item, onPress }) => {
    getImageArrow = () => {
        if(item.percent_change_1h > 0) {
            return require("cryptoTracker/src/assets/arrow_up.png")
        } else {
            return require("cryptoTracker/src/assets/arrow_down.png")
        }
    }

    return (
        <Pressable 
            style={Styles.container}
            onPress={onPress}
        >
            <View style={Styles.row}>
                <Text style={[Styles.textDefault, Styles.symbolText]}>
                    {item.symbol}
                </Text>
                <Text style={[Styles.textDefault, Styles.nameText]}>
                    {item.name}
                </Text>
                <Text style={[Styles.textDefault, Styles.priceText]}>
                    {item.price_usd} $
                </Text>
            </View>

            <View style={Styles.row}>
                <Text style={[Styles.textDefault, Styles.percentText]}>
                    {item.percent_change_1h} %
                </Text>
                <Image 
                    style={Styles.imageIcon}
                    source={getImageArrow()} 
                />
            </View>
        </Pressable>
    );
}

const Styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomColor: Colors.zircon,
        borderBottomWidth: 1
    },
    row: {
        flexDirection: 'row',
    },
    textDefault: {
        color: Colors.white,
    },
    symbolText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 12,
    },
    nameText: {
        fontSize: 14,
        marginRight: 16,
    },
    priceText: {
        fontSize: 14,
    },
    percentText: {
        fontSize: 12,
        marginRight: 8
    },
    imageIcon: {
        width: 16,
        height: 16
    }
});

export default CoinsItem;