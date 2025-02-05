import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import * as SecureStore from 'expo-secure-store'
import {EnumUtils, Gender, Language} from "@/constants/ProfileInfo"
import {Platform} from 'react-native'

const ACCESS_TOKEN_KEY = 'access_token'

// Simplified base URL configuration
const getBaseUrl = () => {
    if (Platform.OS === 'android') {
        return 'http://10.0.2.2:8080/api'
    }
    return 'http://localhost:8080/api'
}

const BASE_URL = getBaseUrl()

// Simplified storage helper
const storage = Platform.OS === 'web' 
    ? {
        getItem: (key: string) => localStorage.getItem(key),
        setItem: (key: string, value: string) => localStorage.setItem(key, value),
        deleteItem: (key: string) => localStorage.removeItem(key),
    }
    : {
        getItem: (key: string) => SecureStore.getItemAsync(key),
        setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
        deleteItem: (key: string) => SecureStore.deleteItemAsync(key),
    }

export interface User {
    name: string
    gender: Gender
    birthDate: string
    languages: Language[]
    prefs?: {
        ageFrom: number
        ageTo: number
        genders: Gender[]
        placesToAvoid: string[]
    }
}

export interface Prefs {
    ageFrom: number
    ageTo: number
    genders: Array<Gender>
    placesToAvoid: Array<string>
}

export interface SignInResponse {
    accessToken: string
}

export interface SignInUpRequest {
    email: string
    password: string
}

interface UserJson {
    name: string
    gender: keyof typeof Gender
    birthDate: string
    languages: Array<keyof typeof Language>
    prefs?: {
        ageFrom: number
        ageTo: number
        genders: Array<keyof typeof Gender>
        placesToAvoid: Array<string>
    }
}

// Export the API
export const userApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: async (headers, {endpoint}) => {
            if (!['signUp', 'signIn'].includes(endpoint)) {
                const token = await storage.getItem(ACCESS_TOKEN_KEY)
                if (token) {
                    headers.set('authorization', `Bearer ${token}`)
                }
            }
            return headers
        },
    }),
    tagTypes: ['User'],
    endpoints: (builder) => ({
        signUp: builder.mutation<SignInResponse, SignInUpRequest>({
            query: (credentials) => ({
                url: '/auth/sign_up',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(_, {queryFulfilled}) {
                const {data} = await queryFulfilled
                await storage.setItem(ACCESS_TOKEN_KEY, data.accessToken)
            },
        }),
        signIn: builder.mutation<SignInResponse, SignInUpRequest>({
            query: (credentials) => ({
                url: '/auth/sign_in',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(_, {queryFulfilled}) {
                const {data} = await queryFulfilled
                await storage.setItem(ACCESS_TOKEN_KEY, data.accessToken)
            },
        }),
        fetchUser: builder.query<User, void>({
            query: () => '/user',
            providesTags: ['User'],
        }),
        updateUser: builder.mutation<User, User>({
            query: (user) => ({
                url: '/user',
                method: 'PUT',
                body: user,
            }),
            invalidatesTags: ['User'],
        }),
    }),
})

export const {
    useSignUpMutation,
    useSignInMutation,
    useFetchUserQuery,
    useUpdateUserMutation,
} = userApi

// Use this for JWT storage
export const JWT_STORAGE_KEY = process.env.EXPO_PUBLIC_JWT_STORAGE_KEY

