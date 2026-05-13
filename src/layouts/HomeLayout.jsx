import Cookies from 'js-cookie'

import { FiMenu } from 'react-icons/fi'

import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import Footer from '../components/Footer'

import { logout } from '../Redux/slices/AuthSlice'

function HomeLayout({ children }) {

    const dispatch = useDispatch()

    const isLoggedIn = useSelector(
        (state) => state?.auth?.isLoggedIn
    )

    const role = useSelector(
        (state) => state?.auth?.role
    )

    const avatar = useSelector(
        (state) => state?.auth?.data?.avatar?.secure_url
    )

    const name = useSelector(
        (state) => state?.auth?.data?.name
    )

    const firstName = name ? name.split(' ')[0] : ''

    async function onLogout() {

        await dispatch(logout())

        Cookies.remove('authToken')

    }

    return (

        <div className='relative min-h-screen overflow-x-hidden bg-[#020617] text-white'>

            {/* Drawer */}
            <div className="drawer z-50">

                {/* Toggle */}
                <input
                    id="my-drawer-2"
                    type="checkbox"
                    className="drawer-toggle"
                />

                {/* CONTENT */}
                <div className="drawer-content relative z-10">

                    {/* MENU BUTTON */}
                    <div className="fixed top-5 left-5 z-[60]">

                        <label
                            htmlFor="my-drawer-2"
                            className="drawer-button cursor-pointer bg-[#111827] hover:border-yellow-400 transition-all duration-300 border border-gray-700 p-3 rounded-2xl shadow-xl"
                        >

                            <FiMenu
                                size={"28px"}
                                className='text-white'
                            />

                        </label>

                    </div>

                    {/* PAGE */}
                    <div className='relative z-0'>

                        {children}

                    </div>

                    {/* FOOTER */}
                    <Footer />

                </div>

                {/* SIDEBAR */}
                <div className="drawer-side z-[70]">

                    {/* Overlay */}
                    <label
                        htmlFor="my-drawer-2"
className="drawer-overlay bg-black/60"                      ></label>

                    {/* Menu */}
                    <ul className="menu p-6 pt-12 gap-5 w-72 min-h-full bg-[#111827] text-white relative border-r border-gray-800">

                        {/* USER CARD */}
                        {
                            isLoggedIn && (

                                <div className='bg-[#1f2937] border border-gray-700 rounded-3xl p-4 flex gap-4 items-center mb-5'>

                                    <img
                                        src={avatar}
                                        alt="profile"
                                        className='w-14 h-14 rounded-full object-cover border-2 border-yellow-400'
                                    />

                                    <div>

                                        <p className='text-gray-400 text-sm'>
                                            Welcome Back
                                        </p>

                                        <h2 className='text-yellow-400 font-bold capitalize text-lg'>
                                            {firstName}
                                        </h2>

                                    </div>

                                </div>

                            )
                        }

                        {/* ADMIN */}
                        {
                            isLoggedIn &&
                            role === 'ADMIN' && (

                                <li>

                                    <Link
                                        to={'/admin/dashboard'}
                                        className='hover:bg-yellow-500 hover:text-black rounded-xl transition-all duration-300'
                                    >
                                        Admin Dashboard
                                    </Link>

                                </li>

                            )
                        }

                        {/* NAVIGATION */}
                        <li>

                            <Link
                                to={'/'}
                                className='hover:bg-yellow-500 hover:text-black rounded-xl transition-all duration-300'
                            >
                                Home
                            </Link>

                        </li>

                        <li>

                            <Link
                                to={'/courses'}
                                className='hover:bg-yellow-500 hover:text-black rounded-xl transition-all duration-300'
                            >
                                All Courses
                            </Link>

                        </li>

                        <li>

                            <Link
                                to={'/contact'}
                                className='hover:bg-yellow-500 hover:text-black rounded-xl transition-all duration-300'
                            >
                                Contact Us
                            </Link>

                        </li>

                        <li>

                            <Link
                                to={'/about'}
                                className='hover:bg-yellow-500 hover:text-black rounded-xl transition-all duration-300'
                            >
                                About Us
                            </Link>

                        </li>

                        {/* BOTTOM BUTTONS */}
                        {
                            !isLoggedIn ? (

                                <div className='absolute bottom-10 left-0 w-full px-6 flex flex-col gap-4'>

                                    <Link to={'/login'}>

                                        <button className='w-full bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 text-black font-semibold py-3 rounded-2xl shadow-lg'>

                                            Login

                                        </button>

                                    </Link>

                                    <Link to={'/signup'}>

                                        <button className='w-full border border-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300 text-yellow-400 font-semibold py-3 rounded-2xl'>

                                            Signup

                                        </button>

                                    </Link>

                                </div>

                            ) : (

                                <div className='absolute bottom-10 left-0 w-full px-6 flex flex-col gap-4'>

                                    <Link to={'/profile'}>

                                        <button className='w-full bg-[#1f2937] border border-gray-700 hover:border-yellow-400 transition-all duration-300 py-3 rounded-2xl font-semibold'>

                                            Profile

                                        </button>

                                    </Link>

                                    <button
                                        onClick={onLogout}
                                        className='w-full bg-red-500 hover:bg-red-600 transition-all duration-300 text-white py-3 rounded-2xl font-semibold shadow-lg'
                                    >

                                        Logout

                                    </button>

                                </div>

                            )
                        }

                    </ul>

                </div>

            </div>

        </div>

    )

}

export default HomeLayout