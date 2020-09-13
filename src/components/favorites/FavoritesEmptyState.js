import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Colors from '../../res/colors';

const FavoritesEmptyState = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>You don´t have any favorite yet</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    text: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center'
    }
})

export default FavoritesEmptyState