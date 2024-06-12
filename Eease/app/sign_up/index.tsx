import {Alert, Pressable, StyleSheet, Text, View} from "react-native";
import {useState} from "react";
import TextInputWithTitle from "@/components/sign_up/TextInputWithTitle";
import {Select} from "@mobile-reality/react-native-select-pro";


import {Gender, genders, Language, languages} from "@/constants/ProfileInfo";


type userType = {
    username?: string,
    gender?: Gender,
    age?: number,
    language?: Language,
    //location: Location?| undefined,
    isFilled: () => boolean
}

const emptyUser: userType = {
    isFilled(): boolean {
        return this.username !== undefined &&
            this.age !== undefined &&
            this.gender !== undefined &&
            this.language !== undefined;
    }, username: '', age: undefined, gender: undefined, language: undefined,
}

const ages = Array.from({length: 100 - 18 + 1}, (v, i) => i + 18)
    .map(age => ({
        value: age.toString(),
        label: age.toString(),
    }));

export default function SignUpScreen() {
    const [user, setUser] = useState<userType>(emptyUser)

    const handleSave = () => {
        // Handle the save action, e.g., send the text to a server or save locally
        if (user.isFilled()) {
            // proceed
        } else {
            showAlert()
        }
    };

    const showAlert = () => {
        Alert.alert(
            'Error',
            'You have to fill all the fields.',
            [
                {text: 'OK'},
            ],
            {cancelable: true},
        )
    }

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Profile</Text>

            <TextInputWithTitle
                title={"Username"}
                value={user.username ?? ''}
                onChangeValue={(username) => setUser({...user, username: username})}
                placeholder={"Type your username here..."}/>

            <View>
                <Text style={styles.label}>Gender:</Text>
                <Select
                    defaultOption={Gender.getValueLabel(user.gender)}
                    options={genders}
                    onSelect={(value) => {
                        const gender = Gender.parse(value.value)
                        setUser({...user, gender: gender})
                    }}
                    placeholderText="Select your gender"
                    clearable={false}/>
            </View>
            <View>
                <Text style={styles.label}> Age:</Text>
                <Select
                    defaultOption={user.age ? {value: user.age.toString(), label: user.age.toString()} : undefined}
                    options={ages} onSelect={(value) => {
                    const age = Number(value.value)
                    setUser({...user, age: age})
                }}
                    placeholderText="Select your age"
                    clearable={false}/>
            </View>
            <View>
                <Text style={styles.label}> Location:</Text>
                <Text> Location chooser?</Text>
            </View>

            <View>
                <Text style={styles.label}> Language:</Text>
                <Select
                    defaultOption={Language.getValueLabel(user.language)}
                    options={languages}
                    placeholderText="Select your language"
                    searchable={true}
                    onSelect={(value) => {
                        const language = Language.parse(value.value)
                        setUser({...user, language: language})
                    }}
                />
            </View>

            <View style={{flex: 1}}></View>
            <Pressable style={({pressed}) => [
                {
                    backgroundColor: pressed ? 'rgba(111,125,199,0.55)' : '#6f7dc7',
                },
                styles.button,
            ]}
                       onPress={handleSave}>
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