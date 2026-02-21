import React, { useState } from "react";
import "./dashboard.css";

function Dashboard() {

  return (

<>
            {/* Header */}
            <div className="dashboard-header">
              <h4 className="page-title">Dashboard</h4>
            </div>

            {/* Main Content */}
            <div className="dashboard-main">
              <h5>Welcome to Dashboard</h5>
              <p className="text-muted">
                Your meetings and tasks overview will appear here.
              </p>
            </div>
</>

  );
}

export default Dashboard;

{/* <Permission module="USERS" action="edit">
  <Button>Edit</Button>
</Permission> */}

// const canEdit = usePermission("USERS", "edit");

// return (
//   <>
//     {canEdit && <Button>Add User</Button>}

//     <Table>
//       <Button disabled={!canEdit}>Edit</Button>
//       <Button disabled={!canEdit}>Delete</Button>
//     </Table>
//   </>
// );

{/* <Route
  path="/users"
  element={
    <ProtectedRoute moduleKey="USERS">
      <Users />
    </ProtectedRoute>
  }
/> */}