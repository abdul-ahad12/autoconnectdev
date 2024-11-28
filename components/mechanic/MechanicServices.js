import React, { useEffect, useState } from "react";
import axios from "axios";

const MechanicServices = () => {
  const [services, setServices] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [price, setPrice] = useState("");
  const [editingService, setEditingService] = useState(null);
  const [editPrice, setEditPrice] = useState("");

  // Loading states
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deletingServiceId, setDeletingServiceId] = useState(null);

  // Fetch services added by the mechanic
  const fetchServices = async () => {
    try {
      const res = await axios.get("/api/mechanic/getAllServices");
      setServices(res.data.services);
    } catch (error) {
      console.error("Error fetching mechanic services:", error);
      alert("Failed to fetch services.");
    }
  };

  // Fetch all available services from admin
  const fetchAvailableServices = async () => {
    try {
      const res = await axios.get("/api/services");
      setAvailableServices(res.data.services);
    } catch (error) {
      console.error("Error fetching available services:", error);
      alert("Failed to fetch available services.");
    }
  };

  // Handle adding a new service
  const handleAddService = async () => {
    if (!selectedService || price === "") {
      alert("Please select a service and provide a price.");
      return;
    }

    setIsAdding(true);
    try {
      await axios.post("/api/mechanic/getAllServices", {
        serviceId: selectedService,
        price: parseFloat(price),
      });

      alert("Service added successfully!");
      setSelectedService("");
      setPrice("");
      fetchServices();
    } catch (error) {
      console.error("Error adding service:", error);
      alert(error.response?.data?.message || "Failed to add service.");
    } finally {
      setIsAdding(false);
    }
  };

  // Handle initiating the edit process
  const handleEditService = (service) => {
    setEditingService(service);
    setEditPrice(service.price);
  };

  // Handle updating the service price
  const handleUpdateService = async () => {
    if (editPrice === "") {
      alert("Please provide a price.");
      return;
    }

    setIsUpdating(true);
    try {
      await axios.put(`/api/mechanic/services/${editingService._id}`, {
        price: parseFloat(editPrice),
      });

      alert("Service updated successfully!");
      setEditingService(null);
      setEditPrice("");
      fetchServices();
    } catch (error) {
      console.error("Error updating service:", error);
      alert(error.response?.data?.message || "Failed to update service.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle deleting a service
  const handleDeleteService = async (serviceId) => {
    if (!confirm("Are you sure you want to delete this service?")) {
      return;
    }

    setDeletingServiceId(serviceId);
    try {
      await axios.delete(`/api/mechanic/services/${serviceId}`);
      alert("Service deleted successfully!");
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
      alert(error.response?.data?.message || "Failed to delete service.");
    } finally {
      setDeletingServiceId(null);
    }
  };

  useEffect(() => {
    fetchServices();
    fetchAvailableServices();
  }, []);

  // Filter available services to exclude already added services
  const filteredAvailableServices = availableServices.filter(
    (service) => !services.some((s) => s.name === service.name)
  );

  return (
    <div className="p-6  min-h-screen z-[1000000000]">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Mechanic Services
        </h1>

        {/* Your Services */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Services</h2>
          {services.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-3 px-6 bg-gray-200 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                      Service Name
                    </th>
                    <th className="py-3 px-6 bg-gray-200 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                      Price ($)
                    </th>
                    <th className="py-3 px-6 bg-gray-200 text-center text-sm font-medium text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service._id} className="hover:bg-gray-50">
                      <td className="py-4 px-6 text-sm text-gray-700">
                        {service.name}
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-700">
                        ${service.price.toFixed(2)}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleEditService(service)}
                          className="mr-3 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={isUpdating}
                        >
                          {isUpdating ? "Updating..." : "Edit"}
                        </button>
                        {/* <button
                          onClick={() => handleDeleteService(service._id)}
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={deletingServiceId === service._id}
                        >
                          {deletingServiceId === service._id
                            ? "Deleting..."
                            : "Delete"}
                        </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No services added yet.</p>
          )}
        </div>

        {/* Add New Service */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Add New Service</h2>
          <div className="flex flex-col md:flex-row md:items-end md:space-x-4">
            <div className="flex-1 mb-4 md:mb-0">
              <label className="block mb-2 font-medium">Service</label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
              >
                <option value="">Select a service</option>
                {filteredAvailableServices.map((service) => (
                  <option key={service._id} value={service._id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1 mb-4 md:mb-0">
              <label className="block mb-2 font-medium">Price ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>

            <div>
              <button
                onClick={handleAddService}
                className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
                disabled={isAdding}
              >
                {isAdding ? "Adding..." : "Add Service"}
              </button>
            </div>
          </div>
        </div>

        {/* Edit Service Modal */}
        {editingService && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
              <h3 className="text-2xl font-semibold mb-4">Edit Service</h3>
              <p className="mb-2">
                <strong>Service:</strong> {editingService.name}
              </p>
              <label className="block mb-2 font-medium">Price ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded mb-4"
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setEditingService(null)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateService}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed"
                  disabled={isUpdating}
                >
                  {isUpdating ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MechanicServices;
