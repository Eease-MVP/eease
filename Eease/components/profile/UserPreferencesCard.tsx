import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {EeasyCard} from "@/components/EeasyCard";
import {useFetchUserQuery} from "@/store/user-api";
import {TextWithTitle} from "@/components/TextWithTitle";
import UserInfoModal from "@/components/profile/UserInfoModal";
import UserPrefsModal from "@/components/profile/UserPrefsModal";

export default function UserPreferencesCard() {
    const {data: user} = useFetchUserQuery()
    const [showEdit, setShowEdit] = useState(false);

    return (
        <EeasyCard style={{width: '80%'}}>
            <View style={styles.container}>
                <Text style={styles.containerTitle}>My Preferences</Text>
                <View style={{gap: 2}}>
                    <TextWithTitle
                        title="Preferred genders: "
                        text={user?.prefs?.genders.join(', ')}/>
                    <TextWithTitle
                        title="Prefered age: "
                        text={`${user?.prefs?.ageFrom ?? ''} - ${user?.prefs?.ageTo ?? ''}`}/>
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

                    <View style={{flex: 1, height: "100%", justifyContent: "flex-end", alignItems: "center"}}>
                        <UserPrefsModal
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