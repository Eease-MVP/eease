import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import {useFetchUserQuery} from "@/store/user-api";

export default function UserInfoDisplay() {
    const {data: user} = useFetchUserQuery()

    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({
        username: user?.name,
        birthday: user?.birthDate,
        gender: user?.gender,
        languages: user?.languages
    });

    const handleEditToggle = () => {
        if (isEditing) {
            if (!editedUser.username || !editedUser.birthday || !editedUser.gender || !editedUser.languages) {
                Alert.alert('Error', 'All fields are required.');
                return;
            }
        }
        setIsEditing(!isEditing);
        Keyboard.dismiss(); 
    };

    const handleInputChange = (field: string, value: string) => {
        setEditedUser({ ...editedUser, [field]: value });
    };

    const handleCancel = () => {
        setEditedUser({
            username: user?.name,
            birthday: user?.birthDate ,
            gender: user?.gender ,
            languages: user?.languages
        });
        setIsEditing(false);
        Keyboard.dismiss(); 
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <Text style={styles.containerTitle}>User info</Text>
                    {isEditing ? (
                        <View>
                            <View style={styles.inline}>
                                <Text style={styles.label}>Username: *</Text>
                                <TextInput
                                    style={styles.input}
                                    value={editedUser.username}
                                    onChangeText={(text) => handleInputChange('name', text)}
                                    returnKeyType="done"
                                    blurOnSubmit={true}
                                    onSubmitEditing={Keyboard.dismiss} 
                                />
                            </View>
                            <View style={styles.inline}>
                                <Text style={styles.label}>Birthday: *</Text>
                                <TextInput
                                    style={styles.input}
                                    value={editedUser.birthday}
                                    onChangeText={(text) => handleInputChange('birthday', text)}
                                    keyboardType="numeric"
                                    returnKeyType="done"
                                    blurOnSubmit={true}
                                    onSubmitEditing={Keyboard.dismiss} 
                                />
                            </View>
                            <View style={styles.inline}>
                                <Text style={styles.label}>Gender: *</Text>
                                <TextInput
                                    style={styles.input}
                                    value={editedUser.gender}
                                    onChangeText={(text) => handleInputChange('gender', text)}
                                    returnKeyType="done"
                                    blurOnSubmit={true}
                                    onSubmitEditing={Keyboard.dismiss} 
                                />
                            </View>
                            <View style={styles.inline}>
                                <Text style={styles.label}>Language: *</Text>
                                <TextInput
                                    style={styles.input}
                                    value={editedUser.languages?.join()}
                                    onChangeText={(text) => handleInputChange('language', text)}
                                    returnKeyType="done"
                                    blurOnSubmit={true}
                                    onSubmitEditing={Keyboard.dismiss} 
                                />
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={handleEditToggle}>
                                    <Text style={styles.saveButton}>Save my info</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleCancel}>
                                    <Text style={styles.cancelButton}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <View>
                            <Text style={styles.userInfoDisplay}>Username: {user?.name}</Text>
                            <Text style={styles.userInfoDisplay}>Birthday: {user?.birthDate}</Text>
                            <Text style={styles.userInfoDisplay}>Gender: {user?.gender}</Text>
                            <Text style={styles.userInfoDisplay}>Languages: {user?.languages}</Text>
                            <TouchableOpacity onPress={handleEditToggle}>
                                <Text style={styles.editInfoText}>Edit my info</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#C7C7C7",
        borderRadius: 15,
        padding: 15,
        width: "80%",
        alignSelf: 'center'
    },
    editInfoText: {
        textAlign: "center",
        textDecorationLine: "underline",
        marginTop: 20
    },
    userInfoDisplay: {
        padding: 5,
        fontSize: 16
    },
    input: {
        padding: 5,
        fontSize: 16,
        backgroundColor: "#FFFFFF",
        marginVertical: 5,
        borderRadius: 5,
        borderColor: '#CCCCCC',
        borderWidth: 1,
        flex: 1
    },
    label: {
        fontSize: 16,
        marginTop: 10,
        marginRight: 10
    },
    inline: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    saveButton: {
        color: 'green',
        textDecorationLine: 'underline'
    },
    cancelButton: {
        color: 'red',
        textDecorationLine: 'underline'
    },
    containerTitle: {
        textAlign: "center",
        fontSize: 25,
        marginBottom: 20
    }
});
