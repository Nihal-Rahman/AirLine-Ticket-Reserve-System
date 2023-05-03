import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import '../App.css'


function CustomerNavbar() {
    let history = useNavigate();

    const logout = () => {
        sessionStorage.clear();
        toast('Goodbye!', {
            position: toast.POSITION.BOTTOM_LEFT,
            className: 'toast-message'
        });
        history("/user/login")
    };

    return (
        <nav className=' bg-gradient-to-r from-green-300 to-blue-500 h-32 flex-wrap top-0 w-full fixed'>
            <div className='max-w-screen h-[100px]'>
                <div className='px-10 flex justify-between relative flex items-center w-full h-full'>
                    <div className='relative mt-10 flex items-center ml-10 text-[#424B5A]'>
                        <a href='/customer/home'>
                            <img
                                className="hidden lg:block h-20"
                                src="https://engineering.nyu.edu/sites/default/files/2019-01/tandon_long_color.png"
                                alt="Workflow"
                            />
                        </a>
                    </div>
                    <div className='hidden gap-4 md:flex pr-4 mr-10'>
                        <a href='/customer/search'>
                            <button className='px-8 mt-10 py-3 drop-shadow-lg bg-[#424B5A] text-3xl text-white rounded-full hover:bg-violet-300'>
                                Search Flights
                            </button>
                        </a>
                        
                        <a href='/customer/home'>
                            <button className='px-8 mt-10 py-3 drop-shadow-lg bg-[#424B5A] text-3xl text-white rounded-full hover:bg-violet-300'>
                                Track Spending
                            </button>
                        </a>

                        <a href='/customer/reviews'>
                            <button className = 'px-8 mt-10 py-3 drop-shadow-lg bg-[#424B5A] text-3xl text-white rounded-2xl hover:bg-violet-300'>
                                Flight Reviews
                            </button>
                        </a>
                        <button onClick={logout} className='px-8 mt-10 py-3 drop-shadow-lg bg-[#424B5A] text-3xl text-white rounded-2xl hover:bg-violet-300'>
                            Logout
                        </button>
                    </div>
                </div>
            </div>

        </nav>
    )
}

export default CustomerNavbar