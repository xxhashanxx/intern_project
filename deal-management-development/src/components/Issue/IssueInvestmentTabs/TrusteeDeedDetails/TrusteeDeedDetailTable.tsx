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
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Alert from "@material-ui/lab/Alert";
import { useMutation, queryCache, useQuery } from "react-query";
import useTrustdeedsService from "../../../../api/trustdeeds/useTrustdeedsService";
import { useStoreState } from "../../../../store";
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

export interface TrusteedeedlTableProps {
  openDrawer: any;
}

const TrusteedeedlTable = (props: TrusteedeedlTableProps) => {
  const issueId = useStoreState((state) => state.issue.issueId);

  const { status, data, error } = useQuery(
    "trustdeedsList",
    issueId,
    useTrustdeedsService().useGetTrustdeedsListService
  );

  const deleteTrustdeed = useTrustdeedsService().useDeleteTrustdeedsService();

  const [mutateDeleteTrustdeed,{status:deleteStatus,error:deleteError}] = useMutation(
    async (deleteId: any) => {
      return await deleteTrustdeed.deleteTrustdeeds(issueId, deleteId);
    },
    {
      onSuccess: () => {
        return queryCache.refetchQueries("trustdeedsList").then(() => {});
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );
  const onDeleteClick = (trustdeedDataItem: any) => {
    if (window.confirm("Are you sure you wish to delete this item?"))
    mutateDeleteTrustdeed(trustdeedDataItem.id);
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
                <TableCell>Trust Deed Number</TableCell>
                <TableCell>Trust Deed Date</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((trustdeedDataItem: any, key: number) => {
                return (
                  <TableRow key={key} onDoubleClick={() => props.openDrawer(trustdeedDataItem) } style={{ whiteSpace: "nowrap"}}>
                    <TableCell>{trustdeedDataItem.deed_no} </TableCell>
                    <TableCell>{moment(trustdeedDataItem.deed_date).format('DD-MM-yyyy')} </TableCell>
                    <TableCell align="right">
                      <div className="btn-row flex-end">
                        <div className="btn-grid">
                          <Tooltip title="View/Edit">
                            <IconButton
                              aria-label="edit"
                              onClick={() => props.openDrawer(trustdeedDataItem)}
                            >
                              <EditIcon color="primary" fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </div>
                        <div className="btn-grid">
                          <Tooltip title="Delete">
                            <IconButton
                              aria-label="delete"
                              onClick={() => onDeleteClick(trustdeedDataItem)}
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

export default TrusteedeedlTable;
