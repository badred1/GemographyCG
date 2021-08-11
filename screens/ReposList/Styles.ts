import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    spinner: {
        backgroundColor: "transparent",
        alignSelf: "center"
    },
    error: {
        color: "red",
        fontFamily: "Raleway-Medium",
        fontSize: 25
    },
    errorContainer: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    }
})