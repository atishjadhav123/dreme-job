import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useRegisterCompanyMutation } from '@/redux/companyApi'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

export const CompaniesCreate = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [registerCompany, { isLoading }] = useRegisterCompanyMutation()
    const [companyName, setCompanyName] = React.useState("")

    const handleRegister = async () => {
        if (!companyName.trim()) {
            toast.warning("Please enter a company name")
            return
        }

        try {
            const res = await registerCompany({ companyName }).unwrap()

            if (res.success) {
                dispatch(setSingleCompany(res.company))
                toast.success(res.message)
                navigate(`/admin/companies/${res.company._id}`)
            } else {
                toast.error(res.message || "Registration failed")
            }

        } catch (err) {
            toast.error(err?.data?.message || "Something went wrong")
            console.error(err)
        }
    }


    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>
                        Please provide the official name of your company to get started with setup.
                    </p>
                </div>

                <Label>Company Name</Label>
                <Input
                    type="text"
                    className="my-2"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Google, Microsoft etc."
                />

                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => navigate("/admin/compnaies")}>Cancel</Button>
                    <Button onClick={handleRegister} disabled={isLoading}>
                        {isLoading ? "Registering..." : "Continue"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
