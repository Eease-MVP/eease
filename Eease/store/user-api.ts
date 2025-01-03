import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import * as SecureStore from 'expo-secure-store'
import {EnumUtils, Gender, Language} from "@/constants/ProfileInfo"
import {ResultType} from "@remix-run/router/utils";

const ACCESS_TOKEN_KEY = 'access_token'
const BASE_URL = 'http://localhost:8080/api';
// for testing purpose. Uncomment if you want to clear all the data
// SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY)

export interface User {
    name: string
    gender: Gender
    birthDate: string
    languages: Array<Language>
    prefs?: Prefs
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

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers, {endpoint}) => {
        // add token, only for those methods that require authentication
        if (!['signUp', 'signIn'].includes(endpoint)) {
            const token = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY)
            if (token) headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    },
})
// Define our single API slice object
export const userApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQuery,
    tagTypes: ['User'],
    endpoints: builder => ({
        signUp: builder.mutation<void, SignInUpRequest>({
            query: (credentials) => ({
                url: '/auth/sign_up',
                method: 'POST',
                body: credentials,
            }),
        }),
        signIn: builder.mutation<SignInResponse, SignInUpRequest>({
            query: (credentials) => ({
                url: '/auth/sign_in',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(_, {queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled
                    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, data.accessToken)
                } catch (error) {
                    console.log('Sign-in failed:', error)
                }
            },
        }),
        fetchUser: builder.query<User, void>({
            query: () => '/user',
            keepUnusedDataFor: 1,
            transformResponse(json: UserJson) {
                return transformUserJsonToUser(json)
            },
            providesTags: ["User"],
        }),
        updateUser: builder.mutation<User, User>({
            query: (user) => ({
                url: '/user',
                method: 'POST',
                body: transformUserToUserJson(user),
            }),
            transformResponse(json: UserJson) {
                return transformUserJsonToUser(json)
            },
            invalidatesTags: ["User"],
        }),
    }),
})

const transformUserJsonToUser = (userJson: UserJson): User => {
    const gender = Gender[userJson.gender]
    const languages = userJson.languages.map(language => Language[language])
    const userPrefs = userJson.prefs
        ? {
            ...userJson.prefs,
            genders: userJson.prefs.genders.map(genderKey => Gender[genderKey]),
        }
        : undefined

    return {...userJson, gender, languages, prefs: userPrefs}
}
const transformUserToUserJson = (user: User): UserJson => {
    const gender = EnumUtils.getKeyOf(Gender, user.gender)
    const languages = user.languages.map(language => EnumUtils.getKeyOf(Language, language))
    const userPrefs = user.prefs
        ? {
            ...user.prefs,
            genders: user.prefs.genders.map(gender => EnumUtils.getKeyOf(Gender, gender)),
        }
        : undefined
    return {...user, gender, languages, prefs: userPrefs}
}

export const {
    useSignUpMutation,
    useSignInMutation,
    useFetchUserQuery,
    useUpdateUserMutation,
} = userApi

