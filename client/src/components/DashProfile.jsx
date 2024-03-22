import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  updateStart,
  updateFail,
  updateSuccess,
  deleteuserStart,
  deleteuserFail,
  deleteuserSuccess,
  signoutSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageProgress, setImageProgress] = useState(null);
  const [imageuploading, setImageUploading] = useState(false);
  const [imageuploaderror, setImageuploadError] = useState(null);
  const FilePickerRef = useRef();
  const [formdata, setFormData] = useState({});
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    // service firebase.storage {
    //     match /b/{bucket}/o {
    //       match /{allPaths=**} {
    //         allow read;
    //         allow write: if
    //         request.resource.size < 2 * 1024 * 1024 &&
    //         request.resource.contentType.matchs('image/.*')
    //       }
    //     }
    //   }
    setImageUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageProgress(progress.toFixed(0));
      },
      (error) => {
        console.log(error);
        setImageuploadError("File Must be less then 2 MB");
        setImageUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          setFormData({ ...formdata, profilePicture: downloadURL });
          setImageUploading(false);
        });
      }
    );
  };
  //console.log(imageFile, imageUrl);
  //console.log(formdata);
  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formdata).length === 0) {
      toast.error("No changes made.!!");
      return;
    }

    if (imageuploading) {
      toast.error("Please wait for image to upload.!!");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/v1/user/update/${currentUser.user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success == true) {
        dispatch(updateSuccess());
        toast.success(data.msg);
      } else {
        dispatch(updateFail());
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteuserStart());
      const res = await fetch(`/v1/user/delete/${currentUser.user._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success == true) {
        dispatch(deleteuserSuccess(data));
        toast.success(data.msg);
      } else {
        dispatch(deleteuserFail(data.msg));
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch("/v1/user/signout", { method: "POST" });
      const data = await res.json();
      if (data.success == true) {
        dispatch(signoutSuccess());
        toast.success(data.msg);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={FilePickerRef}
          hidden
        ></input>
        <div
          className="relative  w-32 h-32 self-center cursor-pointer shadow-md rounded-full"
          onClick={() => FilePickerRef.current.click()}
        >
          {imageProgress && (
            <CircularProgressbar
              value={imageProgress || 0}
              text={`${imageProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199,${imageProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageUrl || currentUser.user.profile}
            alt="User Profile"
            className={`rounded-full object-cover w-full h-full border-8 border-[lightgray]${
              imageProgress && imageProgress < 100 && "opacity-60"
            }`}
          />
        </div>
        {imageuploaderror && <Alert color="failure">{imageuploaderror}</Alert>}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.user.username}
          onChange={handleChange}
        />

        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.user.email}
          onChange={handleChange}
        />

        <TextInput
          type="password"
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        <Button
          type="submit"
          gradientDuoTone="purpleToBlue"
          outline
          disabled={loading || imageuploading}
        >
          {loading ? "Updateing..." : "Update"}
        </Button>
        {currentUser.user.isAdmin && (
          <Link to="/create-post">
            <Button
              type="button"
              gradientDuoTone="purpleToPink"
              className="w-full"
            >
              Create Post
            </Button>
          </Link>
        )}
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={() => setShowModal(true)} className="cursor-pointer">
          Delete Account
        </span>
        <span onClick={handleSignOut} className="cursor-pointer">
          Sign Out
        </span>
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size="md"
        >
          <ModalHeader />
          <ModalBody>
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Are you sure ! You want to delete your account ?
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
    </div>
  );
}

export default DashProfile;
