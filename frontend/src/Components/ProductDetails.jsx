import { json, useParams } from "react-router-dom";
import "../Styles/ProductDetails.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer1";
import axios from "axios";
export const ProductDetails = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  console.log(id);
  
  useEffect(() => {
    const getData = () => {
      axios
        .get(`http://localhost:8000/destinations/${id}`, {
          headers: {
            Authorization: localStorage.getItem("userToken"),
          },
        })
        .then((res) => {
          console.log(res.data);
          setData(res.data[0]);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getData();
  }, []);
console.log(data);
  return (
    <>
      <Navbar />
      {data ? 
        <div className="main">
          <div className="mainImage">
            <img src={data.image} alt="" />
          </div>
          <div className="mainDesc">
            <h1 style={{ fontWeight: "bolder", fontSize: "x-large" }}>
              {data.destination}
              {console.log(data.description)}
            </h1>

            <h3 style={{ fontWeight: "bold" }}>DESCRIPTION</h3>
            <hr />
            <p>{data.description}</p>

            <h3 style={{ fontWeight: "bold" }}>
              THINGS TO DO IN {data.destination_title}
            </h3>
            <hr />
            {/* <div className="thingstodo">
              {data.attractions.map((item) => (
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div> */}

            <h1 style={{ fontWeight: "bold" }}>${data.fees}</h1>
            <button>
              <Link to={`/payment/${id}`}>Book my trip</Link>
            </button>
          </div>
        </div>
       : <></> }

      <Footer />
    </>
  );
};
