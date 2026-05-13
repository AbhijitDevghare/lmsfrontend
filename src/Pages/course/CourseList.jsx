import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
    Search,
    SlidersHorizontal,
    BookOpen,
    Sparkles
} from 'lucide-react'

import HomeLayout from '../../layouts/HomeLayout'
import { getAllCourse } from '../../Redux/slices/CourseSlice'
import CourseCard from './CourseCard'

function CourseList() {

    const dispatch = useDispatch()

    const { courseData } = useSelector((state) => state?.course)

    const [searchTerm, setSearchTerm] = useState('')

    async function loadCourses() {
        await dispatch(getAllCourse())
    }

    useEffect(() => {
        loadCourses()
    }, [])

    const filteredCourses = courseData?.filter((course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <HomeLayout>

            <div className='min-h-screen px-4 lg:px-20 py-16 text-white'>

                {/* Hero Section */}
                <div className='flex flex-col items-center text-center gap-6 mb-14'>

                    <div className='flex items-center gap-3 bg-yellow-500/10 border border-yellow-500 px-5 py-2 rounded-full text-yellow-400'>
                        <Sparkles size={18} />
                        <span className='uppercase tracking-widest text-sm font-semibold'>
                            Premium Learning Platform
                        </span>
                    </div>

                    <h1 className='font-bold lg:text-6xl md:text-5xl text-3xl leading-tight max-w-5xl'>
                        Explore Courses Designed By
                        <span className='text-yellow-400'>
                            {" "}Industry Experts
                        </span>
                    </h1>

                    <p className='text-gray-400 text-lg max-w-3xl'>
                        Upgrade your skills with practical, industry-ready courses taught by professionals.
                    </p>

                </div>

                {/* Search + Filter */}
                <div className='flex flex-col md:flex-row justify-between gap-5 mb-14'>

                    {/* Search */}
                    <div className='relative w-full md:w-[500px]'>

                        <Search
                            className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                            size={20}
                        />

                        <input
                            type='text'
                            placeholder='Search your favorite courses...'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='w-full bg-[#111827] border border-gray-700 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-yellow-400 transition-all duration-300'
                        />

                    </div>

                    {/* Filter Button */}
                    <button
                        className='flex items-center justify-center gap-3 bg-[#111827] border border-gray-700 hover:border-yellow-400 transition-all duration-300 px-6 py-4 rounded-2xl'
                    >
                        <SlidersHorizontal size={20} />

                        <span>
                            Filters
                        </span>
                    </button>

                </div>

                {/* Stats */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-16'>

                    <div className='bg-[#111827] border border-gray-700 rounded-3xl p-6 flex items-center gap-5'>
                        <div className='bg-yellow-500/10 p-4 rounded-2xl'>
                            <BookOpen className='text-yellow-400' size={35} />
                        </div>

                        <div>
                            <h2 className='text-3xl font-bold'>
                                {courseData?.length || 0}+
                            </h2>

                            <p className='text-gray-400'>
                                Total Courses
                            </p>
                        </div>
                    </div>

                    <div className='bg-[#111827] border border-gray-700 rounded-3xl p-6 flex items-center gap-5'>
                        <div className='bg-yellow-500/10 p-4 rounded-2xl'>
                            <Sparkles className='text-yellow-400' size={35} />
                        </div>

                        <div>
                            <h2 className='text-3xl font-bold'>
                                Expert
                            </h2>

                            <p className='text-gray-400'>
                                Industry Mentors
                            </p>
                        </div>
                    </div>

                    <div className='bg-[#111827] border border-gray-700 rounded-3xl p-6 flex items-center gap-5'>
                        <div className='bg-yellow-500/10 p-4 rounded-2xl'>
                            <BookOpen className='text-yellow-400' size={35} />
                        </div>

                        <div>
                            <h2 className='text-3xl font-bold'>
                                Lifetime
                            </h2>

                            <p className='text-gray-400'>
                                Course Access
                            </p>
                        </div>
                    </div>

                </div>

                {/* Course Cards */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center'>

                    {
                        filteredCourses?.length > 0 ? (
                            filteredCourses.map((course) => (
                                <CourseCard
                                    key={course._id}
                                    data={course}
                                />
                            ))
                        ) : (
                            <div className='col-span-full flex flex-col items-center gap-5 py-20'>

                                <BookOpen
                                    size={70}
                                    className='text-gray-600'
                                />

                                <h2 className='text-3xl font-bold text-gray-400'>
                                    No Courses Found
                                </h2>

                                <p className='text-gray-500'>
                                    Try searching with another keyword.
                                </p>

                            </div>
                        )
                    }

                </div>

            </div>

        </HomeLayout>
    )
}

export default CourseList