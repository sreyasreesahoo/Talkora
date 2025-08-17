import React, { useState } from "react";
import { VideoIcon } from "lucide-react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";
function SignupPage() {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { isPending, error, signupMutation } = useSignup();
  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };
  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 "
      data-theme="forest"
    >
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* left section */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* logo */}
          <div className="mb-4 flex items-center justify-start gap-2 ">
            <VideoIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Talkora
            </span>
          </div>
          {/* error message */}
          {error && (
            <div className="alert alert-error mb-4">
              <span>
                {error?.response?.data?.message ||
                  error?.message ||
                  "Something went wrong"}
              </span>
            </div>
          )}
          <div className="w-full">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Create an Account</h2>
                  <p className="text-sm opacity-70">
                    Join Talkora and start your language learning journey!
                  </p>
                </div>
                <div className="space-y-3">
                  {/* full name */}
                  <div className="form-control w-full ">
                    <label className="label">
                      <span className="label-text mr-2 whitespace-nowrap">
                        Full Name
                      </span>
                      <input
                        type="text"
                        placeholder="john Doe"
                        value={signupData.fullName}
                        className="input input-bordered w-full"
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            fullName: e.target.value,
                          })
                        }
                        required
                      />
                    </label>
                  </div>
                  {/* email */}
                  <div className="form-control w-full ">
                    <label className="label">
                      <span className="label-text mr-2 whitespace-nowrap">
                        Email
                      </span>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={signupData.email}
                        className="input input-bordered w-full"
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </label>
                  </div>

                  {/*password */}

                  <div className="form-control w-full ">
                    <label className="label">
                      <span className="label-text mr-2 whitespace-nowrap">
                        Password
                      </span>
                      <input
                        type="password"
                        placeholder="******"
                        value={signupData.password}
                        className="input input-bordered w-full"
                        onChange={(e) =>
                          setSignupData({
                            ...signupData,
                            password: e.target.value,
                          })
                        }
                        required
                      />
                    </label>

                    <p className="text-xs text-white/25` mt-1">
                      *Password must be at least 8 characters long*
                    </p>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-ponter justify-start gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        required
                      />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-primary hover:underline cursor-pointer">
                          terms of service
                        </span>{" "}
                        and{" "}
                        <span className="text-primary hover:underline cursor-pointer">
                          privacy policy
                        </span>
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`btn w-full ${
                    isPending ? "btn-disabled" : "btn-primary"
                  }`}
                >
                  {isPending ? (
                    <span className="loading loading-spinner loading-xs">
                      Creating Account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-primary hover:underline cursor-pointer"
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* right-section */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* illutration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/VideoCall_SignupPageImage.png"
                alt="Language connection illustration"
                className="w-full h-full"
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold ">
                Meet language partners worldwide — where conversations become
                connections.
              </h2>
              <p className="opacity-70">
                Practice conversations, build friendships, and grow your
                language skills together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
