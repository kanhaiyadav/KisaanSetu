// hooks/useAuthState.ts
import { useState } from "react";
import { useAuth } from "../contexts/authContext";
import { ConfirmationResult } from "firebase/auth";
import { useNavigate } from "react-router";
import { setUser } from "@/redux/user/user.slice";
import { useDispatch } from "react-redux";
import { createUserDoc } from "@/lib/user";
import { toast } from "react-toastify";

interface AuthState {
    loading: boolean;
    error: string | null;
    success: string | null;
}

interface PhoneAuthState extends AuthState {
    confirmationResult: ConfirmationResult | null;
    codeSent: boolean;
}

export const useAuthState = () => {
    const [state, setState] = useState<AuthState>({
        loading: false,
        error: null,
        success: null,
    });

    const clearState = () => {
        setState({ loading: false, error: null, success: null });
    };

    const setLoading = (loading: boolean) => {
        setState((prev) => ({ ...prev, loading }));
    };

    const setError = (error: string) => {
        setState((prev) => ({ ...prev, error, loading: false }));
    };

    const setSuccess = (success: string) => {
        setState((prev) => ({ ...prev, success, loading: false }));
    };

    return {
        ...state,
        clearState,
        setLoading,
        setError,
        setSuccess,
    };
};

export const useEmailAuth = () => {
    const dispatch = useDispatch();
    const auth = useAuth();
    const { setLoading, setError, setSuccess, ...state } = useAuthState();
    const navigate = useNavigate();

    const handleSignup = async (
        email: string,
        password: string,
        displayName?: string
    ) => {
        try {
            setLoading(true);
            await auth.signup(email, password, displayName);
            await createUserDoc({
                type: 'farmer',
                displayName,
                email,
                phoneNumber: auth.currentUser?.phoneNumber || undefined,
            })
            setSuccess(
                "Account created successfully! Please check your email for verification."
            );
            toast.success("Account created successfully! Please check your email for verification.");
            navigate("/signin");
        } catch (error: any) {
            setError(getErrorMessage(error));
        }
    };

    const handleLogin = async (email: string, password: string) => {
        try {
            setLoading(true);
            await auth.login(email, password);
            setSuccess("Logged in successfully!");  
            toast.success("Logged in successfully!");
            navigate("/farmer");
        } catch (error: any) {
            setError(getErrorMessage(error));
        }
    };

    const handleResetPassword = async (email: string) => {
        try {
            setLoading(true);
            await auth.resetPassword(email);
            setSuccess("Password reset email sent!");
            toast.success("Password reset email sent!");
        } catch (error: any) {
            setError(getErrorMessage(error));
        }
    };

    return {
        ...state,
        handleSignup,
        handleLogin,
        handleResetPassword,
        setLoading,
        setError,
        setSuccess,
    };
};

export const useGoogleAuth = () => {
    const auth = useAuth();
    const { setLoading, setError, setSuccess, ...state } = useAuthState();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);
            const result = await auth.signInWithGoogle();
            //@ts-ignore
            await auth.createUserDoc({
                type: 'farmer',
                displayName: result.user.displayName,
                email: result.user.email,
                phoneNumber: result.user.phoneNumber,
            });
            setSuccess("Signed in with Google successfully!");
            toast.success("Signed in with Google successfully!");
            navigate("/farmer"); 
        } catch (error: any) {
            setError(getErrorMessage(error));
        }
    };

    return {
        ...state,
        setLoading,
        setError,
        setSuccess,
        handleGoogleSignIn,
    };
};

export const usePhoneAuth = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [state, setState] = useState<PhoneAuthState>({
        loading: false,
        error: null,
        success: null,
        confirmationResult: null,
        codeSent: false,
    });
    const [timer, setTimer] = useState<number>(60);

    const startTimer = () => {
        setTimer(60);
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }

    const clearState = () => {
        setState({
            loading: false,
            error: null,
            success: null,
            confirmationResult: null,
            codeSent: false,
        });
    };

    const sendCode = async (phoneNumber: string) => {
        try {
            setState((prev) => ({ ...prev, loading: true, error: null }));

            // Setup reCAPTCHA
            auth.setupRecaptcha("recaptcha-container");

            const confirmationResult = await auth.signInWithPhone(phoneNumber);

            setState((prev) => ({
                ...prev,
                loading: false,
                confirmationResult,
                codeSent: true,
                success: "Verification code sent!",
            }));
            toast.success("Verification code sent successfully!");
            startTimer();
        } catch (error: any) {
            console.error("Error sending verification code:", error);
            setState((prev) => ({
                ...prev,
                loading: false,
                error: getErrorMessage(error),
            }));
            toast.error(getErrorMessage(error));
        }
    };

    const verifyCode = async (code: string) => {
        if (!state.confirmationResult) {
            setState((prev) => ({
                ...prev,
                error: "No confirmation result available",
            }));
            toast.error("No confirmation result available");
            return;
        }

        try {
            setState((prev) => ({ ...prev, loading: true, error: null }));
            await auth.verifyPhoneCode(state.confirmationResult, code);
            setState((prev) => ({
                ...prev,
                loading: false,
                success: "Phone number verified successfully!",
            }));
            toast.success("Phone number verified successfully!");
            navigate("/farmer"); // Redirect to dashboard or desired page
        } catch (error: any) {
            setState((prev) => ({
                ...prev,
                loading: false,
                error: getErrorMessage(error),
            }));
        }
    };

    const setLoading = (loading: boolean) => {
        setState((prev) => ({ ...prev, loading }));
    }
    const setError = (error: string) => {
        setState((prev) => ({ ...prev, error, loading: false }));
    };
    const setSuccess = (success: string) => {
        setState((prev) => ({ ...prev, success, loading: false }));
    };

    return {
        ...state,
        timer,
        startTimer,
        setTimer,
        sendCode,
        verifyCode,
        clearState,
        setLoading,
        setError,
        setSuccess,
    };
};

// Error message helper
const getErrorMessage = (error: any): string => {
    switch (error.code) {
        case "auth/user-not-found":
            return "No user found with this email address.";
        case "auth/wrong-password":
            return "Incorrect password.";
        case "auth/email-already-in-use":
            return "Email address is already in use.";
        case "auth/weak-password":
            return "Password should be at least 6 characters.";
        case "auth/invalid-email":
            return "Invalid email address.";
        case "auth/user-disabled":
            return "User account has been disabled.";
        case "auth/too-many-requests":
            return "Too many requests. Please try again later.";
        case "auth/operation-not-allowed":
            return "Operation not allowed. Please contact support.";
        case "auth/invalid-phone-number":
            return "Invalid phone number format.";
        case "auth/invalid-verification-code":
            return "Invalid verification code.";
        case "auth/code-expired":
            return "Verification code has expired.";
        case "auth/popup-closed-by-user":
            return "Sign-in popup was closed before completing.";
        case "auth/cancelled-popup-request":
            return "Sign-in popup was cancelled.";
        default:
            return error.message || "An error occurred. Please try again.";
    }
};
