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
} from 'firebase/auth';
import { auth } from '@/firebase/firebase';

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    // Email/Password methods
    signup: (email: string, password: string, displayName?: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    // Google auth
    signInWithGoogle: () => Promise<void>;
    // Phone auth
    setupRecaptcha: (elementId: string) => void;
    signInWithPhone: (phoneNumber: string) => Promise<ConfirmationResult>;
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
    };

    const resetPassword = async (email: string) => {
        await sendPasswordResetEmail(auth, email);
    };

    // Google Authentication
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        await signInWithPopup(auth, provider);
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