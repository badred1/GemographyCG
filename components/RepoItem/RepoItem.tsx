import React, { useCallback, useState } from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./Styles"
import { convertStars } from "../../services/helperFunctions";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native'
import SimpleModal from "../SimpleModal";

interface RepoItemProps {
    index: number,
    item: any
}

const RepoItem: React.FC<RepoItemProps> = (props) => {
    const { index, item } = props
    const [showModal, setShowModal] = useState(false)
    const navigation = useNavigation();

    const handleItemClick = useCallback((infos) => {
        navigation.navigate('RepoWebView', { infos })
    }, [])

    return (
        <>
            <View style={{ display: "flex", flexDirection: "column", padding: "5%", backgroundColor: index % 2 === 0 ? "#6050dc12" : "white" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingBottom: "5%" }}>
                    <View style={{ flexDirection: "row" }}>
                        <Icon
                            name='info-circle'
                            size={20}
                            color='#6050DC'
                            onPress={() => setShowModal(true)}
                            style={{ alignSelf: "center" }}
                        />
                        <Text style={{ fontFamily: "Raleway-Bold", fontSize: 20, textTransform: "capitalize", paddingLeft: "3%" }}>{item.name}</Text>
                    </View>

                    <View style={{ flexDirection: "row" }}>
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
            <SimpleModal
                icon={<Icon
                    name='github'
                    size={60}
                    color='#6050DC'
                />}
                data={{ ...item, owner: item.owner.login, license: item.license?.name }}
                dismiss={() => setShowModal(false)}
                handleRepoNav={() => handleItemClick({ name: item.name, url: item.html_url })}
                showDetails={showModal}
            />
        </>
    )


}

export default RepoItem