import { useState } from 'react'
import { Link, useNavigate} from 'react-router'
import { useAuth } from '../hook/useAuth'
import useSelector from 'react-redux'
import { Navigate } from 'react-router'

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const user = useSelector((state) => state.auth.user);
    const loading = useSelector((state) => state.auth.loading);

    const {handleLogin} = useAuth();



  const handleSubmit = async (event) => {
    event.preventDefault()
    await handleLogin({ email, password })
    navigate("/")
  }

  if(!loading && user) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-[#31b8c6]/20 bg-slate-900/90 p-8 shadow-[0_0_50px_rgba(49,184,198,0.18)] backdrop-blur-xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#31b8c6]">Welcome back</p>
          <h1 className="mt-2 text-3xl font-semibold">Sign in to your account</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-slate-300" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-[#31b8c6] focus:ring-2 focus:ring-[#31b8c6]/30"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-[#31b8c6] focus:ring-2 focus:ring-[#31b8c6]/30"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#31b8c6] px-4 py-3 font-semibold text-white shadow-lg shadow-[#31b8c6]/30 transition hover:opacity-90 cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          New here?{' '}
         
          <Link to="/Register" className="font-medium text-[#31b8c6] hover:text-cyan-400">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login