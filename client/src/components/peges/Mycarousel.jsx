import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useDispatch } from 'react-redux'

const categories = [
    {
        title: "Frontend Developer",
        icon: "💻",
        bgColor: "bg-blue-50",
        textColor: "text-blue-600"
    },
    {
        title: "Backend Developer",
        icon: "⚙️",
        bgColor: "bg-purple-50",
        textColor: "text-purple-600"
    },
    {
        title: "Data Science",
        icon: "📊",
        bgColor: "bg-green-50",
        textColor: "text-green-600"
    },
    {
        title: "Graphic Designer",
        icon: "🎨",
        bgColor: "bg-pink-50",
        textColor: "text-pink-600"
    },
    {
        title: "Fullstack Developer",
        icon: "👨‍💻",
        bgColor: "bg-indigo-50",
        textColor: "text-indigo-600"
    },
    {
        title: "DevOps Engineer",
        icon: "🛠️",
        bgColor: "bg-amber-50",
        textColor: "text-amber-600"
    },
    {
        title: "Mobile Developer",
        icon: "📱",
        bgColor: "bg-emerald-50",
        textColor: "text-emerald-600"
    },
    {
        title: "UI/UX Designer",
        icon: "✨",
        bgColor: "bg-fuchsia-50",
        textColor: "text-fuchsia-600"
    }
]

const MyCarousel = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const searchHandler = (query) => {
        dispatch(setSearchedQuery(query))
        navigate("/browse")
    }

    return (
        <div className="py-12 bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Popular Job Categories</h2>
                <p className="text-lg text-center text-gray-600 mb-12">Browse jobs in trending categories</p>

                <Carousel
                    className="w-full max-w-6xl mx-auto"
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                >
                    <CarouselContent className="-ml-4">
                        {categories.map((category, index) => (
                            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/4">
                                <div
                                    onClick={() => searchHandler(category.title)}
                                    className={`${category.bgColor} ${category.textColor} p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer h-full flex flex-col items-center text-center group`}
                                >
                                    <span className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                                        {category.icon}
                                    </span>
                                    <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                                    <Button
                                        variant="ghost"
                                        className={`mt-2 ${category.textColor} hover:${category.bgColor.replace('50', '100')} rounded-full`}
                                    >
                                        Explore Jobs
                                    </Button>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="mt-8 flex justify-center gap-4">
                        <CarouselPrevious className="relative top-0 left-0 transform-none -translate-y-0 bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 shadow-sm" />
                        <CarouselNext className="relative top-0 left-0 transform-none -translate-y-0 bg-white border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 shadow-sm" />
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default MyCarousel