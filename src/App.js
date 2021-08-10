import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { Card, ListGroupItem, ListGroup, Container, Row, Col } from 'react-bootstrap';
import './App.css'
import { Button } from 'react-bootstrap';

function App() {
  console.log('test....')
  const [pageNumber, setPageNumber] = useState(0);
  const [id, setId] = useState("")
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(9);
  const [pageCount, setPageCount] = useState(0)
  const [characterData, setCharacterData] = useState({});

  const changeView = async (id, character) => {
    // e.preventDefault()
    for (let i = 0; i < character.length; i++) {
      if (character[i].char_id == id) {
        setCharacterData(character[i]);
      }
    }
  }



  const back = () => {
    setCharacterData({});
  }

  const getData = async () => {
    const res = await axios.get(`https://www.breakingbadapi.com/api/characters?limit=1000&offset=0`)
    const data = res.data;
    // setData([data,...data])
    console.log(res.data);
    console.log("i am data", data);
    const slice = data.slice(offset, offset + perPage)
    console.log(slice);
    const postData = slice.map(pd => <div key={pd.char_id} className="my-2" style={{ border: "2px solid black" }}>
      <Card style={{ width: '18rem', height: "100%" }}>
        <Card.Img variant="top" src={pd.img} style={{ width: "18rem", height: "18rem" }} />
        <Card.Body>
          <Card.Title className="text-center">{pd.name}</Card.Title>

        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Dob : {pd.birthday}</ListGroupItem>
          <ListGroupItem>Status : {pd.status}</ListGroupItem>
          <ListGroupItem> Occupation: {pd.occupation.map(xyz => xyz + ", ")}</ListGroupItem>
        </ListGroup>
        <Card.Body>


        </Card.Body>
        <Button onClick={() => changeView(pd.char_id, res.data)}>Full View</Button>
      </Card>
    </div>)
    setData(postData)
    setPageCount(Math.ceil(data.length / perPage))
  }



  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setPageNumber(selectedPage);

    setOffset(selectedPage * 9)
  };

  // console.log("offset...",offset)

  useEffect(() => {
    getData()
  }, [offset])



  return (
    // Show one or All
    characterData.img ?
      <div>
        <div>
          <Row>
            <Col>{id}
              <div className="vh-100 ">
                {characterData && <img src={characterData.img} style={{ width: "100%", height: "100%" }}></img>}
              </div>
            </Col>


            <Col>
              <Container>
                <div style={{ marginTop: '10px' }}>
                  <ListGroup>
                    <ListGroup.Item >Name: {characterData.name}</ListGroup.Item>
                    <ListGroup.Item>Dob: {characterData.birthday}</ListGroup.Item>
                    <ListGroup.Item>Status: {characterData.status}</ListGroup.Item>
                    {characterData.nickname && <ListGroupItem>Nick Name: {characterData.nickname}</ListGroupItem>}
                    <ListGroup.Item>Portrayed: {characterData.portrayed}</ListGroup.Item>
                    <ListGroupItem> Season: {characterData.appearance.map(xyz => xyz + " ")}</ListGroupItem>
                    <ListGroupItem> Occupation: {characterData.occupation.map(xyz => xyz + ", ")}</ListGroupItem>
                    <ListGroupItem>
                      <div> <button className="btn-primary" onClick={back} style={{ width: "100%" }}> Back </button> </div>
                    </ListGroupItem>
                  </ListGroup>

                </div>
              </Container>
            </Col>
          </Row>
        </div>
      </div>



      :

      <div >
        <Container   >
          <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
            {data}
          </div>
        </Container>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}

            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
            forcePage={pageNumber}
          />
        </div>
      </div>
  );
}

export default App;
