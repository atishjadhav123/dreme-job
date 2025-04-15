import React, { useMemo } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useGetAlljobsQuery } from '@/redux/jobApi'

const AdminJobsTable = () => {
    const navigate = useNavigate()
    const { data } = useGetAlljobsQuery()
    // console.log(data)


    const { searchJobByText } = useSelector(store => store.job)
    const allJobs = useMemo(() => data?.allJobs || data?.jobs || [], [data])

    const filterJobs = useMemo(() => {
        return allJobs.filter((job) =>
            !searchJobByText ||
            job?.title?.toLowerCase().includes(searchJobByText.toLowerCase())
        )
    }, [allJobs, searchJobByText])
    // const jobs = await Job.find().populate('company');?

    return (
        <div className="overflow-auto">
            <Table>
                <TableCaption>A list of your recently posted Jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company</TableHead>
                        <TableHead>Role</TableHead>
                        {/* <TableHead>Salary</TableHead>
                        <TableHead>Experience Level</TableHead> */}
                        {/* <TableHead>Job Type</TableHead> */}
                        <TableHead>Location</TableHead>
                        <TableHead>Created Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterJobs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center text-muted-foreground">
                                    No jobs found matching your search.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filterJobs.map((job) => (
                                <TableRow key={job._id}>
                                    <TableCell>{job.company.name}</TableCell>
                                    <TableCell>{job.title}</TableCell>
                                    {/* <TableCell>₹ {job.salary.toLocaleString()}</TableCell> */}
                                    {/* <TableCell>{job.experiencelevel} yrs</TableCell> */}
                                    {/* <TableCell>{job.jobtype}</TableCell> */}
                                    <TableCell>{job.location}</TableCell>
                                    <TableCell>{new Date(job.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal className="cursor-pointer" />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                <Link
                                                    to={`/admin/companies/${job._id}`}
                                                    className="flex items-center gap-2 cursor-pointer hover:text-primary"
                                                >
                                                    <Edit2 className="w-4" />
                                                    <span>Edit</span>
                                                </Link>
                                                <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                    <Eye className='w-4' />
                                                    <span>Applicants</span>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable
