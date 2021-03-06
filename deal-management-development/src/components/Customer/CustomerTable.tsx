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
import useCustomerService from "../../api/customer/useCustomerService";
import { useFilterRows } from "../TableViewComponents/useFilterData";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { theme } from "../../theme";
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { getComparator, stableSort, Order } from "../TableViewComponents/useSortData";

//-------------------------------------

const headCells: any[] = [
  { id: 'customer_id', label: 'ID' },
  { id: 'customer_name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'customer_type', label: 'Investor Type' },
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
export interface CustomerTableProps {
  searchVal: string;
}
export interface TableDataResponse {
  customer_id: string;
  customer_name: string;
  customer_type: string;
  address1: string;
  address2: string;
  nic_passport_br: string;
  contact_number1: string;
  contact_number2: string;
  contact_number3: string;
  email: string;
  status: string;
  created_by: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  customer_rm: any[];
}
function filterData(tableData: TableDataResponse[], searchText: string = "") {
  if (searchText === "") return tableData;
  return tableData.filter(
    (dataObj) =>
      dataObj.customer_name &&
      dataObj.customer_name.toLowerCase().includes(searchText)||
      dataObj.customer_id &&
      dataObj.customer_id.toLowerCase().includes(searchText)||
      dataObj.status &&
      dataObj.status.toLowerCase().includes(searchText)||
      dataObj.customer_type &&
      dataObj.customer_type.toLowerCase().includes(searchText)||
      dataObj.email &&
      dataObj.email.toLowerCase().includes(searchText)
  );
}

const CustomerTable = ({ searchVal }: CustomerTableProps) => {
    //-----------------------------------------
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<any>('customer_id');
  
    const handleRequestSort = (event: React.MouseEvent<unknown>, property: any) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
    //-----------------------------------------------
  const { status, data, error } = useQuery(
    "customerList",
    useCustomerService().useGetCustomerListService
  );

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
        <TableContainer>
          <Table size="small">
          <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
            <TableBody>
              
            {stableSort(pageData, getComparator(order, orderBy))
                .map((customerDataItem: any, key: number) => {
                  return <Row key={key} row={customerDataItem} />;
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
export default CustomerTable;

function Row(props: { row: any }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const deleteCustomerService = useCustomerService().useDeleteCustomerService();

  const onDeleteClick = (customerDataItem: any) => {
    mutateDeleteCustomer(customerDataItem.customer_id);
  };
  const [mutateDeleteCustomer] = useMutation(
    async (deleteId: any) => {
      if (window.confirm("Are you sure you wish to delete this item?"))
        return await deleteCustomerService.deleteCustomer(deleteId);
    },
    {
      onSuccess: () => {
        return queryCache.refetchQueries("customerList").then(() => {});
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );
  const approveCustomerService = useCustomerService().useApproveCustomerService();
  const onApproveClick = (customerDataItem: any) => {
    mutateApproveCustomer(customerDataItem.customer_id);
  };
  const [mutateApproveCustomer] = useMutation(
    async (approveId: any) => {
      if (window.confirm("Are you sure you wish to approve this item?"))
        return await approveCustomerService.approveCustomer(approveId);
    },
    {
      onSuccess: () => {
        return queryCache.refetchQueries("customerList").then(() => {});
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
        onDoubleClick={() => history.push(`/customer/edit/${row.customer_id}`)} style={{ whiteSpace: "nowrap"}}>
        <TableCell style={{ paddingLeft: 10, paddingRight: 5 }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.customer_id}</TableCell>
        <TableCell>{row.customer_name}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.customer_type}</TableCell>
        <TableCell>
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
        </TableCell>

        <TableCell align="right">
          <div className="btn-row flex-end">
            <div className="btn-grid">
              {row.status === "Preliminary" && (
                <Tooltip title="Approve">
                  <IconButton
                  
                    color="primary"
                    onClick={() => onApproveClick(row)}
                  >
                    <ThumbUpIcon fontSize="small" />
                  </IconButton>
                 </Tooltip>
              )}
            </div>

            <div className="btn-grid">
              <Tooltip title="View/Edit">
                <IconButton
                  aria-label="edit"
                  onClick={() =>
                    history.push(`/customer/edit/${row.customer_id}`)
                  }
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
                          <b>BR/NIC/Passport</b>
                        </div>
                        <div className="value  w-50">
                          {row.nic_passport_br}{" "}
                        </div>
                      </div>
                    </ListItem>
                    <Divider />
                    <ListItem disableGutters={true} dense={true}>
                      <div className="list-item-cont d-flex">
                        <div className="label  w-50">
                          <b>Contact Numbers</b>
                        </div>
                        <div className="value  w-50">
                          {row.contact_number1} {row.contact_number2 === null ? "" : " , "}
                          {row.contact_number2} {row.contact_number3 === null ? "" : " , "}
                          {row.contact_number3} 
                        </div>
                      </div>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TableContainer>
                    <Table size="small">
                      <TableHead style={{backgroundColor: theme.palette.grey[300]  }}>
                        <TableRow>
                          <TableCell>Relationship Manager ID</TableCell>
                          <TableCell>Name</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row.customer_rm &&
                          row.customer_rm.map((rmItem: any, rmkey: number) => {
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
              <Grid container spacing={3} style={{ paddingBottom:30, paddingTop:30, paddingLeft:100}}>
                <Grid>
                    <TableContainer>
                      <Table size="small" >
                        <TableHead style={{backgroundColor: theme.palette.grey[300]  }}>
                          <TableRow>
                            <TableCell>Contact Person</TableCell>
                            <TableCell>Designation</TableCell>
                            <TableCell>Contact Number</TableCell>
                            <TableCell>Email</TableCell>

                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {row.customer_contact_val &&
                            row.customer_contact_val.map((contactItem: any, contactkey: number) => {
                              return (
                                <TableRow key={contactkey}>
                                  <TableCell>{contactItem.contact_person}</TableCell>
                                  <TableCell>{contactItem.contact_designation}</TableCell>
                                  <TableCell>{contactItem.contact_number}</TableCell>
                                  <TableCell>{contactItem.email}</TableCell>
                                </TableRow>
                              );
                            })}
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
