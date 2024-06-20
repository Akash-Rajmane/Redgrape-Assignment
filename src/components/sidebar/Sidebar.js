import React from 'react';
import classes from '../../sass/Sidebar.module.sass';
import { RedGrapeIcon, SearchIcon, ClockIcon, HomeIcon,CompassIcon, CardIcon, DesktopIcon, GroupIcon, PhonebookIcon, DictionaryIcon, BookIcon, BuildingIcon, GraphIcon, RightArrowIcon } from '../../assets/index';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className={classes.sidebar}>
        <div className={classes.sidebar_top}>
            <img src={RedGrapeIcon} alt="redgrape logo" className={classes.logo} />
            <img src={SearchIcon} alt="search icon" width={"26px"} height={"26px"}/>
            <img src={ClockIcon} alt="clock icon" width={"26px"} height={"26px"}/>
            <hr className={classes.hor_line}/>
        </div>
        <div className={classes.sidebar_mid}>
            <NavLink to="/"  className={({ isActive }) => (isActive ? classes.active : classes.inactive)}>
                <img src={HomeIcon} alt="home icon" width={"26px"} height={"26px"}/>
            </NavLink>
            <NavLink to="/compass"  className={({ isActive }) => (isActive ? classes.active : classes.inactive)}>
                <img src={CompassIcon} alt="compass icon" width={"26px"} height={"26px"}/>
            </NavLink>
            <NavLink to="/contact-card"  className={({ isActive }) => (isActive ? classes.active : classes.inactive)}>
                <img src={CardIcon} alt="card icon" width={"26px"} height={"26px"}/>
            </NavLink>
            <NavLink to="/dashboard"  className={({ isActive }) => (isActive ? classes.active : classes.inactive)}>
                <img src={DesktopIcon} alt="desktop icon" width={"26px"} height={"26px"}/>
            </NavLink>
            <NavLink to="/group"  className={({ isActive }) => (isActive ? classes.active : classes.inactive)}>
                <img src={GroupIcon} alt="group icon" width={"26px"} height={"26px"}/>
            </NavLink>
            <NavLink to="/phonebook"  className={({ isActive }) => (isActive ? classes.active : classes.inactive)}>
                <img src={PhonebookIcon} alt="phonebook icon" width={"26px"} height={"26px"}/>
            </NavLink>
            <NavLink to="/dictionary"  className={({ isActive }) => (isActive ? classes.active : classes.inactive)}>
                <img src={DictionaryIcon} alt="dictionary icon" width={"26px"} height={"26px"}/>
            </NavLink>
            <NavLink to="/book"  className={({ isActive }) => (isActive ? classes.active : classes.inactive)}>
                <img src={BookIcon} alt="book icon" width={"26px"} height={"26px"}/>
            </NavLink>
            <NavLink to="/building"  className={({ isActive }) => (isActive ? classes.active : classes.inactive)}>
                <img src={BuildingIcon} alt="building icon" width={"26px"} height={"26px"}/>
            </NavLink>
            <NavLink to="/graph"  className={({ isActive }) => (isActive ? classes.active : classes.inactive)}>
                <img src={GraphIcon} alt="graph icon" width={"26px"} height={"26px"}/>
            </NavLink>
        </div>
        <div className={classes.sidebar_bottom}>
            <hr className={classes.hor_line} />
            <img src={RightArrowIcon} alt="right arrow icon" width={"26px"} height={"26px"}/>
        </div>  
    </div>
  )
}

export default Sidebar;