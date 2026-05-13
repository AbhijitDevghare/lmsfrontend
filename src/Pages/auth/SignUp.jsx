import Cookies from 'js-cookie'

import { useState } from 'react'

import {
    Upload,
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Sparkles,
    BadgeCheck
} from 'lucide-react'

import { useDispatch } from 'react-redux'

import { Link, useNavigate } from 'react-router-dom'

import option3 from '../../assets/json/option3.json'

import Particle from '../../components/Particle'

import HomeLayout from '../../layouts/HomeLayout'

import { signup } from '../../Redux/slices/AuthSlice'

function SignUp() {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const token = import.meta.env.VITE_TOKEN

    const [viewImage, setViewImage] = useState("")

    const [showPassword, setShowPassword] = useState(false)

    const [signUpData, setSignUpData] = useState({
        avatar: "",
        name: "",
        email: "",
        password: ""
    })

    function handleUserInput(e) {

        const { name, value } = e.target

        setSignUpData({
            ...signUpData,
            [name]: value
        })

    }

    function getImage(event) {

        event.preventDefault()

        const uploadedImage = event.target.files[0]

        if (uploadedImage) {

            setSignUpData({
                ...signUpData,
                avatar: uploadedImage
            })

        }

        const fileReader = new FileReader()

        fileReader.readAsDataURL(uploadedImage)

        fileReader.addEventListener('load', function () {

            setViewImage(this.result)

        })

    }

    async function createAccount(event) {

        event.preventDefault()

        const formData = new FormData()

        formData.append('avatar', signUpData.avatar)
        formData.append('name', signUpData.name)
        formData.append('email', signUpData.email)
        formData.append('password', signUpData.password)

        const response = await dispatch(signup(formData))

        if (response.payload?.success) {

            navigate('/')

            setSignUpData({
                avatar: "",
                name: "",
                email: "",
                password: ""
            })

            setViewImage("")

            Cookies.set('authToken', token, {
                expires: 7
            })

        }

    }

    return (

        <HomeLayout>

            <Particle option={option3} />

            <div className='min-h-screen flex justify-center items-center px-4 py-10 relative z-10'>

                <div className='grid lg:grid-cols-2 bg-[#111827] border border-gray-700 rounded-[2rem] overflow-hidden shadow-2xl w-full max-w-6xl'>

                    {/* LEFT SIDE */}
                    <div className='hidden lg:flex flex-col justify-center bg-gradient-to-br from-yellow-500 to-orange-500 text-black p-14 relative overflow-hidden'>

                        <div className='absolute top-0 left-0 w-80 h-80 bg-white/20 rounded-full blur-3xl'></div>

                        <div className='relative z-10 space-y-8'>

                            <div className='flex items-center gap-3 bg-black/10 px-5 py-2 rounded-full w-fit'>

                                <Sparkles size={18} />

                                <span className='uppercase tracking-widest text-sm font-semibold'>
                                    Join LMS
                                </span>

                            </div>

                            <h1 className='text-6xl font-bold leading-tight'>
                                Start Your Learning Adventure
                            </h1>

                            <p className='text-lg font-medium leading-relaxed max-w-lg'>
                                Create your account and access premium courses, projects and expert mentorship.
                            </p>

                            <div className='space-y-5 pt-4'>

                                <div className='flex items-center gap-4'>

                                    <BadgeCheck size={24} />

                                    <span className='text-lg font-semibold'>
                                        Access Premium Courses
                                    </span>

                                </div>

                                <div className='flex items-center gap-4'>

                                    <BadgeCheck size={24} />

                                    <span className='text-lg font-semibold'>
                                        Learn From Industry Experts
                                    </span>

                                </div>

                                <div className='flex items-center gap-4'>

                                    <BadgeCheck size={24} />

                                    <span className='text-lg font-semibold'>
                                        Build Real World Projects
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className='p-8 lg:p-14 text-white'>

                        {/* Heading */}
                        <div className='mb-10'>

                            <h1 className='text-4xl font-bold mb-3'>
                                Create Account
                            </h1>

                            <p className='text-gray-400 text-lg'>
                                Signup and begin your learning journey today.
                            </p>

                        </div>

                        {/* Form */}
                        <form
                            onSubmit={createAccount}
                            className='space-y-7'
                        >

                            {/* Upload */}
                            <div className='flex flex-col items-center gap-5'>

                                <div className='relative'>

                                    {
                                        viewImage ? (

                                            <img
                                                src={viewImage}
                                                alt='preview'
                                                className='w-28 h-28 rounded-full object-cover border-4 border-yellow-400 shadow-xl'
                                            />

                                        ) : (

                                            <div className='w-28 h-28 rounded-full border-2 border-dashed border-yellow-400 flex justify-center items-center bg-[#1f2937]'>

                                                <Upload
                                                    size={35}
                                                    className='text-yellow-400'
                                                />

                                            </div>

                                        )
                                    }

                                    <label
                                        htmlFor='image'
                                        className='absolute bottom-0 right-0 bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 text-black p-3 rounded-full cursor-pointer shadow-lg'
                                    >

                                        <Upload size={16} />

                                    </label>

                                </div>

                                <input
                                    type='file'
                                    name='image'
                                    id='image'
                                    accept='.jpg, .jpeg, .png, .svg'
                                    className='hidden'
                                    onChange={getImage}
                                />

                            </div>

                            {/* Name */}
                            <div className='space-y-3'>

                                <label
                                    htmlFor='name'
                                    className='text-lg font-semibold'
                                >
                                    Full Name
                                </label>

                                <div className='flex items-center gap-4 bg-[#1f2937] border border-gray-700 focus-within:border-yellow-400 transition-all duration-300 rounded-2xl px-5 h-16'>

                                    <User
                                        className='text-yellow-400'
                                        size={22}
                                    />

                                    <input
                                        type='text'
                                        name='name'
                                        id='name'
                                        placeholder='Enter your full name'
                                        className='bg-transparent outline-none w-full text-lg'
                                        onChange={handleUserInput}
                                    />

                                </div>

                            </div>

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
                                        placeholder='Create password'
                                        className='bg-transparent outline-none w-full text-lg'
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

                            {/* Submit */}
                            <button
                                type='submit'
                                className='w-full bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 text-black font-bold py-4 rounded-2xl text-lg shadow-lg'
                            >
                                Create Account
                            </button>

                        </form>

                        {/* Login */}
                        <div className='mt-10 text-center text-gray-400'>

                            Already have an account?

                            <Link
                                to={'/login'}
                                className='text-yellow-400 hover:underline ml-2 font-semibold'
                            >
                                Login Here
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </HomeLayout>

    )

}

export default SignUp