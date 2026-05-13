import { useEffect, useState } from 'react'

import {
    Upload,
    BookOpen,
    User2,
    Layers3,
    FileText,
    Sparkles,
    ArrowLeft
} from 'lucide-react'

import { useDispatch } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import HomeLayout from '../../layouts/HomeLayout'
import { updateCourse } from '../../Redux/slices/CourseSlice'

function EditCourse() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { state } = useLocation()
    const { id } = useParams()

    const [userInput, setUserInput] = useState({
        id: id,
        title: state?.title || "",
        description: state?.description || "",
        category: state?.category || "",
        createdBy: state?.createdBy || "",
        thumbnail: null,
        previewImage: state?.thumbnail?.secure_url || ""
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

    useEffect(() => {

        if (!state) {
            navigate('/courses')
        }

        document.title = 'Edit Course - LMS'

    }, [])

    async function onSubmit(e) {

        e.preventDefault()

        if (
            !userInput.title ||
            !userInput.description ||
            !userInput.category ||
            !userInput.createdBy
        ) {
            toast.error("All fields are required")
            return
        }

        const response = await dispatch(updateCourse(userInput))

        if (response.payload?.success) {

            toast.success("Course updated successfully")

            navigate('/courses')

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
                            Course Management
                        </span>

                    </div>

                    <h1 className='text-4xl lg:text-6xl font-bold'>
                        Edit
                        <span className='text-yellow-400'>
                            {" "}Course
                        </span>
                    </h1>

                    <p className='text-gray-400 max-w-2xl text-lg'>
                        Update course details, thumbnail and improve the learning experience.
                    </p>

                </div>

                {/* Main Container */}
                <form
                    onSubmit={onSubmit}
                    className='grid lg:grid-cols-2 gap-12'
                >

                    {/* LEFT SIDE */}
                    <div className='space-y-8'>

                        {/* Preview Card */}
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
                                                    Upload Thumbnail
                                                </h2>

                                                <p className='text-gray-500 mt-2'>
                                                    JPG, PNG, SVG supported
                                                </p>
                                            </div>

                                        </div>

                                    )
                                }

                            </div>

                            {/* Upload Button */}
                            <div className='mt-6'>

                                <label
                                    htmlFor='thumbnail'
                                    className='flex items-center justify-center gap-3 bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 text-black font-semibold py-4 rounded-2xl cursor-pointer'
                                >

                                    <Upload size={20} />

                                    Change Thumbnail

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

                        {/* Back Button */}
                        <button
                            type='button'
                            onClick={() => navigate('/courses')}
                            className='w-full border border-gray-700 hover:border-yellow-400 transition-all duration-300 py-4 rounded-2xl flex items-center justify-center gap-3 text-gray-300 hover:text-yellow-400'
                        >

                            <ArrowLeft size={20} />

                            Back To Courses

                        </button>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className='bg-[#111827] border border-gray-700 rounded-3xl p-8 space-y-8'>

                        {/* Title */}
                        <div className='space-y-3'>

                            <label
                                htmlFor='title'
                                className='flex items-center gap-3 text-lg font-semibold'
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
                                htmlFor='createdBy'
                                className='flex items-center gap-3 text-lg font-semibold'
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
                                placeholder='Instructor name'
                                className='w-full bg-[#1f2937] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition-all duration-300'
                            />

                        </div>

                        {/* Category */}
                        <div className='space-y-3'>

                            <label
                                htmlFor='category'
                                className='flex items-center gap-3 text-lg font-semibold'
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
                                placeholder='Web Development, AI, UI/UX'
                                className='w-full bg-[#1f2937] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition-all duration-300'
                            />

                        </div>

                        {/* Description */}
                        <div className='space-y-3'>

                            <label
                                htmlFor='description'
                                className='flex items-center gap-3 text-lg font-semibold'
                            >

                                <FileText className='text-yellow-400' />

                                Course Description

                            </label>

                            <textarea
                                name='description'
                                id='description'
                                value={userInput.description}
                                onChange={handleChange}
                                placeholder='Update course description...'
                                className='w-full bg-[#1f2937] border border-gray-700 rounded-2xl px-5 py-4 outline-none focus:border-yellow-400 transition-all duration-300 min-h-[180px] resize-none'
                            />

                        </div>

                        {/* Buttons */}
                        <div className='flex flex-col md:flex-row gap-5'>

                            <button
                                type='submit'
                                className='w-full bg-yellow-500 hover:bg-yellow-400 transition-all duration-300 text-black font-bold py-4 rounded-2xl text-lg'
                            >
                                Save Changes
                            </button>

                        </div>

                    </div>

                </form>

            </div>

        </HomeLayout>

    )
}

export default EditCourse