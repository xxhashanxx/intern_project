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
import useCollateralService from "../../../api/userManagement/collateral/useCollateralService";
import { useMutation, queryCache, useQuery } from "react-query";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { getComparator, stableSort, Order } from "../../TableViewComponents/useSortData";

//-------------------------------------

const headCells: any[] = [
  { id: 'collateral_id', label: 'ID' },
  { id: 'collateral_name', label: 'Collateral Name' },
 
  
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
export interface CollateralTableProps {
  openDrawer: any;
}

const CollateralTable = (props: CollateralTableProps) => {
    //-----------------------------------------
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<any>('collateral_id');
  
    const handleRequestSort = (event: React.MouseEvent<unknown>, property: any) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
    //-----------------------------------------------
  const { status, data, error } = useQuery(
    "collateralList",
    useCollateralService().useGetCollateralListService
  );

  const deleteCollateralService = useCollateralService().useDeleteCollateralService();
  const [mutateDeleteCollateral,{status:deleteStatus,error:deleteError}] = useMutation(
    async (deleteId: any) => {
      if (window.confirm("Are you sure you wish to delete this item?"))
        return await deleteCollateralService.deleteCollateral(deleteId);
    },
    {
      onSuccess: () => {
        return queryCache.refetchQueries("collateralList").then(() => {});
      },
      onError: (e) => {
        toast.error(e.message);
      },
    }
  );
  const onDeleteClick = (collateralDataItem: any) => {
    mutateDeleteCollateral(collateralDataItem.collateral_id);
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
          <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
            <TableBody>
            {stableSort(data.data, getComparator(order, orderBy))
                .map((collateralDataItem: any, key: number) => {
                  return (
                    <TableRow 
                      hover
                      key={key} onDoubleClick={() => props.openDrawer(collateralDataItem) } style={{ whiteSpace: "nowrap"}}>
                      <TableCell>{collateralDataItem.collateral_id} </TableCell>
                      <TableCell>
                        {collateralDataItem.collateral_name}{" "}
                      </TableCell>
                      <TableCell align="right">
                        <div className="btn-row flex-end">
                          <div className="btn-grid">
                            <Tooltip title="View/Edit">
                              <IconButton
                                aria-label="edit"
                                onClick={() =>
                                  props.openDrawer(collateralDataItem)
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
                                onClick={() => onDeleteClick(collateralDataItem)}
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

export default CollateralTable;
