import React from 'react'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { SiIndeed } from 'react-icons/si'
import { MdWork } from 'react-icons/md'

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    <div className="space-y-5">
                        <div className="flex items-center space-x-2">
                            <MdWork className="text-blue-400 text-3xl" />
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                                JobPort
                            </span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Connecting top talent with world-class opportunities. Our platform helps you find your dream job and take the next step in your career journey.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="bg-gray-700 hover:bg-blue-600 p-2 rounded-full transition-all duration-300">
                                <FaFacebook className="text-white" size={16} />
                            </a>
                            <a href="#" className="bg-gray-700 hover:bg-sky-500 p-2 rounded-full transition-all duration-300">
                                <FaTwitter className="text-white" size={16} />
                            </a>
                            <a href="#" className="bg-gray-700 hover:bg-blue-700 p-2 rounded-full transition-all duration-300">
                                <FaLinkedin className="text-white" size={16} />
                            </a>
                            <a href="#" className="bg-gray-700 hover:bg-pink-600 p-2 rounded-full transition-all duration-300">
                                <FaInstagram className="text-white" size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-700 inline-block">
                            Quick Links
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="/" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center">
                                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/jobs" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center">
                                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                                    Browse Jobs
                                </a>
                            </li>
                            <li>
                                <a href="/companies" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center">
                                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                                    Top Companies
                                </a>
                            </li>
                            <li>
                                <a href="/career-advice" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center">
                                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                                    Career Advice
                                </a>
                            </li>
                            <li>
                                <a href="/about" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center">
                                    <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                                    About Us
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-700 inline-block">
                            Job Categories
                        </h3>
                        <ul className="grid grid-cols-2 gap-3">
                            <li>
                                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                                    Technology
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                                    Marketing
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                                    Finance
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                                    Healthcare
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                                    Remote
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                                    Engineering
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                                    Design
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                                    Sales
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-700 inline-block">
                            Contact Us
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <FaEnvelope className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                                <div>
                                    <p className="text-gray-400 text-sm">Email</p>
                                    <a href="mailto:support@jobport.com" className="text-gray-300 hover:text-blue-400 transition-colors">
                                        jatish933@gmail.com
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <FaPhone className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                                <div>
                                    <p className="text-gray-400 text-sm">Phone</p>
                                    <a href="tel:+919876543210" className="text-gray-300 hover:text-blue-400 transition-colors">
                                        9373381354
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <FaMapMarkerAlt className="text-blue-400 mt-1 mr-3 flex-shrink-0" />
                                <div>
                                    <p className="text-gray-400 text-sm">Address</p>
                                    <p className="text-gray-300">
                                        Tech Park, Andheri East,<br />
                                        Mumbai 400069, India
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-gray-400 text-sm mb-4 md:mb-0">
                        © {new Date().getFullYear()} JobPort. All rights reserved.
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                            Terms of Service
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer