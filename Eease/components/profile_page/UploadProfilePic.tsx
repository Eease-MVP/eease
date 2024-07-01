import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';

export default function UploadProfilePic() {
    const [image, setImage] = useState<string | null>(null); // Update the state type

    const checkForCameraRollPermission = async () => {
        const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert("Please grant camera roll permissions inside your system's settings");
        } else {
            console.log('Media Permissions are granted');
        }
    };

    useEffect(() => {
        checkForCameraRollPermission();
    }, []);

    const addImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            const selectedAsset = result.assets[0]; // Get the first selected asset
            setImage(selectedAsset.uri);
        }
    };

    return (
        <View style={styles.container}>
            {image && <Image source={{ uri: image }} style={{ width: 80, height: 80 }} />}
            <View style={styles.uploadBtnContainer}>
                <TouchableOpacity onPress={addImage} style={styles.uploadBtn}>
                    <Text style={styles.uploadBtnText}>{image ? 'Edit' : 'Upload'} Image</Text>
                    <AntDesign name="camerao" size={16} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        elevation: 2,
        height: 80,
        width: 80,
        backgroundColor: '#efefef',
        position: 'relative',
        borderRadius: 999,
        overflow: 'hidden',
    },
    uploadBtnContainer: {
        opacity: 0.7,
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: 'lightgrey',
        width: '100%',
        height: '40%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadBtn: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
    },
    uploadBtnText: {
        fontSize: 10,
        textAlign: 'center',
    },
});
