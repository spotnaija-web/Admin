import { useState } from "react";
import { IoDocumentOutline, IoGridOutline, IoLogOutOutline, IoPencilOutline, IoSettingsOutline } from "react-icons/io5";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";


export default function DashboardLayout(){
    let {logout} = useLogin()
    let [isMenuOpen, setIsMenuOpen] = useState(false)
    let location = useLocation()

    function toggleMenu(){
        setIsMenuOpen(!isMenuOpen)
    }
    function logoutUser(){
        logout()
        window.location.reload()
    }
    return(
        <div className="bg-black-500">
            <div className={`w-auto md:w-[18%] ${!isMenuOpen ? 'hidden' : 'block'} md:block h-[100vh] z-[20] bg-primary-dark p-6 fixed`}>
                <h2 className="text-[#CCCCCC] text-xl font-bold pb-4 cursor-pointer"><Link to={"/"}>Spotnaija</Link></h2>
                <div className="pt-8 pb-6">
                    <h4 className="text-[#CCCCCC] font-medium">Welcome,</h4>
                    <h3 className="text-[#CCCCCC] font-bold">To Admin Page</h3>
                </div>
                <hr />
                <div className="py-4">
                    <DashNavLinkCont toggleMenu={toggleMenu} active={location.pathname === '/' ? true : false} >
                        <IoGridOutline size={25} />
                        <Link to={"/"} className="ml-2 cursor-pointer">
                            Dashboard
                        </Link>
                    </DashNavLinkCont>
                    <DashNavLinkCont toggleMenu={toggleMenu} active={location.pathname === '/write' ? true : false} >
                        <IoPencilOutline size={25} />
                        <Link to={"/write"} className="ml-2 cursor-pointer">
                            Write a Post
                        </Link>
                    </DashNavLinkCont>
                    <DashNavLinkCont toggleMenu={toggleMenu} active={location.pathname === '/all-posts' ? true : false} >
                        <IoDocumentOutline size={25} />
                        <Link to={"/all-posts"} className="ml-2 cursor-pointer">
                            Posts
                        </Link>
                    </DashNavLinkCont>
                    <DashNavLinkCont toggleMenu={toggleMenu} active={location.pathname === '/settings' ? true : false} >
                        <IoSettingsOutline size={25} />
                        <Link to={"/settings"} className="ml-2 cursor-pointer">
                            Settings
                        </Link>
                    </DashNavLinkCont>

                </div>

                <div>
                    <div className="text-[#CCCCCC] flex font-medium align-center py-6 absolute bottom-10">
                        <IoLogOutOutline size={25} />
                        <div onClick={logoutUser} className="ml-2 cursor-pointer">
                            Logout
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-[82%] px-3 min-h-[100vh] bg-[#EEEEEE] ml-auto">
                <Outlet context={toggleMenu} />
            </div>
        </div>
    )
}

function DashNavLinkCont({children, active, toggleMenu}){
    return(
        <div onClick={toggleMenu} className={`${active ? 'text-[#CCCCCC]' : "text-black"} hover:text-[#CCCCCC] flex font-medium align-center py-6 cursor-pointer`}>
            {children}
        </div>
    )
}