import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";

function Signup() {
  const { signup, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")


  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await signup(name, email, password)
      navigate("/")
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1 className="auth-title">Signup</h1>
        <p className="auth-subtitle">Create your account and start shopping.</p>
        {error && <p className="auth-error" role="alert">{error}</p>}
        <div className="auth-field">
          <label htmlFor="signup-name">Name</label>
          <input
            id="signup-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} placeholder="Name"
            autoComplete="name"
            required
          />
        </div>
        <div className="auth-field">
          <label htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
            type="email"
            value={email} placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </div>
        <div className="auth-field">
          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} placeholder="Password" minLength={6}
            autoComplete="new-password"
            required
          />
        </div>
        <button
          className="auth-submit"
          type="submit"
          disabled={loading}
          aria-busy={loading}>
          {loading ? 'Signing Up...' : 'Signup'}
        </button>
        <p className="auth-switch"> Already have an account?{" "}
          <Link to='/login'>Login</Link>
        </p>
      </form>
    </div>
  )
}
export default Signup
