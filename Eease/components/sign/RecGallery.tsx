import React, {useRef, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';

const {width} = Dimensions.get('window');

type RecItem = {
    id: number;
    text: string;
};

const recommendations: RecItem[] = [
    {
        id: 0,
        text: 'A common misconception is that feelings like anxiety, fear and worry are something that need to be "cured". But these feelings are as normal as being happy and content. There is nothing wrong with you, these feelings are part of being human.',
    },
    {
        id: 1,
        text: 'Through conversation and reciprocity, we can connect with others. To open up to someone else can be hard, but we want to help you along the way. Dare to show vulnerability and to trust.',
    },
    {
        id: 2, text: 'Help yourself by helping others.\n\n' +
            'Sharing is the new normal.',
    },
];

const RecGallery = () => {
    const galleryRef = useRef<ICarouselInstance>(null);
    const [interval, setInterval] = useState(3) // in seconds

    const renderItem = ({item}: { item: RecItem }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.text}>{item.text}</Text>
        </View>
    );


    return (
        <View style={styles.row}>
            <Carousel
                style={{height: 200}}
                ref={galleryRef}
                loop
                width={width}
                autoPlay={true}
                autoPlayInterval={interval * 1000}
                data={recommendations}
                scrollAnimationDuration={2 * 1000}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 1,
                    parallaxScrollingOffset: 0,
                    parallaxAdjacentItemScale: 0.5,
                }}
                renderItem={renderItem}
                onScrollBegin={() => setInterval(10)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 18,
        paddingHorizontal: 24,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default RecGallery;
