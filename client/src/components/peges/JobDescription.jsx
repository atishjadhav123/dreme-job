import React, { useEffect, useState } from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { useGetjobsByIdQuery } from '@/redux/jobApi'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import { useApplyJobMutation } from '@/redux/applyjobApi'
import { setSingleJob } from '@/redux/jobSlice'
import { Briefcase, MapPin, Clock, DollarSign, BarChart2, Calendar, FileText, Award } from 'lucide-react'
import LoadingSpinner from './LoadingSpinner'

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job)
    const { user } = useSelector(store => store.auth)
    const { id: jobId } = useParams()
    const { data, isLoading, isError } = useGetjobsByIdQuery(jobId)
    const [applyJobTrigger, { isSuccess }] = useApplyJobMutation()
    const job = data?.job
    const dispatch = useDispatch()

    const [isApplied, setIsApplied] = useState(false)

    useEffect(() => {
        if (job && user?._id) {
            const applied = job.aplications?.some(app => app.aplicant === user._id)
            setIsApplied(applied)
        }
    }, [job, user])

    const handleApplyJob = async () => {
        if (!user?._id || !jobId) {
            toast.error("Please login to apply for this job")
            return
        }

        try {
            const res = await applyJobTrigger(jobId).unwrap()
            toast.success("Application submitted successfully!")
            setIsApplied(true)

            const updatedApplications = [...(singleJob?.aplications || []), { aplicant: user._id }]
            const updatedJob = { ...singleJob, aplications: updatedApplications }
            dispatch(setSingleJob(updatedJob))
        } catch (err) {
            toast.error("You've already applied for this position")
            console.error(err)
        }
    }

    if (isLoading) return <LoadingSpinner text="Loading job details..." />
    if (isError || !job) return (
        <div className="max-w-7xl mx-auto py-20 text-center">
            <div className="bg-red-50 p-8 rounded-xl inline-block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className="text-2xl font-bold text-red-600 mb-2">Job Not Found</h2>
                <p className="text-gray-600">We couldn't load the job details. Please try again later.</p>
            </div>
        </div>
    )

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Job Header */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{job?.title}</h1>
                            <div className="flex items-center gap-3 mt-3">
                                <Badge variant="outline" className="text-blue-600 bg-blue-50 border-blue-100">
                                    <Briefcase className="h-4 w-4 mr-1" />
                                    {job?.position} position(s)
                                </Badge>
                                <Badge variant="outline" className="text-purple-600 bg-purple-50 border-purple-100">
                                    {job?.jobtype}
                                </Badge>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-4">
                                {job?.requirement?.map((tech) => (
                                    <Badge key={tech} className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-3">
                            <div className="text-2xl font-bold text-gray-900">
                                ₹{job?.salary}
                                <span className="text-sm font-normal text-gray-500"> / month</span>
                            </div>
                            <Button
                                onClick={handleApplyJob}
                                disabled={isApplied}
                                size="lg"
                                className={`rounded-full px-8 py-6 text-lg font-semibold shadow-md transition-all ${isApplied
                                    ? 'bg-green-100 text-green-800 hover:bg-green-100 cursor-default'
                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg'}`}
                            >
                                {isApplied ? (
                                    <span className="flex items-center">
                                        <Award className="h-5 w-5 mr-2" /> Applied!
                                    </span>
                                ) : (
                                    "Apply Now"
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Job Details */}
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                                <FileText className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-500">Description</h3>
                                <p className="mt-1 text-gray-700">{job?.desc}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-500">Location</h3>
                                <p className="mt-1 text-gray-700">{job?.location}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-green-50 rounded-lg text-green-600">
                                <BarChart2 className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-500">Experience Level</h3>
                                <p className="mt-1 text-gray-700">{job?.experiencelevel} year(s) experience</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
                                <DollarSign className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-500">Salary</h3>
                                <p className="mt-1 text-gray-700">₹{job?.salary} per month</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-red-50 rounded-lg text-red-600">
                                <Clock className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-500">Applications</h3>
                                <p className="mt-1 text-gray-700">{job?.aplications?.length || 0} applicants</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                                <Calendar className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-500">Posted Date</h3>
                                <p className="mt-1 text-gray-700">{new Date(job?.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JobDescription