import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useSignupUserMutation } from '@/redux/authApi'
import { toast } from 'sonner'
import { User, Mail, Phone, Lock, Briefcase, GraduationCap, Image } from 'lucide-react'

const Signup = () => {
    const navigate = useNavigate()
    const [RegisterU, { isLoading, isSuccess }] = useSignupUserMutation()
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phonenumber: "",
        password: "",
        role: "student",
        file: null,
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success("Registration successful! Please login.")
            navigate("/login")
        }
    }, [isSuccess, navigate])

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        if (!input.fullname || !input.email || !input.phonenumber || !input.password || !input.role) {
            toast.error("Please fill all required fields.")
            return
        }

        const formData = new FormData()
        formData.append("fullname", input.fullname)
        formData.append("email", input.email)
        formData.append("phonenumber", input.phonenumber)
        formData.append("password", input.password)
        formData.append("role", input.role)
        if (input.file) {
            formData.append("file", input.file)
        }

        try {
            const res = await RegisterU(formData)
            if (res?.data?.success) {
                toast.success("Account created successfully!")
            } else {
                toast.error(res?.error?.data?.message || "Registration failed. Please try again.")
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                            Create your account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Join thousands of professionals finding their dream jobs
                        </p>
                    </div>

                    <form onSubmit={submitHandler} className="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                        <div className="space-y-4">
                            {/* Full Name */}
                            <div>
                                <Label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="fullname"
                                        name="fullname"
                                        type="text"
                                        required
                                        value={input.fullname}
                                        onChange={changeEventHandler}
                                        placeholder="John Doe"
                                        className="pl-10 w-full"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        placeholder="john@example.com"
                                        className="pl-10 w-full"
                                    />
                                </div>
                            </div>

                            {/* Phone Number */}
                            <div>
                                <Label htmlFor="phonenumber" className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number
                                </Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Phone className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="phonenumber"
                                        name="phonenumber"
                                        type="tel"
                                        required
                                        value={input.phonenumber}
                                        onChange={changeEventHandler}
                                        placeholder="1234567890"
                                        className="pl-10 w-full"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Password
                                </Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        value={input.password}
                                        onChange={changeEventHandler}
                                        placeholder="••••••••"
                                        className="pl-10 w-full"
                                    />
                                </div>
                            </div>

                            {/* Role Selection */}
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-3">
                                    I am a
                                </Label>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <Input
                                            id="student"
                                            name="role"
                                            type="radio"
                                            value="student"
                                            checked={input.role === 'student'}
                                            onChange={changeEventHandler}
                                            className="hidden peer"
                                        />
                                        <Label
                                            htmlFor="student"
                                            className="flex flex-col items-center justify-between p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 peer-checked:border-indigo-500 peer-checked:bg-indigo-50"
                                        >
                                            <GraduationCap className="h-6 w-6 text-indigo-600 mb-2" />
                                            <span className="text-sm font-medium">Job Seeker</span>
                                        </Label>
                                    </div>
                                    <div>
                                        <Input
                                            id="recruiter"
                                            name="role"
                                            type="radio"
                                            value="recruiter"
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className="hidden peer"
                                        />
                                        <Label
                                            htmlFor="recruiter"
                                            className="flex flex-col items-center justify-between p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 peer-checked:border-indigo-500 peer-checked:bg-indigo-50"
                                        >
                                            <Briefcase className="h-6 w-6 text-indigo-600 mb-2" />
                                            <span className="text-sm font-medium">Recruiter</span>
                                        </Label>
                                    </div>
                                </div>
                            </div>

                            {/* Profile Picture */}
                            <div>
                                <Label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                                    Profile Picture (Optional)
                                </Label>
                                <div className="flex items-center gap-3">
                                    <Label
                                        htmlFor="file"
                                        className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none cursor-pointer"
                                    >
                                        <Image className="h-5 w-5 mr-2 text-gray-400" />
                                        Choose File
                                    </Label>
                                    <Input
                                        id="file"
                                        name="file"
                                        type="file"
                                        accept="image/*"
                                        onChange={changeFileHandler}
                                        className="hidden"
                                    />
                                    {input.file && (
                                        <span className="text-sm text-gray-500 truncate max-w-xs">
                                            {input.file.name}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full justify-center rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 py-3 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating account...
                                    </span>
                                ) : (
                                    "Sign Up"
                                )}
                            </Button>
                        </div>

                        <div className="text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Log in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup