import React, { useState } from "react";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { useNavigate } from "react-router";
import { signIn } from "../../Context/actions/authAction";
import { useDispatch } from "react-redux";
const LoginPage = () => {
  const [formInputs, setFormInputs] = useState({
    fullName: "",
    email: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formInputsHandler = (e) => {
    if (e.target.id == "nameInput") {
      setFormInputs((prevState) => ({
        fullName: e.target.value,
        email: prevState.email,
      }));
    }
    if (e.target.id == "emailInput") {
      setFormInputs((prevState) => ({
        fullName: prevState.fullName,
        email: e.target.value,
      }));
    }
  };
  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(signIn(formInputs, navigate));
  };
  return (
    <section className="bg-[url('https://bluespaceltd.co.uk/wp-content/uploads/2020/08/A-Office-Design-scaled.jpg')] bg-cover bg-center lg:bg-center h-screen">
      <div className="bg-black bg-opacity-[0.45] ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <h1 className="text-white"> --LOGO GOES HERE-- </h1>
          <div className="w-full bg-gray-100 bg-opacity-60 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="p-6" action="#">
                <Input
                  props={{
                    name: "Full Name",
                    type: "text",
                    placeholder: "John Doe",
                    id: "nameInput",
                    required: true,
                    onChangeHandler: formInputsHandler,
                  }}
                />
                <Input
                  props={{
                    name: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                    id: "emailInput",
                    required: true,
                    onChangeHandler: formInputsHandler,
                  }}
                />
                <Button
                  props={{
                    onClickHandler: loginHandler,
                    btnText: "Sign In",
                    type: "submit",
                  }}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
