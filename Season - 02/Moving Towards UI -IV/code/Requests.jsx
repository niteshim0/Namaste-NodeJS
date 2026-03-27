import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addRequest } from "../redux/slices/requestSlice";

export const Requests = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  const [showToast, setShowToast] = useState(false);
  const [isError, setIsError] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const [removingIds, setRemovingIds] = useState([]);

  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${BASE_URL}user/requests/pending`,
        { withCredentials: true }
      );

      const data = res?.data?.pendingRequests || [];
      dispatch(addRequest(data));

      setError(null);
    } catch (err) {
      const msg =
        err.response?.status === 401
          ? "Please login first"
          : err.response?.status === 404
          ? "Requests not found"
          : "Something went wrong";

      setError(msg);
      setIsError(true);
      setToastMsg(msg);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAction = async (senderId, type) => {
    if (actionLoading) return;

    // ✅ Start animation
    setRemovingIds((prev) => [...prev, senderId]);

    try {
      setActionLoading(senderId);

      await axios.patch(
        `${BASE_URL}request/review/${type}/${senderId}`,
        {},
        { withCredentials: true }
      );

      // ⏳ Wait for animation before removing
      setTimeout(() => {
        const updated = requests.filter(
          (r) => r.senderId._id !== senderId
        );
        dispatch(addRequest(updated));

        setRemovingIds((prev) =>
          prev.filter((id) => id !== senderId)
        );
      }, 300);

      setIsError(false);
      setToastMsg(
        type === "accepted"
          ? "Request accepted ✅"
          : "Request rejected ❌"
      );
    } catch (err) {
      // ❌ rollback animation
      setRemovingIds((prev) =>
        prev.filter((id) => id !== senderId)
      );

      const msg = "Action failed, try again";
      setError(msg);
      setIsError(true);
      setToastMsg(msg);
    } finally {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      setActionLoading(null);
    }
  };

  return (
    <>
      {/* Toast */}
      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className={`alert ${isError ? "alert-error" : "alert-success"}`}>
            <span>{toastMsg}</span>
          </div>
        </div>
      )}

      <div className="p-4 max-w-md mx-auto">
        <h2 className="text-center mb-4 text-xl font-semibold">
          Requests
        </h2>


        {/* Loading */}
        {loading && <p className="text-center">Loading...</p>}  
        { /* I will add shimmer ui later on*/}

        {/* Error */}
        {error && !showToast && (
          <p className="text-red-500 text-center">{error}</p>
        )} { /*  one component will be desighned for this as well*/}

        {/* Empty */}
        {!loading && !error && requests?.length === 0 && (
          <p className="text-center text-gray-500">
            No requests found
          </p>
        )}

        {/* List */}
        {!loading && !error && requests?.length > 0 && (
          <div className="flex flex-col gap-4">
            {requests.map((request) => {
              const senderId = request?.senderId?._id;

              return (
                <div
                  key={senderId}
                  className={`flex items-center justify-between gap-6 p-4 rounded-2xl bg-gray-700 hover:bg-gray-600 transition-all duration-300 shadow-md
                    ${
                      removingIds.includes(senderId)
                        ? "opacity-0 translate-x-10 scale-95 blur-sm"
                        : "opacity-100 translate-x-0 scale-100"
                    }
                  `}
                >
                  {/* Profile */}
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12">
                      <img
                        src={
                          request?.senderId?.profilePhoto ||
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="profile"
                        className="w-full h-full object-cover rounded-full border"
                      />
                    </div>

                    <div>
                      <p className="font-semibold text-base text-white">
                        {request?.senderId?.name || "Unknown User"}
                      </p>

                      <p className="text-sm text-gray-300">
                        {request?.senderId?.experienceLevel || "N/A"}
                      </p>

                      <p className="text-xs text-gray-400 max-w-xs truncate">
                        {request?.senderId?.bio || "No bio available"}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        handleAction(senderId, "accepted")
                      }
                      disabled={actionLoading === senderId}
                      className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
                    >
                      {actionLoading === senderId ? "..." : "Accept"}
                    </button>

                    <button
                      onClick={() =>
                        handleAction(senderId, "rejected")
                      }
                      disabled={actionLoading === senderId}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
                    >
                      {actionLoading === senderId ? "..." : "Reject"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};