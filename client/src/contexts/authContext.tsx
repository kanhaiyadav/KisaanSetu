import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    User,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithPhoneNumber,
    RecaptchaVerifier,
    ConfirmationResult,
    updateProfile,
    sendEmailVerification,
    sendPasswordResetEmail,
    UserCredential,
} from 'firebase/auth';
import { auth } from '@/firebase/firebase';
import { useDispatch } from 'react-redux';
import { resetUser, setUser } from '@/redux/user/user.slice';

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    // Email/Password methods
    signup: (email: string, password: string, displayName?: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    // Google auth
    signInWithGoogle: () => Promise<UserCredential>;
    // Phone auth (updated)
    setupRecaptcha: (elementId: string) => void;
    signInWithPhone: (phoneNumber: string) => Promise<ConfirmationResult>;
    signUpWithPhone: (displayName: string, phoneNumber: string) => Promise<ConfirmationResult>;
    verifyPhoneCode: (confirmationResult: ConfirmationResult, code: string) => Promise<void>;
    // Profile methods
    updateUserProfile: (displayName?: string, photoURL?: string) => Promise<void>;
    sendVerificationEmail: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    // Email/Password Authentication
    const signup = async (email: string, password: string, displayName?: string) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (displayName) {
            await updateProfile(userCredential.user, { displayName });
        }
        await sendEmailVerification(userCredential.user);
    };

    const login = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    const logout = async () => {
        await signOut(auth);
        dispatch(resetUser());
    };

    const resetPassword = async (email: string) => {
        await sendPasswordResetEmail(auth, email);
    };

    // Google Authentication
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');

        const result = await signInWithPopup(auth, provider);
        return result;
    };

    // Phone Authentication
    const setupRecaptcha = (elementId: string) => {
        if (!(window as any).recaptchaVerifier) {
            (window as any).recaptchaVerifier = new RecaptchaVerifier(
                auth,
                elementId,
                {
                    size: 'invisible',
                    callback: () => {
                        // reCAPTCHA solved
                    },
                    'expired-callback': () => {
                        // Response expired
                    },
                }
            );
        }
    };

    const signInWithPhone = async (phoneNumber: string): Promise<ConfirmationResult> => {
        const recaptchaVerifier = (window as any).recaptchaVerifier;
        if (!recaptchaVerifier) {
            throw new Error('reCAPTCHA not initialized');
        }
        return await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    };

    const signUpWithPhone = async (displayName: string, phoneNumber: string): Promise<ConfirmationResult> => {
        const recaptchaVerifier = (window as any).recaptchaVerifier;
        if (!recaptchaVerifier) {
            throw new Error('reCAPTCHA not initialized');
        }
        return await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    };

    const verifyPhoneCode = async (confirmationResult: ConfirmationResult, code: string) => {
        await confirmationResult.confirm(code);
    };

    // Profile methods
    const updateUserProfile = async (displayName?: string, photoURL?: string) => {
        if (!currentUser) throw new Error('No user logged in');
        await updateProfile(currentUser, {
            ...(displayName && { displayName }),
            ...(photoURL && { photoURL }),
        });
    };

    const sendVerificationEmail = async () => {
        if (!currentUser) throw new Error('No user logged in');
        await sendEmailVerification(currentUser);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        const getUserData = async () => {
            const queryParam = currentUser?.email ? `email=${currentUser.email}` : `phone=${currentUser?.phoneNumber}`;
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users?${queryParam}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const resJson = await res.json();
            if (!res.ok) {
                throw new Error(resJson.message || "Failed to fetch user profile");
            }
            dispatch(setUser(resJson.data.userData));
        }
        if (currentUser) {
            getUserData();
        }
    }, [currentUser])

    const value: AuthContextType = {
        currentUser,
        loading,
        signup,
        login,
        logout,
        resetPassword,
        signInWithGoogle,
        setupRecaptcha,
        signInWithPhone,
        signUpWithPhone,
        verifyPhoneCode,
        updateUserProfile,
        sendVerificationEmail,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};