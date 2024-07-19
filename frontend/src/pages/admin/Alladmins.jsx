import { FaSearch, FaUserPlus } from "react-icons/fa";
import BeatLoader from "react-spinners/BeatLoader";
import {
  useCreateAdminMutation,
  useGetAllAdminsQuery,
} from "../../redux/api/adminApiSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { AdminRow } from "./components/AdminRow";
import { z } from "zod";
import { toast } from "react-toastify";

export const Alladmins = () => {
  const [openForm, setOpenForm] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [originalAdminsList, setOriginalAdminsList] = useState([]);
  const { data: admins, isLoading, refetch } = useGetAllAdminsQuery();
  const [adminsList, setAdminsList] = useState(admins);

  const dispatch = useDispatch();

  useEffect(() => {
    if (admins) {
      setOriginalAdminsList(admins);
      setAdminsList(admins);
    }
  }, [admins, dispatch]);

  const handleSetAdmins = (updateFn) => {
    setAdminsList((prevAdmins) => {
      const updatedAdmins = updateFn(prevAdmins);
      setOriginalAdminsList(updatedAdmins);
      return updatedAdmins;
    });
  };

  // const handleSetAdmins = (updatedAdmins) => {
  //   setAdminsList(updatedAdmins);
  //   dispatch(setAdmins(updatedAdmins));
  // };

  const handleChangeKey = (key) => {
    setSearchKey(key);
    if (key === "") {
      setAdminsList(originalAdminsList);
    } else {
      setAdminsList(
        originalAdminsList.filter((item) =>
          item.username.toLowerCase().includes(key.toLowerCase())
        )
      );
    }
  };

  const [createAdmin, { isLoading: isCreatingAdmin }] =
    useCreateAdminMutation();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errMessage, setErrMessage] = useState("");

  const CreateSchema = z.object({
    username: z.string().nonempty("Username is required"),
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
      CreateSchema.parse(formData);
      const res = await createAdmin(formData).unwrap();
      setAdminsList((prev) => [res.admin, ...prev]);
      setOriginalAdminsList((prev) => [res.admin, ...prev]);
      setErrMessage("");
      toast.success(res.message);
      setFormData({ username: "", email: "", password: "" });
      setOpenForm((prev) => !prev);
      // refetch()
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrMessage(err.errors[0].message);
      } else {
        if (err?.message) {
          toast.error(err.message);
        } else {
          toast.error("An error occurred while creating the admin.");
        }
      }
    }
  };

  return (
    <>
      <div className="p-2 md:p-4">
        <h1 className="text-3xl text-text-200 font-bold mb-5">Admin Management</h1>
        <div className="flex flex-col">
          <div className="flex justify-between items-center gap-2 md:gap-4 md:px-15 lg:px-20">
            <input
              type="text"
              className="shad-input flex-grow"
              placeholder="Enter Admin name"
              onChange={(e) => handleChangeKey(e.target.value)}
              value={searchKey}
            />
            <button
              className={`text-sm md:text-base text-white font-bold hover:bg-primary-100 px-4 rounded py-2 xs:py-4 flex flex-center gap-2 ${
                openForm
                  ? "shadow-none bg-primary-200"
                  : "shadow-xl bg-primary-200"
              }`}
              onClick={() => setOpenForm((prev) => !prev)}
            >
              <FaUserPlus size={20} />
              New Admin
            </button>
          </div>
          {openForm && (
            <>
              <form
                action=""
                onSubmit={(e) => handleSubmit(e)}
                className="w-full mt-2 flex flex-col items-center gap-2"
              >
                <h1 className="text-2xl font-bold">Create Admin</h1>
                <div className="flex flex-col gap-2 w-5/6 sm:w-4/6 lg:w-3/6">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="shad-input"
                    placeholder="Enter admin username..."
                    value={formData.username}
                    onChange={(e) => handleChange(e)}
                  />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="shad-input"
                    placeholder="Enter admin email..."
                    value={formData.email}
                    onChange={(e) => handleChange(e)}
                  />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="shad-input"
                    placeholder="Enter admin password..."
                    value={formData.password}
                    onChange={(e) => handleChange(e)}
                  />
                  <p className="text-left text-red-400">{errMessage}</p>

                  <button
                    type="submit"
                    className="text-white bg-green-500 px-4 py-2 rounded"
                  >
                    {isCreatingAdmin ? "Loading..." : "Create Admin"}
                  </button>
                </div>
              </form>
            </>
          )}
          <div className="mt-5 flex flex-col flex-center gap-4 md:px-15 lg:px-20 xs:text-base text-sm">
            {isLoading ? (
              <BeatLoader size={20} color={"red"} />
            ) : (
              adminsList?.map((admin, index) => (
                <AdminRow
                  admin={admin}
                  index={index}
                  key={admin._id}
                  setAdmins={handleSetAdmins}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};
