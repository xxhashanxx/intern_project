import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Collapse,
  Chip,
  LinearProgress,
  Grid,
  withStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { useQuery, useMutation, queryCache } from "react-query";
import Alert from "@material-ui/lab/Alert";
import useIssueService from "../../api/issue/useIssueService";
import { useFilterRows } from "../TableViewComponents/useFilterData";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import Title from "../Demo/Title";
import { theme } from "../../theme";

export interface IssueTableProps {
  searchVal: string;
}

export interface TableDataResponse {
  issue_id: string;
  issue_name: string;
  issuer_id: string;
  securitization_number: string;
  trustee_id: string;
  amount: string;
  tenor: string;
  collateral_id: string;
  cash_cover: string;
  lawyer_id: string;
  attorney: string;
  auditor: string;
  account_number: string;
  account_name: string;
  id: number;
  status: string;
  created_by: string;
  createdAt: string;
  updatedAt: string;
  trust_deed: any;
}
function filterData(tableData: TableDataResponse[], searchText: string = "") {
  if (searchText === "") return tableData;
  return tableData.filter(
    (dataObj) =>
      dataObj.issue_name &&
      dataObj.issue_name.toLowerCase().startsWith(searchText)
  );
}

const IssueTableLoby = ({ searchVal }: IssueTableProps) => {
  const { status, data, error } = useQuery("issueList1", useIssueService().useGetOngoingIssueListService);
  const { pageData } = useFilterRows(
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
      { <ToastContainer />}
      {status === "success" && (
       
        <TableContainer > 
           <Title>
          <div>Ongoing Issues</div>
        </Title>
          <Table size="small" style={{backgroundColor:'DeepSkyBlue',}}>
            <TableHead >
              <TableRow style={{backgroundColor: theme.palette.primary.main,}}>
                {/* <TableCell
                  style={{ paddingLeft: 10, paddingRight: 5 }}
                ></TableCell> */}
                <TableCell style={{color: 'white'}}>ID</TableCell>
                <TableCell style={{color: 'white'}}>Name</TableCell>
                <TableCell style={{color: 'white'}} align="right">Total Amount</TableCell>
                <TableCell style={{color: 'white'}} align="right">Amount Raised </TableCell>
                <TableCell style={{color: 'white'}} align="right">Remaining Amount</TableCell>
                {/* <TableCell style={{color: 'white'}}>Attorney</TableCell>
                <TableCell style={{color: 'white'}}>Auditor</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {pageData &&
                pageData.map((issueDataItem: any, key: number) => {
                  return <Row key={key} row={issueDataItem} />;
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
export default IssueTableLoby;

function Row(props: { row: any }) {
  const { row } = props;
  const [open] = React.useState(false);
  const history = useHistory();
  const deleteIssueService = useIssueService().useDeleteIssueService();
  const [mutateDeleteIssue] = useMutation(
    async (deleteId: any) => {
      return await deleteIssueService.deleteIssue(deleteId);
    },
    {
      onSuccess: () => {
        return queryCache.refetchQueries("issueList1").then(() => {});
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );

  const approveIssueService = useIssueService().useApproveIssueService();
  const [mutateApproveIssue] = useMutation(
    async (approveId: any) => {
      if (window.confirm("Are you sure you wish to approve this item?"))
        return await approveIssueService.approveIssue(approveId);
    },
    {
      onSuccess: () => {
        return queryCache.refetchQueries("issueList1").then(() => {});
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
        background: "DodgerBlue"
      }
    }
  })(TableRow);
  return (
    <>
    
      <StyledTableRow onClick={() => history.push(`/issue/edit/${row.issue_id}`)}
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
        <TableCell style={{color: 'white'}}>{row.issue_id}</TableCell>
        <TableCell style={{color: 'white'}}>{row.issue_name}</TableCell>
        <TableCell style={{color: 'white'}} align="right">{Number(row.amount).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:2})}</TableCell>
        <TableCell style={{color: 'white'}} align="right">{Number(row.total).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:2})}</TableCell>
        <TableCell style={{color: 'white'}} align="right">{Number(row.diff).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:2})}</TableCell>
        {/* <TableCell style={{color: 'white'}}>{row.attorney}</TableCell>
        <TableCell style={{color: 'white'}}>{row.auditor}</TableCell> */}

        {/* <TableCell style={{color: 'white'}}>
          <div className="btn-row">
            <div className="btn-grid">
              <Chip
                variant="default"
                size="small"
                color={row.status === "Preliminary" ? "default" : row.status === "Cancelled" ? "secondary" : "primary"}
                label={row.status}
              />
            </div>
          </div>
        </TableCell> */}

        {/* <TableCell align="right">
          <div className="btn-row flex-end"> */}
            {/* <div className="btn-grid">
              {row.status === "Preliminary" && (
                <Tooltip title="Approve">
                  <IconButton
                    //style={{ border: "1px solid #0277bd" }}
                    color="primary"
                    onClick={() => onApproveClick(row)}
                  >
                    <ThumbUpIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </div> */}
            {/* <div className="btn-grid">
              <Tooltip title="View/Edit">
                <IconButton
                  aria-label="edit"
                  onClick={() => history.push(`/issue/edit/${row.issue_id}`)}
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
          {/* </div>
        </TableCell> */}
      </StyledTableRow>
      <TableRow>
        <TableCell colSpan={11} style={{ padding: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <div className="collapse-box">
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <TableContainer>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Trust Deed Number</TableCell>
                          <TableCell>Trustee Deed Date</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody> 
                        {row.trust_deed &&
                          row.trust_deed.map(
                            (trustDeedData: any, deedKey: number) => {
                              return (
                                <TableRow key={deedKey}>
                                  <TableCell>{trustDeedData.deed_no}</TableCell>
                                  <TableCell>
                                    {trustDeedData.deed_date}
                                  </TableCell>
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
