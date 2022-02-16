import axios from "axios";
import React, { Component, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import homeStyle from "./HomeStyle.css";
function Login() {
  const history = useHistory();

 async function getUser(){
  var userData = {"email":document.getElementById("login").value,
                  "password":document.getElementById("password").value};
                  (async () => {
                    const element = document.querySelector('#post-request-async-await .article-id');              
                    await axios.post('http://localhost:8081/api/login', userData).then(
                      (response) => {
                        if(response.data === "Login Success"){
                          window.location.href = "http://localhost:3001/issuelist"
                        }
                        else{
                          alert("Incorrect email or password");
                        }
                      //  return response.data;
                      });
                    // console.log(response.data)
                    // return response.data;
                })();        
  }

  async function loginUser(event){

    event.preventDefault();
    await getUser();
  };

  const unCheckRememberMe = () => {
    if (document.getElementById("check").checked == true) {
      document.getElementById("check").checked = false;
    } else {
      document.getElementById("check").checked = true;
    }
  };
  return (
    <div>
      <section class="vh-100">
        <div class="container py-5 h-100">
          <div class="row d-flex align-items-center justify-content-center h-100">
            <div class="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://laurelreview.org/uploads/issues/fpvXBRTrJQ53WQqT_461.jpeg"
                className="img-fluid"
                alt="Phone image"
              ></img>
            </div>
            <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form>
                <div className="form-outline mb-4">
                  <b>Sign in</b>
                </div>
                <div class="form-outline mb-4">
                  <input
                    type="email"
                    id="login"
                    class="form-control form-control-lg"
                  />
                  <label class="form-label" for="form1Example13">
                    <span id="asterik">*</span>
                    Email address
                  </label>
                </div>

                <div class="form-outline mb-4">
                  <input
                    type="password"
                    id="password"
                    class="form-control form-control-lg"
                  />
                  <label class="form-label" for="form1Example23">
                    <span id="asterik">*</span>
                    Password
                  </label>
                </div>

                <div class="d-flex justify-content-around align-items-center mb-4">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="check"
                      checked
                      onClick={unCheckRememberMe}
                    />
                    
                    <label class="form-check-label" for="form1Example3">
                      {" "}
                      Remember me{" "}
                    </label>
                  </div>
                  <a href="#!">Forgot password?</a>
                </div>

                <button
                  type="submit"
                  class="btn btn-primary btn-lg btn-block"
                  onClick={loginUser}
                >
                  Sign in
                  {/* <a href="http://localhost:3001/">Sign in</a> */}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
