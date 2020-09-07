import React, { useState, useEffect } from "react";
import { useStoreState, useStoreActions } from "../store";
import { Grid, Container, Card, CardContent } from "@material-ui/core";
import Page from "../containers/Page/Page";

const Order = () => {
  const items = useStoreState((state) => state.todos.items);

  // Pull out actions from our store
  const add = useStoreActions((actions) => actions.todos.add);

  // Track our form state
  const [newTodo, setNewTodo] = useState("");

  // Reset the form state every time the todo items changes
  useEffect(() => setNewTodo(""), [items]);
  return (
    <Page title="Welcome">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <div>
                  <h2>Todo List</h2>
                  <ul>
                    {items.map((todo, idx) => (
                      <li key={idx}>{todo}</li>
                    ))}
                  </ul>
                  <input
                    type="text"
                    onChange={(e) => setNewTodo(e.target.value)}
                    value={newTodo}
                  />
                  <button onClick={() => add(newTodo)}>Add</button>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Order;
