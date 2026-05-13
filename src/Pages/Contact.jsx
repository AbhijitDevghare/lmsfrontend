import { useState } from 'react'

import {
    Mail,
    Phone,
    MapPin,
    Send,
    Sparkles,
    MessageSquare
} from 'lucide-react'

import { toast } from 'react-toastify'

import option2 from '../assets/json/option2.json'

import Particle from '../components/Particle'
import axiosInstance from '../Helpers/AxiosInstance'
import HomeLayout from '../layouts/HomeLayout'

function Contact() {

    const [userInput, setUserInput] = useState({
        name: "",
        email: "",
        message: ""
    })

    function handleUserInput(e) {

        const { name, value } = e.target

        setUserInput({
            ...userInput,
            [name]: value
        })

    }

    async function handleSubmit(event) {

        event.preventDefault()

        let hasError = false

        if (
            !userInput.name ||
            !userInput.email ||
            !userInput.message
        ) {

            toast.error("All fields are required")

            hasError = true

        } else if (
            !userInput.email.match(
                /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
            )
        ) {

            toast.error("Please enter a valid email")

            hasError = true

        }

        if (!hasError) {

            try {

                toast.loading("Sending message...", {
                    position: 'top-center'
                })

                const response = await axiosInstance.post(
                    '/contactus',
                    userInput
                )

                toast.dismiss()

                if (response.data?.success) {

                    toast.success(response.data.message)

                    setUserInput({
                        name: "",
                        email: "",
                        message: ""
                    })

                }

            } catch (error) {

                toast.dismiss()

                toast.error(
                    error.response?.statusText || error.message
                )

            }

        }

    }

    return (

        <HomeLayout>

            <Particle option={option2} />

            <div className='min-h-screen px-4 lg:px-20 py-16 text-white relative z-10'>

                {/* Header */}
                <div className='text-center flex flex-col items-center gap-5 mb-16'>

                    <div className='flex items-center gap-3 bg-yellow-500/10 border border-yellow-500 px-5 py-2 rounded-full text-yellow-400'>

                        <Sparkles size={18} />

                        <span className='uppercase tracking-widest text-sm font-semibold'>
                            Contact Support
                        </span>

                    </div>

                    <h1 className='text-4xl lg:text-6xl font-bold leading-tight'>

                        Get In
                        <span className='text-yellow-400'>
                            {" "}Touch
                        </span>

                    </h1>

                    <p className='text-gray-400 text-lg max-w-2xl'>

                        Have questions, suggestions or facing any issue? Our support team is always ready to help you.

                    </p>

                </div>

                {/* Main Layout */}
                <div className='grid lg:grid-cols-2 gap-12 items-start'>

                    {/* LEFT SIDE */}
                    <div className='space-y-8'>

                        {/* Card 1 */}
                        <div className='bg-[#111827] border border-gray-700 rounded-3xl p-8 hover:border-yellow-400 transition-all duration-300'>

                            <div className='flex items-center gap-5'>

                                <div className='bg-yellow-500/10 p-4 rounded-2xl'>
                                    <Mail
                                        className='text-yellow-400'
                                        size={30}
                                    />
                                </div>

                                <div>

                                    <h2 className='text-2xl font-bold'>
                                        Email Us
                                    </h2>

                                    <p className='text-gray-400 mt-2'>
                                        support@lms.com
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* Card 2 */}
                        <div className='bg-[#111827] border border-gray-700 rounded-3xl p-8 hover:border-yellow-400 transition-all duration-300'>

                            <div className='flex items-center gap-5'>

                                <div className='bg-yellow-500/10 p-4 rounded-2xl'>
                                    <Phone
                                        className='text-yellow-400'
                                        size={30}
                                    />
                                </div>

                                <div>

                                    <h2 className='text-2xl font-bold'>
                                        Call Us
                                    </h2>

                                    <p className='text-gray-400 mt-2'>
                                        +91 9876543210
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* Card 3 */}
                        <div className='bg-[#111827] border border-gray-700 rounded-3xl p-8 hover:border-yellow-400 transition-all duration-300'>

                            <div className='flex items-center gap-5'>

                                <div className='bg-yellow-500/10 p-4 rounded-2xl'>
                                    <MapPin
                                        className='text-yellow-400'
                                        size={30}
                                    />
                                </div>

                                <div>

                                    <h2 className='text-2xl font-bold'>
                                        Location
                                    </h2>

                                    <p className='text-gray-400 mt-2'>
                                        Pune, Maharashtra, India
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* Extra Card */}
                        <div className='bg-gradient-to-r from-yellow-500 to-orange-500 rounded-3xl p-8 text-black'>

                            <div className='flex items-center gap-4 mb-4'>

                                <MessageSquare size={35} />

                                <h2 className='text-3xl font-bold'>
                                    24/7 Support
                                </h2>

                            </div>

                            <p className='text-lg font-medium leading-relaxed'>

                                We usually respond within a few hours and help solve your issues quickly.

                            </p>

                        </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <form
                        onSubmit={handleSubmit}
                        className='bg-[#111827] border border-gray-700 rounded-[2rem] p-8 lg:p-10 shadow-2xl space-y-8'
                    >

                        <div>

                            <h2 className='text-4xl font-bold mb-3'>
                                Send Message
                            </h2>

                            <p className='text-gray-400'>
                                Fill out the form below and we'll get back to you soon.
                            </p>

                        </div>

                        {/* Name */}
                        <div className='space-y-3'>

                            <label
                                htmlFor='name'
                                className='text-lg font-semibold'
                            >
                                Full Name
                            </label>

                            <input
                                type='text'
                                name='name'
                                id='name'
                                placeholder='Enter your name'
                                value={userInput.name}
                                onChange={handleUserInput}
                                className='w-full bg-[#1f2937] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition-all duration-300'
                            />

                        </div>

                        {/* Email */}
                        <div className='space-y-3'>

                            <label
                                htmlFor='email'
                                className='text-lg font-semibold'
                            >
                                Email Address
                            </label>

                            <input
                                type='email'
                                name='email'
                                id='email'
                                placeholder='Enter your email'
                                value={userInput.email}
                                onChange={handleUserInput}
                                className='w-full bg-[#1f2937] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition-all duration-300'
                            />

                        </div>

                        {/* Message */}
                        <div className='space-y-3'>

                            <label
                                htmlFor='message'
                                className='text-lg font-semibold'
                            >
                                Your Message
                            </label>

                            <textarea
                                name='message'
                                id='message'
                                rows='6'
                                placeholder='Write your message here...'
                                value={userInput.message}
                                onChange={handleUserInput}
                                className='w-full bg-[#1f2937] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition-all duration-300 resize-none'
                            ></textarea>

                        </div>

                        {/* Button */}
                        <button
                            type='submit'
                            className='w-full bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 text-black font-bold py-4 rounded-2xl text-lg flex items-center justify-center gap-3'
                        >

                            <Send size={22} />

                            Send Message

                        </button>

                    </form>

                </div>

            </div>

        </HomeLayout>

    )

}

export default Contact