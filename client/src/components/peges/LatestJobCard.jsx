import React from 'react'
import { Badge } from '../ui/badge'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'sonner' // or your preferred toast library

const LatestJobCard = ({ job }) => {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)

    const handleCardClick = () => {
        if (!user) {
            toast.error('Please login to view job details', {
                action: {
                    label: 'Login',
                    onClick: () => navigate('/login')
                },
                duration: 3000
            })
            return
        }
        navigate(`/description/${job._id}`)
    }

    return (
        <div
            onClick={handleCardClick}
            className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer hover:shadow-md transition-all duration-200 hover:border-blue-200"
        >
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>{job?.location || "India"}</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600 line-clamp-2'>{job?.desc}</p>
            </div>
            <div className='flex items-center gap-2 mt-4 flex-wrap'>
                <Badge variant="secondary" className="text-blue-600 bg-blue-50">
                    {job?.position} positions
                </Badge>
                <Badge variant="secondary" className="text-red-600 bg-red-50">
                    {job?.jobtype}
                </Badge>
                {job?.salary && (
                    <Badge variant="secondary" className="text-green-600 bg-green-50">
                        ₹{job.salary?.toLocaleString('en-IN')}/yr
                    </Badge>
                )}
            </div>
        </div>
    )
}

export default LatestJobCard