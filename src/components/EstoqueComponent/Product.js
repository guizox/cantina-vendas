import React from 'react';

import {
  Paper,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Fab,
  CircularProgress,
  Grid
} from '@material-ui/core';

import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({});

const Product = ({ classes, estoque }) =>
  estoque.isLoading ? (
    <Grid
      item
      container
      direction="row"
      xs={12}
      justify="center"
      alignItems="center"
      alignContent="center"
    >
      <CircularProgress />
    </Grid>
  ) : (
    <Paper>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="right">id</TableCell>
            <TableCell align="right">Descrição</TableCell>
            <TableCell align="right">Valor</TableCell>
            <TableCell align="right">Quantidade</TableCell>
            <TableCell align="right">Editar </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {estoque.items.map((item, index) => {
            return (
              <TableRow key={index}>
                <TableCell align="right">{item.id}</TableCell>
                <TableCell align="right">{item.descricao}</TableCell>
                <TableCell align="right">{item.valor}</TableCell>
                <TableCell align="right">{item.quantidade}</TableCell>
                <TableCell align="right">
                  <Fab
                    color="secondary"
                    aria-label="Edit"
                    className={classes.fab}
                    onClick={() => {
                      window.location.href = `/create?id=${item.id}`;
                    }}
                  >
                    <EditIcon />
                  </Fab>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );

export default withStyles(styles)(Product);
