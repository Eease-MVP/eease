import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useFetchUserQuery } from '@/store/user-api';

export default function Dashboard() {
    const { data: user, error: fetchError, isLoading: isFetching, refetch } = useFetchUserQuery()

    const [userStatus, setUserStatus] = useState<string>("Active");
    const [pickerVisible, setPickerVisible] = useState<boolean>(false);

    const statuses: { [key: string]: string } = {
        "Active": "green",
        "Inactive": "yellow",
        "Do not disturb": "red",
    };

    const togglePickerVisibility = () => {
        setPickerVisible(!pickerVisible);
    };

    const handleStatusChange = (status: string) => {
        setUserStatus(status);
        setPickerVisible(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.profilePic}>
                    <AntDesign name="user" size={24} color="black" />
                </View>
                <View>
                    <Text style={styles.welcomeText}>Welcome</Text>
                    <Text>{user?.name}!</Text>
                </View>
            </View>
            <View style={styles.statusContainer}>
                <TouchableOpacity onPress={togglePickerVisibility} style={styles.innerStatusContainer}>
                    <Text style={styles.statusText}>Status</Text>
                    <View style={[styles.status, { backgroundColor: statuses[userStatus] }]}></View>
                    <View style={styles.arrowContainer}>
                        <AntDesign name="down" size={20} color="black" />
                    </View>
                </TouchableOpacity>
            </View>
            {pickerVisible && (
                <View style={styles.dropdown}>
                    {Object.keys(statuses).map((status) => (
                        <TouchableOpacity
                            key={status}
                            onPress={() => handleStatusChange(status)}
                            style={styles.dropdownItem} >
                            <Text>{status}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ECECEC",
        alignItems: 'center',
        padding: 20,
        width: "70%",
        borderRadius: 25
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: "#C7C7C7",
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 20,
        textAlign: "center"
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: "#C7C7C7",
        borderRadius: 50,
        padding: 15,
        width: '80%',
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
        fontSize: 20
    },
    dropdown: {
        backgroundColor: '#C7C7C7',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 15,
        overflow: 'hidden',
        width: "70%",
        marginTop: 10
    },
    dropdownItem: {
        padding: 10,
    },
    innerStatusContainer: {
        flexDirection: "row",
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-between',
    },
    arrowContainer: {
        marginLeft: 'auto',
    },
});
