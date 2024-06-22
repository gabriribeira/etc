import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BackButton from "./BackButton";
import { CSSTransition } from "react-transition-group";
import Overlay from "./Overlay";
import NewButton from "./NewButton";
import FilterOverlay from "./FilterOverlay";
import ConfirmationDialog from "./ConfirmationDialog";
import { useDeleteListMutation } from "../../app/api";
import { IoSettingsOutline, IoFilterCircleOutline } from "react-icons/io5";
import { RxDotsHorizontal } from "react-icons/rx";
import { RiNotification4Line } from "react-icons/ri";
import { IoIosCheckboxOutline } from "react-icons/io";  // Import the checkbox icon

const TopBar = ({ description, listTitle, listClosed, onBack, lockList, unlockList, id_List, onFiltersChange }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const userProfileRegex = /\/(users)\/\d+/;
  const location = useLocation();
  const [showBackButton, setShowBackButton] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showFilterOverlay, setShowFilterOverlay] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [showEditList, setShowEditList] = useState(false);
  const [showListOptions, setShowListOptions] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [deleteList] = useDeleteListMutation();

  const handleBackClick = () => {
    if (onBack) {
      onBack();  // Call the onBack function if provided
    } else {
      navigate(-1);  // Default back behavior
    }
  };

  const toggleFilterOverlay = () => {
    setShowFilterOverlay(!showFilterOverlay);
  };

  const handleShowFilter = () => {
    toggleFilterOverlay();
  };

  const handleShowEditList = () => {
    setShowEditList(!showEditList);
  };

  const handleShowListOptions = () => {
    setShowListOptions(!showListOptions);
  };


  const setFilter = (newFilters) => {
    setAppliedFilters(newFilters);
    if (onFiltersChange) onFiltersChange(newFilters); // Pass filters to the parent component
  };


  const [filters, setFilters] = useState([]);

  useEffect(() => {
    if (location.pathname === "/lists") {
      setFilters(["Lists"]);
    } else if (/^\/lists\/\d+$/.test(location.pathname)) {
      setFilters(["State", "Products For", "Include", "Category"]);

    } else if (location.pathname === "/expenses") {
      setFilters(["Paid by", "Category"]);
    }
    else if (location.pathname === "/products") {
      setFilters(["Order by", "Supermarket", "Category"]);
    }
  }, [location.pathname]);

  const isEditPage = () => {
    const editPageRegex = /\/(tasks|lists)\/\d+\/(new|edit)/;
    const balancePageRegex = /\/expenses\/balance/;
    const newExpensePageRegex = /\/expenses\/new/;
    const newListPageRegex = /\/lists\/new/;
    const newHouseholdPageRegex = /\/households\/new/;
    const editProfilePageRegex = /\/profile\/edit/;
    const editHouseholdPageRegex = /\/household\/edit/;
    return (
      editPageRegex.test(location.pathname) ||
      balancePageRegex.test(location.pathname) ||
      newExpensePageRegex.test(location.pathname) ||
      newListPageRegex.test(location.pathname) ||
      newHouseholdPageRegex.test(location.pathname) ||
      editProfilePageRegex.test(location.pathname) ||
      editHouseholdPageRegex.test(location.pathname)
    );
  };

  const shouldShowFilterButton = () => {
    const editItemPageRegex = /\/lists\/\d+\/item\/\d+/;
    if (editItemPageRegex.test(location.pathname)) {
      return false;
    }

    const listPageRegex = /^\/lists\/\d+$/;
    const expensesPageRegex = /^\/expenses$/;
    if (
      listPageRegex.test(location.pathname) ||
      expensesPageRegex.test(location.pathname)
    ) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    const listPageRegex = /^\/lists\/\d+$/;
    const imagePageRegex = /^\/image\/\d+$/;
    const editItemPageRegex = /\/lists\/\d+\/item\/\d+/;
    const expenseDetailsPageRegex = /^\/expenses\/expensedetails\/\d+$/;
    const editUserPageRegex = /^\/users\/\d+\/edit$/;
    const userPageRegex = /^\/users\/\d+$/;
    const editProfilePageRegex = /\/profile\/edit/;
    const editHouseholdPageRegex = /\/household\/edit/;

    if (

      isEditPage() ||

      listPageRegex.test(location.pathname) ||

      imagePageRegex.test(location.pathname) ||

      editItemPageRegex.test(location.pathname)
      ||
      expenseDetailsPageRegex.test(location.pathname) ||
      editUserPageRegex.test(location.pathname) ||
      userPageRegex.test(location.pathname) ||
      editProfilePageRegex.test(location.pathname) ||
      editHouseholdPageRegex.test(location.pathname)
    ) {
      setShowBackButton(true);
    } else {
      setShowBackButton(false);
    }
  }, [location]);


  const shouldShowEditListButton = () => {
    const listPageRegex = /^\/lists\/\d+$/;
    return listPageRegex.test(location.pathname);
  };

  const handleDeleteList = async () => {
    console.log("Delete List ID:", id_List);

    try {
      await deleteList(id_List).unwrap();
      setShowConfirmation(false);
      //alert("List deleted successfully");
      navigate("/lists");
    } catch (error) {
      console.error("Failed to delete the list:", error);
      alert("Failed to delete the list. Please try again.");
    }
  };


  return (
    <header className="fixed top-0 left-0 w-screen z-[101] bg-white">
      <div
        className={`flex flex-col sticky top-0 w-screen ${!showBackButton && "pb-2"
          } px-5 pt-3 z-[100] bg-white`}
      >
        <div className="flex items-center justify-between gap-x-2 relative">
          {location.pathname === "/lists" ? (
            <>
              <button
                type="button"
                onClick={handleShowListOptions}
                className="text-2xl z-[101]"
                aria-label="List Options"
              >
                <RxDotsHorizontal />
              </button>
              <CSSTransition
                in={showListOptions}
                timeout={500}
                classNames="menu-primary"
                className="fixed top-[60px] left-0 w-full bg-white z-[101] h-auto shadow-xl rounded-b-2xl p-5"
                unmountOnExit
              >
                <Overlay
                  label=" "
                  options={[
                    <div key="select-lists" className="flex items-center gap-x-2">
                      <IoIosCheckboxOutline />
                      <span>Select lists</span>
                    </div>
                  ]}
                  links={["/lists"]}
                  hideOverlay={() => setShowListOptions(false)}
                />
              </CSSTransition>
            </>
          ) : (
            user &&
              !userProfileRegex.test(location.pathname) &&
              location.pathname !== `/profile` ? (
              <Link
                to={`/profile`}
                className="flex items-center gap-x-3 z-[101]"
              >
                <img
                  // eslint-disable-next-line
                  src={user.img_url ? user.img_url : Image}
                  alt="User Profile Picture"
                  className="w-[40px] h-[40px] rounded-full object-cover object-center shrink-0"
                  referrerPolicy="no-referrer"
                />
              </Link>
            ) : (
              <Link
                to={`/profile`}
                className="flex items-center gap-x-3 z-[101]"
              >
                <img
                  // eslint-disable-next-line
                  src={user.img_url ? user.img_url : Image}
                  alt="User Profile Picture"
                  className="w-[40px] h-[40px] rounded-full object-cover object-center shrink-0"
                  referrerPolicy="no-referrer"
                />
              </Link>
            )
          )}
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <img
              // eslint-disable-next-line
              src={require(`../../assets/imgs/etc/short_logo_salmon.webp`)}
              alt="Logo"
              className="h-[25px]"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex items-center gap-x-3">
            {/^\/households\/\d+$/.test(location.pathname) && (
              <>
                <RiNotification4Line size={25} />
                <button
                  type="button"
                  onClick={() => {
                    setShowSettings(!showSettings);
                  }}
                  className="text-2xl z-[101]"
                  aria-label="Button Settings"
                >
                  <IoSettingsOutline size={25} />
                </button>
              </>
            )}

            {location.pathname === "/expenses" && (
              <>
                <button type="button" className="text-2xl z-[101] text-black">
                  <NewButton
                    path={`${location.pathname}/new`}
                    aria="New Expense"
                  />
                </button>

                <button
                  type="button"
                  onClick={handleShowFilter}
                  className="text-2xl z-[101] text-black"
                >
                  <IoFilterCircleOutline size={35} />
                </button>
              </>
            )}

            {location.pathname === "/lists" && (
              <>
                <button type="button" className="text-3xl z-[101] text-black">
                  <NewButton path={`/lists/new`} aria="New List" />
                </button>

                <button
                  type="button"
                  onClick={handleShowFilter}
                  className="text-3xl z-[101] text-black"
                >
                  <IoFilterCircleOutline size={35} />
                </button>
              </>
            )}

            {location.pathname === "/products" && (
              <>
                <button
                  type="button"
                  onClick={handleShowFilter}
                  className="text-3xl z-[101] text-black"
                >
                  <IoFilterCircleOutline size={35} />
                </button>
              </>
            )}

            {!location.pathname.startsWith("/expenses") &&
              shouldShowFilterButton() && (
                <button
                  type="button"
                  onClick={handleShowFilter}
                  className="text-2xl z-[101] text-black"
                >
                  <IoFilterCircleOutline size={35} />
                </button>
              )}

            {shouldShowEditListButton() && (
              <button
                type="button"
                onClick={handleShowEditList}
                className="text-2xl z-[101] text-black"
              >
                <RxDotsHorizontal />
              </button>
            )}
          </div>
        </div>

        <CSSTransition
          in={showSettings}
          timeout={500}
          classNames="menu-primary"
          className="fixed top-[60px] left-0 w-full bg-white z-[101] h-auto shadow-xl rounded-b-2xl"
          unmountOnExit
        >
          <Overlay
            label="SETTINGS"
            options={["Profile", "Notifications", "About", "Logout"]}
            links={["/users", "/", "/about", "/login"]}
            hideOverlay={() => setShowSettings(false)}
          />
        </CSSTransition>

        <CSSTransition
          in={showEditList}
          timeout={500}
          classNames="menu-primary"
          className="fixed top-[60px] left-0 w-full bg-white z-[101] h-auto shadow-xl rounded-b-2xl p-5"
          unmountOnExit
        >
          <Overlay
            label=""
            options={[
              `${listClosed ? "Unlock" : "Lock"} shopping list`,
              "Edit shopping list",
              "Delete shopping list",
            ]}
            links={[null, null, null]}
            hideOverlay={() => setShowEditList(false)}
            onClicks={[() => { listClosed ? unlockList() : lockList() }, () => { }, () => setShowConfirmation(true)]}
          />
        </CSSTransition>

        <ConfirmationDialog
          title="Delete List?"
          details="The list will be removed from the shopping."
          label="Delete"
          bg="bg-red-600"
          showConfirmation={showConfirmation}
          setShowConfirmation={setShowConfirmation}
          action={handleDeleteList}
        />

        <CSSTransition
          in={showFilterOverlay}
          timeout={500}
          classNames="filter-overlay"
          className="fixed top-[60px] left-0 w-full bg-white z-[101] h-auto shadow-xl rounded-b-2xl p-5"
          unmountOnExit
        >
          <FilterOverlay
            appliedFilters={appliedFilters}
            setFilter={setFilter}
            filters={filters}
            hideFilters={toggleFilterOverlay}
            location={location} // Passando location para FilterOverlay
          />
        </CSSTransition>

      </div>

      {showBackButton && (
        <div
          className={`mt-8 mb-5 px-5 ${listTitle && "w-full flex items-center relative"
            }`}
        >
          <BackButton onClick={handleBackClick} />
          {listTitle && (
            <div className="absolute left-0 top-0 flex items-center w-full h-full justify-center">
              <p className="text-black text-base font-semibold text-xl">
                {listTitle}
              </p>
            </div>
          )}
        </div>
      )}
      {description && (
        <p className="text-black60 text-base mt-2">{description}</p>
      )}
    </header>
  );
};

TopBar.propTypes = {
  description: PropTypes.string,
  listTitle: PropTypes.string,
  listClosed: PropTypes.bool,
  onBack: PropTypes.func,
  lockList: PropTypes.func,
  unlockList: PropTypes.func,
  id_List: PropTypes.string.isRequired,
  onFiltersChange: PropTypes.func,
};

export default TopBar;
