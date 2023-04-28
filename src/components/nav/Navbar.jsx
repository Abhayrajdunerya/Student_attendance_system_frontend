import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import logoPng from '../../assets/logoPNG.png'

const Navbar = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    const {user} = useSelector((state) => ({...state}));

    useEffect(() => {
        if (user && user.token) {
            console.log(user.email);
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [user]);

    return (
        <div>
            <header className="text-gray-600 body-font shadow-sm">
                <div className="mx-auto flex p-4 flex-row items-center">
                    <Link to={'/'} className="flex relative left-12 title-font font-medium items-center text-gray-900 right-10">
                        <img className='w-24' src={logoPng} alt="logo" />
                    </Link>
                    <div className="absolute right-4">
                        <button onClick={() => navigate(isLoggedIn ? user.role+'/dashboard' : '/login')} className="mx-1sm:mx-3 inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base m-4">{isLoggedIn ? 'Dashboard' : 'Login'}
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                        </button>
                        
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Navbar