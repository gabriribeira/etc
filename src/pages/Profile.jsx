import React, { useEffect, useState } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import { RxDotsVertical } from "react-icons/rx";
import { useGetUserHouseholdsQuery } from "../app/api";
import { useSelector } from "react-redux";
import DefaultProfilePicture from "../assets/data/users/leo.webp";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const [imageUrl, setImageUrl] = useState(user.img_url);
  console.log(user);
  const {
    data: households,
    isLoading,
    error,
  } = useGetUserHouseholdsQuery(user.id);

  useEffect(() => {
    if (user.img_url) {
      setImageUrl(user.img_url);
    }
  }, [user.img_url]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    user &&
    households && (
      <div>
        <TopBar />
        <main className="mt-16">
          <div className="flex flex-col">
            <div className="flex flex-col bg-black bg-gradient-to-br from-black to-white/20 text-center relative">
              <div className="py-16 flex flex-col items-center justify-center">
                <img
                  src={imageUrl}
                  alt="Profile Picture"
                  onError={(e) => (e.currentTarget.src = DefaultProfilePicture)}
                  className="object-center object-cover rounded-full w-[150px] h-[150px] shadow-2xl"
                />
                <h1 className="font-normal text-xl text-white mt-2">
                  {user.name}
                </h1>
                <p className="font-light text-sm text-white">
                  @{user.username}
                </p>
              </div>
            </div>
            <div className="flex flex-col px-5 mt-6">
              <h1 className="font-semibold text-lg mb-2">Description</h1>
              <p className="text-black text-base">{user.description}</p>
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
                        <p className="text-white text-lg font-base">
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

export default Profile;
