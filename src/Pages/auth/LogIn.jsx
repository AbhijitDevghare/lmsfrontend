import Cookies from 'js-cookie'

import { useState } from 'react'

import {
    Mail,
    Lock,
    Sparkles,
    Eye,
    EyeOff
} from 'lucide-react'

import { useDispatch } from 'react-redux'

import { Link, useNavigate } from 'react-router-dom'

import option2 from '../../assets/json/option2.json'

import Particle from '../../components/Particle'

import HomeLayout from '../../layouts/HomeLayout'

import {
    forgotPassword,
    login
} from '../../Redux/slices/AuthSlice'

function LogIn() {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const token = import.meta.env.VITE_TOKEN

    const [showPassword, setShowPassword] = useState(false)

    const [logInData, setLogInData] = useState({
        email: "",
        password: ""
    })

    function handleUserInput(e) {

        const { name, value } = e.target

        setLogInData({
            ...logInData,
            [name]: value
        })

    }

    async function onLogin(event) {

        event.preventDefault()

        const response = await dispatch(login(logInData))

        if (response.payload?.success) {

            navigate('/')

            setLogInData({
                email: "",
                password: ""
            })

            Cookies.set('authToken', token, {
                expires: 7
            })

        }

    }

    async function onForgotPassword() {

        if (!logInData.email) return

        const response = await dispatch(
            forgotPassword({
                email: logInData.email
            })
        )

        if (response.payload?.success) {

            setLogInData({
                email: "",
                password: ""
            })

        }

    }

    return (

        <HomeLayout>

            <Particle option={option2} />

            <div className='min-h-screen flex justify-center items-center px-4 py-10 relative z-10'>

                <div className='grid lg:grid-cols-2 bg-[#111827] border border-gray-700 rounded-[2rem] overflow-hidden shadow-2xl w-full max-w-6xl'>

                    {/* LEFT SIDE */}
                    <div className='hidden lg:flex flex-col justify-center bg-gradient-to-br from-yellow-500 to-orange-500 text-black p-14 relative overflow-hidden'>

                        <div className='absolute top-0 left-0 w-72 h-72 bg-white/20 rounded-full blur-3xl'></div>

                        <div className='relative z-10 space-y-8'>

                            <div className='flex items-center gap-3 bg-black/10 px-5 py-2 rounded-full w-fit'>

                                <Sparkles size={18} />

                                <span className='uppercase tracking-widest text-sm font-semibold'>
                                    Welcome Back
                                </span>

                            </div>

                            <h1 className='text-6xl font-bold leading-tight'>
                                Continue Your Learning Journey
                            </h1>

                            <p className='text-lg font-medium leading-relaxed max-w-lg'>
                                Access premium courses, expert mentorship and practical learning experiences from anywhere.
                            </p>

                            <div className='flex gap-5 pt-4'>

                                <div className='bg-black/10 rounded-2xl px-6 py-5'>
                                    <h2 className='text-3xl font-bold'>
                                        10K+
                                    </h2>

                                    <p>
                                        Students
                                    </p>
                                </div>

                                <div className='bg-black/10 rounded-2xl px-6 py-5'>
                                    <h2 className='text-3xl font-bold'>
                                        150+
                                    </h2>

                                    <p>
                                        Courses
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className='p-8 lg:p-14 text-white'>

                        {/* Heading */}
                        <div className='mb-10'>

                            <h1 className='text-4xl font-bold mb-3'>
                                Login
                            </h1>

                            <p className='text-gray-400 text-lg'>
                                Please login to continue your account access.
                            </p>

                        </div>

                        {/* Form */}
                        <form
                            onSubmit={onLogin}
                            className='space-y-7'
                        >

                            {/* Email */}
                            <div className='space-y-3'>

                                <label
                                    htmlFor='email'
                                    className='text-lg font-semibold'
                                >
                                    Email Address
                                </label>

                                <div className='flex items-center gap-4 bg-[#1f2937] border border-gray-700 focus-within:border-yellow-400 transition-all duration-300 rounded-2xl px-5 h-16'>

                                    <Mail
                                        className='text-yellow-400'
                                        size={22}
                                    />

                                    <input
                                        type='email'
                                        name='email'
                                        id='email'
                                        placeholder='Enter your email'
                                        className='bg-transparent outline-none w-full text-lg'
                                        value={logInData.email}
                                        onChange={handleUserInput}
                                    />

                                </div>

                            </div>

                            {/* Password */}
                            <div className='space-y-3'>

                                <label
                                    htmlFor='password'
                                    className='text-lg font-semibold'
                                >
                                    Password
                                </label>

                                <div className='flex items-center gap-4 bg-[#1f2937] border border-gray-700 focus-within:border-yellow-400 transition-all duration-300 rounded-2xl px-5 h-16'>

                                    <Lock
                                        className='text-yellow-400'
                                        size={22}
                                    />

                                    <input
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name='password'
                                        id='password'
                                        placeholder='Enter your password'
                                        className='bg-transparent outline-none w-full text-lg'
                                        value={logInData.password}
                                        onChange={handleUserInput}
                                    />

                                    <button
                                        type='button'
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className='text-gray-400 hover:text-yellow-400 transition-all duration-300'
                                    >

                                        {
                                            showPassword
                                                ? <EyeOff size={22} />
                                                : <Eye size={22} />
                                        }

                                    </button>

                                </div>

                            </div>

                            {/* Forgot */}
                            <div className='flex justify-end'>

                                <button
                                    type='button'
                                    onClick={onForgotPassword}
                                    className='text-yellow-400 hover:underline'
                                >
                                    Forgot Password?
                                </button>

                            </div>

                            {/* Submit */}
                            <button
                                type='submit'
                                className='w-full bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 text-black font-bold py-4 rounded-2xl text-lg shadow-lg'
                            >
                                Login
                            </button>

                        </form>

                        {/* Signup */}
                        <div className='mt-10 text-center text-gray-400'>

                            Don&apos;t have an account?

                            <Link
                                to={'/signup'}
                                className='text-yellow-400 hover:underline ml-2 font-semibold'
                            >
                                Signup Here
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </HomeLayout>

    )

}

export default LogIn