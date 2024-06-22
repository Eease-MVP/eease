import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/user-slice';
import { setUser } from '@/store/user-slice';

export default function UserInfoDisplay() {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({
        username: user.username || '',
        age: user.age?.toString() || '',
        gender: user.gender || '',
        language: user.language || ''
    });

    const handleEditToggle = () => {
        if (isEditing) {
            dispatch(setUser({
                ...editedUser,
                age: parseInt(editedUser.age) // Ensure age is stored as a number
            }));
        }
        setIsEditing(!isEditing);
        Keyboard.dismiss(); // Dismiss the keyboard
    };

    const handleInputChange = (field: string, value: string) => {
        setEditedUser({ ...editedUser, [field]: value });
    };

    const handleCancel = () => {
        setEditedUser({
            username: user.username || '',
            age: user.age?.toString() || '',
            gender: user.gender || '',
            language: user.language || ''
        });
        setIsEditing(false);
        Keyboard.dismiss(); // Dismiss the keyboard
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    {isEditing ? (
                        <View>
                            <View style={styles.inline}>
                                <Text style={styles.label}>Username:</Text>
                                <TextInput
                                    style={styles.input}
                                    value={editedUser.username}
                                    onChangeText={(text) => handleInputChange('username', text)}
                                    returnKeyType="done"
                                    blurOnSubmit={true}
                                    onSubmitEditing={Keyboard.dismiss} // Dismiss the keyboard when "Done" is pressed
                                />
                            </View>
                            <View style={styles.inline}>
                                <Text style={styles.label}>Age:</Text>
                                <TextInput
                                    style={styles.input}
                                    value={editedUser.age}
                                    onChangeText={(text) => handleInputChange('age', text)}
                                    keyboardType="numeric"
                                    returnKeyType="done"
                                    blurOnSubmit={true}
                                    onSubmitEditing={Keyboard.dismiss} // Dismiss the keyboard when "Done" is pressed
                                />
                            </View>
                            <View style={styles.inline}>
                                <Text style={styles.label}>Gender:</Text>
                                <TextInput
                                    style={styles.input}
                                    value={editedUser.gender}
                                    onChangeText={(text) => handleInputChange('gender', text)}
                                    returnKeyType="done"
                                    blurOnSubmit={true}
                                    onSubmitEditing={Keyboard.dismiss} // Dismiss the keyboard when "Done" is pressed
                                />
                            </View>
                            <View style={styles.inline}>
                                <Text style={styles.label}>Language:</Text>
                                <TextInput
                                    style={styles.input}
                                    value={editedUser.language}
                                    onChangeText={(text) => handleInputChange('language', text)}
                                    returnKeyType="done"
                                    blurOnSubmit={true}
                                    onSubmitEditing={Keyboard.dismiss} // Dismiss the keyboard when "Done" is pressed
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
                            <Text style={styles.userInfoDisplay}>Username: {user.username}</Text>
                            <Text style={styles.userInfoDisplay}>Age: {user.age}</Text>
                            <Text style={styles.userInfoDisplay}>Gender: {user.gender}</Text>
                            <Text style={styles.userInfoDisplay}>Language: {user.language}</Text>
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
    }
});
