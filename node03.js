const express = require("express");

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Simple in-memory data just for demo purposes
let friends = [
  { id: 1, firstName: "George", lastName: "Kristoferson", phone: "2062062066" },
  { id: 2, firstName: "Bill", lastName: "Madison", phone: "4254254255" }
];

// GET /
app.get("/", (request, response) => {
  response.send("Express server is running");
});

// GET /friends
app.get("/friends", (request, response) => {
  response.json(friends);
});

// GET /friends/:id
app.get("/friends/:id", (request, response) => {
  const id = parseInt(request.params.id, 10);
  const friend = friends.find(f => f.id === id);

  if (!friend) {
    return response.status(404).json({ error: "Friend not found" });
  }

  response.json(friend);
});

// POST /friends
app.post("/friends", (request, response) => {
  const newFriend = request.body;

  const nextId =
    friends.length > 0
      ? Math.max(...friends.map(f => f.id)) + 1
      : 1;

  newFriend.id = nextId;
  friends.push(newFriend);

  response.status(201).json({
    message: "Friend created",
    friend: newFriend
  });
});

// PUT /friends/:id
app.put("/friends/:id", (request, response) => {
  const id = parseInt(request.params.id, 10);
  const updatedData = request.body;

  const index = friends.findIndex(f => f.id === id);

  if (index === -1) {
    return response.status(404).json({ error: "Friend not found" });
  }

  friends[index] = {
    ...friends[index],
    ...updatedData,
    id
  };

  response.json({
    message: "Friend updated",
    friend: friends[index]
  });
});

// DELETE /friends/:id
app.delete("/friends/:id", (request, response) => {
  const id = parseInt(request.params.id, 10);

  const index = friends.findIndex(f => f.id === id);

  if (index === -1) {
    return response.status(404).json({ error: "Friend not found" });
  }

  const deletedFriend = friends.splice(index, 1)[0];

  response.json({
    message: "Friend deleted",
    friend: deletedFriend
  });
});

// Catch-all route
app.use((request, response) => {
  response.status(404).json({ error: "Route not found" });
});

app.listen(port, () => {
  console.log(`Express server running at http://localhost:${port}/`);
});