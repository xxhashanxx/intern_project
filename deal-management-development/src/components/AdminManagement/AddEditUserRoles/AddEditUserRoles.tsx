import React, { useState } from "react";
import { Card, CardHeader, CardContent, Button } from "@material-ui/core";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import UserRolesTable from "./UserRolesTable";
import AddEditUserRolesForm from "./AddEditUserRolesForm";

import FormDrawer from "../../../containers/FormDrawer/FormDrawer";

const AddEditUserRoles = () => {
  const [isOpen, toggleDrawer] = useState(false);
  const [editId, setEditId] = useState(0);

  const drawerOpen = (id?: number) => {
    if (id) {
      setEditId(id);
    } else {
      setEditId(0);
    }

    toggleDrawer(true);
  };
  return (
    <div className="tab-box">
      <Card>
        <CardHeader
          //title="Add User Roles"
          //subheader="Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quasi similique natus aspernatur eaque nobis temporibus dolores, illum deleniti quo consequuntur nemo, commodi reiciendis? Debitis, optio? Cumque tempora aliquam odio!"
          action={
            <div className="btn-grid">
              <Button
                color="primary"
                variant="outlined"
                startIcon={<GroupAddIcon />}
                onClick={() => drawerOpen()}
              >
                Add
              </Button>
            </div>
          }
        />

        <CardContent className="p-0">
          <UserRolesTable openDrawer={drawerOpen} />
        </CardContent>
      </Card>
      {isOpen && (
        <FormDrawer
          title={`${editId === 0 ? "Add" : "Edit"} User Role`}
          desc={`${editId === 0 ? "Add" : "Edit"} user role desc`}
          closeDrawer={() => toggleDrawer(false)}
        >
          <AddEditUserRolesForm
            editId={editId}
            closeDrawer={() => toggleDrawer(false)}
          />
        </FormDrawer>
      )}
    </div>
  );
};

export default AddEditUserRoles;
