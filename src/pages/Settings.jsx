import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCheckAuthQuery } from '../app/api';
import { clearAuthState, setAuthState } from '../app/authSlice';
import TopBar from '../components/common/TopBar';
import { Link } from 'react-router-dom';
import { GoInfo } from 'react-icons/go';
import { SlArrowRight } from "react-icons/sl";
import { BiPencil } from 'react-icons/bi';
import { TbUser } from "react-icons/tb";
import { FiLock } from 'react-icons/fi';
import BottomBar from '../components/common/BottomBar';
import { useNavigate } from 'react-router-dom';
import { useDeleteUserMutation, useLogoutMutation } from '../app/api';
import ConfirmationDialog from '../components/common/ConfirmationDialog';

const Settings = () => {
    const dispatch = useDispatch();
    const { data, isFetching } = useCheckAuthQuery();
    const [deleteUser] = useDeleteUserMutation();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [logout] = useLogoutMutation();

    const handleLogout = async () => {
        try {
          await logout().unwrap();
          dispatch(clearAuthState());
          navigate("/login");
        } catch (err) {
          console.error("Failed to log out:", err);
        }
      };

    const handleDelete = async () => {
        try {
            await deleteUser(user.id).unwrap();
            navigate("/login");
        } catch (err) {
            console.error("Failed to delete user:", err);
        }
    };

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
                    <button type='button' onClick={() => setShowConfirmation(true)} className="p-2 flex items-center justify-between">
                        <div className='flex items-center gap-x-3'>
                            <div className='text-2xl'>
                                <TbUser />
                            </div>
                            <p className='text-lg'>Log Out</p>
                        </div>
                        <div className='text-xl'>
                            <SlArrowRight />
                        </div>
                    </button>
                    <ConfirmationDialog
                        title="Log Out"
                        details="Are you sure you want to log out?"
                        label="Log Out"
                        bg="bg-red-600"
                        showConfirmation={showConfirmation}
                        setShowConfirmation={setShowConfirmation}
                        action={handleLogout}
                    />
                    <button type='button' onClick={() => setShowConfirmation(true)} className='w-full flex items-center justify-center text-red-500 text-sm text-light mt-5'>
                        Delete Account
                    </button>
                    <ConfirmationDialog
                        title="Delete Account"
                        details="Are you sure you want to delete your account? This action cannot be undone."
                        label="Delete"
                        bg="bg-red-600"
                        showConfirmation={showDeleteConfirmation}
                        setShowConfirmation={setShowDeleteConfirmation}
                        action={handleDelete}
                    />
                </div>
            </div>
            <BottomBar />
        </div>
    );
};

export default Settings;