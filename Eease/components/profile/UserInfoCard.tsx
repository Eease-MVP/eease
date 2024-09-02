import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {useFetchUserQuery} from "@/store/user-api";
import UserPrefsModal from "@/components/profile/UserPrefsModal";
import {EeasyCard} from "@/components/EeasyCard";
import {TextWithTitle} from "@/components/TextWithTitle";
import UploadProfilePic from "@/components/profile/UploadProfilePic";
import UserInfoModal from "@/components/profile/UserInfoModal";

export default function UserInfoCard() {
    const {data: user} = useFetchUserQuery()
    const [showEdit, setShowEdit] = useState(false);

    return (
        <EeasyCard style={{width: '80%'}}>
            <View style={styles.container}>
                <View style={{flexDirection: "row", gap: 8, alignItems: "center"}}>
                    <UploadProfilePic/>
                    <Text style={styles.containerTitle}>My bio</Text>
                </View>


                <View style={{gap: 2, width: '100%'}}>
                    <TextWithTitle
                        title="Username: "
                        text={user?.name}/>
                    <TextWithTitle
                        title="Birthday: "
                        text={user?.birthDate}/>
                    <TextWithTitle
                        title="Gender: "
                        text={user?.gender}/>
                    <TextWithTitle
                        title="Languages: "
                        text={user?.languages.join(", ")}/>
                </View>
                <Pressable onPress={() => setShowEdit(true)}>
                    <Text style={styles.editInfoText}>Edit</Text>
                </Pressable>

            </View>
            {showEdit && user && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showEdit}
                    onRequestClose={() => {
                        setShowEdit(!showEdit)
                    }}>

                    {/*dismiss on touch outside of modal*/}
                    <TouchableWithoutFeedback onPress={() => setShowEdit(false)}>
                        <View style={{flex: 1}}/>
                    </TouchableWithoutFeedback>

                    <View style={{flex: 1, justifyContent: "flex-end", alignItems: "center"}}>
                        <UserInfoModal
                            user={user}
                            onUpdate={() => setShowEdit(false)}
                        />
                    </View>
                </Modal>
            )}
        </EeasyCard>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        gap: 12,
    },
    editInfoText: {
        textAlign: "center",
        textDecorationLine: "underline",
        fontWeight: "bold",
        color: "#6f7dc7",
        fontSize: 18,
    },
    userInfoDisplay: {
        fontSize: 16,
    },
    containerTitle: {
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold",
        color: "rgba(107,89,89,0.87)",
    },
})
