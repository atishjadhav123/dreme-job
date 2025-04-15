import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { FiMapPin, FiCode, FiDollarSign, FiX } from 'react-icons/fi'

const filterData = [
    {
        filterType: "Location",
        arry: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", "Remote"],
        icon: <FiMapPin className="mr-2 h-4 w-4 text-blue-500" />
    },
    {
        filterType: "Job Title",
        arry: ["Frontend Developer", "Backend Developer", "Full Stack Developer"],
        icon: <FiCode className="mr-2 h-4 w-4 text-purple-500" />
    },
    {
        filterType: "Salary Range",
        arry: ["₹8,000", "₹40,000", "₹1,00,000", "₹5,00,000"],
        icon: <FiDollarSign className="mr-2 h-4 w-4 text-green-500" />
    }
]

const FilterCard = () => {
    const dispatch = useDispatch()
    const [selectedValue, setSelectedValue] = useState('')

    const changeHandler = (value) => {
        setSelectedValue(value)
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue))
    }, [selectedValue, dispatch])

    const clearFilters = () => {
        setSelectedValue('')
        dispatch(setSearchedQuery(''))
    }

    return (
        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold text-gray-800">Filter Jobs</h1>
                    {selectedValue && (
                        <button
                            onClick={clearFilters}
                            className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            <FiX className="mr-1" />
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* Filter Sections */}
            <div className="p-6 space-y-8">
                <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                    {filterData.map((data, index) => (
                        <div key={`filter-section-${index}`} className="space-y-4">
                            <div className="flex items-center text-gray-700 font-medium">
                                {data.icon}
                                <span className="text-sm font-semibold uppercase tracking-wider">
                                    {data.filterType}
                                </span>
                            </div>

                            <div className="space-y-3 pl-6">
                                {data.arry.map((item, idx) => {
                                    const itemId = `filter-${index}-${idx}`
                                    return (
                                        <div key={itemId} className="flex items-center space-x-3 group">
                                            <RadioGroupItem
                                                value={item}
                                                id={itemId}
                                                className="h-5 w-5 border-2 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 group-hover:border-blue-400 transition-colors"
                                            />
                                            <Label
                                                htmlFor={itemId}
                                                className="text-sm font-normal text-gray-700 cursor-pointer group-hover:text-blue-600 transition-colors"
                                            >
                                                {item}
                                            </Label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </RadioGroup>
            </div>

            {/* Active Filter Indicator */}
            {selectedValue && (
                <div className="px-6 py-3 bg-blue-50 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Active filter:</span>
                        <span className="text-sm font-semibold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                            {selectedValue}
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FilterCard