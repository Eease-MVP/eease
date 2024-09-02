import AppTitle from "../../components/sign/AppTitle"
import RecGallery from "../../components/sign/RecGallery"
import SignInUpButtons from "../../components/sign/SignInUpButtons"
import EeaseBackground from "@/components/EeaseBackground";


export default function WelcomeScreen() {
    return (
        <EeaseBackground>
            <AppTitle/>
            <RecGallery/>
            <SignInUpButtons/>
        </EeaseBackground>
    )
}