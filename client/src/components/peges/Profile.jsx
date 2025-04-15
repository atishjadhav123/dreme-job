import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Contact, Mail, Pen, FileText, Award, Briefcase, MapPin, GraduationCap } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Label } from '../ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'

const Profile = () => {
    const { user } = useSelector(store => store.auth)
    const [open, setOpen] = useState(false)

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-10">
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                        <p className="text-gray-500 mt-1">Manage your personal information and job applications</p>
                    </div>
                    <Button
                        onClick={() => setOpen(true)}
                        variant="outline"
                        className="border-gray-300 hover:border-indigo-500 hover:text-indigo-600 rounded-full gap-2"
                    >
                        <Pen className="w-4 h-4" />
                        Edit Profile
                    </Button>
                </div>

                {/* Main Profile Card */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Personal Info */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Profile Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex flex-col items-center">
                                <Avatar className="h-32 w-32 ring-4 ring-white shadow-lg">
                                    <AvatarImage
                                        src={user?.profile?.profilephoto}
                                        alt="profile"
                                        className="object-cover"
                                    />
                                </Avatar>
                                <h2 className="mt-4 text-xl font-semibold text-gray-900">{user?.fullname}</h2>
                                <p className="text-gray-500 text-sm">{user?.profile?.bio || "No bio available"}</p>

                                <div className="mt-4 flex space-x-3">
                                    <Button variant="outline" size="sm" className="rounded-full">
                                        <Contact className="w-4 h-4 mr-2" />
                                        Contact
                                    </Button>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <div className="flex items-start">
                                    <Mail className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="text-gray-900">{user?.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <Contact className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Phone</p>
                                        <p className="text-gray-900">{user?.phonenumber || "Not provided"}</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                                    <div>
                                        <p className="text-sm text-gray-500">Location</p>
                                        <p className="text-gray-900">{user?.profile?.location || "Not specified"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Skills Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-medium text-gray-900">Skills</h3>
                                <Award className="h-5 w-5 text-indigo-500" />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {user?.profile?.skills?.length > 0 ? (
                                    user.profile.skills.map((skill, index) => (
                                        <Badge
                                            key={index}
                                            variant="outline"
                                            className="bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-100"
                                        >
                                            {skill}
                                        </Badge>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">No skills added yet</p>
                                )}
                            </div>
                        </div>

                        {/* Resume Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-medium text-gray-900">Resume</h3>
                                <FileText className="h-5 w-5 text-indigo-500" />
                            </div>
                            {user?.profile?.resume ? (
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="flex items-center">
                                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                                        <span className="text-sm font-medium text-gray-700 truncate max-w-[180px]">
                                            {user.profile.resumeorignalname}
                                        </span>
                                    </div>
                                    <a
                                        href={user.profile.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                    >
                                        View
                                    </a>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-500">No resume uploaded</p>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Experience & Education (Placeholder) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-medium text-gray-900">Experience</h3>
                                    <Briefcase className="h-5 w-5 text-indigo-500" />
                                </div>
                                <p className="text-sm text-gray-500">Add your work experience to showcase your background</p>
                            </div>
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-medium text-gray-900">Education</h3>
                                    <GraduationCap className="h-5 w-5 text-indigo-500" />
                                </div>
                                <p className="text-sm text-gray-500">Add your educational qualifications</p>
                            </div>
                        </div>

                        {/* Applied Jobs */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-medium text-gray-900">Applied Jobs</h3>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                        {user?.applications?.length || 0} applications
                                    </span>
                                </div>
                            </div>
                            <div className="p-1">
                                <AppliedJobTable />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile