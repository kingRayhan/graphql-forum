import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://shoaib:shoaib@cluster0-sg9w3.mongodb.net/graphql-forum?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("DB connected");
  });
