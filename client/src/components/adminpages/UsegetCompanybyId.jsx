import { useGetCompanybyIdQuery } from '@/redux/companyApi'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const UsegetCompanybyId = ({ comanyid }) => {
    const { data } = useGetCompanybyIdQuery(comanyid)


    return (
        <div>UsegetCompanybyId</div>
    )
}

export default UsegetCompanybyId