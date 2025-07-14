import { User } from "firebase/auth";

export interface UserProfile {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    phoneNumber: string | null;
    emailVerified: boolean;
    isAnonymous: boolean;
    providers: string[];
    createdAt: string;
    lastSignInTime: string;
}

export const createUserDoc = async (user: {
    type: string;
    displayName?: string;
    email?: string;
    phoneNumber?: string;
}) => {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            type: user.type,
            name: user.displayName,
            ...(user.email && { email: user.email }),
            ...(user.phoneNumber && { phone: user.phoneNumber }),
        }),
    });
    const resJson = await res.json();
    if (!res.ok) {
        throw new Error(resJson.message || "Failed to create user profile");
    }
};

export const getUserDoc = async (email?: string, phone?: string) => {
    const queryParam = email
        ? `email=${email}`
        : `phone=${encodeURIComponent(phone || "")}`;
    const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/users?${queryParam}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    const resJson = await res.json();
    if (!res.ok) {
        return {
            error: resJson.message || "Failed to fetch user profile",
        };
    }
    return {
        error: null,
        data: resJson.data.userData,
    };
};

export const formatUserProfile = (user: User): UserProfile => {
    return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber,
        emailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
        providers: user.providerData.map((provider) => provider.providerId),
        createdAt: user.metadata.creationTime || "",
        lastSignInTime: user.metadata.lastSignInTime || "",
    };
};

export const getUserInitials = (user: User | null): string => {
    if (!user) return "U";

    if (user.displayName) {
        return user.displayName
            .split(" ")
            .map((name) => name.charAt(0))
            .join("")
            .toUpperCase()
            .slice(0, 2);
    }

    if (user.email) {
        return user.email.charAt(0).toUpperCase();
    }

    return "U";
};

export const getAuthProvider = (user: User | null): string => {
    if (!user) return "unknown";

    const providers = user.providerData.map((provider) => provider.providerId);

    if (providers.includes("google.com")) return "google";
    if (providers.includes("phone")) return "phone";
    if (providers.includes("password")) return "email";

    return "unknown";
};

export const isEmailProvider = (user: User | null): boolean => {
    if (!user) return false;
    return user.providerData.some(
        (provider) => provider.providerId === "password"
    );
};

export const isGoogleProvider = (user: User | null): boolean => {
    if (!user) return false;
    return user.providerData.some(
        (provider) => provider.providerId === "google.com"
    );
};

export const isPhoneProvider = (user: User | null): boolean => {
    if (!user) return false;
    return user.providerData.some(
        (provider) => provider.providerId === "phone"
    );
};

export const formatPhoneNumber = (phoneNumber: string): string => {
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, "");

    // Add country code if not present
    if (cleaned.length === 10) {
        return `+1${cleaned}`;
    }

    if (cleaned.length === 11 && cleaned.startsWith("1")) {
        return `+${cleaned}`;
    }

    if (!cleaned.startsWith("+")) {
        return `+${cleaned}`;
    }

    return cleaned;
};

export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (
    password: string
): {
    isValid: boolean;
    errors: string[];
} => {
    const errors: string[] = [];

    if (password.length < 6) {
        errors.push("Password must be at least 6 characters long");
    }

    if (!/[A-Z]/.test(password)) {
        errors.push("Password must contain at least one uppercase letter");
    }

    if (!/[a-z]/.test(password)) {
        errors.push("Password must contain at least one lowercase letter");
    }

    if (!/\d/.test(password)) {
        errors.push("Password must contain at least one number");
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
};

export const validatePhoneNumber = (phoneNumber: string): boolean => {
    const cleaned = phoneNumber.replace(/\D/g, "");
    return cleaned.length >= 10 && cleaned.length <= 15;
};

// Storage keys for persisting auth state
export const AUTH_STORAGE_KEYS = {
    REMEMBER_EMAIL: "auth_remember_email",
    LAST_SIGN_IN_METHOD: "auth_last_sign_in_method",
    REDIRECT_URL: "auth_redirect_url",
} as const;

// Helper to store auth preferences
export const setAuthPreference = (
    key: keyof typeof AUTH_STORAGE_KEYS,
    value: string
): void => {
    try {
        localStorage.setItem(AUTH_STORAGE_KEYS[key], value);
    } catch (error) {
        console.warn("Failed to save auth preference:", error);
    }
};

// Helper to get auth preferences
export const getAuthPreference = (
    key: keyof typeof AUTH_STORAGE_KEYS
): string | null => {
    try {
        return localStorage.getItem(AUTH_STORAGE_KEYS[key]);
    } catch (error) {
        console.warn("Failed to get auth preference:", error);
        return null;
    }
};

// Helper to clear auth preferences
export const clearAuthPreferences = (): void => {
    try {
        Object.values(AUTH_STORAGE_KEYS).forEach((key) => {
            localStorage.removeItem(key);
        });
    } catch (error) {
        console.warn("Failed to clear auth preferences:", error);
    }
};

// Error messages mapping
export const AUTH_ERROR_MESSAGES = {
    "auth/user-not-found": "No account found with this email address.",
    "auth/wrong-password": "Incorrect password.",
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/invalid-email": "Invalid email address.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/too-many-requests":
        "Too many failed attempts. Please try again later.",
    "auth/operation-not-allowed": "This operation is not allowed.",
    "auth/invalid-phone-number": "Invalid phone number format.",
    "auth/invalid-verification-code": "Invalid verification code.",
    "auth/code-expired": "Verification code has expired.",
    "auth/session-expired": "Session has expired. Please sign in again.",
    "auth/popup-closed-by-user": "Sign-in popup was closed.",
    "auth/popup-blocked": "Sign-in popup was blocked by the browser.",
    "auth/cancelled-popup-request": "Another popup is already open.",
    "auth/network-request-failed":
        "Network error. Please check your connection.",
    "auth/internal-error": "Internal error. Please try again.",
    "auth/invalid-api-key": "Invalid API key.",
    "auth/app-deleted": "Firebase app has been deleted.",
    "auth/app-not-authorized":
        "App not authorized to use Firebase Authentication.",
    "auth/argument-error": "Invalid argument provided.",
    "auth/invalid-user-token": "User token is invalid.",
    "auth/user-token-expired": "User token has expired.",
    "auth/null-user": "No user currently signed in.",
    "auth/invalid-credential": "Invalid credential provided.",
    "auth/account-exists-with-different-credential":
        "Account exists with different credential.",
    "auth/credential-already-in-use": "Credential is already in use.",
    "auth/timeout": "Operation timed out. Please try again.",
} as const;

export const getAuthErrorMessage = (errorCode: string): string => {
    return (
        AUTH_ERROR_MESSAGES[errorCode as keyof typeof AUTH_ERROR_MESSAGES] ||
        "An unexpected error occurred."
    );
};
