import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  IconButton,
  Chip,
  LinearProgress,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useQuery, queryCache, useMutation } from "react-query";
import Alert from "@material-ui/lab/Alert";
import useAdminManagementService from "../../../api/adminManagement/users/useAdminManagementService";

export interface UsersTableProps {
  openDrawer: any;
}

const UsersTable = (props: UsersTableProps) => {
  const { status, data, error } = useQuery("userList", useAdminManagementService().useGetUserListService);

  const deleteUserService = useAdminManagementService().useDeleteUserService();
  const [
    mutateDeleteUser,
    { status: deleteStatus, error: deleteError },
  ] = useMutation(
    (deleteId: any) => {
      return deleteUserService.deleteUser(deleteId);
    },
    {
      onSuccess: () => {
        return queryCache.refetchQueries("userList").then(() => {});
      },
    }
  );
  const onDeleteClick = (userDataItem: any) => {
    if (window.confirm("Are you sure you wish to delete this item?"))
      mutateDeleteUser(userDataItem.id);
  };
  return (
    <>
      {status === "loading" && <LinearProgress />}
      {status === "error" && error && (
        <Alert severity="error">{error.message}</Alert>
      )}
      {status === "success" && (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>User Name</TableCell>
                <TableCell>Email Address</TableCell>
                <TableCell>User Role</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.data &&
                data.data.map((userDataItem: any, key: number) => {
                  return (
                    <TableRow key={key} onDoubleClick={() => props.openDrawer(userDataItem)} style={{ whiteSpace: "nowrap"}}>
                      <TableCell>{userDataItem.username}</TableCell>
                      <TableCell>{userDataItem.email}</TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={userDataItem.role}
                          color="primary"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <div className="btn-row flex-end">
                          <div className="btn-grid">
                            <IconButton
                              aria-label="edit"
                              onClick={() => props.openDrawer(userDataItem)}
                            >
                              <EditIcon color="primary" fontSize="small" />
                            </IconButton>
                          </div>
                          <div className="btn-grid">
                            <IconButton
                              aria-label="delete"
                              onClick={() => onDeleteClick(userDataItem)}
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

export default UsersTable;
