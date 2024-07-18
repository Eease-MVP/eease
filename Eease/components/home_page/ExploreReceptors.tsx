import { StyleSheet, Text, View, ScrollView } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function ExploreReceptors() {
    const receptors: { [key: string]: string }[] = [
        {
            "name": "Receptor 1",
            "age": "22",
            "category": "Loss"
        },
        {
            "name": "Receptor 2",
            "age": "30",
            "category": "Loss"
        },
        {
            "name": "Receptor 3",
            "age": "25",
            "category": "Loneliness"
        },
        {
            "name": "Receptor 4",
            "age": "27",
            "category": "Loss"
        }
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.containerTitle}>Explore receptors</Text>
            <ScrollView horizontal={true} style={styles.scrollView}>
                {receptors.map((receptor, index) => (
                    <View key={index} style={styles.receptor}>
                        <View style={styles.innerReceptorContainer}>
                            <View>
                                <Text style={styles.receptorName}>{receptor.name}</Text>
                                <Text>Age: {receptor.age}</Text>
                                <Text>Category: {receptor.category}</Text>
                            </View>
                            <View style={styles.rightContainer}>                    
                                <AntDesign name="user" size={24} color="black" />                            
                            </View>
                        </View>
                        <View style={styles.connectBtnContainer}>
                            <View style={styles.connectBtn}>
                                <Text>Connect</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 10,
    },
    scrollView: {
        flexDirection: "row",
    },
    receptor: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        backgroundColor: "#ECECEC",
        width: 200,
        justifyContent: 'space-between',
    },
    innerReceptorContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    rightContainer: {
        marginLeft: "auto",
        backgroundColor: "#C7C7C7",
        padding: 10,
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
        marginBottom: 10
    },
    containerTitle: {
        textAlign: "center",
        fontSize: 25,
        marginBottom: 20
    }
});
