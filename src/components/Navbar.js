import Link from 'next/link';
import { useState } from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useTheme,
    useMediaQuery,
    ListItemButton
} from '@mui/material';
import { SwapHoriz as SwapHorizIcon, Subscriptions as SubscriptionsIcon, AccountCircle as AccountCircleIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';

const Navbar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const drawer = (
        <div className="bg-white h-full">
            <div className="h-16"></div>
            <List>
                <Link href="/converter" passHref>
                    <ListItem className="rounded-lg mb-4 text-blue-500">
                        <ListItemButton>
                            <ListItemIcon><SwapHorizIcon/></ListItemIcon>
                            <ListItemText primary="Converter" primaryTypographyProps={{ color: 'textPrimary', variant: 'body1' }}/>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link href="/subscriptions" passHref>
                    <ListItem className="rounded-lg mb-4 text-blue-500">
                        <ListItemButton>
                            <ListItemIcon><SubscriptionsIcon/></ListItemIcon>
                            <ListItemText primary="Subscriptions" primaryTypographyProps={{ color: 'textPrimary', variant: 'body1' }}/>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link href="/account" passHref>
                    <ListItem className="rounded-lg mb-4 text-blue-500">
                        <ListItemButton>
                            <ListItemIcon><AccountCircleIcon/></ListItemIcon>
                            <ListItemText primary="Account" primaryTypographyProps={{ color: 'textPrimary', variant: 'body1' }}/>
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link href="/logout" passHref>
                    <ListItem className="rounded-lg mb-4 text-blue-500">
                        <ListItemButton>
                            <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                            <ListItemText primary="Logout" primaryTypographyProps={{ color: 'textPrimary', variant: 'body1' }}/>
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>
        </div>
    );

    return (
        <>
            <nav className=" h-full w-16 fixed top-0 left-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <button
                            type="button"
                            className="block md:hidden p-2 rounded-md text-blue-500 hover:text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                            onClick={toggleDrawer}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
            <div className="hidden md:block w-60">
                <Drawer open={true} variant="permanent">
                    {drawer}
                </Drawer>
            </div>
            {isMobile && (
                <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
                    {drawer}
                </Drawer>
            )}
        </>
    );
}

export default Navbar;