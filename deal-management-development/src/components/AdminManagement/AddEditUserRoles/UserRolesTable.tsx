import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useStoreState, useStoreActions } from "../../../store";
import Alert from "@material-ui/lab/Alert";

export interface UserRolesTableProps {
  openDrawer: any;
}

const UserRolesTable = (props: UserRolesTableProps) => {
  const userRolesData = useStoreState((state) => state.userRoles.userRolesData);
  const deleteUserRole = useStoreActions(
    (actions) => actions.userRoles.deleteUserRole
  );

  const onEditClick = (id: number) => {
    props.openDrawer(id);
  };
  return (
    <>
      {userRolesData.length === 0 ? (
        <Alert severity="info">You have no user roles</Alert>
      ) : (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>User Role</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userRolesData.map((userRole, id) => {
                return (
                  <TableRow key={id}>
                    <TableCell>{userRole.userRole} </TableCell>
                    <TableCell align="right">
                      <div className="btn-row flex-end">
                        <div className="btn-grid">
                          <IconButton
                            aria-label="edit"
                            onClick={() => onEditClick(userRole.id)}
                          >
                            <EditIcon color="primary" fontSize="small" />
                          </IconButton>
                        </div>
                        <div className="btn-grid">
                          <IconButton
                            aria-label="delete"
                            onClick={() => deleteUserRole(userRole.id)}
                          >
                            <DeleteIcon color="error" fontSize="small" />
                          </IconButton>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default UserRolesTable;
