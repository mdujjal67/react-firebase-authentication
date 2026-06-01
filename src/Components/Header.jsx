import { Link } from "react-router-dom";


const Header = () => {
    return (
        <div className="text-center  bg-gray-700 py-8 mb-10">
            <Link className="btn btn-accent hover:bg-gray-200" to='/'>Home</Link>
            <Link className="btn btn-accent hover:bg-gray-200 ml-4" to='/login'>Login</Link>
        </div>
    );
};

export default Header;