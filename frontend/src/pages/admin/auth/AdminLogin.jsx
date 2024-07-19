import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useLogInAdminMutation } from "../../../redux/api/adminApiSlice";
import { setCredentials } from "../../../redux/features/auth/authSlice";

export const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adminInfo } = useSelector((state) => state.auth);
  const [logInAdmin, { isLoading }] = useLogInAdminMutation();

  const [formData, setFormData] = useState({
    email: "user1@gmail.com",
    password: "user1_123",
  });

  const [errMessage, setErrMessage] = useState("");

  const SignInSchema = z.object({
    email: z
      .string()
      .email("Invalid email format")
      .nonempty("Email is required"),
    password: z.string().nonempty("Password is required"),
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      SignInSchema.parse(formData);
      const res = await logInAdmin(formData).unwrap();
      setErrMessage("");
      dispatch(setCredentials(res.admin));
      toast.success(res.message);
      navigate("/admin/dashboard");
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrMessage(error.errors[0].message);
      } else {
        toast.error(error.message);
      }
    }
  };

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/admin/dashboard";

  useEffect(() => {
    if (adminInfo) navigate(redirect);
  }, [adminInfo, redirect, navigate]);

  return (
    <div className="mx-auto max-w-lg p-3 space-y-4 pt-10">
      <h1 className="text-center h2-bold">Admin</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="shad-input text-white"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="shad-input text-white"
          placeholder="Password"
        />
        {errMessage && <p className="text-red">{errMessage}</p>}
        <button type="submit" className="shad-button_primary">
          Sign In
        </button>
      </form>
    </div>
  );
};
