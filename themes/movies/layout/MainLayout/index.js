import React, {useEffect, useState} from 'react'
import propTypes from 'prop-types'
import {useDispatch, useSelector} from "react-redux"
import allActions from '../../store/actions/index'
import {useHistory} from "react-router"

// ===========================|| MAIN LAYOUT ||=========================== //

const MainLayout = props => {
    const [title, ] = useState(props.title ?? "Reports gateway")
    const dispatch = useDispatch()
    const isLoggingIn = useSelector(state => state.isLoggingIn)
    const history = useHistory();

    useEffect(() => {
        document.title = title;
    },[title]);

    useEffect(() => {
        dispatch(allActions.auth.checkLogin());
    },[dispatch]);

    useEffect(() => {
        console.log(isLoggingIn)
        // if(!isLoggingIn) {
        //     history.replace("/");
        // }
    },[isLoggingIn, history]);

    return (
        <div className="container wrapper">
            {props.children}
        </div>
    )
};

MainLayout.props = {
    title: propTypes.string
}

export default MainLayout;
