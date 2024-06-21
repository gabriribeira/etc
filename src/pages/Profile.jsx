import React, { useEffect, useState } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import { RxDotsVertical } from "react-icons/rx";
import { useGetUserHouseholdsQuery, useGetUserSpecificationsQuery } from "../app/api";
import { useSelector } from "react-redux";
import Image from "../assets/imgs/etc/logo_dots.png";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const [imageUrl, setImageUrl] = useState(user.img_url);
  const {
    data: households,
    isLoading: householdsLoading,
    error: householdsError,
  } = useGetUserHouseholdsQuery(user.id);
  const {
    data: specifications,
    isLoading: specificationsLoading,
    error: specificationsError,
  } = useGetUserSpecificationsQuery(user.id);

  console.log('Specifications data:', specifications);

  useEffect(() => {
    if (user.img_url) {
      setImageUrl(user.img_url);
    }
  }, [user.img_url]);

  if (householdsLoading || specificationsLoading) {
    return <div>Loading...</div>;
  }
  if (householdsError || specificationsError) {
    return <div>Error: {householdsError?.message || specificationsError?.message}</div>;
  }

  const restrictions = specifications?.data || [];

  return (
    user &&
    households && (
      <div>
        <TopBar />
        <main className="mt-16">
          <div className="flex flex-col">
            <div className="flex flex-col bg-black bg-gradient-to-br from-black to-white/20   text-center relative">
              <div className="py-16 flex flex-col items-center justify-center text-white">
                <Link
                  to={`/profile/edit`}
                  className="font-medium text-sm absolute top-3 right-3"
                >
                  edit
                </Link>
                <img
                  src={imageUrl}
                  alt="Profile Picture"
                  className="object-center object-cover rounded-full w-[150px] h-[150px] shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                <h1 className="font-medium text-xl mt-2">{user.name}</h1>
                {user.username && <p className="font-normal text-sm ">@{user.username}</p>}
              </div>
            </div>
            <div className="flex flex-col px-5 mt-6">
              <h1 className="font-semibold text-lg mb-2">Description</h1>
              <p className="text-black text-base">{user.description ? user.description : "No description yet"}</p>
            </div>

            <div className="flex flex-col px-5 mt-6">
              <h1 className="font-semibold text-lg mb-2">Food Restrictions</h1>
              <div className="flex gap-2 flex-wrap">
                {restrictions.length > 0 ? (
                  restrictions.map((restriction, index) => (
                    <div
                      key={index}
                      className="inline-block py-1 px-3 border border-black rounded-2xl text-base font-normal bg-black text-white"
                    >
                      {restriction.name}
                    </div>
                  ))
                ) : (
                  <div className="inline-block py-1 px-3 border border-black rounded-2xl text-base font-normal bg-black text-white">
                    None
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col px-5 mt-6">
              <h1 className="font-semibold text-lg mb-2">Households</h1>
              <div className="flex flex-col gap-y-3">
                {households &&
                  households.data.map((household, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-black20 text-black rounded-2xl p-3 shadow-lg"
                    >
                      <div className="flex items-center gap-x-3">
                        <img
                          src={household.img_url ? household.img_url : Image}
                          alt="Household Profile Picture"
                          className="w-[40px] h-[40px] rounded-full object-cover object-center shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <p className="text-black text-lg font-semibold">
                          {household.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <button
                          type="button"
                          className="text-black text-2xl"
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
