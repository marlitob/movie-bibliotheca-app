require("dotenv").config();
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./Schema";
import cors from "cors";
import { createConnection } from "typeorm";
import { Users } from "./Entities/Users";

const main = async () => {
  const axios = require("axios");
  // await createConnection({
  //     host: process.env.SQL_HOST_IP,
  //     type: 'mysql',
  //     database: process.env.DB,
  //     username: process.env.DB_USER_NAME,
  //     password: process.env.DB_PASSWORD,
  //     logging: true,
  //     synchronize: false,
  //     entities: [Users],
  // })
  const cors = require("cors");
  let app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );
  app.post("/api/post", async (req, res) => {
    const { formResults } = req.body;

    // bogus response for testing only
    // return res.status(200)
    //     .send(
    //         {
    //             data: {
    //                 status: 'completed-manual-db',
    //                 ...formResults},})

    // For Production sends email
    const ejsProps = {
      user_id: process.env.EJS_USER_ID,
      service_id: process.env.EJS_SERVICE_ID,
      template_id: process.env.EJS_TEMPLATE_ID,
      template_params: formResults,
      accessToken: process.env.EJS_ACCESS_TOKEN,
    };

    // axios.post('https://api.emailjs.com/api/v1.0/email/send', ejsProps)
    //     .then((res: any) => {
    //         res.status(res.statusCode).send(res.statusMessage)
    //     })
    //     .catch((err: { response: any; request: any; }) => {
    //         if (err.response) {
    //            return res.status(err.response.status).send(err.response.data)
    //         } else if (err.request) {
    //            return  res.status(err.request.status).send(err.request.data)
    //             // client never received a response, or request never left
    //         } else {
    //             return res.status(200)
    //                 .send(
    //                     {
    //                         data: {
    //                     status: 'completed',
    //                     ...formResults},})
    //         }
    //     })
  });
  app.post("/themoviedb", async function (req, res) {
    const { title } = req.body;
    if (title === "") {
      console.log("blank");
    } else {
      const movieDbData = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${title}`
      );
      const { results } = movieDbData.data;
      res.send(results);
    }
  });

  app.listen(8080, () => {
    console.log("SERVER RUNNING ON PORT http://localhost:8080/");
  });
};

main().catch((err) => {
  console.log(err);
});
