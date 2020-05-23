import React from 'react';
import { NavLink } from 'react-router-dom';
import {ProfileNavWrapper, ProfileLinkContainer, } from './page-nav-styles';
import {useSelector} from "react-redux";

const ProfileNav = () => {
    const firebase_id = useSelector(state => state.user.firebase_id);
    return (
        <ProfileNavWrapper>
            <ProfileLinkContainer>
                <NavLink className='link' activeClassName='activeRoute' exact to='/'>
                    Home
                </NavLink>
                <NavLink className='link' activeClassName='activeRoute' exact to={`/profile/${firebase_id}/orders`}>
                    Orders
                </NavLink>
                <NavLink className='link' activeClassName='activeRoute' exact to={`/address`}>
                    Address
                </NavLink>
                <NavLink className='link' activeClassName='activeRoute' exact to={`/paymentmethods`}>
                    Payment Methods
                </NavLink>
                <NavLink className='link' activeClassName='activeRoute' exact to={`/settings`}>
                    Account Settings
                </NavLink>
            </ProfileLinkContainer>
        </ProfileNavWrapper>
    )
};

export default ProfileNav