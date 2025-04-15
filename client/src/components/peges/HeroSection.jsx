import { Search, ArrowRight, CheckCircle } from 'lucide-react'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import dreame from '../../assets/dream-job.png'

const HeroSection = () => {
    const [query, setQuery] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const searchHandler = (e) => {
        e.preventDefault()
        dispatch(setSearchedQuery(query))
        navigate("/browse")
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
            <div className="container mx-auto px-4 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left - Content */}
                <div className="space-y-8 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                            Trusted by 10,000+ professionals
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Land Your <span className="text-gray-900">Dream Job</span> Faster
                    </h1>

                    <p className="text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
                        AI-powered job matching connects you with perfect opportunities in seconds.
                    </p>

                    <form onSubmit={searchHandler} className="max-w-xl mx-auto lg:mx-0">
                        <div className="relative flex w-full shadow-xl rounded-full overflow-hidden">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Job title, keywords, or company"
                                className="flex-grow outline-none px-6 py-4 text-lg border-0 focus:ring-2 focus:ring-indigo-300"
                            />
                            <Button
                                type="submit"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 h-12 w-12 flex items-center justify-center"
                            >
                                <Search className="h-5 w-5" />
                            </Button>
                        </div>
                    </form>

                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                        <span className="inline-flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Verified companies
                        </span>
                        <span className="inline-flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Instant apply
                        </span>
                        <span className="inline-flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            Salary insights
                        </span>
                    </div>
                </div>

                {/* Right - Image */}
                <div className="relative">
                    <div className="relative z-10 w-full h-[400px] lg:h-[500px] bg-contain bg-no-repeat bg-center"
                        style={{ backgroundImage: `url(${dreame})` }}>
                    </div>
                    <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute -top-8 -left-8 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection