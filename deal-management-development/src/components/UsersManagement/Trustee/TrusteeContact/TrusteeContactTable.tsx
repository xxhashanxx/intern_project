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
import useTrusteeContactService from "../../../../api/trusteeContact/useTrusteeContactService";
import { useStoreState } from "../../../../store";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

export interface TrusteeContactTableProps {
  openDrawer: any;
}
const TrusteeContactTable = (props: TrusteeContactTableProps) => {
  const trusteeId = useStoreState((state) => state.trustee.trusteeId);

  const { status, data, error } = useQuery(
    "trusteeContactList",
    trusteeId,
    useTrusteeContactService().useGetTrusteeContactListService
  );
  const deleteTrusteeContactService = useTrusteeContactService().useDeleteTrusteeContactService();
  const [mutateDeleteTrusteeContact,{status:deleteStatus,error:deleteError}] = useMutation(
    async (deleteId: any) => {
      return await deleteTrusteeContactService.deleteTrusteeContact(
        trusteeId,
        deleteId
      );
    },
    {
      onSuccess: () => {
        return queryCache.refetchQueries("trusteeContactList").then(() => {});
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );
  const onDeleteClick = (trusteeContactDataItem: any) => {
    if (window.confirm("Are you sure you wish to delete this item?"))
    mutateDeleteTrusteeContact(trusteeContactDataItem.id);
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
export default TrusteeContactTable;
