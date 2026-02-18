requestRouter.patch(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const allowedStatus = ["accepted", "rejected"];
      const { status, requestId } = req.params;
      const loggedInUser = req.user;

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status",
        });
      }

      const connectionReq = await ConnectionRequest.findOne({
        senderId: requestId,
        receiverId: loggedInUser._id,
        status : "interested"
      });

      if (!connectionReq) {
        return res.status(404).json({
          success: false,
          message: "Connection request not found",
        });
      }

      if (!connectionReq.receiverId.equals(loggedInUser._id)) {
        return res.status(403).json({
          success: false,
          message: "You are not authorized to review this request",
        });
      }

      if (connectionReq.status !== "interested") {
        return res.status(409).json({
          success: false,
          message: `Request already ${connectionReq.status}`,
        });
      }

      connectionReq.status = status;
      const updatedConnection = await connectionReq.save();

      return res.status(200).json({
        success: true,
        message: `Connection request ${status}`,
        updatedConnection,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
);


module.exports =  requestRouter ;