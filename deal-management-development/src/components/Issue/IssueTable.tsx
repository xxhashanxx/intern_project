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
  LinearProgress,
  Grid,
  Button,
  Tooltip,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useHistory } from "react-router-dom";

import { useQuery, useMutation, queryCache } from "react-query";
import Alert from "@material-ui/lab/Alert";
import useIssueService from "../../api/issue/useIssueService";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import { useFilterRows } from "../TableViewComponents/useFilterData";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import moment from "moment";
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { getComparator, stableSort, Order } from "../TableViewComponents/useSortData";

//-------------------------------------

const headCells: any[] = [
  
  { id: 'issue_id', label: 'ID' },
  { id: 'issue_name', label: 'Name' },
  { id: 'issuer_id', label: 'Issuer ID' },
  { id: 'lawyer_id', label: 'Lawyer' },
  { id: 'bank', label: 'Bank' },
  { id: 'branch', label: 'Branch' },
  { id: 'account_name', label: 'Account Name' },
  { id: 'account_number', label: 'Account Number' },
  { id: 'amount', label: 'Amount' }, 
  { id: 'attorney', label: 'Attorney' },
  { id: 'auditor', label: 'Auditor' }, 
  { id: 'status', label: 'Status' },
  
];
interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: any) => void;
  order: Order;
  orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: any) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        {headCells.map((headCell) => (
          
          <TableCell
            key={headCell.id}
            align={'left'}
            size="small"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
}
//---------------------------------------------
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
  bank: string;
  branch: string;
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
      dataObj.issue_name.toLowerCase().includes(searchText)||
      dataObj.issue_id &&
      dataObj.issue_id.toLowerCase().includes(searchText)||
      dataObj.issuer_id &&
      dataObj.issuer_id.toLowerCase().includes(searchText)||
      dataObj.account_name &&
      dataObj.account_name.toLowerCase().includes(searchText)||
      dataObj.lawyer_id &&
      dataObj.lawyer_id.toLowerCase().includes(searchText)||
      dataObj.account_number &&
      dataObj.account_number.toLowerCase().includes(searchText)||
      dataObj.amount &&
      dataObj.amount.toLowerCase().includes(searchText)||
      dataObj.attorney &&
      dataObj.attorney.toLowerCase().includes(searchText)||
      dataObj.auditor &&
      dataObj.auditor.toLowerCase().includes(searchText)||
      dataObj.bank &&
      dataObj.bank.toLowerCase().includes(searchText)||
      dataObj.branch &&
      dataObj.branch.toLowerCase().includes(searchText)

  );
}
const notify = () => toast("Wow so easy !");
const IssueTable = ({ searchVal }: IssueTableProps) => {
      //-----------------------------------------
      const [order, setOrder] = React.useState<Order>('asc');
      const [orderBy, setOrderBy] = React.useState<any>('issue_id');
    
      const handleRequestSort = (event: React.MouseEvent<unknown>, property: any) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
      };
      //-----------------------------------------------
  const { status, data, error } = useQuery("issueList", useIssueService().useGetIssueListService);
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
      { <ToastContainer />}
      {status === "success" && (
        <TableContainer >
          <Table size="small">
          <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
            <TableBody>
            {stableSort(pageData, getComparator(order, orderBy))
                .map((issueDataItem: any, key: number) => {
                  return <Row key={key} row={issueDataItem} />;
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
export default IssueTable;

function Row(props: { row: any }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const deleteIssueService = useIssueService().useDeleteIssueService();
  const onDeleteClick = (issueDataItem: any) => {
    if (window.confirm("Are you sure you wish to Delete this item?"))
      mutateDeleteIssue(issueDataItem.issue_id);
  };
  const [mutateDeleteIssue,{status:deleteStatus,error:deleteError}] = useMutation(
    async (deleteId: any) => {
      return await deleteIssueService.deleteIssue(deleteId);
    },
    {
      onSuccess: () => {
        return queryCache.refetchQueries("issueList").then(() => {});
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );

  const approveIssueService = useIssueService().useApproveIssueService();
  const onApproveClick = (issueDataItem: any) => {
    mutateApproveIssue(issueDataItem.issue_id);
  };
  const [mutateApproveIssue] = useMutation(
    async (approveId: any) => {
      if (window.confirm("Are you sure you wish to Approve this item?"))
        return await approveIssueService.approveIssue(approveId);
    },
    {
      onSuccess: () => {
        return queryCache.refetchQueries("issueList").then(() => {});
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );

  const cancelIssueService = useIssueService().useCancelIssueService();
  const onCancelClick = (issueDataItem: any) => {
    mutateCancelIssue(issueDataItem.issue_id);
  };
  const [mutateCancelIssue] = useMutation(
    async (id: any) => {
      if (window.confirm("Are you sure you wish to Close this item?"))
        return await cancelIssueService.cancelIssue(id);
    },
    {
      onSuccess: () => {
        return queryCache.refetchQueries("issueList").then(() => {});
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );
  
  const reopenIssueService = useIssueService().useReopenIssueService();
  const onReopenClick = (issueDataItem: any) => {
    mutateReopenIssue(issueDataItem.issue_id);
  };
  const [mutateReopenIssue] = useMutation(
    async (id: any) => {
      if (window.confirm("Are you sure you wish to Reopen this item?"))
        return await reopenIssueService.reopenIssue(id);
    },
    {
      onSuccess: () => {
        return queryCache.refetchQueries("issueList").then(() => {});
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );

  return (
    <>
      <TableRow 
      hover
      onDoubleClick={() => history.push(`/issue/edit/${row.issue_id}`)} style={{ whiteSpace: "nowrap"}}>
        <TableCell style={{ paddingLeft: 10, paddingRight: 5 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        
        <TableCell>{row.issue_id}</TableCell>
        <TableCell style={{
                          maxWidth: "200px",
                          whiteSpace:"nowrap",
                          overflow:"hidden",
                          textOverflow:"ellipsis"}}>{row.issue_name}</TableCell>
        <TableCell >{row.issuer_id}</TableCell>
        <TableCell >{row.lawyer_id} - {row.lawyer_name}</TableCell>
        <TableCell >{row.bank}</TableCell>
        <TableCell >{row.branch}</TableCell>
        <TableCell >{row.account_name}</TableCell>
        <TableCell >{row.account_number}</TableCell>
        <TableCell align="right">{Number(row.amount).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:2})}</TableCell>
        <TableCell >{row.attorney}</TableCell>
        <TableCell >{row.auditor}</TableCell>
        <TableCell>
          <div className="btn-row">
            <div className="btn-grid">
            <Chip
                variant="default"
                size="small"
                color={row.status === "Preliminary" ? "default" : row.status === "Cancelled" ? "secondary" : "primary"}
                label={row.status === "Cancelled" ? "Closed  " : row.status}
              />
            </div>
          </div>
        </TableCell>
        

        <TableCell align="right">
          <div className="btn-row flex-end">
            <div className="btn-grid">
              {row.status === "Preliminary" ? (
                <Tooltip title="Approve">
                  <IconButton
                    //style={{ border: "1px solid #0277bd" }}
                    color="primary"
                    onClick={() => onApproveClick(row)}
                  >
                    <ThumbUpIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              ):row.status === "Approved" ?  (
                <Tooltip title="Close">
                  <IconButton
                  // style={{ border: "1px solid #546e7a" }}
                    color="default"
                    onClick={() => onCancelClick(row)}
                  >
                    <ThumbDownIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              ): (
                <Tooltip title="Reopen">
                  <IconButton
                  // style={{ border: "1px solid #546e7a" }}
                    color="primary"
                    onClick={() => onReopenClick(row)}
                  >
                    <LockOpenOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </div>
            <div className="btn-grid">
              <Tooltip title="View/Edit">
                <IconButton
                  aria-label="edit"
                  onClick={() => history.push(`/issue/edit/${row.issue_id}`)}
                >
                  <EditIcon color="primary" fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
            <div className="btn-grid">
              <Tooltip title="Delete">
                <IconButton
                  aria-label="delete"
                  onClick={() => onDeleteClick(row)}
                >
                  <DeleteIcon color="error" fontSize="small" />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </TableCell>
      </TableRow>
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
                                  {moment(trustDeedData.deed_date).format('DD-MM-yyyy')}
                                    
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
