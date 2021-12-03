import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button, Table, Form } from "react-bootstrap";
import { dashCtx } from "../App";
import axios from "axios";
import Search from "../components/Search";
import Moment from "react-moment";

export default function RetailUserDetails() {
  const [userData, setUserData] = useState([]);
  const [searchUserData, setSearchUserData] = useState([]);
  const [sortKey, setSortKey] = useState("id");
  const [sortType, setSortType] = useState("asc");

  const signCtx = useContext(dashCtx);
  let token = localStorage.getItem("userToken");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get(
        "http://cloudsysbe-env.eba-kdswdneh.ap-southeast-1.elasticbeanstalk.com/v1/api/retail-user/get-items?page=1&limit=10",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        // handle success
        //console.dir(response)
        setUserData(response.data.rows);
        setSearchUserData(response.data.rows);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  };

  return (
    <>
      <div className="text-end m-5">
        <Button
          variant="secondary mt-3"
          onClick={() => signCtx.logoutFunction()}
        >
          Logout
        </Button>
      </div>
      <Container>
        <Row>
          <Col>
            <h2 className="text-center mb-5">Retail User items</h2>

            <Search
              searchUserData={userData}
              setsearchUserData={setSearchUserData}
            />

            <select
              custom
              onChange={(e) => setSortKey(e.target.value)}
              md={6}
              className="mt-5"
            >
              <option value="id">id</option>
              <option value="name">name </option>
              <option value="branchName">branchName</option>
              <option value="brandName">brandName</option>
              <option value="availableQuantity">availableQuantity</option>
              <option value="WholeSaleUserId">WholeSaleUserId</option>
              <option value="updatedAt">updatedAt</option>
            </select>

            <Table responsive striped bordered hover className="mt-5">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Available Quantity</th>
                  <th>Branch Name</th>
                  <th>Brand Name</th>
                  <th>WholeSale UserId</th>
                  <th>Created Date</th>
                  <th>Updated Date</th>
                </tr>
              </thead>
              <tbody>
                {searchUserData
                  .sort((a, b) =>
                    sortType == "asc"
                      ? a[sortKey] - b[sortKey]
                      : b[sortKey] - a[sortKey]
                  )
                  .map((ele) => (
                    <tr key={ele.id}>
                      <td>{ele.id}</td>
                      <td>{ele.name}</td>
                      <td>{ele.availableQuantity}</td>
                      <td>{ele.branchName}</td>
                      <td>{ele.brandName}</td>
                      <td>{ele.WholeSaleUserId}</td>
                      <td>
                        <Moment format="YYYY-MM-DD">{ele.createdAt}</Moment>
                      </td>
                      <td>
                        <Moment format="YYYY-MM-DD">{ele.updatedAt}</Moment>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
}
