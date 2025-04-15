import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginUserMutation } from '@/redux/authApi'
import { Toaster, toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/redux/authSlice'
import { motion } from 'framer-motion'

const Login = () => {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginUser, { isLoading, isSuccess, isError, error: backendError }] = useLoginUserMutation()
    const [error, setError] = useState("")
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "student",
    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
        setError("")
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        if (!input.email || !input.password || !input.role) {
            setError("Please fill all fields.")
            return
        }

        await loginUser(input)
    }

    useEffect(() => {
        if (isSuccess) {
            navigate("/")
            toast.success("Login Successful!", {
                description: "Welcome back! You've been logged in successfully."
            })
        }
        if (isError) {
            toast.error("Login Failed", {
                description: backendError?.data?.message || "Invalid credentials. Please try again."
            })
        }
    }, [isSuccess, isError, backendError])

    return (
        <>
            <Navbar />
            <Toaster richColors position="top-center" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
                            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
                            <p className="text-blue-100 mt-1">Sign in to access your account</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={submitHandler} className="p-6 space-y-6">
                            {error && (
                                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    placeholder="your@email.com"
                                    className="w-full px-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-gray-700">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={input.password}
                                    onChange={changeEventHandler}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Role Selection */}
                            <div className="space-y-2">
                                <Label className="text-gray-700">I am a</Label>
                                <div className="flex gap-4">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            checked={input.role === 'student'}
                                            onChange={changeEventHandler}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <span className="text-gray-700">Student</span>
                                    </label>
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <span className="text-gray-700">Recruiter</span>
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                disabled={isLoading}
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </span>
                                ) : "Sign In"}
                            </Button>

                            {/* Footer Links */}
                            <div className="text-center text-sm text-gray-600">
                                <p>
                                    Don't have an account?{' '}
                                    <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                                        Sign up
                                    </Link>
                                </p>
                                <p className="mt-2">
                                    <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                                        Forgot password?
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </>
    )
}

export default Login