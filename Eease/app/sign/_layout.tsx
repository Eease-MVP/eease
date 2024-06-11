import React from 'react';
import {useColorScheme} from '@/hooks/useColorScheme';
import SignInUpScreen from "@/app/sign/index";


export default function SignLayout() {
    const colorScheme = useColorScheme();

    return <SignInUpScreen/>;
}
