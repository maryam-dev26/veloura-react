import { createContext, useContext, useState } from "react"

const API_URL = import.meta.env.VITE_API_URL

const AuthContext = createContext()

function isTokenExpired(token) {
    try {
        const base64 = token.split('.')[1].replace(/-/g, "+").replace(/_/g, "/")
        const payload = JSON.parse(atob(base64))
        return payload.exp * 1000 < Date.now()

    } catch (error) {
        return true
    }
}

function getStoredToken() {

    const token = localStorage.getItem('token')

    if (!token) {
        return null
    }

    if (isTokenExpired(token)) {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        return null
    }

    return token
}

function getStoredUser() {

    try {
        if (!getStoredToken()) {
            return null
        }
        const saved = localStorage.getItem('user')
        if (saved) {
            return JSON.parse(saved)
        }
        return null
    } catch (error) {
        console.error("Failed to load user from localStorage:", error)
        return null
    }
}

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => getStoredToken())

    const [user, setUser] = useState(() => getStoredUser())

    function saveSession(token, user) {
        setToken(token)
        setUser(user)
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(user))
    }

    function logout() {
        setToken(null)
        setUser(null)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    async function authRequest(path, body) {
        const res = await fetch(`${API_URL}/api/${path}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })

        const data = await res.json()
        if (!res.ok) {
            throw new Error(data.message)
        }

        saveSession(data.token, data.user)
    }

    async function login(email, password) {
        await authRequest('auth/login', { email, password })
    }

    async function signup(name, email, password) {
        await authRequest('auth/signup', { name, email, password })
    }

    const value = { user, token, isAuthenticated: !!token, login, signup, logout }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return ctx
}
