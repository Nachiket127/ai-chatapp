import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hook/useAuth'

const Register = () => {
    const navigate = useNavigate();
    const { handleRegister } = useAuth();

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


  const handleSubmit = async (event) => {
    event.preventDefault()
    await handleRegister({ email, password, username })
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-[#31b8c6]/20 bg-slate-900/90 p-8 shadow-[0_0_50px_rgba(49,184,198,0.18)] backdrop-blur-xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#31b8c6]">Join us</p>
          <h1 className="mt-2 text-3xl font-semibold">Create your account</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-slate-300" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-[#31b8c6] focus:ring-2 focus:ring-[#31b8c6]/30"
              required
            />
          </div>

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
              placeholder="Create a password"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-[#31b8c6] focus:ring-2 focus:ring-[#31b8c6]/30"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#31b8c6] px-4 py-3 font-semibold text-white shadow-lg shadow-[#31b8c6]/30 transition hover:opacity-90 cursor-pointer"
          >
            Create Account
          </button>
        </form>

        
          
        
        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-[#31b8c6] hover:text-cyan-400">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register