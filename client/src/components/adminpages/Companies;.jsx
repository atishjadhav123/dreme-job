import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { FiPlus, FiSearch } from 'react-icons/fi'
import CompaniesTable from './CompnaiesTable'

const Companies = () => {
    const navigate = useNavigate()
    const [input, setInput] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSearchCompanyByText(input))
    }, [input, dispatch])

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Companies</h1>
                        <p className="text-gray-600 mt-1">Manage all registered companies</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <div className="relative flex-1 max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiSearch className="h-5 w-5 text-gray-400" />
                            </div>
                            <Input
                                className="pl-10 w-full"
                                placeholder="Search companies by name..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>

                        <Button
                            onClick={() => navigate("/admin/compnaies/create")}
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm"
                        >
                            <FiPlus className="mr-2 h-4 w-4" />
                            New Company
                        </Button>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
                    <CompaniesTable />
                </div>
            </div>
        </div>
    )
}

export default Companies