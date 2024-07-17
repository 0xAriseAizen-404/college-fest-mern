import { MdDelete } from "react-icons/md";
import { useDeleteAdminByIdMutation } from "../../../redux/api/adminApiSlice";
import { toast } from "react-toastify";

export const AdminRow = ({ admin, index, setAdmins }) => {
  const [deleteAdmin, { isLoading, isError, error }] =
    useDeleteAdminByIdMutation();

  const handleDelete = async (adminId) => {
    try {
      const res = await deleteAdmin(adminId).unwrap();
      //   console.log(res);
      setAdmins((prev) => prev.filter((item) => item._id !== adminId));
      toast.success(res.message);
    } catch (err) {
      //   console.log(err);
      if (err?.data?.message) {
        toast.error(err.data.message);
      } else {
        toast.error("An error occurred while deleting the admin.");
      }
    }
  };

  return (
    <div className="w-full flex justify-between px-2 md:px-6 items-center bg-[#f1f1f1] border border-slate-300 p-2 rounded-md shadow-lg">
      <div className="">{index + 1}</div>
      <div className="">{admin.username}</div>
      <div className=" w-3/6 text-ellipsis truncate">{admin.email}</div>
      <button
        className="bg-white p-1 rounded shadow-lg"
        onClick={() => handleDelete(admin._id)}
      >
        <MdDelete size={25} className="text-red-500 hover:text-red-700" />
      </button>
    </div>
  );
};
