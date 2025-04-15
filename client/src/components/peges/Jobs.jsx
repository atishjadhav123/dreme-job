import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useGetAlljobsQuery } from '@/redux/jobApi'
import { useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { FiFilter, FiX } from 'react-icons/fi'
import { useMediaQuery } from 'react-responsive'

const Jobs = () => {
    const { searchedQuery } = useSelector(state => state.job)
    const { data, isLoading, isError } = useGetAlljobsQuery()
    const [filterjob, setFilterjob] = useState([])
    const [showFilters, setShowFilters] = useState(false)
    const isMobile = useMediaQuery({ maxWidth: 768 })

    useEffect(() => {
        if (data?.jobs) {
            const jobs = data.jobs
            if (searchedQuery) {
                const filteredJob = jobs.filter((job) => {
                    const title = job.title ? job.title.toLowerCase() : ""
                    const desc = job.desc ? job.desc.toLowerCase() : ""
                    const location = job.location ? job.location.toLowerCase() : ""
                    const salary = job.salary ? String(job.salary).toLowerCase() : ""

                    return (
                        title.includes(searchedQuery.toLowerCase()) ||
                        desc.includes(searchedQuery.toLowerCase()) ||
                        location.includes(searchedQuery.toLowerCase()) ||
                        salary.includes(searchedQuery.toLowerCase())
                    )
                })
                setFilterjob(filteredJob)
            } else {
                setFilterjob(jobs)
            }
        }
    }, [data, searchedQuery])

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    )

    if (isError) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center p-4 bg-red-50 rounded-lg max-w-md mx-4">
                <h3 className="text-lg font-medium text-red-600">Error loading jobs</h3>
                <p className="text-gray-600 mt-2">Please try again later</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Retry
                </button>
            </div>
        </div>
    )

    return (
        <>
            <Navbar />
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-5'>
                {/* Mobile Filter Button */}
                {isMobile && (
                    <button
                        onClick={() => setShowFilters(true)}
                        className="fixed bottom-6 right-6 z-20 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all"
                    >
                        <FiFilter size={24} />
                    </button>
                )}

                <div className="flex flex-col md:flex-row gap-5">
                    {/* Filter Sidebar - Desktop */}
                    {!isMobile && (
                        <div className="w-full md:w-1/4">
                            <FilterCard />
                        </div>
                    )}

                    {/* Filter Sidebar - Mobile (Overlay) */}
                    {isMobile && showFilters && (
                        <motion.div
                            initial={{ opacity: 0, x: -300 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -300 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed inset-0 z-30 bg-white p-4 overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Filters</h2>
                                <button
                                    onClick={() => setShowFilters(false)}
                                    className="p-2 rounded-full hover:bg-gray-100"
                                >
                                    <FiX size={20} />
                                </button>
                            </div>
                            <FilterCard />
                        </motion.div>
                    )}

                    {/* Jobs List */}
                    {filterjob && filterjob.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center min-h-[50vh]">
                            <span className="text-gray-500 text-lg">No jobs found matching your criteria</span>
                        </div>
                    ) : (
                        <div className='flex-1 md:h-[88vh] overflow-y-auto pb-5'>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                <AnimatePresence>
                                    {filterjob.map((job) => (
                                        <motion.div
                                            key={job._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -100 }}
                                            transition={{ duration: 0.3 }}
                                            layout
                                        >
                                            <Job job={job} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Jobs