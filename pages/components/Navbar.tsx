 import NavbarItem from "./NavbarItem";
 import MobileMenu from "./MobileMenu";
 import { useCallback, useEffect, useState } from "react";
 import {BsBell, BsChevronDown, BsSearch} from "react-icons/bs";
 import AccountMenu from "./AccountMenu";
 
//  Defines the vertical offset at which the navbar background should appear
 const TOP_OFFSET = 66;

 const Navbar = () => {
    // useState hooks to manage the visibility of the mobile menu, account menu, and navbar background
    const [showMobileMenu, setIsMobileMenuOpen] = useState(false);
    const [showAccountMenu, setIsAccountMenuOpen] = useState(false);
    const [showBackground, setShowBackground] = useState(false);

    // useEffect hook to add a scroll event listener that toggles the navbar background based on the scroll position
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {

                setShowBackground(true);
                }
            else{
                setShowBackground(false);
            }
        };


        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [TOP_OFFSET]);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen((current) => !current);

    }, []);

    const toggleAccountMenu = useCallback(() => {
        setIsAccountMenuOpen((current) => !current);
    }, []);

    return (
        <nav>
            <div
                className={`
                px-4
                md:px-2
                py-6
                flex
                flex-row
                iteams-center
                transition
                duration-500
                ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}
                `}
            >
                <img className="h-4 lg:h-7" src="/images/logo.png" alt="Logo"/>
                <div
                    className="
                flex-row
                ml-8
                gap-7
                hidden
                lg:flex
                "
                >
                    <NavbarItem label="Home" />
                    <NavbarItem label="Series" />
                    <NavbarItem label="Movies" />
                    <NavbarItem label="New & Popular" />
                    <NavbarItem label="My List" />
                    <NavbarItem label="Browse by Languages" />
                </div>
                <div onClick={toggleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'}`} />
                    <MobileMenu visible={showMobileMenu} />
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsSearch />                    
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsBell />                    
                    </div>
                    <div onClick={toggleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img src="/images/default-red.png" alt="Profile"/>
                        </div>
                        <BsChevronDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'}`} />
                        <AccountMenu visible={showAccountMenu}/>
                    </div>
                </div>
            </div>
            </nav>
    )
 }

 export default Navbar;
