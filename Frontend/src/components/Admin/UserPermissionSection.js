import React, { useEffect, useState } from "react";

const UserPermissionSection = () => {
  const [unapprovedAnalysts, setUnapprovedAnalysts] = useState([]);
  const [permissionStatus, setPermissionStatus] = useState("");

  // Fetch unapproved analysts
  const fetchUnapprovedAnalysts = async () => {
    try {
      const response = await fetch(
        "http://localhost:8040/crud/admin/analysts/unapproved"
      );
      if (response.ok) {
        const data = await response.json();
        setUnapprovedAnalysts(data);
      } else {
        setPermissionStatus("Failed to fetch unapproved analysts.");
      }
    } catch (error) {
      console.error("Error fetching unapproved analysts:", error);
      setPermissionStatus("An error occurred while fetching data.");
    }
  };

  // Approve an analyst
  const handleApproveAnalyst = async (analystId) => {
    try {
      const response = await fetch(
        `http://localhost:8040/crud/admin/approve-analyst/${analystId}`,
        {
          method: "PUT",
        }
      );
      if (response.ok) {
        setPermissionStatus(`Analyst ${analystId} approved successfully.`);
        // Refresh the list of unapproved analysts
        fetchUnapprovedAnalysts();
      } else {
        setPermissionStatus("Failed to approve the analyst.");
      }
    } catch (error) {
      console.error("Error approving analyst:", error);
      setPermissionStatus("An error occurred while approving the analyst.");
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchUnapprovedAnalysts();
  }, []);

  return (
    <div className="user-permission-section mt-5">
      <h4>Manage User Permissions</h4>
      {unapprovedAnalysts.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Specialization</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {unapprovedAnalysts.map((analyst) => (
              <tr key={analyst.analystId}>
                <td>{analyst.analystId}</td>
                <td>{analyst.username}</td>
                <td>{`${analyst.firstName} ${analyst.lastName}`}</td>
                <td>{analyst.email}</td>
                <td>{analyst.specialization}</td>
                <td>
                  <button
                    onClick={() => handleApproveAnalyst(analyst.analystId)}
                    className="btn btn-warning"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="mt-3">No unapproved analysts found.</div>
      )}
      {permissionStatus && (
        <div className="alert alert-info mt-3">{permissionStatus}</div>
      )}
    </div>
  );
};

export default UserPermissionSection;
