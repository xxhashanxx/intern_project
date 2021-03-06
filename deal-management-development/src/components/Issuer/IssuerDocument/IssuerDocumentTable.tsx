import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  IconButton,
  Button,
  LinearProgress,
  Tooltip,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useParams, useHistory } from "react-router-dom";
import { useQuery, useMutation, queryCache } from "react-query";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Alert from "@material-ui/lab/Alert";
import useDocumentService from "../../../api/documnetList/useDocumentService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface IssuerDocumentTableProps {}
const IssuerDocumentTable = (props: IssuerDocumentTableProps) => {
  let { editId } = useParams();

  let extraPath: any = "issuer/" + editId;
  const { status, data, error } = useQuery(
    "issuerDocList",
    extraPath,
    useDocumentService().useGetDocumentListById
  );
  const deleteDocumentService = useDocumentService().useDeleteDocumentService();
  const downloadDocumentService = useDocumentService().useDownloadDocumentService();
  const [
    mutateDelete,
    { status: deleteStatus, error: deleteError },
  ] = useMutation(
    async (url: any) => {
      //const extraPathDelete = extraPath + "/" + deleteId;
      return await deleteDocumentService.deleteDocument(url);
    },
    {
      onSuccess: () => {
        return queryCache.refetchQueries("issuerDocList").then(() => {});
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );
  const onDeleteClick = (docListItem: any) => {
    const url =
      "/" +
      docListItem.model_name +
      "/" +
      docListItem.key_ref +
      "/" +
      encodeURIComponent(docListItem.file_id);
    //   console.log(url);
    if (window.confirm("Are you sure you wish to delete this item?"))
      mutateDelete(url);
  };

  const [
    downAttachment,
    { status: downloadStatus, error: downloadError },
  ] = useMutation(
    async (inputVal: any) => {
      //todo logged user email has to be enter
      return await downloadDocumentService.downloadDocument(
        inputVal.file_name,
        inputVal.original_file_name
      );
    },
    {
      onSuccess: () => {},
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );

  const downloadAttachment = (inputVal: any) => {
    downAttachment(inputVal);
  };
  return (
    <>
      {status === "loading" && <LinearProgress />}
      {status === "error" && error && (
        <Alert severity="error">{error.message}</Alert>
      )}
      {/* {deleteStatus === "error" && deleteError && (
        <Alert severity="error">{deleteError.message}</Alert>
      )}
      {downloadStatus === "error" && downloadError && (
        <Alert severity="error">{downloadError.message}</Alert>
      )} */}
      {<ToastContainer />}
      {status === "success" && (
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>File Name</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data &&
                data.data.map((docListItem: any, key: number) => {
                  return (
                    <TableRow key={key}>
                      <TableCell>{docListItem.original_file_name}</TableCell>
                      <TableCell align="right">
                        <div className="btn-grid">
                          <Tooltip title="Download">
                            <IconButton
                              aria-label="edit"
                              onClick={() => downloadAttachment(docListItem)}
                            >
                              <VisibilityIcon
                                color="primary"
                                fontSize="small"
                              />
                            </IconButton>
                          </Tooltip>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <div className="btn-row flex-end">
                          <div className="btn-grid">
                            <Tooltip title="Delete">
                              <IconButton
                                aria-label="delete"
                                onClick={() => onDeleteClick(docListItem)}
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
export default IssuerDocumentTable;
