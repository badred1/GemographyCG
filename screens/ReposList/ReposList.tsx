import React, { useState, useCallback } from "react";
import { Text, FlatList, RefreshControl } from "react-native";
import { styles } from "./Styles"
import { useInfiniteQuery, useQueryClient } from "react-query"
import { getTrendingLastMonthRepos } from "../../api/index"
import { getLastMonthDate } from "../../services/helperFunctions";
import { Divider } from 'react-native-paper';
import Spinner from "../../components/Spinner";
import RepoItem from "../../components/RepoItem";

interface ReposListProps {

}

const ReposList: React.FC<ReposListProps> = (props) => {
    const [refreshing, setRefreshing] = useState(false);
    const [showEndResults, setShowEndResult] = useState(false);
    const queryClient = useQueryClient();

    const repos = useInfiniteQuery("getRepos", async ({ pageParam = 0 }) => {
        const { data } = await getTrendingLastMonthRepos(`created:>${getLastMonthDate()}`, "stars", "desc", pageParam, 80);
        return data.items
    }, {
        getNextPageParam: (lastPage, pages) => {
            return pages.length + 1
        }
    })

    const renderItem = ({ item, index }: any) => {
        return <RepoItem item={item} index={index} />
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