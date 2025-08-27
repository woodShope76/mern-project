import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const toggleMode = () => setIsLogin(!isLogin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      setMessage("Passwords do not match");
      setShowModal(true);
      return;
    }
    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      }
      const user = userCredential.user;

      const res = await axios.post(
        "http://localhost:5000/api/auth/firebase-login",
        {
          email: user.email,
          name: user.displayName || name || "No Name",
          picture: user.photoURL || null,
        },
        { withCredentials: true }
      );

      const mongoUser = res.data;
      localStorage.setItem("user", JSON.stringify(mongoUser));
      localStorage.setItem("userId", mongoUser._id);

      setMessage(`${isLogin ? "Login" : "Signup"} successful`);
      setShowModal(true);
      navigate("/profile");
    } catch (err) {
      setMessage(err?.message || "Something went wrong");
      setShowModal(true);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const res = await axios.post(
        "http://localhost:5000/api/auth/firebase-login",
        {
          email: user.email,
          name: user.displayName,
          picture: user.photoURL,
        },
        { withCredentials: true }
      );

      const mongoUser = res.data;
      localStorage.setItem("user", JSON.stringify(mongoUser));
      localStorage.setItem("userId", mongoUser._id);

      setMessage("Google Login Successful!");
      setShowModal(true);
      navigate("/profile");
    } catch (err) {
      setMessage("Google Login Failed!");
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4">
        <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-6 text-[#8b4513]">
            {isLogin ? "Sign In" : "Sign Up"}
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-gray-600 px-4 py-2 border rounded-md focus:outline-none"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-gray-600 px-4 py-2 border rounded-md focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-gray-600 px-4 py-2 border rounded-md focus:outline-none"
              required
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full text-gray-600 px-4 py-2 border rounded-md focus:outline-none"
                required
              />
            )}
            <button
              type="submit"
              className="w-full bg-[#8b4513] text-white py-2 rounded-md hover:bg-[#6d3510]"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <div className="my-4 text-center text-gray-500">OR</div>

          <button
            type="button"
            className="w-full border border-gray-300 text-gray-700 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100"
            onClick={handleGoogleLogin}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <p className="mt-6 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={toggleMode}
              className="text-[#8b4513] font-medium"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>

      {/* Modal for feedback */}
      <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowModal(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-medium leading-6 text-gray-900">
                    {message}
                  </Dialog.Title>
                  <div className="mt-4 flex justify-end">
                    <button
                      className="px-4 py-2 bg-[#8b4513] text-white rounded hover:bg-[#6d3510]"
                      onClick={() => setShowModal(false)}
                    >
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AuthPage;
