import React from 'react'
import Navbar from '../shared/Navbar'
import ApplicantTable from './ApplicantTable'
import { useParams } from 'react-router-dom'
import { useGetApplicantsQuery } from '@/redux/applyjobApi'

const Applicants = () => {
    const { id } = useParams()
    const { data, isLoading, error } = useGetApplicantsQuery(id)

    return (
        <>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>
                    {isLoading ? 'Loading...' : `Total Applicants: ${data?.job?.aplications?.length || 0}`}
                </h1>
                <ApplicantTable applicants={data?.job?.aplications || []} />
            </div>
        </>
    )
}

export default Applicants
