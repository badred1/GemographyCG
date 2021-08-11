import React from "react";
import { Text } from "react-native";
import { WebView } from 'react-native-webview';
import { useRoute, useNavigation } from '@react-navigation/native'
import AppBar from "../../components/AppBar";


interface RepoWebViewProps {

}

const RepoWebView: React.FC<RepoWebViewProps> = (props) => {
    const route = useRoute();
    const navigation = useNavigation()

    if (!route.params?.infos) {
        navigation.goBack()
        return <></>
    }

    return (
        <>
            <AppBar title={route.params?.infos?.name} backgroundColor="#6050DC" style={{ textTransform: "capitalize" }} iconName="arrow-left" onPress={() => navigation.goBack()} />
            <WebView
                source={{ uri: route.params?.infos?.url }}
                style={{ marginTop: 0 }}
            />
        </>
    )
}

export default RepoWebView