import React, { useEffect, useState } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import { useGetUserHouseholdsQuery, useGetUserQuery } from "../app/api";
import DefaultProfilePicture from "../assets/imgs/etc/logo_dots.png";
import { useLocation } from "react-router-dom";

const User = () => {
  const location = useLocation();
  const { data: user } = useGetUserQuery(location.pathname.split("/")[2]);
  const {
    data: households,
    isLoading: isLoadingHouseholds,
    error: householdsError,
  } = useGetUserHouseholdsQuery(location.pathname.split("/")[2]);

  const [imageUrl, setImageUrl] = useState(DefaultProfilePicture);

  useEffect(() => {
    if (user) {
      setImageUrl(user.data.img_url);
    }
  }, [user]);

  if (isLoadingHouseholds) {
    return <div>Loading...</div>;
  }
  if (householdsError) {
    return <div>Error: {householdsError.message}</div>;
  }

  return (
    user &&
    households && (
      <div>
        <TopBar />
        <main className="mt-32 bg-white">
          <div className="flex flex-col">
            <div className="flex flex-col bg-black bg-gradient-to-br from-black to-white/20 text-center relative">
              <div className="py-16 flex flex-col items-center justify-center">
                <img
                  src={imageUrl}
                  alt="Profile Picture"
                  className="object-center object-cover rounded-full w-[150px] h-[150px] shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                <h1 className="font-normal text-xl text-white mt-2">
                  {user.data.name}
                </h1>
                <p className="font-light text-sm text-white">
                  @{user.data.username}
                </p>
              </div>
            </div>
            <div className="flex flex-col px-5 mt-6">
              <h1 className="font-semibold text-lg mb-2">Description</h1>
              <p className="text-black text-base">{user?.data?.description || "No description yet"}</p>
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
                          referrerPolicy="no-referrer"
                        />
                        <p className="text-white text-lg font-medium">
                          {household.name}
                        </p>
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