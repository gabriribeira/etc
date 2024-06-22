import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCheckAuthQuery } from '../app/api';
import { setAuthState } from '../app/authSlice';
import TopBar from '../components/common/TopBar';
import { Link } from 'react-router-dom';
import { GoInfo } from 'react-icons/go';
import { SlArrowRight } from "react-icons/sl";
import { BiPencil } from 'react-icons/bi';
import { TbUser } from "react-icons/tb";
import { FiLock } from 'react-icons/fi';

const Settings = () => {
    const dispatch = useDispatch();
    const { data, isFetching } = useCheckAuthQuery();

    useEffect(() => {
        if (data && !isFetching) {
            console.log(data);
            dispatch(
                setAuthState({
                    isAuthenticated: data.authenticated,
                    user: data.user,
                    currentHouseholdId: data.currentHouseholdId,
                    roleId: data.roleId,
                })
            );
        }
    }, [data, isFetching, dispatch]);

    return (
        <div>
            <TopBar />
            <div className="flex flex-col px-5 gap-y-3 pt-32">
                <h3>Settings</h3>
                <div className='flex flex-col w-full gap-1'>
                    <Link to="/profile/edit" className="p-2 flex items-center justify-between">
                        <div className='flex items-center gap-x-3'>
                            <div className='text-2xl'>
                                <BiPencil />
                            </div>
                            <p className='text-lg'>Edit Profile</p>
                        </div>
                        <div className='text-xl'>
                            <SlArrowRight />
                        </div>
                    </Link>
                    <Link to="/about" className="p-2 flex items-center justify-between">
                        <div className='flex items-center gap-x-3'>
                            <div className='text-2xl'>
                                <GoInfo />
                            </div>
                            <p className='text-lg'>About</p>
                        </div>
                        <div className='text-xl'>
                            <SlArrowRight />
                        </div>
                    </Link>
                    <Link to="/privacy-policy" className="p-2 flex items-center justify-between">
                        <div className='flex items-center gap-x-3'>
                            <div className='text-2xl'>
                                <FiLock />
                            </div>
                            <p className='text-lg'>Privacy Policy</p>
                        </div>
                        <div className='text-xl'>
                            <SlArrowRight />
                        </div>
                    </Link>
                    <Link to="/settings" className="p-2 flex items-center justify-between">
                        <div className='flex items-center gap-x-3'>
                            <div className='text-2xl'>
                                <TbUser />
                            </div>
                            <p className='text-lg'>Log Out</p>
                        </div>
                        <div className='text-xl'>
                            <SlArrowRight />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Settings;