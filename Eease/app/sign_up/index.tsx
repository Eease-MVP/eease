import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import TextInputWithTitle from "@/components/sign_up/TextInputWithTitle";
import { Select } from "@mobile-reality/react-native-select-pro";
import { Gender, genders, Language, languages } from "@/constants/ProfileInfo";
import { useSelector, useDispatch } from 'react-redux';
import { setUser, RootState, isFilled, User } from '@/store/user-slice';
import { useRouter } from "expo-router";
import { useState } from "react";


const ages = Array.from({ length: 100 - 18 + 1 }, (v, i) => i + 18)
    .map(age => ({
        value: age.toString(),
        label: age.toString(),
    }));

export default function SignUpScreen() {
    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch();
    const router = useRouter()
    const [newUser, setNewUser] = useState({ ...user })


    const next = () => {

        if (isFilled(newUser)) {
            dispatch(setUser(newUser))
            router.replace("(tabs)")
        } else {
            showAlert()
        }
    };

    const showAlert = () => {
        Alert.alert(
            'Error',
            'You have to fill all the fields.',
            [
                { text: 'OK' },
            ],
            { cancelable: true },
        )
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Profile</Text>

            <TextInputWithTitle
                title={"Username"}
                value={newUser.username ?? ''}
                onChangeValue={(username) => setNewUser({ ...newUser, username: username })}
                placeholder={"Type your username here..."} />
            <View>
                <Text style={styles.label}>Gender:</Text>
                <Select
                    defaultOption={Gender.getValueLabel(newUser.gender)}
                    options={genders}
                    onSelect={(value) => {
                        const gender = Gender.parse(value.value)
                        setNewUser({ ...newUser, gender: gender })
                    }}
                    placeholderText="Select your gender"
                    clearable={false} />
            </View>
            <View>
                <Text style={styles.label}> Age:</Text>
                <Select
                    defaultOption={newUser.age ? { value: newUser.age.toString(), label: newUser.age.toString() } : undefined}
                    options={ages} onSelect={(value) => {
                        const age = Number(value.value)
                        setNewUser({ ...newUser, age: age })
                    }}
                    placeholderText="Select your age"
                    clearable={false} />
            </View>
            <View>
                <Text style={styles.label}> Location:</Text>
                <Text> Location chooser?</Text>
            </View>

            <View>
                <Text style={styles.label}> Language:</Text>
                <Select
                    defaultOption={Language.getValueLabel(newUser.language)}
                    options={languages}
                    placeholderText="Select your language"
                    searchable={true}
                    onSelect={(value) => {
                        const language = Language.parse(value.value)
                        setNewUser({ ...newUser, language: language })
                    }}
                />
            </View>

            <View style={{ flex: 1 }}></View>
            <Pressable style={({ pressed }) => [
                {
                    backgroundColor: pressed ? 'rgba(111,125,199,0.55)' : '#6f7dc7',
                },
                styles.button,
            ]}
                onPress={next}>
                <Text style={styles.buttonText}>Next</Text>
            </Pressable>
        </View>
    );
};


const styles = StyleSheet.create({
    title: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        gap: 16,
    },
    label: {
        fontSize: 14,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 8,
    },
    button: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    buttonText: {
        color: '#fff', // Set the text color for better contrast
        fontSize: 16,
    },
});