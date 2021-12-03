import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";

export default function Search(props) {
  const [searchItems, setSearchItems] = useState("");

  const handleChange = (event) => {
    let data = event.target.value;

    const filteredData = props.searchUserData.filter((items) => {
      let name = items.name.toLowerCase();
      let availableQuantity = items.availableQuantity.toString();
      let branchName = items.branchName.toLowerCase();
      let brandName = items.brandName.toLowerCase();
      let WholeSaleUserId = items.WholeSaleUserId.toString();
      let updatedAt = items.updatedAt.toLowerCase();
      let searchText = data.toLowerCase();

      return (
        name.search(searchText) != -1 ||
        availableQuantity.search(searchText) != -1 ||
        branchName.search(searchText) != -1 ||
        brandName.search(searchText) != -1 ||
        WholeSaleUserId.search(searchText) != -1 ||
        updatedAt.search(searchText) != -1
      );
    });

    setSearchItems(data);
    if (data == "") {
      props.setsearchUserData(props.searchUserData);
    } else {
      props.setsearchUserData(filteredData);
    }
  };

  return (
    <>
      <Form>
        <Row className="align-items-center">
          <Col md={6} className="my-1">
            <Form.Control
              type="text"
              value={searchItems}
              onChange={handleChange}
              placeholder="search"
            />
          </Col>
        </Row>
      </Form>
    </>
  );
}
