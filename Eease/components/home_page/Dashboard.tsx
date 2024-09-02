import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import {useFetchUserQuery} from '@/store/user-api';
import {EeasyCard} from "@/components/EeasyCard";

export default function Dashboard() {
    const {data: user, error: fetchError, isLoading: isFetching, refetch} = useFetchUserQuery()

    const [userStatus, setUserStatus] = useState<string>("Active");
    const [pickerVisible, setPickerVisible] = useState<boolean>(false);

    const statuses: { [key: string]: string } = {
        "Active": "#a8e35f",
        "Inactive": "#f16b42",
        "Do not disturb": "#f8ec45",
    };

    const togglePickerVisibility = () => {
        setPickerVisible(!pickerVisible);
    };

    const handleStatusChange = (status: string) => {
        setUserStatus(status);
        setPickerVisible(false);
    };

    return (
        <EeasyCard style={{gap: 16}}>
            <View style={styles.profileContainer}>
                <View style={styles.profilePic}>
                    <AntDesign name="user" size={32} color="black"/>
                </View>
                <View>
                    <Text style={styles.welcomeText}>Welcome
                        {'\n'}
                        <Text>{user?.name}!</Text></Text>
                </View>
            </View>
            <View style={styles.statusContainer}>
                <TouchableOpacity onPress={togglePickerVisibility} style={styles.innerStatusContainer}>
                    <Text style={styles.statusText}>Status</Text>
                    <View style={[styles.status, {backgroundColor: statuses[userStatus]}]}></View>
                    <View style={styles.arrowContainer}>
                        <AntDesign name="down" size={16} adjustsFontSizeToFit={true} color="black"/>
                    </View>
                </TouchableOpacity>
            </View>
            {pickerVisible && (
                <View style={styles.dropdown}>
                    {Object.keys(statuses).map((status) => (
                        <TouchableOpacity
                            key={status}
                            onPress={() => handleStatusChange(status)}
                            style={styles.dropdownItem}>
                            <Text>{status}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </EeasyCard>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ECECEC",
        alignItems: 'center',
        padding: 20,
        width: "70%",
        borderRadius: 25,
    },
    profileContainer: {
        flexDirection: 'row',
        gap: 24,
        alignItems: 'center',
    },
    profilePic: {
        width: 64,
        height: 64,
        borderRadius: 64,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center",
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        borderWidth: 1,
        paddingVertical: 8,
        flexGrow: 0,
        justifyContent: 'center',
    },
    status: {
        width: 40,
        height: 40,
        borderRadius: 100,
        marginLeft: 10,
        marginRight: 10,
    },
    statusText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    dropdown: {
        borderWidth: 1,
        borderRadius: 15,
        overflow: 'hidden',
        minWidth: 200,
        marginTop: 10,
    },
    dropdownItem: {
        padding: 10,
    },
    innerStatusContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16
    },
    arrowContainer: {
        marginLeft: 'auto',
    },
});
