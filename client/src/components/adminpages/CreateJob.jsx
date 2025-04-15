import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select'
import { useGetAllComapanyQuery } from '@/redux/companyApi'
import { Loader2 } from 'lucide-react'
import { useCreateJobMutation } from '@/redux/jobApi'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CreateJob = () => {
    const navigate = useNavigate()
    const userId = useSelector(state => state.auth.user?._id)
    const { data: companiesData, isLoading } = useGetAllComapanyQuery()
    const [createpostjob, { isSuccess, isLoading: createloding }] = useCreateJobMutation()

    const [input, setInput] = useState({
        title: "",
        desc: "",
        requirements: "",
        salary: "",
        location: "",
        jobtype: "",
        experience: "",
        position: 0,
        company: "",
        created_by: ""
    })
    useEffect(() => {
        if (userId) {
            setInput((prev) => ({ ...prev, created_by: userId }))
        }
    }, [userId])

    // setInput({ ...input, created_by: userId })

    useEffect(() => {
        if (isSuccess) {
            toast.success("job create succcess")
            navigate("/admin/jobs")
        }
    }, [isSuccess])

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const selectChangeHandler = (value) => {

        const selectedCompany = companiesData?.companies?.find(
            (company) => company.name.toLowerCase() === value
        )
        if (selectedCompany) {
            setInput({ ...input, company: selectedCompany._id })
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            const res = await createpostjob(input).unwrap()
            toast.success("Job created successfully ✅")
            // Optionally reset the form
            setInput({
                title: "",
                desc: "",
                requirements: "",
                salary: "",
                location: "",
                jobtype: "",
                experience: "",
                position: 0,
                company: "",
                created_by: ""
            })
        } catch (error) {
            console.error("Job creation failed:", error)
            toast.error("Failed to create job ❌")
        }
    }


    return (
        <>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                    <div className='grid grid-cols-2 gap-4'>
                        {[
                            { label: 'Title', name: 'title' },
                            { label: 'Desc', name: 'desc' },
                            { label: 'Requirements', name: 'requirements' },
                            { label: 'Salary', name: 'salary' },
                            { label: 'Location', name: 'location' },
                            { label: 'Job Type', name: 'jobtype' },
                            { label: 'Experience', name: 'experience' },
                        ].map(({ label, name }) => (
                            <div key={name}>
                                <Label>{label}</Label>
                                <Input
                                    type="text"
                                    name={name}
                                    value={input[name]}
                                    onChange={changeEventHandler}
                                    className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                                />
                            </div>
                        ))}

                        <div>
                            <Label>Position</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
                            />
                        </div>

                        <div>
                            <Label>Company</Label>
                            {!isLoading && companiesData?.companies?.length > 0 ? (
                                <Select onValueChange={selectChangeHandler} disabled={isLoading || !companiesData?.companies?.length}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {companiesData?.companies?.map((company) => (
                                                <SelectItem key={company._id} value={company.name.toLowerCase()}>
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

                            ) : (
                                <p className="text-xs text-red-600 mt-1">
                                    {isLoading
                                        ? "Loading companies..."
                                        : "No companies found. Please register a company first."}
                                </p>
                            )}
                        </div>
                    </div>


                    {
                        createloding ? <Button className="w-full my-4" type="submit"><Loader2 className='mr-2 h-4 w-4 animate-spin' />plese wait...</Button> : <Button type="submit" className="w-full mt-4">Post New Job</Button>
                    }
                </form>
            </div>
        </>
    )
}

export default CreateJob
