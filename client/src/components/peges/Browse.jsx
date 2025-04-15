import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import Job from './Job'
import { useGetAlljobsQuery } from '@/redux/jobApi'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useMediaQuery } from 'react-responsive'
import { FiSearch, FiX } from 'react-icons/fi'

const Browse = () => {
    const dispatch = useDispatch()
    const { data, isLoading } = useGetAlljobsQuery()
    const alljobs = useSelector(store => store.job.searchedQuery)
    const isMobile = useMediaQuery({ maxWidth: 768 })

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""))
        }
    }, [dispatch])

    const jobs = Array.isArray(data) ? data : data?.jobs || []

    const filteredJobs = alljobs
        ? jobs.filter(job =>
            job.title.toLowerCase().includes(alljobs.toLowerCase()) ||
            job.desc?.toLowerCase().includes(alljobs.toLowerCase()) ||
            job.location?.toLowerCase().includes(alljobs.toLowerCase()) ||
            String(job.salary)?.toLowerCase().includes(alljobs.toLowerCase())
        )
        : jobs

    const clearSearch = () => {
        dispatch(setSearchedQuery(""))
    }

    if (isLoading) {
        return (
            <div className="min-h-screen">
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 py-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[...Array(8)].map((_, index) => (
                            <div key={index} className="bg-white rounded-lg shadow p-4 h-64 animate-pulse">
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-5/6 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                                <div className="h-8 bg-gray-200 rounded w-full"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10'>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-10 gap-4">
                    <h1 className='text-xl md:text-2xl font-bold'>
                        {alljobs ? (
                            <span className="flex items-center gap-2">
                                Search Results for "{alljobs}"
                                <button
                                    onClick={clearSearch}
                                    className="p-1 text-gray-500 hover:text-gray-700"
                                    aria-label="Clear search"
                                >
                                    <FiX size={18} />
                                </button>
                            </span>
                        ) : (
                            "Browse All Jobs"
                        )}
                    </h1>
                    <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
                    </div>
                </div>

                {filteredJobs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <FiSearch size={48} className="text-gray-300 mb-4" />
                        <p className="text-lg text-gray-600 mb-2">
                            No jobs found {alljobs && `for "${alljobs}"`}
                        </p>
                        <p className="text-sm text-gray-500 max-w-md">
                            Try adjusting your search or filter to find what you're looking for.
                        </p>
                        {alljobs && (
                            <button
                                onClick={clearSearch}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Clear search
                            </button>
                        )}
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'>
                        {filteredJobs.map((item) => (
                            <Job
                                key={item._id}
                                job={item}
                                className="transition-transform hover:scale-[1.02]"
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Browse