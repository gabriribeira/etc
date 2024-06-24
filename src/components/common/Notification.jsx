import React from "react";
import PropTypes from "prop-types";
import { useUpdateRequestStatusMutation } from "../../app/api";

const Notification = ({ activity, refetchRequests }) => {
    const [updateRequestStatus] = useUpdateRequestStatusMutation();

    const handleAccept = async () => {
        await updateRequestStatus({ requestId: activity.id, status: 'accepted' });
        refetchRequests();
    };

    const handleReject = async () => {
        await updateRequestStatus({ requestId: activity.id, status: 'rejected' });
        refetchRequests();
    };

    const renderNotificationContent = (activity) => {
        switch (activity.type) {
            case 'join':
                return (
                    <div className="col-span-2">
                        <p><b>{activity.user.name}</b> requested to join <b>{activity.household.name}</b></p>
                        <p className="thin">&middot; {activity.createdAt}</p>
                    </div>
                );
            case 'invite':
                return (
                    <div className="col-span-2">
                        <p><b>{activity.user.name}</b> invited you to join <b>{activity.household.name}</b> <span className="text-sm font-light">&middot; {activity.createdAt.split("T")[0]}</span></p>
                    </div>
                );
            default:
                return (
                    <div className="col-span-2">
                        <p>Unknown request type</p>
                        <p className="thin">&middot; {activity.timeAgo}</p>
                    </div>
                );
        }
    };

    return (
        <div className="pt-3 flex gap-x-3 items-center">
            <div className="w-[70px] h-[70px] rounded-full flex items-center justify-center flex-shrink-0">
                <img src={activity.household.img_url} className="object-cover object-center rounded-full w-full h-full" alt="Household Image" />
            </div>
            <div className="grid grid-cols-2 items-center gap-x-3">
                {renderNotificationContent(activity)}
                {activity.status === 'pending' && (
                    <div className="w-full col-span-2 grid grid-cols-2 gap-x-3">
                        <button className="col-span-1 p-2 border-2 border-black rounded-xl" onClick={handleAccept}>Accept</button>
                        <button className="col-span-1 p-2 bg-red-500 text-white rounded-xl" onClick={handleReject}>Reject</button>
                    </div>
                )}
                {activity.status !== 'pending' && (
                    <p className={`thin ${activity.status === 'accepted' ? 'text-green-500' : 'text-red-500'}`}>
                        {activity.status === 'accepted' ? 'Accepted' : 'Rejected'}
                    </p>
                )}
            </div>
        </div>
    );
};

Notification.propTypes = {
    activity: PropTypes.object.isRequired,
    refetchRequests: PropTypes.func.isRequired,
};

export default Notification;