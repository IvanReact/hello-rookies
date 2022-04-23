import { React } from "react";
import { Link } from "react-router-dom";

import logo221 from "../../images/logo221.png"
import "./style.scss"

const Header = (props) => {

    const removeToken = () => {
        props.setToken(null)
        localStorage.removeItem("token")
    }

    return (
        <div className="header">
            <img src={logo221} alt="" />
            <div className="headerButton">
                <Link to="/candidates"><button>ALL CANDIDATES</button></Link>
                <button className="logout" onClick={removeToken}>LOG OUT</button>
            </div>
        </div>
    );
}

export default Header;