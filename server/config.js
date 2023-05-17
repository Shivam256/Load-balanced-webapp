import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const servers = ["http://localhost:3001", "http://localhost:3002"];

let current = 0;

const handler = async (req, res) => {
  const { method, url, headers, body } = req;
  const server = servers[current];
  current === servers.length - 1 ? (current = 0) : current++;

  console.log("request to server", server);
  let u = `${server}${url}`;

  try {
    const response = await axios({
      url: u,
      method: method,
      data: body,
      headers: headers,
    });
    // console.log(response.data);
    res.send(response.data);
  } catch (err) {
    console.log(err, "errorr is hehe");
    res.status(500).send("Server error!");
  }
};

app.use((req, res) => {
  handler(req, res);
});

app.listen(8080, (err) => {
  err
    ? console.log("Failed to listen on PORT 8080")
    : console.log("Load Balancer Server " + "listening on PORT 8080");
});
