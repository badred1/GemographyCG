import React, { useCallback, useState } from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./Styles"
import { convertStars } from "../../services/helperFunctions";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native'
import SimpleModal from "../SimpleModal";
import { ITEM_BACKGROUND_COLOR, PRIMARY_COLOR, STARS_COLOR } from "../../assets/constants/colors"
import { SMALL_ICON, MEDIUM_ICON, LARGE_ICON } from "../../assets/constants/sizes"

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
            <View style={[styles.container, { backgroundColor: index % 2 === 0 ? ITEM_BACKGROUND_COLOR : "#fff" }]}>
                <View style={styles.firstRow}>
                    <View style={styles.leftFirstRow}>
                        <Icon
                            name='info-circle'
                            size={SMALL_ICON}
                            color={PRIMARY_COLOR}
                            onPress={() => setShowModal(true)}
                            style={{ alignSelf: "center" }}
                        />
                        <Text style={styles.title}>{item.name}</Text>
                    </View>
                    <Icon
                        name='github'
                        size={MEDIUM_ICON}
                        color={PRIMARY_COLOR}
                        onPress={() => handleItemClick({ name: item.name, url: item.html_url })}
                    />
                </View>
                {item.description && <Text style={styles.description}>{item.description}</Text>}
                <View style={styles.secondRow}>
                    <Image source={{ uri: item.owner.avatar_url }} style={styles.avatar} />
                    <Text style={styles.ownerName}>{item.owner.login}</Text>
                    <View style={styles.stars}>
                        <Icon
                            name='star'
                            size={SMALL_ICON}
                            color={STARS_COLOR}
                        />
                        <Text style={styles.starsText}>{convertStars(+item.stargazers_count)}</Text>
                    </View>
                </View>
            </View>
            <SimpleModal
                icon={<Icon
                    name='github'
                    size={LARGE_ICON}
                    color={PRIMARY_COLOR}
                />}
                data={{ ...item, owner: item.owner.login, avatar: item.owner.avatar_url, license: item.license?.name }}
                dismiss={() => setShowModal(false)}
                handleRepoNav={() => handleItemClick({ name: item.name, url: item.html_url })}
                showDetails={showModal}
            />
        </>
    )


}

export default RepoItem