import {Alert, Button, Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import {useState} from "react"
import TextInputWithTitle from "@/components/sign_up/TextInputWithTitle"
import {Select} from "@mobile-reality/react-native-select-pro"
import DateTimePicker from "@react-native-community/datetimepicker"
import {Link, useRouter} from "expo-router"
import {Gender, genders, GenderUtils, Language, languages as allLangs, LanguageUtils} from "@/constants/ProfileInfo"
import {useFetchUserQuery, User, useUpdateUserMutation} from "@/store/user-api"

const maximumDate = () => {
    const currentDate = new Date()
    currentDate.setFullYear(currentDate.getFullYear() - 18)
    return currentDate
}

export default function CreateUser() {
    const {data: user, error: fetchError, isLoading: isFetching} = useFetchUserQuery()
    const [updateUser, {isLoading: isUpdating, error: updateError, isSuccess}] = useUpdateUserMutation()
    const router = useRouter()


    const [formData, setFormData] = useState({
        name: user?.name ?? "",
        gender: user?.gender,
        birthDate: user?.birthDate ? new Date(user.birthDate) : null,
        languages: new Set<Language>(user?.languages),
    })

    const [showDatePicker, setShowDatePicker] = useState(false)
    const [toggleCheckBoxTerms, setToggleCheckBoxTerms] = useState(false)
    const [toggleCheckBoxNewsletter, setToggleCheckBoxNewsletter] = useState(false)

    const handleInputChange = (key: string, value: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }))
    }

    const next = async () => {
        const {name, gender, birthDate, languages} = formData
        if (name.length > 0 && gender && birthDate && languages.size > 0 && toggleCheckBoxTerms) {
            const user: User = {
                name: name,
                gender: gender,
                birthDate: birthDate.toDateString(),
                languages: Array.from(languages),
            }
            const {data, error} = await updateUser(user)
            if (error) {
                console.warn(error)
            } else {
                console.log(data)
                router.navigate("sign_up/ReceptorPreferences")
            }
        } else {
            showAlert()
        }
    }

    const showAlert = () => {
        Alert.alert(
            "Error",
            "You have to fill all the fields and agree to the terms and conditions.",
            [{text: "OK"}],
            {cancelable: true},
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <UserNameInput name={formData.name} onChange={handleInputChange}/>
            <GenderSelector gender={formData.gender} onChange={handleInputChange}/>
            <DatePicker birthDate={formData.birthDate} showDatePicker={showDatePicker} setShowDatePicker={setShowDatePicker} onChange={handleInputChange}/>
            <LanguageSelector languages={formData.languages} onChange={handleInputChange}/>
            <NewsletterCheckBox checked={toggleCheckBoxNewsletter} onChange={() => setToggleCheckBoxNewsletter(!toggleCheckBoxNewsletter)}/>
            <TermsCheckBox checked={toggleCheckBoxTerms} onChange={() => setToggleCheckBoxTerms(!toggleCheckBoxTerms)}/>
            <View style={{flex: 1}}></View>
            <Pressable style={({pressed}) => [{backgroundColor: pressed ? "rgba(111,125,199,0.55)" : "#6f7dc7"}, styles.button]} onPress={next}>
                <Text style={styles.buttonText}>Next</Text>
            </Pressable>
        </View>
    )
}
type UserNameInputProps = { name: string, onChange: (key: string, value: any) => void }

function UserNameInput({name, onChange}: UserNameInputProps) {
    return (
        <TextInputWithTitle
            title={"Username"}
            value={name}
            onChangeValue={(value) => onChange("name", value)}
            placeholder={"Type your username here..."}
        />
    )
}

type GenderSelectorProps = { gender: Gender | undefined, onChange: (key: string, value: any) => void }

function GenderSelector({gender, onChange}: GenderSelectorProps) {
    return (
        <View>
            <Text style={styles.label}>Gender:</Text>
            <Select
                defaultOption={GenderUtils.getValueLabel(gender)}
                options={genders}
                onSelect={(value) => {
                    const gender = GenderUtils.parse(value.value)
                    onChange("gender", gender)
                }}
                placeholderText="Select your gender"
                clearable={false}
            />
        </View>
    )
}

type DatePickerProps = { birthDate: Date | null, showDatePicker: boolean, setShowDatePicker: (show: boolean) => void, onChange: (key: string, value: any) => void }

function DatePicker({birthDate, showDatePicker, setShowDatePicker, onChange}: DatePickerProps) {
    return (
        <View>
            <Text style={styles.label}>Birthday: {birthDate && birthDate.toDateString()}</Text>
            <Button title={"Show date picker"} onPress={() => setShowDatePicker(true)}/>
            {showDatePicker && (
                <DateTimePicker
                    maximumDate={maximumDate()}
                    value={birthDate ?? maximumDate()}
                    onChange={(_, date) => {
                        setShowDatePicker(false)
                        onChange("birthDate", date)
                    }}
                />
            )}
        </View>
    )
}

type LanguageSelectorProps = { languages: Set<Language>, onChange: (key: string, value: any) => void }

function LanguageSelector({languages, onChange}: LanguageSelectorProps) {
    return (
        <View>
            <Text style={styles.label}>Language:</Text>
            <Select
                defaultOption={{value: "12", label: " "}}
                options={allLangs}
                placeholderText="Select your language"
                searchable={true}
                onSelect={(value) => {
                    const language = LanguageUtils.parse(value.value)
                    onChange("languages", new Set(languages).add(language))
                }}
                multiple={true}
            />
        </View>
    )
}

type CheckBoxProps = { checked: boolean, onChange: () => void }

function NewsletterCheckBox({checked, onChange}: CheckBoxProps) {
    return (
        <View style={styles.checkboxContainer}>
            <TouchableOpacity style={styles.checkBox} onPress={onChange}>
                {checked && <Text>✓</Text>}
            </TouchableOpacity>
            <Text style={styles.checkboxText}>I want to receive the newsletter</Text>
        </View>
    )
}

function TermsCheckBox({checked, onChange}: CheckBoxProps) {
    return (
        <View style={styles.checkboxContainer}>
            <TouchableOpacity style={styles.checkBox} onPress={onChange}>
                {checked && <Text>✓</Text>}
            </TouchableOpacity>
            <Text style={styles.checkboxText}>
                I agree to the{" "}
                <Link href="/sign_up/termsPage" asChild={true}>
                    <Pressable>
                        <Text style={styles.underlineText}>terms and conditions</Text>
                    </Pressable>
                </Link>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {fontSize: 32, fontWeight: "bold"},
    container: {flex: 1, padding: 16, backgroundColor: "#fff", gap: 16},
    label: {fontSize: 14},
    input: {borderColor: "#ccc", borderWidth: 1, padding: 8},
    button: {alignSelf: "center", alignItems: "center", justifyContent: "center", borderRadius: 10, paddingVertical: 8, paddingHorizontal: 16},
    buttonText: {color: "#fff", fontSize: 16},
    checkBox: {width: 20, height: 20, borderRadius: 5, borderWidth: 1, borderColor: "#000"},
    checkboxContainer: {flexDirection: "row", alignItems: "center", marginTop: 20},
    checkboxText: {marginLeft: 10},
    underlineText: {textDecorationLine: "underline"},
})
