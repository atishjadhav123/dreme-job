import React from 'react'
import { Button } from '../ui/button'
import { Bookmark, Clock, MapPin, Briefcase, DollarSign, Lock } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'

const Job = ({ job }) => {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)

    const daysAgo = (mongodbtime) => {
        const createdAt = new Date(mongodbtime)
        const currentTime = new Date()
        const timeDifference = currentTime - createdAt
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
        if (days === 0) return "Today"
        if (days === 1) return "Yesterday"
        return `${days} days ago`
    }

    const handleAction = (actionType) => {
        if (!user) {
            toast.error(`Please login to ${actionType}`, {
                action: {
                    label: 'Login',
                    onClick: () => navigate('/login')
                },
                description: 'Create an account if you don\'t have one'
            })
            return false
        }
        return true
    }

    const handleViewDetails = () => {
        if (handleAction('view job details')) {
            navigate(`/description/${job?._id}`)
        }
    }

    const handleApplyNow = () => {
        if (handleAction('apply for this job')) {
            // Your apply now logic here
            console.log('Applying for job:', job?._id)
        }
    }

    const handleBookmark = () => {
        if (handleAction('bookmark this job')) {
            // Your bookmark logic here
            console.log('Bookmarking job:', job?._id)
        }
    }

    return (
        <div className="group relative p-6 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:border-indigo-100">
            {/* Header with time and bookmark */}
            <div className='flex items-center justify-between mb-4'>
                <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {daysAgo(job?.createdAt)}
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full text-gray-400 hover:text-indigo-600 hover:bg-indigo-50"
                    onClick={handleBookmark}
                >
                    <Bookmark className="h-5 w-5" />
                    {!user && (
                        <span className="absolute -top-1 -right-1">
                            <Lock className="h-3 w-3 text-red-500" />
                        </span>
                    )}
                </Button>
            </div>

            {/* Company info */}
            <div className='flex items-center gap-4 mb-6'>
                <Avatar className="h-14 w-14 border-2 border-white shadow-md group-hover:border-indigo-100 transition-colors">
                    <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                </Avatar>
                <div>
                    <h1 className='font-semibold text-lg text-gray-900'>{job?.company?.name || "Unknown Company"}</h1>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job?.location || "Location not specified"}
                    </div>
                </div>
            </div>

            {/* Job title and description */}
            <div className="mb-6">
                <h1 className='font-bold text-xl text-gray-900 mb-2'>{job?.title}</h1>
                <p className='text-gray-600 line-clamp-2'>{job?.desc}</p>
            </div>

            {/* Job metadata */}
            <div className='flex flex-wrap gap-2 mb-6'>
                <Badge variant="secondary" className="flex items-center gap-1 bg-indigo-50 text-indigo-600">
                    <Briefcase className="h-4 w-4" />
                    {job?.position} positions
                </Badge>
                <Badge variant="secondary" className="bg-purple-50 text-purple-600">
                    {job?.jobtype}
                </Badge>
                {job?.salary && (
                    <Badge variant="secondary" className="flex items-center gap-1 bg-green-50 text-green-600">
                        <DollarSign className="h-4 w-4" />
                        {job.salary} ₹
                    </Badge>
                )}
            </div>

            {/* Actions */}
            <div className='flex items-center gap-3'>
                <Button
                    onClick={handleViewDetails}
                    variant="outline"
                    className="rounded-full border-gray-300 hover:border-indigo-500 hover:text-indigo-600 flex-1 relative"
                >
                    View Details
                    {!user && (
                        <span className="absolute -top-1 -right-1">
                            <Lock className="h-3 w-3 text-red-500" />
                        </span>
                    )}
                </Button>
                <Button
                    onClick={handleApplyNow}
                    className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 flex-1 shadow-sm relative"
                >
                    Apply Now
                    {!user && (
                        <span className="absolute -top-1 -right-1">
                            <Lock className="h-3 w-3 text-red-500" />
                        </span>
                    )}
                </Button>
            </div>

            {/* Login prompt overlay that appears on hover when not logged in */}
            {!user && (
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <div className="bg-white p-3 rounded-lg shadow-lg pointer-events-auto">
                        <p className="text-sm font-medium flex items-center gap-1">
                            <Lock className="h-4 w-4" />
                            Login to interact with this job
                        </p>
                    </div>
                </div>
            )}

            {/* Hover effect border */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-100 rounded-xl pointer-events-none transition-all duration-300"></div>
        </div>
    )
}

export default Job