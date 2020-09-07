import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  LinearProgress,
  Tooltip,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import useDefaultValueService from "../../api/DefaultValue/useDefaultValueService";
import { useQuery, useMutation, queryCache } from "react-query";
import Alert from "@material-ui/lab/Alert";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { getComparator, stableSort, Order } from "../TableViewComponents/useSortData";

//-------------------------------------

const headCells: any[] = [
  { id: 'key', label: 'Key' },
  { id: 'value', label: 'Value' },
  
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
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
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
export interface DefaultValueTableProps {
  openDrawer: any;
}
const DefaultValueTable = (props: DefaultValueTableProps) => {
  //-----------------------------------------
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<any>('key');

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  //-----------------------------------------------
  const { status, data, error } = useQuery(
    "DefaultValueList",
    useDefaultValueService().useGetDefaultListService
    
  );
  const deleteDefaultValueService = useDefaultValueService().useDeleteDefaultValueService();
  const onDeleteClick = (defaultDataItem: any) => {
    if (window.confirm("Are you sure you wish to delete this item?"))
      mutateDeleteDefaultValue(defaultDataItem.key);
  };
  const [mutateDeleteDefaultValue] = useMutation(
    async (deleteKey: any) => {
      return await deleteDefaultValueService.deleteDefaultValue(deleteKey);
    },
    {
      onSuccess: () => {
        return queryCache.refetchQueries("DefaultValueList").then(() => {});
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
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
              {stableSort(data.data, getComparator(order, orderBy))
                .map((DefaultValueDataItem: any, key: number) => {
                  return (
                    <TableRow
                      hover
                      key={key} onDoubleClick={() => props.openDrawer(DefaultValueDataItem) } style={{ whiteSpace: "nowrap"}}
                    >
                      <TableCell>
                      {DefaultValueDataItem.key === "Customer" ? "Investor Id Prefix" : 
                      DefaultValueDataItem.key === "Issue" ? "Issue Id Prefix" : 
                      DefaultValueDataItem.key === "Issuer" ? "Issuer Id Prefix" :
                      DefaultValueDataItem.key === "DateFactor" ? "Maturity Date Factor" : DefaultValueDataItem.key }
                                              
                      </TableCell>
                      <TableCell>
                        {DefaultValueDataItem.value}{" "}
                      </TableCell>
                      <TableCell align="right">
                        <div className="btn-row flex-end">
                          <div className="btn-grid">
                            <Tooltip title="View/Edit">
                              <IconButton
                                aria-label="edit"
                                onClick={() =>
                                  props.openDrawer(DefaultValueDataItem) 
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
                                onClick={() => onDeleteClick(DefaultValueDataItem)}
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
export default DefaultValueTable;


