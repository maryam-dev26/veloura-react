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
    <form onSubmit={handleSubmit}>
      <h1>Signup</h1>
      {error && <p>{error}</p>}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)} placeholder="Name"
        required
      />
      <input
        type="email"
        value={email} placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} placeholder="Password" minLength={6}
        required
      />
      <button
        type="submit"
        disabled={loading}>
        {loading ? 'Signing Up...' : 'Signup'}
      </button>
      <p> Already have an account?
        <Link to='/login'>Login</Link>
      </p>
    </form>
  )
}
export default Signup
