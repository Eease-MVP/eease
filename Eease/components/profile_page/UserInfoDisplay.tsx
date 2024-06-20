import { StyleSheet, Text, View } from "react-native";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/user-slice';

export default function UserInfoDisplay() {
    const user = useSelector((state: RootState) => state.user)

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.userInfoDisplay}>Age: {user.age}</Text>
                <Text style={styles.userInfoDisplay}>Gender: {user.gender}</Text>
                <Text style={styles.userInfoDisplay}>Language: {user.language}</Text>
            </View>
            <Text style={styles.editInfoText}>Edit my info</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#C7C7C7",
        borderRadius: 15,
        padding: 15,
        width: "80%"
    },
    editInfoText: {
        textAlign: "center",
        textDecorationLine: "underline",
        marginTop: 20
    },
    userInfoDisplay: {
        padding: 5,
        fontSize: 16
    }
});
