import React, { useEffect, useState } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import { RxDotsVertical } from "react-icons/rx";
import { useGetUserHouseholdsQuery, useGetUserQuery } from "../app/api";
import DefaultProfilePicture from "../assets/data/users/leo.webp";
import CategoriesData from "../data/categories.json";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const User = () => {
  const categoriesData = CategoriesData;
  const location = useLocation();
  const { data: user } = useGetUserQuery(location.pathname.split("/")[2]);
  const [imageUrl, setImageUrl] = useState(DefaultProfilePicture);
  const {
    data: households,
    isLoading,
    error,
  } = useGetUserHouseholdsQuery(location.pathname.split("/")[2]);

  useEffect(() => {
    if (user) {
      setImageUrl(user.data.img_url);
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const getCategoryTitle = (categoryId) => {
    const category = categoriesData.find((cat) => cat.id === categoryId);
    return category ? category.title : "Unknown";
  };

  return (
    user &&
    households && (
      <div>
        <TopBar />
        <main className="mt-32">
          <div className="flex flex-col">
            <div className="flex flex-col bg-black20 text-center relative">
              <Link
                to={`/users/${user.id}/edit`}
                className="font-medium text-sm absolute top-3 right-3"
              >
                edit
              </Link>
              <div className="py-16 flex flex-col items-center justify-center">
                <img
                  src={imageUrl}
                  alt="Profile Picture"
                  onError={(e) => (e.currentTarget.src = DefaultProfilePicture)}
                  className="object-center object-cover rounded-full w-[150px] h-[150px] shadow-2xl"
                />
                <h1 className="font-normal text-xl text-white mt-2">
                  {user.data.name}
                </h1>
                <p className="font-light text-sm text-white">
                  @{user.data.username}
                </p>
                <h1 className="font-medium text-xl mt-2">{user.name}</h1>
                <p className="font-normal text-sm">@{user.username}</p>
              </div>
            </div>
            <div className="flex flex-col px-5 mt-6">
              <h1 className="font-semibold text-lg mb-2">Description</h1>
              <p className="text-black text-base">{user.data.description}</p>
            </div>

            <div className="flex flex-col px-5 mt-6">
              <h1 className="font-semibold text-lg mb-4">Food Restrictions</h1>
              <p className="text-base">
                {user.food_restriction.map((categoryId, index) => (
                  <span
                    key={index}
                    className="bg-black text-white p-3 rounded-xl mr-2"
                  >
                    {getCategoryTitle(categoryId)}
                  </span>
                ))}
              </p>
            </div>

            <div className="flex flex-col px-5 mt-6">
              <h1 className="font-semibold text-lg mb-2">Households</h1>
              <div className="flex flex-col gap-y-3">
                {households &&
                  households.data.map((household, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-black bg-gradient-to-r from-black to-white/30 text-white rounded-2xl p-3 shadow-lg"
                    >
                      <div className="flex items-center gap-x-3">
                        <img
                          src={household.img_url}
                          alt="Household Profile Picture"
                          onError={(e) =>
                            (e.currentTarget.src = DefaultProfilePicture)
                          }
                          className="w-[40px] h-[40px] rounded-full object-cover object-center shrink-0"
                        />
                        <p className="text-white text-lg font-medium">
                          {household.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <button
                          type="button"
                          className="text-white text-2xl"
                          aria-label="Household settings"
                        >
                          <RxDotsVertical />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </main>
        <BottomBar />
      </div>
    )
  );
};

export default User;
