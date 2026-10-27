import { useState } from "react";
import { Navigate, useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await login(email, password)
      navigate(from, {replace: true})
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1 className="auth-title">Login</h1>
        <p className="auth-subtitle">Welcome back! Sign in to continue shopping.</p>
        {error && <p className="auth-error" role="alert">{error}</p>}
        <div className="auth-field">
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email"
            autoComplete="email"
            required
          />
        </div>
        <div className="auth-field">
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            autoComplete="current-password"
            required
          />
        </div>
        <button
          className="auth-submit"
          type="submit"
          disabled={loading}
          aria-busy={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="auth-switch"> Don't have an account?{" "}
          <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  )
}
export default Login
