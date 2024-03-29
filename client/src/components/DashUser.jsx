import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { FaCheck, FaTimes } from "react-icons/fa";

function DashUser() {
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState([]);
  const [showmore, setShowMore] = useState(true);
  const [ShowModal, setShowModal] = useState(false);
  const [UserIdToDelete, setUserIdToDelete] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/v1/user/getuser`);
        const data = await res.json();
        if (res.ok) {
          setUser(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.user.isAdmin) {
      fetchUsers();
    }
  }, [currentUser.user._id]);

  const handleShowMore = async () => {
    const startIndex = user.length;
    try {
      const res = await fetch(`/v1/user/getuser?startindex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setUser((pre) => [...pre, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = () => {};

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scroll-track-slate-100 scrollbar-thumb-slate-300 dark:scroll-track-slate-700 dark:scrollbar-thumb-slate-500 ">
      {currentUser.user.isAdmin && user.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <TableHead>
              <TableHeadCell>Date created</TableHeadCell>
              <TableHeadCell>User Image</TableHeadCell>
              <TableHeadCell>User Name</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Admin</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
            </TableHead>
            {user.map((user) => (
              <TableBody key={user._id} className="divide-y">
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <img
                      src={user.profile}
                      alt={user.username}
                      className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                    />
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}
                      className="font-medium text-red-500 hover:underline hover:cursor-pointer"
                    >
                      Delete
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
          {showmore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show More
            </button>
          )}
        </>
      ) : (
        <p>You have no User Yet.!!</p>
      )}
      <Modal
        show={ShowModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure ! You want to delete this user ?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                Yes I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                Cancle
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default DashUser;
