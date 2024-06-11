import {ImageBackground, StyleSheet} from "react-native";
import AppTitle from "../../components/sign/AppTitle";
import RecGallery from "../../components/sign/RecGallery";
import SignInUpButtons from "../../components/sign/SignInUpButtons";

const background = require('../../assets/images/background.jpg');


export default function SignInUpScreen() {
    return (
        <ImageBackground source={background} style={styles.background}>
            <AppTitle/>
            <RecGallery/>
            <SignInUpButtons/>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
    },
});