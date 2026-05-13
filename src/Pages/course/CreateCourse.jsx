import { useState } from 'react'

import {
    Upload,
    BookOpen,
    User2,
    Layers3,
    FileText,
    Sparkles
} from 'lucide-react'

import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import HomeLayout from '../../layouts/HomeLayout'
import { createCourse } from '../../Redux/slices/CourseSlice'

function CreateCourse() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [userInput, setUserInput] = useState({
        title: "",
        description: "",
        category: "",
        createdBy: "",
        thumbnail: null,
        previewImage: ""
    })

    function handleChange(e) {

        const { name, value } = e.target

        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    function handleImage(e) {

        const uploadImage = e.target.files[0]

        if (uploadImage) {

            const fileReader = new FileReader()

            fileReader.readAsDataURL(uploadImage)

            fileReader.addEventListener('load', function () {

                setUserInput({
                    ...userInput,
                    previewImage: this.result,
                    thumbnail: uploadImage
                })

            })

        }

    }

    async function onSubmit(e) {

        e.preventDefault()

        if (
            !userInput.title ||
            !userInput.description ||
            !userInput.category ||
            !userInput.createdBy ||
            !userInput.thumbnail
        ) {
            toast.error("All fields are required")
            return
        }

        const formData = new FormData()

        formData.append("title", userInput.title)
        formData.append("description", userInput.description)
        formData.append("category", userInput.category)
        formData.append("createdBy", userInput.createdBy)
        formData.append("thumbnail", userInput.thumbnail)

        const response = await dispatch(createCourse(formData))

        if (response.payload?.success) {

            toast.success("Course created successfully")

            navigate('/courses')

            setUserInput({
                title: "",
                description: "",
                category: "",
                createdBy: "",
                thumbnail: null,
                previewImage: ""
            })

        }

    }

    return (

        <HomeLayout>

            <div className='min-h-screen px-4 lg:px-20 py-14 text-white'>

                {/* Header */}
                <div className='text-center mb-14 space-y-5'>

                    <div className='flex justify-center'>

                        <div className='flex items-center gap-3 bg-yellow-500/10 border border-yellow-500 px-5 py-2 rounded-full text-yellow-400'>

                            <Sparkles size={18} />

                            <span className='uppercase tracking-widest text-sm font-semibold'>
                                Admin Dashboard
                            </span>

                        </div>

                    </div>

                    <h1 className='text-4xl lg:text-6xl font-bold'>
                        Create A New
                        <span className='text-yellow-400'>
                            {" "}Course
                        </span>
                    </h1>

                    <p className='text-gray-400 max-w-2xl mx-auto text-lg'>
                        Upload premium quality courses for students and grow your learning platform.
                    </p>

                </div>

                {/* Main Form */}
                <form
                    onSubmit={onSubmit}
                    className='grid lg:grid-cols-2 gap-12'
                >

                    {/* LEFT */}
                    <div className='space-y-8'>

                        {/* Image Preview */}
                        <div className='bg-[#111827] border border-gray-700 rounded-3xl p-6'>

                            <div className='relative border-2 border-dashed border-gray-600 rounded-2xl overflow-hidden h-[450px] flex justify-center items-center'>

                                {
                                    userInput.previewImage ? (

                                        <img
                                            src={userInput.previewImage}
                                            alt='thumbnail'
                                            className='w-full h-full object-cover'
                                        />

                                    ) : (

                                        <div className='flex flex-col items-center gap-5 text-gray-400'>

                                            <Upload size={70} />

                                            <div className='text-center'>
                                                <h2 className='text-2xl font-semibold'>
                                                    Upload Course Thumbnail
                                                </h2>

                                                <p className='text-gray-500 mt-2'>
                                                    JPG, PNG, SVG supported
                                                </p>
                                            </div>

                                        </div>

                                    )
                                }

                            </div>

                            {/* Upload */}
                            <div className='mt-6'>

                                <label
                                    htmlFor='thumbnail'
                                    className='flex items-center justify-center gap-3 bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 text-black font-semibold py-4 rounded-2xl cursor-pointer'
                                >

                                    <Upload size={20} />

                                    Upload Thumbnail

                                </label>

                                <input
                                    type='file'
                                    name='thumbnail'
                                    id='thumbnail'
                                    accept='.jpg, .jpeg, .png, .svg'
                                    onChange={handleImage}
                                    className='hidden'
                                />

                            </div>

                        </div>

                    </div>

                    {/* RIGHT */}
                    <div className='bg-[#111827] border border-gray-700 rounded-3xl p-8 space-y-8'>

                        {/* Title */}
                        <div className='space-y-3'>

                            <label
                                className='flex items-center gap-3 text-lg font-semibold'
                                htmlFor='title'
                            >

                                <BookOpen className='text-yellow-400' />

                                Course Title

                            </label>

                            <input
                                type='text'
                                name='title'
                                id='title'
                                value={userInput.title}
                                onChange={handleChange}
                                placeholder='Enter course title'
                                className='w-full bg-[#1f2937] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition-all duration-300'
                            />

                        </div>

                        {/* Instructor */}
                        <div className='space-y-3'>

                            <label
                                className='flex items-center gap-3 text-lg font-semibold'
                                htmlFor='createdBy'
                            >

                                <User2 className='text-yellow-400' />

                                Instructor Name

                            </label>

                            <input
                                type='text'
                                name='createdBy'
                                id='createdBy'
                                value={userInput.createdBy}
                                onChange={handleChange}
                                placeholder='Enter instructor name'
                                className='w-full bg-[#1f2937] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition-all duration-300'
                            />

                        </div>

                        {/* Category */}
                        <div className='space-y-3'>

                            <label
                                className='flex items-center gap-3 text-lg font-semibold'
                                htmlFor='category'
                            >

                                <Layers3 className='text-yellow-400' />

                                Course Category

                            </label>

                            <input
                                type='text'
                                name='category'
                                id='category'
                                value={userInput.category}
                                onChange={handleChange}
                                placeholder='Web Development, AI, Data Science'
                                className='w-full bg-[#1f2937] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition-all duration-300'
                            />

                        </div>

                        {/* Description */}
                        <div className='space-y-3'>

                            <label
                                className='flex items-center gap-3 text-lg font-semibold'
                                htmlFor='description'
                            >

                                <FileText className='text-yellow-400' />

                                Course Description

                            </label>

                            <textarea
                                name='description'
                                id='description'
                                value={userInput.description}
                                onChange={handleChange}
                                placeholder='Write detailed course description...'
                                className='w-full bg-[#1f2937] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition-all duration-300 min-h-[180px] resize-none'
                            />

                        </div>

                        {/* Submit */}
                        <button
                            type='submit'
                            className='w-full bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 text-black font-bold py-4 rounded-2xl text-lg'
                        >
                            Create Course
                        </button>

                    </div>

                </form>

            </div>

        </HomeLayout>

    )
}

export default CreateCourse