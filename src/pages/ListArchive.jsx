import React, { useEffect, useState } from "react";
import BottomBar from "../components/common/BottomBar";
import TopBar from "../components/common/TopBar";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ListArchive = ({ isArchived }) => {
  const [authHousehold, setAuthHousehold] = useState(null);

  useEffect(() => {
    const getCookieValue = (cookieName) => {
      const cookies = document.cookie.split("; ");
      for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === cookieName) {
          return JSON.parse(decodeURIComponent(value));
        }
      }
      return null;
    };
    const storedHousehold = getCookieValue("household");
    if (storedHousehold) {
      setAuthHousehold(storedHousehold);
    }
  }, []);

  useEffect(() => {
    if (authHousehold) {
      //const archivedLists = []; // Assuming this array will be populated later
      //setLists(archivedLists);
    }
  }, [authHousehold]);

  return (
    <div className="relative bg-white min-h-screen">
      <TopBar listTitle={`Archives`} />
      <main className="pt-16">
        <div className="flex flex-col px-5 fade-in">
          <div className="flex flex-col gap-y-3 mt-5">
            {isArchived?.length > 0 ? (
              isArchived
                ?.filter((list) => list?.id !== null && list?.id !== undefined)
                .map((list) => (
                  <Link
                    key={list?.id}
                    to={`/lists/${list?.id}`}
                    className="flex items-start w-full bg-black shadow-xl justify-between p-3 h-[130px] rounded-2xl relative"
                  >
                    <div className="flex flex-col h-full text-white justify-between">
                      <div className="flex flex-col">
                        <h1 className="text-xl font-medium">{list?.title}</h1>
                        <p className="font-light text-sm">
                          started by{" "}
                          <span className="font-medium">Gabriel Ribeira</span>
                        </p>
                      </div>
                      <div className="flex items-center w-full justify-start gap-x-3">
                        <p className="font-semibold text-sm bg-white text-black py-1 px-5 rounded-full w-fit">
                          {list?.items?.length} products
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
            ) : (
              <p>No archive found.</p>
            )}
          </div>
        </div>
      </main>
      <BottomBar />
    </div>
  );
};

ListArchive.propTypes = {
  isArchived: PropTypes.arrayOf(PropTypes.object),
};

export default ListArchive;
