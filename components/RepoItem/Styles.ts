import { StyleSheet } from "react-native";
import { AVATAR_SIZE } from "../../assets/constants/sizes";

export const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        padding: "5%",
    },
    firstRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: "5%"
    },
    leftFirstRow: {
        flexDirection: "row",
        flex: 0.8
    },
    title: {
        fontFamily: "Raleway-Bold",
        fontSize: 20,
        textTransform: "capitalize",
        paddingLeft: "3%"
    },
    description: {
        fontFamily: "Raleway-Medium",
        paddingBottom: "5%",
        textTransform: "capitalize"
    },
    secondRow: {
        flexDirection: "row",
        alignItems: "center"
    },
    avatar: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        resizeMode: "cover",
        borderRadius: 100
    },
    ownerName: {
        fontFamily: "Raleway-Medium",
        paddingLeft: "3%"
    },
    stars: {
        position: "absolute",
        right: "5%",
        flexDirection: "row",
        alignItems: "center"
    },
    starsText: {
        fontFamily: "Montserrat-Medium",
        paddingLeft: 10
    }
})