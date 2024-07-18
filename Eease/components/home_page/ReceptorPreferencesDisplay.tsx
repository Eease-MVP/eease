import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const categoryInfo: { [key: string]: string } = {
    'Body-related': 'Information about body-related issues.',
    'Loss': 'Information about dealing with loss.',
    'Loneliness, exclusion and belonging': 'Information about loneliness, exclusion, and belonging.',
    'Finances, work and studies': 'Information about finances, work, and studies.',
    'Relationships': 'Information about relationships.',
    'Mental health': 'Information about mental health.'
};

export default function ReceptorPreferencesDisplay() {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const handleInfoPress = (category: string) => {
        setSelectedCategory(category);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.leftText}>Receptor preferences</Text>
                <TouchableOpacity>
                    <Text style={styles.rightText}>More information</Text>
                </TouchableOpacity>
            </View>
            <ScrollView horizontal={true} style={styles.categories}>
                {Object.keys(categoryInfo).map(category => (
                    <View style={styles.textCategoryContainer} key={category}>
                        <Text style={styles.categoryText}>{category}</Text>
                        <TouchableOpacity onPress={() => handleInfoPress(category)}>
                            <AntDesign name="questioncircleo" size={15} color="black" />
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
                        <Text style={styles.modalText}>{selectedCategory} Information</Text>
                        <Text style={styles.modalText}>{categoryInfo[selectedCategory]}</Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ECECEC", 
        alignItems: 'center',
        padding: 20,
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 5
    },
    textContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        width: '100%'
    },
    leftText: {
        textAlign: 'left',
        fontSize: 16
    },
    rightText: {
        textAlign: 'right',
        textDecorationLine: "underline"
    },
    categories: {
        marginTop: 10,
        width: '110%'
    },
    textCategoryContainer: {
        backgroundColor: "#C7C7C7",
        borderRadius: 25,
        padding: 10,
        flexDirection: "row",
        marginRight: 15,
        alignItems: 'center'
    },
    categoryText: {
        marginRight: 5
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
    }
});
