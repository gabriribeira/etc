import React from "react";

const Members = () => {

    return (   
        <div className="flex flex-col">
            <h1 className="font-bold text-base">Members</h1>
            <div className="py-3">
                <div className="flex flex-row bg-black10 rounded-lg p-2 mb-3">
                    <img src={require(`../../assets/data/users/ines.webp`)} alt="" className="basis-1/5 mx-0 rounded-full m-auto max-w-10 max-h-10 object-cover "></img>
                    <p className="basis-4/5 my-auto ml-3 font-semibold text-black text-sm">Inês Sucena</p>
                    <span></span>
                </div>
            </div>
        </div>
    );
};

export default Members;