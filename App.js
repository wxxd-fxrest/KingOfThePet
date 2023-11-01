import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import AuthRoot from './src/navigations/AuthRoot';
import MainRoot from './src/navigations/MainRoot';
import { store } from './src/store';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

export default function App() {
    const [ready, setReady] = useState(false);
    const [isAuthentication, setIsAuthentication] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
            if (user) {
                setIsAuthentication(true);
            } else {
                setIsAuthentication(false);
            }
        });
    }, [currentUser]);

    const onFinish = () => setReady(true);

    const startLoading = async () => {
        const fonts = loadFonts([Ionicons.font]);
        await Promise.all([...fonts]);
    };

    // useEffect(() => {
    //     SplashScreen.hide();
    // }, []);

    if (!ready) {
        return (
            <AppLoading
                startAsync={startLoading}
                onFinish={onFinish}
                onError={console.error}
            />
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Provider store={store}>
                <NavigationContainer>
                    {isAuthentication ? <MainRoot /> : <AuthRoot />}
                    <StatusBar barStyle="auto" />
                </NavigationContainer>
            </Provider>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
