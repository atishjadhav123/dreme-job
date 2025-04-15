import React from 'react'
import { useGetAlljobsQuery } from '@/redux/jobApi'
import LatestJobCard from './LatestJobCard'
import { useSelector } from 'react-redux'

const LatestJob = () => {
    const { data, isLoading, isError } = useGetAlljobsQuery()
    const { user } = useSelector(state => state.auth)

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#683ac2] mb-4"></div>
                <p className="text-xl font-medium text-gray-600">Loading opportunities...</p>
            </div>
        </div>
    )

    if (isError) return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="text-center max-w-md mx-4 py-20 bg-white bg-opacity-90 rounded-xl px-8 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold text-red-600 mt-3">Oops! Something went wrong</h3>
                <p className="text-gray-600 mt-2">We're having trouble loading jobs. Please try again later.</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 shadow-md"
                >
                    Retry
                </button>
            </div>
        </div>
    )

    const jobs = data?.jobs || []

    return (
        <section className="min-h-screen py-20 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#683ac2] to-[#9a6ff5]">
                            Latest & Top
                        </span>
                        <br className="sm:hidden" /> Job Openings
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Discover your next career opportunity with these hand-picked positions from leading companies.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {jobs.length > 0 ? (
                        jobs.slice(0, 6).map((job) => (
                            <LatestJobCard key={job._id} job={job} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 bg-white bg-opacity-90 rounded-xl shadow-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <h3 className="text-xl font-medium text-gray-500 mt-4">No current openings</h3>
                            <p className="text-gray-400 mt-2">Check back later for new opportunities</p>
                        </div>
                    )}
                </div>

                {jobs.length > 0 && (
                    <div className="text-center mt-12">
                        <button className="px-8 py-3 bg-gradient-to-r from-[#683ac2] to-[#9a6ff5] text-white font-medium rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 transform shadow-md">
                            View All Jobs
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}

export default LatestJob
