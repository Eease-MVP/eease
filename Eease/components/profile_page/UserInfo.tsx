import { StyleSheet, Text, View } from "react-native";
import { useSelector } from 'react-redux';
import UploadProfilePic from "./UploadProfilePic";
import {useFetchUserQuery} from "@/store/user-api";

export default function UserInfo() {
    const {data: user} = useFetchUserQuery()

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameDisplay}>{user?.name}</Text>
                </View>
                {/* <Text style={styles.editInfo}>Change my information</Text> */}
            </View>
            <View style={styles.innerContainer}>
                <View style={styles.profilePicContainer}>
                    <UploadProfilePic />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center", 
    },
    innerContainer: {
        marginHorizontal: 10, 
    },
    nameContainer: {
        backgroundColor: "#C7C7C7",
        borderRadius: 50,
        padding: 15,
        width: "100%"
    },
    nameDisplay: {
        fontSize: 22,
        textAlign: "center",
    },
    editInfo: {
        paddingTop: 10,
        textDecorationLine: "underline",
        textAlign: "center"
    },
    profilePicContainer: {
        backgroundColor: "#999999",
        width: 85, 
        height: 85, 
        borderRadius: 50, 
        justifyContent: "center", 
        alignItems: "center", 
        textDecorationLine: "underline"
    }
});
