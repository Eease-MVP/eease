import {ScrollView, StyleSheet, Text, View} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import ViewWithTitle from "@/components/ViewWithTitle";
import {EeasyCard} from "@/components/EeasyCard";
import EeaseButton from "@/components/EeaseButton";

export default function ExploreReceptors() {
    const receptors: { [key: string]: string }[] = [
        {
            "name": "Receptor 1",
            "age": "22",
            "category": "Loss",
        },
        {
            "name": "Receptor 2",
            "age": "30",
            "category": "Loss",
        },
        {
            "name": "Receptor 3",
            "age": "25",
            "category": "Loneliness",
        },
        {
            "name": "Receptor 4",
            "age": "27",
            "category": "Loss",
        },
    ];

    return (
        <ViewWithTitle title="Explore Receptors">
            <ScrollView horizontal={true}
                        contentContainerStyle={{gap: 8, paddingHorizontal: 16}}>
                {receptors.map((receptor, index) => (
                    <View key={index} >
                        <EeasyCard style={{gap: 8, paddingVertical: 16, borderWidth: StyleSheet.hairlineWidth}} >
                            <View style={styles.innerReceptorContainer}>
                                <View>
                                    <Text style={styles.receptorName}>{receptor.name}</Text>
                                    <Text>Age: {receptor.age}</Text>
                                    <Text>Category: {receptor.category}</Text>
                                </View>
                                <View style={styles.rightContainer}>
                                    <AntDesign name="user" size={24} color="black"/>
                                </View>
                            </View>
                            <EeaseButton
                                onPress={() =>{}}
                                title="Connect"
                            buttonStyle={{width: "100%"}}/>
                        </EeasyCard>
                    </View>
                ))}
            </ScrollView>
        </ViewWithTitle>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    receptor: {
        margin: 10,
        padding: 15,
        borderRadius: 25,
        backgroundColor: "#ECECEC",
        width: 200,
        height: 170,
        justifyContent: 'space-between',
    },
    innerReceptorContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    rightContainer: {
        padding: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 100,
    },
    connectBtnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        flex: 1,
    },
    connectBtn: {
        padding: 10,
        backgroundColor: "#C7C7C7",
        borderRadius: 25,
        width: "70%",
        alignItems: "center",
    },
    receptorName: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 10,
    },
    containerTitle: {
        textAlign: "center",
        fontSize: 25,
        marginBottom: 20,
    },
});
