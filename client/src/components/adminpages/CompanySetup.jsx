import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { useGetCompanybyIdQuery, useUpdateCompanyMutation } from '@/redux/companyApi'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'

const CompanySetup = () => {
    const { id } = useParams()
    const params = useParams()
    const { data } = useGetCompanybyIdQuery(params.id)
    const navigate = useNavigate()
    const singleCompany = data?.company
    const [updateCompany, { isSuccess, isError, isLoading, error }] = useUpdateCompanyMutation()
    const [input, setInput] = useState({
        name: "",
        desc: "",
        website: "",
        location: "",
        file: null,
    })

    const changeEvbentHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const ChangeFileHandler = (e) => {
        const file = e.target.files?.[0]
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", input.name)
        formData.append("desc", input.desc)
        formData.append("website", input.website)
        formData.append("location", input.location)
        if (input.file) {
            formData.append("file", input.file)
        }

        try {
            await updateCompany({ id, formData })
            toast.success("Company updated successfully!")
        } catch (err) {
            toast.error(err?.data?.message || "Failed to update company")
            console.error(err)
        }
    }

    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany.name || "",
                desc: singleCompany.desc || "",
                website: singleCompany.website || "",
                location: singleCompany.location || "",
                file: null, // do NOT set file from singleCompany
            })
        }
    }, [singleCompany])

    return <>
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <Button variant="outline" className="flex items-center gap-2 text-gray-500 font-semibold">
                    <Link to="/admin/compnaies"> <ArrowLeft /></Link>
                    <span>Back</span>
                </Button>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-2 p-8'>
                        <h1 className=' font-bold text-xl'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEvbentHandler}
                            />
                        </div>
                        <div>
                            <Label>Descriptions</Label>
                            <Input
                                type="text"
                                name="desc"
                                value={input.desc}
                                onChange={changeEvbentHandler}
                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEvbentHandler}
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEvbentHandler}
                            />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={ChangeFileHandler}
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full mt-8" disabled={isLoading}>
                        {isLoading ? "Updating..." : "Update"}
                    </Button>                </form>
            </div>
        </div>
    </>
}

export default CompanySetup