import { RootState, isFilled } from "@/store/user-slice";
import { Redirect } from "expo-router";
import { useSelector } from "react-redux";



export default function RedirectScreen() {
    const user = useSelector((state: RootState) => state.user)

    if (isFilled(user)) {
        return <Redirect href="(tabs)" />;
    } else {
        return <Redirect href="sign" />;
    }
}