import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';

export default function UploadProfilePic() {
    const [image, setImage] = useState<string | null>(null);

    const checkForCameraRollPermission = async () => {
        const {status} = await ImagePicker.getMediaLibraryPermissionsAsync();
        console.log(status);
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
            const selectedAsset = result.assets[0];
            setImage(selectedAsset.uri);
        }
    };

    return (
        <View style={styles.container}>
            {image && <Image source={{uri: image}} style={{width: 80, height: 80}}/>}
            <View style={styles.uploadBtnContainer}>
                <Pressable onPress={addImage} style={styles.uploadBtn}>
                    <AntDesign name="camerao" size={16} color="white"/>
                    <Text style={styles.uploadBtnText}>{image ? 'Edit' : 'Upload'}</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 80,
        width: 80,
        borderRadius: 100,
        borderColor: "#460E0EB6",
        borderWidth: 2,
        overflow: 'hidden',
    },
    uploadBtnContainer: {
        opacity: 0.7,
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: 'lightgrey',
        width: '100%',
        height: '33%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadBtn: {
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
        alignItems: "center",
        justifyContent: 'center',
    },
    uploadBtnText: {
        fontSize: 10,
        fontWeight: "bold",
        color: 'white',
    },
});
