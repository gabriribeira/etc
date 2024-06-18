import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import RequireAuth from "./components/middlewares/RequireAuth";
import { useCheckAuthQuery } from "./app/api";
import { useDispatch } from "react-redux";
import { setAuthState } from "./app/authSlice";
import Authentication from "./pages/Authentication";
import Expense from "./pages/Expense";
import ExpenseDetail from "./components/expenses/ExpenseDetail";
import Expenses from "./pages/Expenses";
import Goals from "./pages/Goals";
import Household from "./pages/Household";
import InviteMembers from "./pages/InviteMembers";
import ItemDetails from "./pages/ItemDetails";
import JoinHousehold from "./pages/JoinHousehold";
import Lists from "./pages/Lists";
import NewExpense from "./pages/NewExpense";
import NewHousehold from "./pages/NewHousehold";
import List from "./pages/List";
import Notifications from "./pages/Notifications";
import Onboarding from "./pages/Onboarding";
import Register from "./pages/Register";
import User from "./pages/User";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import EditHousehold from "./pages/EditHousehold";
import BalanceDetails from "./pages/BalanceDetails";
import NewList from "./components/lists/NewList";
import Image from "./pages/Image";
import EditUser from "./pages/EditUser";
import GoogleAuthCallback from "./pages/GoogleAuthCallback";
import RegisterStep2 from "./pages/RegisterStep2";
import HouseholdOnboarding from "./pages/HouseholdOnboarding";
import Products from "./components/products/Products";
// import io from "socket.io-client";

function App() {
  useEffect(() => {
    document.title = "et.cetera";
  }, []);

  // const userId = useSelector((state) => state.auth.user?.id);

  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // const socket = io(process.env.PLATFORM_BACKEND_URL, {
  //   query: { userId }
  // });

  // socket.on("connect", () => {
  //   console.log("Connected to server");
  // });

  // socket.on("notification", (notification) => {
  //   console.log("Notification received:", notification);
  // });

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     socket.emit("authenticate");
  //   }

  //   return () => {
  //     socket.off("notification");
  //   };
  // }, [isAuthenticated]);

  const dispatch = useDispatch();
  const { data, isFetching } = useCheckAuthQuery();

  useEffect(() => {
    if (data && !isFetching) {
      console.log(data);
      dispatch(
        setAuthState({
          isAuthenticated: data.authenticated,
          user: data.user,
          currentHouseholdId: data.currentHouseholdId,
          roleId: data.roleId,
        })
      );
    }
  }, [data, isFetching, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Authentication />} />
        <Route path="/auth/google/callback" element={GoogleAuthCallback} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route element={<RequireAuth />}>
          <Route path="/register/step2" element={<RegisterStep2 />} />
          <Route
            path="/households/:household/edit"
            element={<EditHousehold />}
          />
          <Route path="/expenses/:expense" element={<Expense />} />
          <Route
            path="/expense-details/:expenseId"
            element={<ExpenseDetail />}
          />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/expenses/balance" element={<BalanceDetails />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/" element={<Navigate to="/lists" />} />
          <Route path="/household" element={<Household />} />
          <Route path="/invite" element={<InviteMembers />} />
          <Route path="/lists/:list/item/:item" element={<ItemDetails />} />
          <Route path="/lists/:list/item/:id/image" element={<Image />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/lists/new" element={<NewList />} />
          <Route path="/expenses/new" element={<NewExpense />} />
          <Route path="/households/onboarding" element={<HouseholdOnboarding />} />
          <Route path="/households/join" element={<JoinHousehold />} />
          <Route path="/households/new" element={<NewHousehold />} />
          <Route path="/lists/:list" element={<List />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/users/:user" element={<User />} />
          <Route path="/users/:user/edit" element={<EditUser />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<Products />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
