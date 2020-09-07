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
import useIssuerContactService from "../../../api/issuerContact/useIssuerContactService";
import { useStoreState } from "../../../store";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

export interface IssuerContactTableProps {
  openDrawer: any;
}
const IssuerContactTable = (props: IssuerContactTableProps) => {
  const issuerId = useStoreState((state) => state.issuer.issuerId);

  const { status, data, error } = useQuery(
    "issuerContactList",
    issuerId,
    useIssuerContactService().useGetIssuerContactListService
  );
  const deleteIssuerContactService = useIssuerContactService().useDeleteIssuerContactService();
  const [mutateDeleteIssuerContact,{status:deleteStatus,error:deleteError}] = useMutation(
    async (deleteId: any) => {
      return await deleteIssuerContactService.deleteIssuerContact(
        issuerId,
        deleteId
      );
    },
    {
      onSuccess: () => {
        return queryCache.refetchQueries("issuerContactList").then(() => {});
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );
  const onDeleteClick = (issuerContactDataItem: any) => {
    if (window.confirm("Are you sure you wish to delete this item?"))
      mutateDeleteIssuerContact(issuerContactDataItem.id);
  };
  return (
    <>
      {status === "loading" && <LinearProgress />}
      {status === "error" && error && (
        <Alert severity="error">{error.message}</Alert>
      )}
      { <ToastContainer />}
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
                    <TableRow key={key} onDoubleClick={() => props.openDrawer(contactDataItem) } style={{ whiteSpace: "nowrap"}}>
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
export default IssuerContactTable;
