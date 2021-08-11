import React, { useState, useCallback } from "react";
import { Text, FlatList, RefreshControl, ScrollView } from "react-native";
import { styles } from "./Styles"
import { useInfiniteQuery, useQueryClient } from "react-query"
import { getTrendingLastMonthRepos } from "../../api/index"
import { getLastMonthDate } from "../../services/helperFunctions";
import { Divider } from 'react-native-paper';
import Spinner from "../../components/Spinner";
import RepoItem from "../../components/RepoItem";
import { MAX_RESULTS, PER_PAGE } from "../../services/constants";
import { PRIMARY_COLOR } from "../../assets/constants/colors";

interface ReposListProps {

}

const ReposList: React.FC<ReposListProps> = (props) => {
    const [refreshing, setRefreshing] = useState(false);
    const queryClient = useQueryClient();

    //Using useInfiniteQuery hook to fetch data 
    const repos = useInfiniteQuery("getRepos", async ({ pageParam = 1 }) => {
        const { data } = await getTrendingLastMonthRepos(`created:>${getLastMonthDate()}`, "stars", "desc", pageParam, PER_PAGE);
        return data.items
    }, {
        //setter for nextPageParam
        getNextPageParam: (lastPage, pages) => {
            //Check If results exceeded the 1000 max_results amount of repos set by the github api 
            if ((pages.length + 1) * PER_PAGE > MAX_RESULTS) {
                return undefined
            }
            return pages.length + 1
        }
    })

    //FlatList Item renderer
    const renderItem = ({ item, index }: any) => {
        return <RepoItem item={item} index={index} />
    }

    //Callback Fn onRefresh
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        //Invalidate query to refresh
        await queryClient.invalidateQueries("getRepos", { exact: true })
        setRefreshing(false)
    }, []);
    
    //Render a Spinner on firstLoad
    if (repos.isLoading) {
        return <Spinner color={PRIMARY_COLOR} />
    }

    //HandlingErrors
    if (repos.isError) {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                contentContainerStyle={styles.errorContainer}
            >
                {
                    //Couldn't get reponse Status
                    (repos.error as any)?.message === "Request failed with status code 403" ?
                        <Text style={styles.error}>Too much requests !</Text>
                        : <Text style={styles.error}>Something went wrong !</Text>
                }
            </ScrollView>
        )
    }

    return (
        //Using FlatList to Optimize Performance
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
                        else return
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
                ListFooterComponent={
                    repos.isFetching ? <Spinner style={styles.spinner} color={PRIMARY_COLOR} /> : repos.hasNextPage ? <Text>No more Data</Text> : <></>
                }
            />
        </>
    )
}

export default ReposList