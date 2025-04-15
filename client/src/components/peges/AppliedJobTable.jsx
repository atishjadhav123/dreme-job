import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../ui/table'
import { Badge } from '../ui/badge'
import { useGetAppliedJobQuery } from '@/redux/applyjobApi'
import { useSelector } from 'react-redux'
import clsx from 'clsx'

const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
        case 'pending':
            return 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
        case 'selected':
            return 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
        case 'rejected':
            return 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
        default:
            return 'bg-gray-50 text-gray-800 border-gray-200 hover:bg-gray-100'
    }
}

const AppliedJobTable = () => {
    const { data, isLoading } = useGetAppliedJobQuery()
    const { user } = useSelector((store) => store.auth)
    const currentUserId = user?._id

    if (isLoading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    )

    if (!data || !Array.isArray(data.aplication)) return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <p className="text-blue-800 font-medium">No applied jobs available.</p>
        </div>
    )

    const userApplications = data.aplication.filter(app => app.aplicant === currentUserId)
    const uniqueJobIds = new Set(userApplications.map(app => app?.job?._id)).size

    if (userApplications.length === 0) {
        return (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                <p className="text-gray-700">You have not applied to any jobs yet.</p>
                <button className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
                    Browse Jobs
                </button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-medium text-gray-900">Application Summary</h3>
                <div className="mt-2 flex items-center space-x-4">
                    <div className="bg-blue-50 px-4 py-2 rounded-md border border-blue-100">
                        <p className="text-sm text-blue-600">Total Applications</p>
                        <p className="text-xl font-semibold text-blue-800">{userApplications.length}</p>
                    </div>
                    <div className="bg-green-50 px-4 py-2 rounded-md border border-green-100">
                        <p className="text-sm text-green-600">Unique Jobs</p>
                        <p className="text-xl font-semibold text-green-800">{uniqueJobIds}</p>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                <Table className="min-w-full divide-y divide-gray-200">
                    <TableCaption className="px-6 py-3 text-sm text-gray-500 bg-gray-50 border-t border-gray-200">
                        A list of your applied jobs and their current status
                    </TableCaption>
                    <TableHeader className="bg-gray-50">
                        <TableRow className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <TableHead className="px-6 py-3">Date Applied</TableHead>
                            <TableHead className="px-6 py-3">Job Role</TableHead>
                            <TableHead className="px-6 py-3">Company</TableHead>
                            <TableHead className="px-6 py-3 text-right">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="bg-white divide-y divide-gray-200">
                        {userApplications.map((application, index) => (
                            <TableRow
                                key={index}
                                className={clsx(
                                    'transition-colors hover:bg-gray-50',
                                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                                )}
                            >
                                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                                            <span className="text-gray-500 text-xs">
                                                {new Date(application.createdAt).toLocaleDateString('en-US', { day: 'numeric' })}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {new Date(application.createdAt).toLocaleDateString('en-US', { month: 'short' })}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {new Date(application.createdAt).toLocaleDateString('en-US', { year: 'numeric' })}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">
                                        {application?.job?.title || 'N/A'}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {application?.job?.type || 'Full-time'}
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                                            <span className="text-gray-500 text-xs">
                                                {application?.job?.company?.name?.charAt(0) ||
                                                    application?.company?.name?.charAt(0) ||
                                                    '?'}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">
                                                {application?.job?.company?.name ||
                                                    application?.company?.name ||
                                                    'Unknown Company'}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {application?.job?.location || 'Remote'}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-4 whitespace-nowrap text-right">
                                    <Badge
                                        className={clsx(
                                            getStatusStyle(application.status),
                                            'px-3 py-1 rounded-full text-xs font-medium border transition-colors'
                                        )}
                                    >
                                        {application.status}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default AppliedJobTable