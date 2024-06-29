import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Alert, FlatList } from 'react-native';

export default function EditPreferences() {
    const initialPreferences = {
        fromAge: 18,
        toAge: 22,
        cityToAvoid: ["Stockholm", "Malmö"],
        genders: ["Male"]
    };

    const [isEditing, setIsEditing] = useState(false);
    const [preferences, setPreferences] = useState(initialPreferences);
    const [newCity, setNewCity] = useState("");
    const [newGender, setNewGender] = useState("");

    const handleEditToggle = () => {
        if (isEditing) {
            if (!preferences.fromAge || !preferences.toAge) {
                Alert.alert('Error', 'All fields are required.');
                return;
            }

            const fromAge = parseInt(preferences.fromAge.toString());
            const toAge = parseInt(preferences.toAge.toString());
            if (isNaN(fromAge) || isNaN(toAge) || fromAge < 18 || toAge < fromAge) {
                Alert.alert('Error', 'Invalid age range.');
                return;
            }
            Alert.alert("Preferences saved!");
        }
        setIsEditing(!isEditing);
        Keyboard.dismiss();
    };

    const handleCancel = () => {
        setPreferences(initialPreferences);
        setNewCity("");
        setNewGender("");
        setIsEditing(false);
        Keyboard.dismiss();
    };

    const handleInputChange = (field: string, value: any) => {
        setPreferences({ ...preferences, [field]: value });
    };

    const addCity = () => {
        if (newCity.trim() !== "") {
            handleInputChange('cityToAvoid', [...preferences.cityToAvoid, newCity.trim()]);
            setNewCity("");
        }
    };

    const removeCity = (index: number) => {
        const updatedCities = preferences.cityToAvoid.filter((_, i) => i !== index);
        handleInputChange('cityToAvoid', updatedCities);
    };

    const addGender = () => {
        if (newGender.trim() !== "") {
            handleInputChange('genders', [...preferences.genders, newGender.trim()]);
            setNewGender("");
        }
    };

    const removeGender = (index: number) => {
        const updatedGenders = preferences.genders.filter((_, i) => i !== index);
        handleInputChange('genders', updatedGenders);
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <Text style={styles.containerTitle}>My preferences</Text>
                    {isEditing ? (
                        <View>
                            <Text>Choose your preferred age gap</Text>
                            <View style={styles.inline}>
                                <Text style={styles.label}>From Age: *</Text>
                                <TextInput
                                    style={styles.input}
                                    value={preferences.fromAge.toString()}
                                    onChangeText={text => handleInputChange('fromAge', Number(text))}
                                    keyboardType="numeric"
                                    returnKeyType="done"
                                    blurOnSubmit={true}
                                    onSubmitEditing={Keyboard.dismiss}
                                />
                            </View>
                            <View style={styles.inline}>
                                <Text style={styles.label}>To Age: *</Text>
                                <TextInput
                                    style={styles.input}
                                    value={preferences.toAge.toString()}
                                    onChangeText={text => handleInputChange('toAge', Number(text))}
                                    keyboardType="numeric"
                                    returnKeyType="done"
                                    blurOnSubmit={true}
                                    onSubmitEditing={Keyboard.dismiss}
                                />
                            </View>
                            <View>
                                <Text>Choose which cities you want to avoid</Text>
                                <FlatList
                                    data={preferences.cityToAvoid}
                                    renderItem={({ item, index }) => (
                                        <View style={styles.cityItem}>
                                            <Text style={styles.cityText}>{item}</Text>
                                            <TouchableOpacity onPress={() => removeCity(index)}>
                                                <Text style={styles.removeCityButton}>Remove</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Add City to Avoid"
                                    value={newCity}
                                    onChangeText={text => setNewCity(text)}
                                />
                                <TouchableOpacity onPress={addCity}>
                                    <Text style={styles.addButton}>Add City</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text>Choose genders to interact with</Text>
                                <FlatList
                                    data={preferences.genders}
                                    renderItem={({ item, index }) => (
                                        <View style={styles.cityItem}>
                                            <Text style={styles.cityText}>{item}</Text>
                                            <TouchableOpacity onPress={() => removeGender(index)}>
                                                <Text style={styles.removeCityButton}>Remove</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Add Gender"
                                    value={newGender}
                                    onChangeText={text => setNewGender(text)}
                                />
                                <TouchableOpacity onPress={addGender}>
                                    <Text style={styles.addButton}>Add Gender</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity onPress={handleEditToggle}>
                                    <Text style={styles.saveButton}>Save my preferences</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleCancel}>
                                    <Text style={styles.cancelButton}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <View>
                            <Text style={styles.userPreferencesDisplay}>Chosen age gap: {preferences.fromAge} - {preferences.toAge}</Text>
                            <Text style={styles.userPreferencesDisplay}>Avoid city: {preferences.cityToAvoid.length > 0 ? preferences.cityToAvoid.join(", ") : "None"}</Text>
                            <Text style={styles.userPreferencesDisplay}>Chosen gender/s: {preferences.genders.length > 0 ? preferences.genders.join(", ") : "None"}</Text>
                            <TouchableOpacity onPress={handleEditToggle}>
                                <Text style={styles.editPreferenceText}>Edit my preferences</Text>
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
    editPreferenceText: {
        textAlign: "center",
        textDecorationLine: "underline",
        marginTop: 20
    },
    userPreferencesDisplay: {
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
    },
    cityItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
        marginVertical: 5
    },
    cityText: {
        fontSize: 16
    },
    removeCityButton: {
        color: "red"
    },
    addButton: {
        textAlign: "center",
        backgroundColor: "#28a745",
        color: "white",
        padding: 10,
        borderRadius: 5,
        marginTop: 10
    }
});
