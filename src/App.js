import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Authentication from "./pages/Authentication";
import Calendar from "./pages/Calendar";
import EditEvent from "./pages/EditEvent";
import EditTask from "./pages/EditTask";
import Expense from "./pages/Expense";
import Expenses from "./pages/Expenses";
import Goals from "./pages/Goals";
import Homepage from "./pages/Homepage";
import Household from "./pages/Household";
import InviteMembers from "./pages/InviteMembers";
import ItemDetails from "./pages/ItemDetails";
import JoinHousehold from "./pages/JoinHousehold";
import Lists from "./pages/Lists";
import NewEvent from "./pages/NewEvent";
import NewExpense from "./pages/NewExpense";
import NewHousehold from "./pages/NewHousehold";
import NewList from "./pages/NewList";
import NewTask from "./pages/NewTask";
import Notifications from "./pages/Notifications";
import Onboarding from "./pages/Onboarding";
import Register from "./pages/Register";
import Task from "./pages/Task";
import TaskManager from "./pages/TaskManager";
import Tasks from "./pages/Tasks";
import User from "./pages/User";

function App() {

  // Altera o título da página na aba do browser
  useEffect(() => {
    document.title = "et.cetera";
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Authentication />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/event/:event/edit" element={<EditEvent />} />
        <Route path="/task/:task/edit" element={<EditTask />} />
        <Route path="/expenses/:expense" element={<Expense />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/household/:household" element={<Household />} />
        <Route path="/invite" element={<InviteMembers />} />
        <Route path="/lists/:list/item" element={<ItemDetails />} />
        <Route path="/join" element={<JoinHousehold />} />
        <Route path="/lists" element={<Lists />} />
        <Route path="/event/new" element={<NewEvent />} />
        <Route path="/expenses/new" element={<NewExpense />} />
        <Route path="/households/new" element={<NewHousehold />} />
        <Route path="/lists/new" element={<NewList />} />
        <Route path="/tasks/new" element={<NewTask />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks/:task" element={<Task />} />
        <Route path="/task-manager" element={<TaskManager />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/users/:user" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
