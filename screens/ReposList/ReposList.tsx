import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, Image, RefreshControl, TouchableOpacity, Linking } from "react-native";
import { styles } from "./Styles"
import { useInfiniteQuery, useQueryClient } from "react-query"
import { getTrendingLastMonthRepos } from "../../api/index"
import { convertStars, getLastMonthDate } from "../../services/helperFunctions";
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Spinner from "../../components/Spinner";
import { useNavigation } from '@react-navigation/native'
import { WebView } from 'react-native-webview';

interface ReposListProps {

}

const ReposList: React.FC<ReposListProps> = (props) => {
    const [refreshing, setRefreshing] = useState(false);
    const [showEndResults, setShowEndResult] = useState(false);
    const queryClient = useQueryClient();
    const navigation = useNavigation();

    const repos = useInfiniteQuery("getRepos", async ({ pageParam = 0 }) => {
        const { data } = await getTrendingLastMonthRepos(`created:>${getLastMonthDate()}`, "stars", "desc", pageParam, 80);
        return data.items
    }, {
        getNextPageParam: (lastPage, pages) => {
            return pages.length + 1
        }
    })

    const handleItemClick = useCallback((infos) => {
        navigation.navigate('RepoWebView', { infos })
    }, [])

    const renderItem = ({ item, index }: any) => {
        return (
            <View style={{ display: "flex", flexDirection: "column", padding: "5%", backgroundColor: index % 2 === 0 ? "#6050dc12" : "white" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <Text style={{ fontFamily: "Raleway-Bold", fontSize: 20, textTransform: "capitalize", paddingBottom: "5%" }}>{item.name}</Text>
                    <View style={{}}>
                        <Icon
                            name='github'
                            size={30}
                            color='#6050DC'
                            onPress={() => handleItemClick({ name: item.name, url: item.html_url })}
                        />
                    </View>

                </View>

                {item.description && <Text style={{ fontFamily: "Raleway-Medium", paddingBottom: "5%", textTransform: "capitalize" }}>{item.description}</Text>}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={{ uri: item.owner.avatar_url }} style={{ width: 45, height: 45, resizeMode: "cover", borderRadius: 100 }} />
                    <Text style={{ fontFamily: "Raleway-Medium", paddingLeft: "3%" }}>{item.owner.login}</Text>
                    <View style={{ position: "absolute", right: "5%", flexDirection: "row", alignItems: "center" }}>
                        <Icon
                            name='star'
                            size={20}
                            color='#F0CA00'
                        />
                        <Text style={{ fontFamily: "Montserrat-Medium", paddingLeft: 10 }}>{convertStars(+item.stargazers_count)}</Text>
                    </View>
                </View>
            </View>
        )
    }


    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await queryClient.invalidateQueries("getRepos", { exact: true })
        setRefreshing(false)
    }, []);

    if (repos.isLoading) {
        return <Spinner color="#6050DC" />
    }

    if (repos.isError) {
        return <Text>{JSON.stringify(repos.error)}</Text>
    }

    return (
        <>
            <FlatList
                data={repos.data?.pages.flat()} //
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListEmptyComponent={<Text>No Data !</Text>}
                ItemSeparatorComponent={() => <Divider />}
                onEndReached={
                    () => {
                        if (repos.hasNextPage) {
                            repos.fetchNextPage()
                        }
                        else setShowEndResult(true)
                    }
                }
                onEndReachedThreshold={0.5}
                progressViewOffset={0}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
            {repos.isFetching && <Spinner style={{ backgroundColor: "transparent", position: "absolute", bottom: "2%", alignSelf: "center" }} color="#6050DC" />}
            {showEndResults && <Text>No more Data</Text>}
        </>
    )
}

export default ReposList