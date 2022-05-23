import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer footer-center p-10 bg-base-200 text-base-content">
            <div className="flex justify-center">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link to="/about">About</Link>
            </div>
            <div>
                <p>
                    Copyright © {new Date().getFullYear()} - All right reserved
                    by Comparts Ltd.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
