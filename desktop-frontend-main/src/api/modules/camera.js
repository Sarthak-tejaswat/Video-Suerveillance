import { axiosClient, resolver } from "../client";

// Helper function to create headers with authorization token
const createHeaders = (token) => ({
  headers: { Authorization: token },
});

export default {
  async addCamera(data, token) {
    if (!token) throw new Error("Authorization token is required");
    try {
      const response = await axiosClient.post(
        "camera/add",
        data,
        createHeaders(token)
      );
      return resolver(response);
    } catch (error) {
      return resolver(error.response);
    }
  },

  async getCameras(systemId, token) {
    if (!token) throw new Error("Authorization token is required");
    try {
      const response = await axiosClient.get(
        `camera/${systemId}`,
        createHeaders(token)
      );
      return resolver(response);
    } catch (error) {
      return resolver(error.response);
    }
  },

  async deleteCamera(cameraId, token) {
    if (!token) throw new Error("Authorization token is required");
    try {
      const response = await axiosClient.delete(
        `camera/${cameraId}`,
        createHeaders(token)
      );
      return resolver(response);
    } catch (error) {
      return resolver(error.response);
    }
  },

  async changeCameraMonitoringStatus(data, token) {
    if (!token) throw new Error("Authorization token is required");
    try {
      const response = await axiosClient.put(
        "camera/update",
        data,
        createHeaders(token)
      );
      return resolver(response);
    } catch (error) {
      return resolver(error.response);
    }
  },
};
