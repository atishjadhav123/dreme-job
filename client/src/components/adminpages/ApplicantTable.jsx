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
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { toast } from 'sonner'
import { useUpdateApplicantStatusMutation } from '@/redux/applyjobApi'

const shortlistingStatus = ['Accepted', 'Rejected']

const ApplicantTable = ({ applicants }) => {
    const [updateStatus] = useUpdateApplicantStatusMutation()

    const handleStatusChange = async (appId, status) => {
        try {
            await updateStatus({ id: appId, status }).unwrap()
            toast("status update succcess")
        } catch (error) {
            console.error('Update error:', error)
        }
    }

    return (
        <Table>
            <TableCaption>A list of recently applied users</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Resume</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className='text-right'>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {applicants.map((app) => (
                    <TableRow key={app._id}>
                        <TableCell>{app.aplicant.fullname}</TableCell>
                        <TableCell>{app.aplicant.email}</TableCell>
                        <TableCell>{app.aplicant.phonenumber}</TableCell>
                        <TableCell>
                            <a
                                href={app.resume || '#'}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-blue-600 underline'
                            >
                                Resume
                            </a>
                        </TableCell>
                        <TableCell>{new Date(app.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className='text-right'>
                            <Popover>
                                <PopoverTrigger>
                                    <MoreHorizontal />
                                </PopoverTrigger>
                                <PopoverContent className='w-32'>
                                    {shortlistingStatus.map((status, idx) => (
                                        <div
                                            key={idx}
                                            className='cursor-pointer py-1 hover:bg-gray-100 rounded px-2'
                                            onClick={() => handleStatusChange(app._id, status)}
                                        >
                                            {status}
                                        </div>
                                    ))}
                                </PopoverContent>
                            </Popover>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default ApplicantTable
