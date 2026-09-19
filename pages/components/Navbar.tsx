 import NavbarItem from "./NavbarItem";
 
 const Navbar = () => {
    return (
        <nav>
            <div
                className="
                px-4
                md:px-2
                py-6
                flex
                flex-row
                iteams-center
                transition
                duration-500
                bg-zinc-900
                bg-opacity-30
                "
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
            </div>
            </nav>
    )
 }

 export default Navbar;
