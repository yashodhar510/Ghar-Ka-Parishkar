import { auth } from "./firebase-config.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    onAuthStateChanged,
    signOut
} from "firebase/auth";

// --- UI Helpers ---
const showError = (elementId, message) => {
    const el = document.getElementById(elementId);
    if (el) {
        el.textContent = message;
        el.classList.remove('hidden');
        el.classList.add('animate-shake'); // Custom animation
        setTimeout(() => el.classList.remove('animate-shake'), 500);
    }
};

const clearError = (elementId) => {
    const el = document.getElementById(elementId);
    if (el) el.classList.add('hidden');
};

const setLoading = (btnId, isLoading, text = 'Loading...') => {
    const btn = document.getElementById(btnId);
    if (!btn) return;

    if (isLoading) {
        btn.disabled = true;
        btn.dataset.originalText = btn.innerHTML;
        btn.innerHTML = `<i class="fas fa-circle-notch fa-spin mr-2"></i> ${text}`;
        btn.classList.add('opacity-75', 'cursor-not-allowed');
    } else {
        btn.disabled = false;
        btn.innerHTML = btn.dataset.originalText || 'Submit';
        btn.classList.remove('opacity-75', 'cursor-not-allowed');
    }
};

// --- Auth Functions ---

export const loginAdmin = async (email, password) => {
    try {
        setLoading('login-btn', true, 'Signing In...');
        clearError('auth-error');

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Successful login
        console.log("Admin logged in:", userCredential.user.email);
        window.location.href = "/admin/dashboard.html"; // Redirect to dashboard (to be created or just placeholder)
        // For now, let's redirect to index.html or stay if dashboard doesn't exist.
        // The prompt says "Ready to plug into an Admin Dashboard later". 
        // I'll make a placeholder dashboard.html.

    } catch (error) {
        console.error("Login error:", error.code, error.message);
        let msg = "Invalid email or password.";
        if (error.code === 'auth/too-many-requests') msg = "Too many failed attempts. Try again later.";
        showError('auth-error', msg);
    } finally {
        setLoading('login-btn', false);
    }
};

export const registerAdmin = async (email, password) => {
    try {
        setLoading('signup-btn', true, 'Creating Account...');
        clearError('auth-error');

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Admin created:", userCredential.user.email);

        // Show success and redirect
        const successEl = document.getElementById('auth-success');
        if (successEl) {
            successEl.classList.remove('hidden');
            setTimeout(() => {
                window.location.href = "/admin/login.html";
            }, 2000);
        } else {
            window.location.href = "/admin/login.html";
        }

    } catch (error) {
        console.error("Signup error:", error.code, error.message);
        let msg = "Failed to create account.";
        if (error.code === 'auth/email-already-in-use') msg = "This email is already registered.";
        if (error.code === 'auth/weak-password') msg = "Password should be at least 6 characters.";
        showError('auth-error', msg);
    } finally {
        setLoading('signup-btn', false);
    }
};

export const resetAdminPassword = async (email) => {
    try {
        setLoading('reset-btn', true, 'Sending...');
        clearError('reset-error');

        await sendPasswordResetEmail(auth, email);
        const successEl = document.getElementById('reset-success');
        if (successEl) successEl.classList.remove('hidden');

    } catch (error) {
        console.error("Reset error:", error.code);
        showError('reset-error', "Failed to send reset email. Check the address.");
    } finally {
        setLoading('reset-btn', false);
    }
};

export const logoutAdmin = async () => {
    try {
        await signOut(auth);
        window.location.href = "/admin/login.html";
    } catch (error) {
        console.error("Logout error", error);
    }
};

// Monitor Auth State
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, check if we are on login/signup pages and redirect?
        // Maybe not, aggressive redirects can be annoying during dev.
        // But for production admin:
        const path = window.location.pathname;
        if (path.includes('login.html') || path.includes('signup.html')) {
            // window.location.href = "/admin/dashboard.html"; 
        }
    } else {
        // User is signed out
        const path = window.location.pathname;
        if (path.includes('dashboard.html')) {
            window.location.href = "/admin/login.html";
        }
    }
});
