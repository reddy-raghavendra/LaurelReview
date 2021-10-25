import React from "react";
import {Link,useHistory} from "react-router-dom"
function Login() {
    const history = useHistory()
    const loginUser = ()=>{
        if ((document.getElementById("login").value == "admin") &&
            (document.getElementById("password").value=="admin")){
                history.push("/admin")            
        } else {
            alert("Incorrect password")   
        }

    }
  return (
   <div className="wrapper fadeInDown">
   <div id="formContent">
     
     <div className="fadeIn first">
       <img src="http://www.laurelreview.org/themes/laurelv1/img/LaurelImg1.jpeg" id="icon" alt="User Icon" />
     </div>
 
   
     <form>
       <input type="text" id="login" className="fadeIn second" name="login" placeholder="login"/>
       <input type="text" id="password" className="fadeIn third" name="login" placeholder="password"/>
       <input type="submit" className="fadeIn fourth" value="Log In" onClick={loginUser}/>
     </form>

     <div id="formFooter">
       <a className="underlineHover" href="#">Forgot Password?</a> &nbsp;
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       <Link className="underlineHover" to="/register">Register</Link>

     </div>
 
   </div>
 </div>
  );
}

export default Login
