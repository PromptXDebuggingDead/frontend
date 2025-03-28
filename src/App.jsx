import Layout from "./Layout";
import ProfilePage from "./Pages/User/ProfilePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Community from "./pages/community/Community";
import Explore from "./pages/explore/Explore";
import {
  createRoutesFromElements,
  Route,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import ProtectedRoutes from "./components/Routes/ProtectedRoutes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/actions/userActions";
import UserDashboard from "./Pages/User/UserDashboard";
import HomePage from "./Pages/Home/HomePage";

import Transactions from "./Pages/User/Transactions";
import EditProfile from "./Pages/User/EditProfile";
import ChatPage from "./pages/Chat/chatPage";
import Onboard from "./pages/onboard/Onboard";
import PostDetails from "./pages/post/PostDetails";
import CreateCommunity from "./pages/community/CreateCommunity";
import CreatePost from "./pages/post/CreatePost";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  });
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<HomePage />}></Route>

        <Route
          path="my/chats"
          element={
            <ProtectedRoutes>
              <ChatPage />
            </ProtectedRoutes>
          }
        ></Route>
        {/* <Route path="community/:community" element={<Community />} /> */}
        <Route path="user/onboarding" element={<Onboard />} />
        <Route path="Explore" element={<Explore />} />
        <Route
          path=":community/post/:slug/:id"
          element={<PostDetails />}
        ></Route>

        <Route
          path="my/profile"
          element={
            <ProtectedRoutes>
              <ProfilePage />
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="my/dashboard"
          element={
            <ProtectedRoutes>
              <ProfilePage />
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="transactions"
          element={
            <ProtectedRoutes>
              <Transactions />
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="profile/edit"
          element={
            <ProtectedRoutes>
              <EditProfile />
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="community/:id"
          element={
            <ProtectedRoutes>
              <Community />
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="Onboard"
          element={
            <ProtectedRoutes>
              <Onboard />
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="explore"
          element={
            <ProtectedRoutes>
              <Explore />
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="community/create"
          element={
            <ProtectedRoutes>
              <CreateCommunity />
            </ProtectedRoutes>
          }
        ></Route>
        <Route
          path="post/create"
          element={
            <ProtectedRoutes>
              <CreatePost />
            </ProtectedRoutes>
          }
        ></Route>
      </Route>
    )
  );

  return (
    <main>
      <ToastContainer autoClose={2000} />
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
