import Chart, {
    ArcElement,
    CategoryScale,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    Filler
} from 'chart.js/auto'

import { useEffect } from 'react'

import {
    Line,
    Doughnut
} from 'react-chartjs-2'

import {
    Users,
    IndianRupee,
    BookOpen,
    TrendingUp,
    Pencil,
    Trash2,
    Plus,
    Sparkles,
    Crown
} from 'lucide-react'

import { useDispatch, useSelector } from 'react-redux'

import { Link, useNavigate } from 'react-router-dom'

import HomeLayout from '../../layouts/HomeLayout'

import {
    deleteCourse,
    getAllCourse
} from '../../Redux/slices/CourseSlice';

import {
    getPaymentsRecord
} from '../../Redux/slices/RazorpaySlice';

import {
    getStats
} from '../../Redux/slices/StatSlice'

Chart.register(
    ArcElement,
    CategoryScale,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Tooltip,
    Filler
)

function AdminDashboard() {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const {
        allUserCount,
        subscribedCount
    } = useSelector((state) => state.stat)

    const {
        allPayments,
        monthlySalesRecord
    } = useSelector((state) => state.razorpay)

    const Courses = useSelector(
        (state) => state.course.courseData
    )

    useEffect(() => {

        (
            async () => {

                await dispatch(getAllCourse())

                await dispatch(getStats())

                await dispatch(getPaymentsRecord())

            }
        )()

    }, [])

    async function onDelete(id) {

        const res = await dispatch(deleteCourse(id))

        if (res?.payload?.success) {

            await dispatch(getAllCourse())

        }

    }

    const userData = {

        labels: [
            "Registered Users",
            "Subscribed Users"
        ],

        datasets: [
            {
                data: [
                    allUserCount,
                    subscribedCount
                ],

                backgroundColor: [
                    "#eab308",
                    "#22c55e"
                ],

                borderWidth: 0
            }
        ]

    }

    const salesData = {

        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
        ],

        datasets: [
            {
                label: "Monthly Revenue",

                data: monthlySalesRecord,

                borderColor: "#eab308",

                backgroundColor:
                    "rgba(234,179,8,0.15)",

                tension: 0.4,

                fill: true,

                pointRadius: 5
            }
        ]

    }

    return (

        <HomeLayout>

            <div className='min-h-screen bg-[#020617] text-white px-4 lg:px-12 py-10'>

                {/* HEADER */}
                <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12'>

                    <div>

                        <div className='flex items-center gap-3 bg-yellow-500/10 border border-yellow-500 px-5 py-2 rounded-full text-yellow-400 w-fit mb-5'>

                            <Sparkles size={18} />

                            <span className='uppercase tracking-widest text-sm font-semibold'>
                                Admin Analytics
                            </span>

                        </div>

                        <h1 className='text-5xl font-bold mb-3'>
                            Admin Dashboard
                        </h1>

                        <p className='text-gray-400 text-lg'>
                            Monitor courses, revenue and platform growth.
                        </p>

                    </div>

                    <Link to={'/course/create'}>

                        <button className='bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 text-black font-bold px-8 py-4 rounded-2xl flex items-center gap-3 shadow-xl'>

                            <Plus size={22} />

                            Create New Course

                        </button>

                    </Link>

                </div>

                {/* STATS */}
                <div className='grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-14'>

                    {/* USERS */}
                    <div className='bg-[#111827] border border-gray-700 rounded-[2rem] p-7 hover:border-yellow-400 transition-all duration-300'>

                        <div className='flex justify-between items-center mb-6'>

                            <div>

                                <p className='text-gray-400'>
                                    Registered Users
                                </p>

                                <h1 className='text-4xl font-bold mt-2'>
                                    {allUserCount}
                                </h1>

                            </div>

                            <div className='bg-yellow-500/10 p-4 rounded-2xl'>

                                <Users
                                    className='text-yellow-400'
                                    size={35}
                                />

                            </div>

                        </div>

                    </div>

                    {/* SUBSCRIBERS */}
                    <div className='bg-[#111827] border border-gray-700 rounded-[2rem] p-7 hover:border-green-400 transition-all duration-300'>

                        <div className='flex justify-between items-center mb-6'>

                            <div>

                                <p className='text-gray-400'>
                                    Subscribers
                                </p>

                                <h1 className='text-4xl font-bold mt-2'>
                                    {subscribedCount}
                                </h1>

                            </div>

                            <div className='bg-green-500/10 p-4 rounded-2xl'>

                                <Crown
                                    className='text-green-400'
                                    size={35}
                                />

                            </div>

                        </div>

                    </div>

                    {/* PAYMENTS */}
                    <div className='bg-[#111827] border border-gray-700 rounded-[2rem] p-7 hover:border-blue-400 transition-all duration-300'>

                        <div className='flex justify-between items-center mb-6'>

                            <div>

                                <p className='text-gray-400'>
                                    Total Payments
                                </p>

                                <h1 className='text-4xl font-bold mt-2'>
                                    {allPayments?.count || 0}
                                </h1>

                            </div>

                            <div className='bg-blue-500/10 p-4 rounded-2xl'>

                                <TrendingUp
                                    className='text-blue-400'
                                    size={35}
                                />

                            </div>

                        </div>

                    </div>

                    {/* REVENUE */}
                    <div className='bg-[#111827] border border-gray-700 rounded-[2rem] p-7 hover:border-yellow-400 transition-all duration-300'>

                        <div className='flex justify-between items-center mb-6'>

                            <div>

                                <p className='text-gray-400'>
                                    Total Revenue
                                </p>

                                <h1 className='text-4xl font-bold mt-2 flex items-center'>
                                    <IndianRupee size={30} />

                                    {
                                        isNaN(allPayments?.count)
                                            ? 0
                                            : allPayments.count * 499
                                    }
                                </h1>

                            </div>

                            <div className='bg-yellow-500/10 p-4 rounded-2xl'>

                                <IndianRupee
                                    className='text-yellow-400'
                                    size={35}
                                />

                            </div>

                        </div>

                    </div>

                </div>

                {/* CHARTS */}
                <div className='grid lg:grid-cols-[35%,65%] gap-8 mb-16'>

                    {/* PIE */}
                    <div className='bg-[#111827] border border-gray-700 rounded-[2rem] p-8'>

                        <h1 className='text-2xl font-bold mb-8'>
                            User Analytics
                        </h1>

                        <div className='max-w-sm mx-auto'>

                            <Doughnut
                                data={userData}
                                options={{
                                    plugins: {
                                        legend: {
                                            labels: {
                                                color: "white"
                                            }
                                        }
                                    }
                                }}
                            />

                        </div>

                    </div>

                    {/* LINE */}
                    <div className='bg-[#111827] border border-gray-700 rounded-[2rem] p-8 overflow-hidden'>

                        <h1 className='text-2xl font-bold mb-8'>
                            Monthly Revenue
                        </h1>

                        <Line
                            data={salesData}
                            options={{
                                responsive: true,

                                plugins: {
                                    legend: {
                                        labels: {
                                            color: "white"
                                        }
                                    }
                                },

                                scales: {

                                    x: {
                                        ticks: {
                                            color: "white"
                                        },

                                        grid: {
                                            color:
                                                "rgba(255,255,255,0.08)"
                                        }
                                    },

                                    y: {
                                        ticks: {
                                            color: "white"
                                        },

                                        grid: {
                                            color:
                                                "rgba(255,255,255,0.08)"
                                        }
                                    }

                                }

                            }}
                        />

                    </div>

                </div>

                {/* COURSES */}
                <div className='bg-[#111827] border border-gray-700 rounded-[2rem] p-8 overflow-x-auto'>

                    {/* HEADER */}
                    <div className='flex justify-between items-center mb-8'>

                        <div className='flex items-center gap-4'>

                            <BookOpen
                                className='text-yellow-400'
                                size={32}
                            />

                            <div>

                                <h1 className='text-3xl font-bold'>
                                    Course Overview
                                </h1>

                                <p className='text-gray-400'>
                                    Manage all platform courses
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* TABLE */}
                    <table className='w-full border-separate border-spacing-y-4 min-w-[900px]'>

                        <thead>

                            <tr className='text-gray-400 text-left'>

                                <th>#</th>

                                <th>Course</th>

                                <th>Category</th>

                                <th>Instructor</th>

                                <th>Lectures</th>

                                <th className='text-center'>
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                Courses?.map((course, idx) => (

                                    <tr
                                        key={course?._id}
                                        className='bg-[#1f2937] hover:bg-[#263244] transition-all duration-300'
                                    >

                                        <td className='py-5 px-4 rounded-l-2xl font-semibold'>
                                            {idx + 1}
                                        </td>

                                        <td className='py-5 px-4'>

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/course/${course?.title}/${course?._id}/lectures`,
                                                        {
                                                            state:
                                                                Courses[idx]
                                                        }
                                                    )
                                                }
                                                className='font-semibold hover:text-yellow-400 transition-all duration-300 capitalize'
                                            >

                                                {course?.title}

                                            </button>

                                        </td>

                                        <td className='py-5 px-4 capitalize'>
                                            {course?.category}
                                        </td>

                                        <td className='py-5 px-4 capitalize'>
                                            {course?.createdBy}
                                        </td>

                                        <td className='py-5 px-4'>
                                            {course?.numberOfLectures}
                                        </td>

                                        <td className='py-5 px-4 rounded-r-2xl'>

                                            <div className='flex justify-center gap-4'>

                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/course/${course?.title}/${course?._id}/editCourse`,
                                                            {
                                                                state:
                                                                    Courses[idx]
                                                            }
                                                        )
                                                    }
                                                    className='bg-blue-500/10 hover:bg-blue-500 transition-all duration-300 text-blue-400 hover:text-white p-3 rounded-xl'
                                                >

                                                    <Pencil size={18} />

                                                </button>

                                                <button
                                                    onClick={() =>
                                                        onDelete(
                                                            course?._id
                                                        )
                                                    }
                                                    className='bg-red-500/10 hover:bg-red-500 transition-all duration-300 text-red-400 hover:text-white p-3 rounded-xl'
                                                >

                                                    <Trash2 size={18} />

                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </HomeLayout>

    )

}

export default AdminDashboard