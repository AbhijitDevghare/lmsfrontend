import { useState } from 'react'

import {
    Camera,
    Mail,
    Shield,
    Crown,
    Trash2,
    KeyRound,
    Save,
    Sparkles,
    BadgeCheck
} from 'lucide-react'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import HomeLayout from '../../layouts/HomeLayout'

import {
    deleteProfile,
    editProfile,
    getProfile
} from '../../redux/slices/AuthSlice'

import { cancelSubscription } from '../../redux/slices/RazorpaySlice'

function Profile() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userData = useSelector((state) => state.auth?.data)

    const [data, setData] = useState({
        previewImage: userData.avatar?.secure_url,
        name: userData.name,
        avatar: undefined,
        userId: userData._id,
        haschanges: false
    })

    function handleImage(e) {

        e.preventDefault()

        const uploadImage = e.target.files[0]

        if (uploadImage) {

            const fileReader = new FileReader()

            fileReader.readAsDataURL(uploadImage)

            fileReader.addEventListener('load', function () {

                setData({
                    ...data,
                    previewImage: this.result,
                    avatar: uploadImage,
                    haschanges: true
                })

            })

        }

    }

    function handleChange(e) {

        const { name, value } = e.target

        setData({
            ...data,
            [name]: value,
            haschanges: true
        })

    }

    async function onFormSubmit(e) {

        e.preventDefault()

        const formdata = new FormData()

        formdata.append("name", data.name)
        formdata.append("avatar", data.avatar)

        await dispatch(editProfile(formdata))
        await dispatch(getProfile())

    }

    async function onDelete(e) {

        e.preventDefault()

        const res = await dispatch(deleteProfile(data.userId))

        if (res?.payload?.success) {
            navigate('/signup')
        }

    }

    async function handleCancel(e) {

        e.preventDefault()

        const res = await dispatch(cancelSubscription())

        if (res?.payload?.success) {

            await dispatch(getProfile())

            navigate('/')

        }

    }

    return (

        <HomeLayout>

            <div className='min-h-screen px-4 lg:px-20 py-14 text-white'>

                {/* Header */}
                <div className='flex flex-col items-center text-center gap-5 mb-14'>

                    <div className='flex items-center gap-3 bg-yellow-500/10 border border-yellow-500 px-5 py-2 rounded-full text-yellow-400'>

                        <Sparkles size={18} />

                        <span className='uppercase tracking-widest text-sm font-semibold'>
                            User Dashboard
                        </span>

                    </div>

                    <h1 className='text-4xl lg:text-6xl font-bold'>
                        My
                        <span className='text-yellow-400'>
                            {" "}Profile
                        </span>
                    </h1>

                    <p className='text-gray-400 text-lg max-w-2xl'>
                        Manage your account information, profile photo and subscription settings.
                    </p>

                </div>

                {/* Main Card */}
                <form
                    onSubmit={onFormSubmit}
                    className='bg-[#111827] border border-gray-700 rounded-[2rem] overflow-hidden shadow-2xl'
                >

                    {/* Top Banner */}
                    <div className='h-44 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-400 relative'>

                        {/* Avatar */}
                        <div className='absolute -bottom-16 left-1/2 -translate-x-1/2'>

                            <div className='relative'>

                                <img
                                    src={data.previewImage}
                                    alt='profile'
                                    className='w-36 h-36 rounded-full border-4 border-[#111827] object-cover shadow-xl'
                                />

                                <input
                                    type='file'
                                    id='imageUpload'
                                    accept='.jpg, .jpeg, .png, .svg'
                                    className='hidden'
                                    onChange={handleImage}
                                />

                                <label
                                    htmlFor='imageUpload'
                                    className='absolute bottom-2 right-2 bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 text-black p-3 rounded-full cursor-pointer shadow-lg'
                                >

                                    <Camera size={18} />

                                </label>

                            </div>

                        </div>

                    </div>

                    {/* Content */}
                    <div className='pt-24 pb-10 px-6 lg:px-10'>

                        {/* Name */}
                        <div className='text-center mb-12'>

                            <h2 className='text-3xl font-bold capitalize'>
                                {userData?.name}
                            </h2>

                            <p className='text-gray-400 mt-2'>
                                Welcome back to your learning dashboard
                            </p>

                        </div>

                        {/* Grid */}
                        <div className='grid lg:grid-cols-2 gap-8'>

                            {/* Name */}
                            <div className='space-y-3'>

                                <label className='flex items-center gap-3 text-lg font-semibold'>

                                    <BadgeCheck className='text-yellow-400' />

                                    Full Name

                                </label>

                                <input
                                    type='text'
                                    name='name'
                                    value={data.name}
                                    onChange={handleChange}
                                    className='w-full bg-[#1f2937] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition-all duration-300 capitalize'
                                />

                            </div>

                            {/* Email */}
                            <div className='space-y-3'>

                                <label className='flex items-center gap-3 text-lg font-semibold'>

                                    <Mail className='text-yellow-400' />

                                    Email Address

                                </label>

                                <input
                                    type='text'
                                    disabled
                                    defaultValue={userData?.email}
                                    className='w-full bg-[#1f2937] border border-gray-700 rounded-2xl px-5 py-4 text-gray-400 cursor-not-allowed'
                                />

                            </div>

                            {/* Role */}
                            <div className='space-y-3'>

                                <label className='flex items-center gap-3 text-lg font-semibold'>

                                    <Shield className='text-yellow-400' />

                                    Role

                                </label>

                                <input
                                    type='text'
                                    disabled
                                    defaultValue={userData?.role}
                                    className='w-full bg-[#1f2937] border border-gray-700 rounded-2xl px-5 py-4 capitalize text-gray-400 cursor-not-allowed'
                                />

                            </div>

                            {/* Subscription */}
                            <div className='space-y-3'>

                                <label className='flex items-center gap-3 text-lg font-semibold'>

                                    <Crown className='text-yellow-400' />

                                    Subscription

                                </label>

                                <input
                                    type='text'
                                    disabled
                                    defaultValue={
                                        userData.subscription?.status === "active"
                                            ? "Active"
                                            : "Inactive"
                                    }
                                    className='w-full bg-[#1f2937] border border-gray-700 rounded-2xl px-5 py-4 capitalize text-gray-400 cursor-not-allowed'
                                />

                            </div>

                        </div>

                        {/* Buttons */}
                        <div className='flex flex-col lg:flex-row gap-5 mt-12'>

                            <Link
                                to={'/profile/changePassword'}
                                className='w-full'
                            >

                                <button
                                    type='button'
                                    className='w-full bg-[#1f2937] hover:border-yellow-400 border border-gray-700 transition-all duration-300 py-4 rounded-2xl flex items-center justify-center gap-3'
                                >

                                    <KeyRound size={20} />

                                    Change Password

                                </button>

                            </Link>

                            <button
                                type='submit'
                                disabled={!data.haschanges}
                                className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold transition-all duration-300 ${
                                    data.haschanges
                                        ? "bg-yellow-500 hover:bg-yellow-400 text-black"
                                        : "bg-gray-700 cursor-not-allowed text-gray-400"
                                }`}
                            >

                                <Save size={20} />

                                Save Changes

                            </button>

                            <button
                                type='button'
                                onClick={onDelete}
                                className='w-full bg-red-500/10 border border-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 py-4 rounded-2xl flex items-center justify-center gap-3 text-red-400 font-semibold'
                            >

                                <Trash2 size={20} />

                                Delete Account

                            </button>

                        </div>

                        {/* Subscription Cancel */}
                        {
                            userData.subscription?.status === "active" && (

                                <div className='mt-10'>

                                    <button
                                        onClick={handleCancel}
                                        className='w-full bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 transition-all duration-300 py-5 rounded-2xl text-lg font-bold'
                                    >
                                        Cancel Subscription
                                    </button>

                                </div>

                            )
                        }

                    </div>

                </form>

            </div>

        </HomeLayout>

    )
}

export default Profile