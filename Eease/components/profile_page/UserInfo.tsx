import { StyleSheet, Text, View } from "react-native";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/user-slice';

export default function UserInfo() {
    const user = useSelector((state: RootState) => state.user)

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameDisplay}>{user.username}</Text>
                </View>
                <Text style={styles.editInfo}>Change my information</Text>
            </View>
            <View style={styles.innerContainer}>
                <View style={styles.profilePicContainer}>
                    {/* profile pic */}
                    <Text>Change</Text>
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
        fontSize: 20,
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
