import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const initialState = {
    "email": "",
    "subject": "",
    "message": ""
}

const Form = () => {
    const [data, setData] = useState(initialState);


    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(data);

        axios.post('http://localhost:8080/send-email', data)
            .then((result) => {
                // console.log(result.data)
                toast(result.data, {
                    position: "top-center",
                    type: "success",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
                setData(initialState)
            })
            .catch((err) => {
                console.log(err)
                toast('Error sending mail', {
                    position: "top-center",
                    type: "error",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            })
    }
    return (
        <>


            <form className="max-w-md mx-auto p-4" onSubmit={handleSubmit}>
                <h1 className='text-center text-2xl font-bold text-blue-500 font-mono'> Send Email Using Nodemailer</h1>
                <br/>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-md font-bold text-gray-900 dark:text-white">Receiver's Email :</label>
                    <input type="email" id="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="subject" className="block mb-2 text-md font-bold text-gray-900 dark:text-white">Subject :</label>
                    <input type="text" id="subject" value={data.subject} onChange={(e) => setData({ ...data, subject: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="message" className="block mb-2 text-md font-bold text-gray-900 dark:text-white">Message :</label>
                    <textarea id="message" rows="4" value={data.message} onChange={(e) => setData({ ...data, message: e.target.value })} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
                </div>

                <div className='text-center'>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send Mail</button>
                </div>
            </form>

        </>
    )
}

export default Form