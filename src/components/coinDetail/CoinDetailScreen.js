import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, SectionList, FlatList, Pressable, Alert } from 'react-native'
import Http from '../../libs/http'

import Colors from '../../res/colors'
import CoinMarketItem from './CoinMarketItem'
import Storage from '../../libs/storage';

class CoinDetailScreen extends Component {
    state = {
        coin: {},
        markets: [],
        isFavorite: false
    }

    toggleFavorite = () => {
        if (this.state.isFavorite) {
            this.removeFavorite()
        } else {
            this.addFavorite()
        }
    }

    addFavorite = async () => {
        const coin = JSON.stringify(this.state.coin)
        const key = `favorite-${this.state.coin.id}`

        const stored = await Storage.instance.store(key, coin)

        if (stored) {
            this.setState({ isFavorite: true })
        }
    }

    removeFavorite = async () => {
        Alert.alert('Remove favorite', 'Are you sure?', [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Remove',
                onPress: async () => {
                    const key = `favorite-${this.state.coin.id}`

                    await Storage.instance.remove(key)
                    this.setState({ isFavorite: false })
                },
                style: 'destructive'
            }
        ])
    }

    getFavorite = async () => {
        try {
            const key = `favorite-${this.state.coin.id}`
            const favStr = await Storage.instance.get(key)

            if (favStr !== null) {
                this.setState({ isFavorite: true })
            }
        } catch (err) {
            throw Error(err)
        }
    }

    getSymbolIcon = (name) => {
        if (name) {
            const symbol = name.toLowerCase().replace(' ', '-')
            return `https://c1.coinlore.com/img/25x25/${symbol}.png`
        }
    }

    getSections = () => {
        const { coin } = this.state
        const sections = [
            {
                title: 'Market cap',
                data: [coin.market_cap_usd]
            },
            {
                title: 'Volume 24h',
                data: [coin.volume24]
            },
            {
                title: 'Change 24h',
                data: [coin.percent_change_24h]
            },
        ]
        return sections
    }

    getMarket = async (coinId) => {
        const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`
        const markets = await Http.instance.get(url)
        this.setState({ markets })
    }

    componentDidMount() {
        const { coin } = this.props.route.params
        this.props.navigation.setOptions({ title: coin.symbol })
        this.getMarket(coin.id)
        this.setState({ coin }, () => {
            this.getFavorite()
        })
    }

    render() {
        const { coin, isFavorite } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.subHeader}>
                    <View style={styles.row}>
                        <Image
                            style={styles.iconImage}
                            source={{ uri: this.getSymbolIcon(coin.name) }}
                        />
                        <Text style={styles.titleText}>{coin.name}</Text>
                    </View>

                    <Pressable
                        onPress={this.toggleFavorite}
                        style={[
                            styles.btnFavorite,
                            isFavorite
                                ? styles.btnFavoriteRemove
                                : styles.btnFavoriteAdd
                        ]}>
                        <Text style={styles.itemText}>
                            {
                                isFavorite
                                    ? 'Remove favorite'
                                    : 'Add favorite'
                            }
                        </Text>
                    </Pressable>
                </View>

                <SectionList
                    style={styles.section}
                    keyExtractor={(item) => item}
                    sections={this.getSections(coin)}
                    renderItem={({ item }) =>
                        <View style={styles.sectionItem}>
                            <Text style={[styles.itemText]}>{item}</Text>
                        </View>
                    }
                    renderSectionHeader={({ section }) =>
                        <View style={styles.sectionHeader}>
                            <Text style={[styles.itemText, styles.sectionText]}>{section.title}</Text>
                        </View>
                    }
                />
                <View style={styles.sectionHeader}>
                    <Text style={[styles.itemText, styles.sectionText]}>Markets</Text>
                </View>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.list}
                    data={this.state.markets}
                    renderItem={({ item }) => <CoinMarketItem item={item} />}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.charade,
    },
    subHeader: {
        backgroundColor: 'rgba(0,0,0, 0.1)',
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row'
    },
    titleText: {
        fontSize: 16,
        color: Colors.white,
        fontWeight: 'bold',
        marginLeft: 8
    },
    iconImage: {
        width: 25,
        height: 25
    },
    section: {
        maxHeight: 220
    },
    list: {
        maxHeight: 100,
        paddingLeft: 16
    },
    sectionHeader: {
        backgroundColor: 'rgba(0,0,0, 0.2)',
        padding: 8
    },
    sectionItem: {
        padding: 8
    },
    itemText: {
        color: Colors.white,
        fontSize: 14
    },
    sectionText: {
        fontWeight: 'bold'
    },
    btnFavorite: {
        padding: 8,
        borderRadius: 8,
    },

    btnFavoriteAdd: {
        backgroundColor: Colors.picton
    },
    btnFavoriteRemove: {
        backgroundColor: Colors.carmine
    }

})

export default CoinDetailScreen