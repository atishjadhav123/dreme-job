import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './peges/HeroSection'
import Mycarousel from './peges/Mycarousel'
import LatestJob from './peges/LatestJob'
import Footer from './peges/Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const { user } = useSelector(store => store.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (user?.role === 'recruiter') {
            navigate("/admin/compnaies")
        }
    }, [user, navigate])

    return (
        <>
            <Navbar />
            <HeroSection />
            <Mycarousel />
            <LatestJob />
            <Footer />
        </>
    )
}

export default Home
