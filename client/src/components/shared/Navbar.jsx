import { LogOut, Menu, User2, X, Briefcase, Home, Compass, Building2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useLogoutUserMutation } from '@/redux/authApi'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()

    const [logout, { isSuccess }] = useLogoutUserMutation()
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const logoutUser = async () => {
        try {
            await logout()
        } catch (error) {
            toast.error("Logout failed")
            console.error(error)
        }
    }

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            dispatch(setUser(JSON.parse(storedUser)))
        }
    }, [])

    useEffect(() => {
        if (isSuccess) {
            dispatch(setUser(null))
            navigate("/")
            toast.success("Logged out successfully")
        }
    }, [isSuccess, dispatch, navigate])

    const navLinks = [
        ...(user?.role === 'recruiter'
            ? [
                { path: "/admin/compnaies", name: "Companies", icon: Building2 },
                { path: "/admin/jobs", name: "Jobs", icon: Briefcase }
            ]
            : [
                { path: "/", name: "Home", icon: Home },
                { path: "/jobs", name: "Jobs", icon: Briefcase },
                { path: "/browse", name: "Browse", icon: Compass }
            ]
        )
    ]

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-white'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-1">
                        <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            DreamJob
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <ul className="flex items-center space-x-6">
                            {navLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className={`flex items-center space-x-1.5 px-2 py-1.5 rounded-md transition-all ${location.pathname === link.path ? 'text-indigo-600 font-medium' : 'text-gray-600 hover:text-indigo-500'}`}
                                    >
                                        <link.icon className="h-4 w-4" />
                                        <span>{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Auth Buttons */}
                        {!user ? (
                            <div className="flex items-center space-x-3 ml-4">
                                <Link to="/login">
                                    <Button variant="outline" className="rounded-full border-gray-300 hover:border-indigo-500 hover:text-indigo-600 px-4">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-md px-4">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <button className="flex items-center space-x-2 focus:outline-none group">
                                        <Avatar className="h-9 w-9 border-2 border-white group-hover:border-indigo-100 transition-all shadow-sm">
                                            <AvatarImage src={user?.profile?.profilephoto} alt={user?.fullname || "User"} />
                                            <span className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></span>
                                        </Avatar>
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-72 p-4 mt-2 rounded-xl border-0 shadow-lg bg-white">
                                    <div className="flex items-center space-x-3 p-2">
                                        <Avatar className="h-12 w-12 border-2 border-indigo-100">
                                            <AvatarImage src={user?.profile?.profilephoto} alt={user?.fullname || "User"} />
                                        </Avatar>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{user?.fullname}</h4>
                                            <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                                        </div>
                                    </div>

                                    <div className="mt-3 space-y-1">
                                        {user.role === "student" && (
                                            <Link
                                                to="/profile"
                                                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-indigo-50 transition-colors text-gray-700 hover:text-indigo-600"
                                            >
                                                <User2 className="h-4 w-4" />
                                                <span>My Profile</span>
                                            </Link>
                                        )}

                                        <button
                                            onClick={logoutUser}
                                            className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-gray-700 hover:text-red-600"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </nav>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden items-center space-x-3">
                        {!user ? (
                            <Link to="/login">
                                <Button variant="outline" size="sm" className="rounded-full border-gray-300">
                                    Login
                                </Button>
                            </Link>
                        ) : null}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none"
                        >
                            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden absolute inset-x-0 top-16 bg-white shadow-lg rounded-b-xl z-50 transition-all duration-300 ease-out">
                    <div className="px-4 pt-2 pb-6 space-y-4">
                        <div className="flex flex-col space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setMenuOpen(false)}
                                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${location.pathname === link.path ? 'bg-indigo-50 text-indigo-600' : 'text-gray-700 hover:bg-gray-50'}`}
                                >
                                    <link.icon className="h-5 w-5" />
                                    <span>{link.name}</span>
                                </Link>
                            ))}
                        </div>

                        {user ? (
                            <div className="pt-4 border-t border-gray-100">
                                <div className="flex items-center space-x-3 px-3 py-2">
                                    <Avatar className="h-10 w-10 border-2 border-indigo-100">
                                        <AvatarImage src={user?.profile?.profilephoto} alt={user?.fullname || "User"} />
                                    </Avatar>
                                    <div>
                                        <h4 className="font-medium text-gray-900">{user?.fullname}</h4>
                                        <p className="text-xs text-gray-500">{user?.email}</p>
                                    </div>
                                </div>

                                <div className="mt-3 space-y-1">
                                    {user.role === "student" && (
                                        <Link
                                            to="/profile"
                                            onClick={() => setMenuOpen(false)}
                                            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-indigo-50 transition-colors text-gray-700 hover:text-indigo-600"
                                        >
                                            <User2 className="h-5 w-5" />
                                            <span>My Profile</span>
                                        </Link>
                                    )}

                                    <button
                                        onClick={() => {
                                            logoutUser()
                                            setMenuOpen(false)
                                        }}
                                        className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-gray-700 hover:text-red-600"
                                    >
                                        <LogOut className="h-5 w-5" />
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="pt-4 border-t border-gray-100">
                                <Link
                                    to="/signup"
                                    onClick={() => setMenuOpen(false)}
                                    className="block w-full text-center py-2 px-4 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:from-indigo-700 hover:to-purple-700"
                                >
                                    Create Account
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    )
}

export default Navbar