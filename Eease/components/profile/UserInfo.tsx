import {allGenders, allLanguages, EnumUtils, Gender, Language} from "@/constants/ProfileInfo"
import {StyleSheet, View} from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import React, {useState} from "react"
import DropdownSelect from "react-native-input-select/src"
import ViewWithTitle from "@/components/ViewWithTitle";
import TextInputWithTitle from "@/components/TextInputWithTitle";
import EeaseButton from "@/components/EeaseButton";


const maximumDate = () => {
    const currentDate = new Date()
    currentDate.setFullYear(currentDate.getFullYear() - 18)
    return currentDate
}

export type UserData = {
    name: string
    gender: Gender | undefined
    birthDate: Date | null
    languages: Language[]
}

type UserInfoProps = {
    userData: UserData
    onUserDataChange: (userData: UserData) => void
}

export function UserInfo({userData, onUserDataChange}: UserInfoProps) {

    const [showDatePicker, setShowDatePicker] = useState(false)
    const handleChange = (updatedFields: Partial<UserData>) => {
        onUserDataChange({
            ...userData,
            ...updatedFields,
        })
    }
    return (
        <View style={styles.container}>
            <UserNameInput
                name={userData.name}
                onNameChange={name => handleChange({name})}/>
            <GenderPicker
                gender={userData.gender}
                onGenderChange={gender => handleChange({gender})}/>
            <DatePicker
                birthDate={userData.birthDate}
                showDatePicker={showDatePicker}
                setShowDatePicker={setShowDatePicker}
                onBirthDateChange={birthDate => handleChange({birthDate})}/>
            <LanguagePicker
                selectedLanguages={userData.languages}
                onSelectedLanguagesChange={languages => handleChange({languages})}/>
        </View>
    )
}

type UserNameInputProps = {
    name: string,
    onNameChange: (name: string) => void
}

function UserNameInput({name, onNameChange}: UserNameInputProps) {
    return (
        <ViewWithTitle title={"Username"}>
            <TextInputWithTitle
                value={name}
                onChangeText={onNameChange}
                placeholder={"Type your username here..."}
            />
        </ViewWithTitle>
    )
}

type GenderSelectorProps = {
    gender: Gender | undefined,
    onGenderChange: (gender: Gender) => void
}

function GenderPicker({gender, onGenderChange}: GenderSelectorProps) {
    const genderValue = gender ? EnumUtils.getKeyOf(Gender, gender) : null
    return (
        <ViewWithTitle title="Your gender">
            <DropdownSelect
                dropdownStyle={{
                    paddingVertical: 12,
                    paddingHorizontal: 8,
                    minHeight: 40,
                }}
                dropdownIconStyle={{top: 20, right: 10}}
                options={allGenders}
                selectedValue={genderValue}
                onValueChange={(value: keyof typeof Gender) => {
                    onGenderChange(EnumUtils.parse(Gender, value))
                }}
                placeholder="Select your gender"
                primaryColor={'rgb(122,131,152)'}
            />
        </ViewWithTitle>
    )
}

type BirthDatePickerProps = {
    birthDate: Date | null,
    showDatePicker: boolean,
    setShowDatePicker: (show: boolean) => void,
    onBirthDateChange: (birthDate: Date) => void
}

function DatePicker({birthDate, showDatePicker, setShowDatePicker, onBirthDateChange}: BirthDatePickerProps) {
    return (
        <ViewWithTitle title="Your birth date">
            <EeaseButton
                title={birthDate ? birthDate.toDateString() : "Show date picker"}
                onPress={() => setShowDatePicker(true)}
                buttonStyle={{alignSelf: "auto"}}
            />
            {showDatePicker && (
                <DateTimePicker
                    display="inline"
                    accentColor={'#ff899a'}
                    textColor={'#ff899a'}
                    maximumDate={maximumDate()}
                    value={birthDate ?? maximumDate()}
                    onChange={(_, birthDate) => {
                        setShowDatePicker(false)
                        birthDate && onBirthDateChange(birthDate)
                    }}
                />
            )}
        </ViewWithTitle>
    )
}

type LanguageSelectorProps = {
    selectedLanguages: Language[],
    onSelectedLanguagesChange: (selectedLanguages: Language[]) => void
}

function LanguagePicker({selectedLanguages, onSelectedLanguagesChange}: LanguageSelectorProps) {

    const selectedLanguagesValues = selectedLanguages.map(lang => EnumUtils.getKeyOf(Language, lang))
    return (
        <ViewWithTitle title="Languages you speak:">
            <DropdownSelect
                dropdownStyle={{
                    paddingVertical: 12,
                    paddingHorizontal: 8,
                    minHeight: 40,
                }}
                dropdownIconStyle={{top: 20, right: 10}}
                placeholder="Select multiple languages..."
                options={allLanguages}
                selectedValue={selectedLanguagesValues}
                onValueChange={(languages: (keyof typeof Language)[]) => {
                    onSelectedLanguagesChange(languages.map(lang => EnumUtils.parse(Language, lang)))
                }}
                isMultiple
                isSearchable
                primaryColor={'rgb(122,131,152)'}
            />
        </ViewWithTitle>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 24,
    },
    label: {
        fontSize: 14,
        marginBottom: 8,
    },
    title: {
        alignItems: "center",
        fontSize: 16,
        fontWeight: "bold",
        justifyContent: "center",
        borderWidth: 1,
        textAlign: "center",
        backgroundColor: "#314E48",
        color: "white",
        padding: 16,
        borderRadius: 10,
    },
})

