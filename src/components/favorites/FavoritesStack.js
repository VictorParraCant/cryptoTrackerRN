import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import FavoritesScreen from './FavoritesScreen'
import Colors from '../../res/colors'
import CoinDetailScreen from '../coinDetail/CoinDetailScreen'

const Stack = createStackNavigator()

const FavoritesStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.blackPearl,
                    shadowColor: Colors.blackPearl
                },
                headerTintColor: Colors.white
            }}
        >
            <Stack.Screen name='Favorites' component={FavoritesScreen} />
            <Stack.Screen name='CoinDetail' component={CoinDetailScreen} />
        </Stack.Navigator>
    )
}

export default FavoritesStack