/** @format */

import React from 'react';
import { Navbar, Collapse, Button, IconButton, Typography, Input } from '@material-tailwind/react';
import { RectangleStackIcon, UserCircleIcon, CommandLineIcon, Squares2X2Icon } from '@heroicons/react/24/solid';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link, NavLink } from 'react-router-dom';
function NavItem({ children }) {
    return (
        <li>
            <Typography as="a" href="#" variant="paragraph" color="blue-gray" className="text-blue-gray-700 flex items-center gap-2 font-medium">
                {children}
            </Typography>
        </li>
    );
}

function Header() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    React.useEffect(() => {
        window.addEventListener('resize', () => window.innerWidth >= 960 && setOpen(false));
    }, []);

    return (
        <>
            <Navbar shadow={false} fullWidth className="border-0">
                <div className="container mx-auto flex items-center justify-between">
                    <Typography color="blue-gray" className="text-lg font-bold">
                        Material Tailwind
                    </Typography>
                    <ul className="ml-10 hidden items-center gap-6 lg:flex">
                        <NavItem>
                        <NavLink className={'flex  items-center'} to={'/blogs'}>
                                <Squares2X2Icon className="h-5 w-5" />
                                Blogs
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <UserCircleIcon className="h-5 w-5" />
                            Account
                        </NavItem>
                        <NavItem>
                            <NavLink className={'flex  items-center'} to={'/users'}>
                                <Squares2X2Icon className="h-5 w-5" />
                                Users
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <CommandLineIcon className="h-5 w-5" />
                            Docs
                        </NavItem>
                    </ul>
                    <div className="hidden items-center gap-4 lg:flex">
                        <Button variant="text">
                            <Link to={'/login'}> Log in</Link>
                        </Button>
                        <Button color="gray">buy now</Button>
                    </div>
                    <IconButton variant="text" color="gray" onClick={handleOpen} className="ml-auto inline-block lg:hidden">
                        {open ? <XMarkIcon strokeWidth={2} className="h-6 w-6" /> : <Bars3Icon strokeWidth={2} className="h-6 w-6" />}
                    </IconButton>
                </div>
                <Collapse open={open}>
                    <div className="container mx-auto mt-3 border-t border-blue-gray-50 px-2 pt-4">
                        <ul className="flex flex-col gap-4">
                            <NavItem>
                                <RectangleStackIcon className="h-5 w-5" />
                                Pages
                            </NavItem>
                            <NavItem>
                                <UserCircleIcon className="h-5 w-5" />
                                Account
                            </NavItem>
                            <NavItem>
                                <Squares2X2Icon className="h-5 w-5" />
                                Blocks
                            </NavItem>
                            <NavItem>
                                <CommandLineIcon className="h-5 w-5" />
                                Docs
                            </NavItem>
                        </ul>
                        <div className="mt-6 mb-4 flex items-center gap-4">
                            <Button variant="text">Log in</Button>
                            <Button color="gray">buy now</Button>
                        </div>
                    </div>
                </Collapse>
            </Navbar>
           
        </>
    );
}

export default Header;
