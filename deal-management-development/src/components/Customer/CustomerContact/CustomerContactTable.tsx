import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  IconButton,
  LinearProgress,
  Tooltip,
} from "@material-ui/core";
import { useQuery, useMutation, queryCache } from "react-query";
import Alert from "@material-ui/lab/Alert";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import useCustomerContactService from "../../../api/customerContact/useCustomerContactService";
import { useStoreState } from "../../../store";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

export interface CustomerContactTableProps {
  openDrawer: any;
}
const CustomerContactTable = (props: CustomerContactTableProps) => {
  const customerId = useStoreState((state) => state.customer.customerId);

  const { status, data, error } = useQuery(
    "customerContactList",
    customerId,
    useCustomerContactService().useGetCustomerContactListService
  );
  const deleteCustomerContactService = useCustomerContactService().useDeleteCustomerContactService();
  const [mutateDeleteCustomerContact,{status:deleteStatus,error:deleteError}] = useMutation(
    async (deleteId: any) => {
      return await deleteCustomerContactService.deleteCustomerContact(
        customerId,
        deleteId
      );
    },
    {
      onSuccess: () => {
        return queryCache.refetchQueries("customerContactList").then(() => {});
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );
  const onDeleteClick = (customerContactDataItem: any) => {
    if (window.confirm("Are you sure you wish to delete this item?"))
    mutateDeleteCustomerContact(customerContactDataItem.id);
  };
  return (
    <>
      {status === "loading" && <LinearProgress />}
      {status === "error" && error && (
        <Alert severity="error">{error.message}</Alert>
      )}
       { <ToastContainer />}
{/*       {deleteStatus === "error" && deleteError && (
        <Alert severity="error">{deleteError.message}</Alert>
      )} */}
      {status === "success" && (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Contact No</TableCell>
                <TableCell>Email</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data &&
                data.data.map((contactDataItem: any, key: number) => {
                  return (
                    <TableRow key={key} onDoubleClick={() => props.openDrawer(contactDataItem)} style={{ whiteSpace: "nowrap"}}>
                      <TableCell>{contactDataItem.contact_person}</TableCell>
                      <TableCell>{contactDataItem.contact_designation}</TableCell>
                      <TableCell>{contactDataItem.contact_number}</TableCell>
                      <TableCell>{contactDataItem.email}</TableCell>
                      <TableCell align="right">
                        <div className="btn-row flex-end">
                          <div className="btn-grid">
                            <Tooltip title="View/Edit">
                              <IconButton
                                aria-label="edit"
                                onClick={() => props.openDrawer(contactDataItem)}
                              >
                                <EditIcon color="primary" fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </div>
                          <div className="btn-grid">
                            <Tooltip title="Delete">
                              <IconButton
                                aria-label="delete"
                                onClick={() => onDeleteClick(contactDataItem)}
                              >
                                <DeleteIcon color="error" fontSize="small" />
                              </IconButton>
                            </Tooltip>
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
export default CustomerContactTable;
