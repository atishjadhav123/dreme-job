import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
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
import { Edit2, MoreHorizontal, Building2, Search, Calendar } from 'lucide-react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { useGetAllComapanyQuery } from '@/redux/companyApi'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { Skeleton } from '../ui/skeleton'
import { Button } from '../ui/button'

const CompaniesTable = () => {
    const navigate = useNavigate()
    const { data, isLoading } = useGetAllComapanyQuery()
    const { searchCompanyByText } = useSelector(store => store.company)
    const companies = data?.companies || []
    const [filterCompany, setFilterCompany] = useState([])

    useEffect(() => {
        const filteredCompany = companies.filter((company) =>
            !searchCompanyByText ||
            company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        )
        setFilterCompany(filteredCompany)
    }, [companies, searchCompanyByText])

    return (
        <div className="rounded-xl border shadow-sm bg-white">
            {/* Table Header with Search */}
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-indigo-600" />
                    <h2 className="text-lg font-semibold">Companies</h2>
                    <Badge variant="secondary" className="ml-2">
                        {filterCompany.length} {filterCompany.length === 1 ? 'Company' : 'Companies'}
                    </Badge>
                </div>
            </div>

            {/* Table */}
            <Table>
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead className="w-[100px]">Logo</TableHead>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Industry</TableHead>
                        <TableHead>
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>Created</span>
                            </div>
                        </TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        // Loading state
                        Array.from({ length: 5 }).map((_, i) => (
                            <TableRow key={i}>
                                <TableCell><Skeleton className="h-10 w-10 rounded-full" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                <TableCell className="text-right">
                                    <Skeleton className="h-8 w-8 rounded-md" />
                                </TableCell>
                            </TableRow>
                        ))
                    ) : filterCompany.length === 0 ? (
                        // Empty state
                        <TableRow>
                            <TableCell colSpan={5} className="py-12 text-center">
                                <div className="flex flex-col items-center gap-2">
                                    <Search className="h-8 w-8 text-gray-400" />
                                    <p className="text-gray-500 font-medium">No companies found</p>
                                    <p className="text-sm text-gray-400">
                                        {searchCompanyByText ?
                                            'Try adjusting your search query' :
                                            'No companies registered yet'}
                                    </p>
                                </div>
                            </TableCell>
                        </TableRow>
                    ) : (
                        // Data rows
                        filterCompany.map((company) => (
                            <TableRow key={company._id} className="hover:bg-gray-50">
                                <TableCell>
                                    <Avatar className="border">
                                        <AvatarImage src={company.logo} alt={company.name} />
                                        <div className="flex items-center justify-center bg-gray-100 text-gray-500 font-medium text-xs">
                                            {company.name.charAt(0)}
                                        </div>
                                    </Avatar>
                                </TableCell>
                                <TableCell className="font-medium">
                                    <Link
                                        to={`/admin/companies/${company._id}`}
                                        className="hover:text-indigo-600 hover:underline"
                                    >
                                        {company.name}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="text-xs">
                                        {company.industry || 'N/A'}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="text-sm text-gray-500">
                                        {new Date(company.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-40 p-2">
                                            <Link
                                                to={`/admin/companies/${company._id}`}
                                                className="flex items-center gap-2 p-2 text-sm rounded hover:bg-gray-100"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                                <span>Edit</span>
                                            </Link>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {/* Pagination would go here */}
        </div>
    )
}

export default CompaniesTable