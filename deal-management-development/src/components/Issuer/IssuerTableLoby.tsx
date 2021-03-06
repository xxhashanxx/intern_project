import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Collapse,
  Chip,
  List,
  ListItem,
  LinearProgress,
  Grid,
  Button,
  Tooltip,
  withStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useHistory } from "react-router-dom";
import { useQuery, useMutation, queryCache } from "react-query";
import Alert from "@material-ui/lab/Alert";
import Divider from "@material-ui/core/Divider";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import useIssuerService from "../../api/issuer/useIssuerService";
import { useFilterRows } from "../TableViewComponents/useFilterData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { theme } from "../../theme";
import Title from "../Demo/Title";

export interface IssuerTableProps {
  searchVal: string;
}
export interface TableDataResponse {
  issuer_id: string;
  issuer_name: string;
  address1: string;
  address2: string;
  business_reg_no: string;
  contact_number1: string;
  contact_number2: string;
  contact_number3: string;
  email: string;
  issuer_rating: string;
  status: string;
  created_by: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}
function filterData(tableData: TableDataResponse[], searchText: string = "") {
  if (searchText === "") return tableData;
  return tableData.filter(
    (dataObj) =>
      dataObj.issuer_name &&
      dataObj.issuer_name.toLowerCase().startsWith(searchText)
  );
}
const IssuerTableLoby = ({ searchVal }: IssuerTableProps) => {
  const { status, data, error } = useQuery(
    "issuerPrelList",
    useIssuerService().useGetIssuerListLobyService
  );
  // console.log('#########################issuerPrelList');
  // console.log(data);
  const { pageData, tableFooterProps, noMatchingItems } = useFilterRows(
    searchVal,
    data,
    filterData
  );

  return (
    <>
      {status === "loading" && <LinearProgress />}
      {status === "error" && error && (
        <Alert severity="error">{error.message}</Alert>
      )}
      {<ToastContainer />}
      {status === "success" && (
        <TableContainer>
          <Title>
            <div>Preliminary Issuers</div>
          </Title>
          <Table size="small" style={{ backgroundColor: "DeepSkyBlue" }}>
            <TableHead>
              <TableRow style={{ backgroundColor: theme.palette.primary.main }}>
                {/* <TableCell
                  style={{ paddingLeft: 10, paddingRight: 5 }}
                ></TableCell> */}
                <TableCell style={{ color: "white" }}>ID</TableCell>
                <TableCell style={{ color: "white" }}>Name</TableCell>
                <TableCell style={{ color: "white" }}>Rating</TableCell>
                {/* <TableCell>Email</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Status</TableCell> */}
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pageData &&
                pageData.map((issuerDataItem: any, key: number) => {
                  return <Row key={key} row={issuerDataItem} />;
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
export default IssuerTableLoby;

function Row(props: { row: any }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const deleteIssuerService = useIssuerService().useDeleteIssuerService();
  const onDeleteClick = (issuerDataItem: any) => {
    if (window.confirm("Are you sure you wish to delete this item?"))
      mutateDeleteIssuer(issuerDataItem.issuer_id);
  };

  const [mutateDeleteIssuer] = useMutation(
    async (deleteId: any) => {
      return await deleteIssuerService.deleteIssuer(deleteId);
    },
    {
      onSuccess: () => {
        return queryCache.refetchQueries("issuerPrelList").then(() => {});
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );

  const approveIssuerService = useIssuerService().useApproveIssuerService();
  const onApproveClick = (issuerDataItem: any) => {
    mutateApproveIssuer(issuerDataItem.issuer_id);
  };
  const [mutateApproveIssuer] = useMutation(
    async (approveId: any) => {
      if (window.confirm("Are you sure you wish to approve this item?"))
        return await approveIssuerService.approveIssuer(approveId);
    },
    {
      onSuccess: () => {
        return queryCache.refetchQueries("issuerPrelList").then(() => {});
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );
  const StyledTableRow = withStyles({
    root: {
      cursor: "pointer",
      "&:hover": {
        background: "DodgerBlue",
      },
    },
  })(TableRow);
  return (
    <>
      <StyledTableRow
        onClick={() => history.push(`/issuer/edit/${row.issuer_id}`)}
      >
        {/* <TableCell style={{ paddingLeft: 10, paddingRight: 5 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell> */}
        <TableCell style={{ color: "white" }}>{row.issuer_id}</TableCell>
        <TableCell style={{ color: "white" }}>{row.issuer_name}</TableCell>
        <TableCell style={{ color: "white" }}>{row.issuer_rating}</TableCell>
        {/* <TableCell>{row.email}</TableCell>
        <TableCell>{row.issuer_rating}</TableCell> */}
        {/* <TableCell>
          <div className="btn-row">
            <div className="btn-grid">
              <Chip
                variant="default"
                size="small"
                color={row.status === "Preliminary" ? "default" : "primary"}
                label={row.status}
              />
            </div>
          </div>
        </TableCell> */}

        <TableCell align="right">
          <div className="btn-row flex-end">
            {/* <div className="btn-grid">
              {row.status === "Preliminary" && (
                <Tooltip title="Approve">
                  <IconButton
                    aria-label="approve"
                    //style={{ border: "1px solid #0277bd" }}
                    onClick={() => onApproveClick(row)}
                  >
                    <ThumbUpIcon color="primary" fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </div> */}
            {/*  <div className="btn-grid">
              <Tooltip title="View/Edit">
                <IconButton
                  aria-label="edit"
                  onClick={() => history.push(`/issuer/edit/${row.issuer_id}`)}
                >
                  <EditIcon color="primary" fontSize="small" />
                </IconButton>
              </Tooltip>
            </div> */}
            {/* <div className="btn-grid">
              <Tooltip title="Delete">
                <IconButton
                  aria-label="delete"
                  onClick={() => onDeleteClick(row)}
                >
                  <DeleteIcon color="error" fontSize="small" />
              </IconButton>
              </Tooltip>
            </div> */}
          </div>
        </TableCell>
      </StyledTableRow>
      <TableRow>
        <TableCell colSpan={6} style={{ padding: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div className="collapse-box">
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <List dense={true} disablePadding={true}>
                    <ListItem disableGutters={true} dense={true}>
                      <div className="list-item-cont d-flex">
                        <div className="label w-50">
                          <b>Address 1</b>
                        </div>
                        <div className="value  w-50">{row.address1} </div>
                      </div>
                    </ListItem>
                    <Divider />
                    <ListItem disableGutters={true} dense={true}>
                      <div className="list-item-cont d-flex">
                        <div className="label  w-50">
                          <b>Address 2</b>
                        </div>
                        <div className="value  w-50">{row.address2} </div>
                      </div>
                    </ListItem>
                    <Divider />
                    <ListItem disableGutters={true} dense={true}>
                      <div className="list-item-cont d-flex ">
                        <div className="label  w-50">
                          <b>Business Registration No</b>
                        </div>
                        <div className="value  w-50">
                          {row.business_reg_no}{" "}
                        </div>
                      </div>
                    </ListItem>
                    <Divider />
                    <ListItem disableGutters={true} dense={true}>
                      <div className="list-item-cont d-flex">
                        <div className="label  w-50">
                          <b>Contact numbers</b>
                        </div>
                        <div className="value  w-50">
                          {row.contact_number1 +
                            ", " +
                            row.contact_number2 +
                            ", " +
                            row.contact_number3}
                        </div>
                      </div>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TableContainer>
                    <Table size="small">
                      <TableHead
                        style={{ backgroundColor: theme.palette.grey[300] }}
                      >
                        <TableRow>
                          <TableCell>Relationship Manager ID</TableCell>
                          <TableCell>Name</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row.issuer_rm &&
                          row.issuer_rm.map((rmItem: any, rmkey: number) => {
                            return (
                              <TableRow key={rmkey}>
                                <TableCell>{rmItem.rm_id}</TableCell>
                                <TableCell>{rmItem.manager_name}</TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
              <Grid
                container
                spacing={3}
                style={{ paddingBottom: 30, paddingTop: 30, paddingLeft: 100 }}
              >
                <Grid>
                  <TableContainer>
                    <Table size="small">
                      <TableHead
                        style={{ backgroundColor: theme.palette.grey[300] }}
                      >
                        <TableRow>
                          <TableCell>Contact Person</TableCell>
                          <TableCell>Designation</TableCell>
                          <TableCell>Contact Number</TableCell>
                          <TableCell>Email</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row.issuer_contact_val &&
                          row.issuer_contact_val.map(
                            (contactItem: any, contactkey: number) => {
                              return (
                                <TableRow key={contactkey}>
                                  <TableCell>
                                    {contactItem.contact_person}
                                  </TableCell>
                                  <TableCell>
                                    {contactItem.contact_designation}
                                  </TableCell>
                                  <TableCell>
                                    {contactItem.contact_number}
                                  </TableCell>
                                  <TableCell>{contactItem.email}</TableCell>
                                </TableRow>
                              );
                            }
                          )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </div>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
