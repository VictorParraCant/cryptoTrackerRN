import AsyncStorage from '@react-native-community/async-storage'

class Storage {
    static instance = new Storage()

    store = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value)
            return true
        } catch (err) {
            throw Error(err)
        }
    }

    get = async (key) => {
        try {
            return await AsyncStorage.getItem(key)
        } catch (err) {
            throw Error(err)
        }
    }

    multiGet = async (keys) => {
        try {
            return await AsyncStorage.multiGet(keys)
        } catch (err) {
            throw Error(err)
        }
    }

    getAllKeys = async () => {
        try {
            return await AsyncStorage.getAllKeys()
        } catch (err) {
            throw Error(err)
        }
    }

    remove = async (key) => {
        try {
            await AsyncStorage.removeItem(key)
            return true
        } catch (err) {
            throw Error(err)
        }
    }
}

export default Storage