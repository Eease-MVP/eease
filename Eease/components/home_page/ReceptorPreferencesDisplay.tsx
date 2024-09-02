import React, {useState} from 'react';
import {Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import {EeasyCard} from "@/components/EeasyCard";
import EeaseButton from "@/components/EeaseButton";

const categoryInfo: { [key: string]: string } = {
    'Body-related': 'Information about body-related issues.',
    'Loss': 'Information about dealing with loss.',
    'Loneliness, exclusion and belonging': 'Information about loneliness, exclusion, and belonging.',
    'Finances, work and studies': 'Information about finances, work, and studies.',
    'Relationships': 'Information about relationships.',
    'Mental health': 'Information about mental health.',
};

export default function ReceptorPreferencesDisplay() {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const handleInfoPress = (category: string) => {
        setSelectedCategory(category);
        setModalVisible(true);
    };

    return (
        <EeasyCard style={{gap: 8}}>
            <View style={styles.textContainer}>
                <Text style={styles.leftText}>Receptor preferences</Text>
                <TouchableOpacity>
                    <Text style={styles.rightText}>More information</Text>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal={true}
                        contentContainerStyle={{gap: 8}}
                        style={styles.categories}>
                {Object.keys(categoryInfo).map(category => (
                    <View style={styles.textCategoryContainer} key={category}>
                        <Text style={styles.categoryText}>{category}</Text>
                        <TouchableOpacity onPress={() => handleInfoPress(category)}>
                            <AntDesign name="questioncircleo" size={15} color="black"/>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>{selectedCategory} information!</Text>
                        <Text style={styles.modalText}>{categoryInfo[selectedCategory]}</Text>
                        <EeaseButton onPress={() => setModalVisible(false)} title="OK"/>
                    </View>
                </View>
            </Modal>
        </EeasyCard>
    );
}

const styles = StyleSheet.create({
    textContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        width: '100%',
    },
    leftText: {
        textAlign: 'left',
        fontSize: 16,
    },
    rightText: {
        textAlign: 'right',
        textDecorationLine: "underline",
    },
    categories: {
        flexGrow: 0,
    },
    textCategoryContainer: {
        borderRadius: 25,
        padding: 10,
        borderWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: 'center',
    },
    categoryText: {
        marginRight: 5,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
