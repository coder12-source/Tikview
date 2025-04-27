import Login from "../components/Login";
import NavigationTab from "../components/NavigationTab";
import "./UserLogin.css"

const UserLogin = () => {
  return (
    <div className="userlogin-container">
        <NavigationTab/>
        <Login/>
    </div>
  )
}


export default UserLogin;
