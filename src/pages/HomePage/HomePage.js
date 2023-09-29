import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function HomePage() {
  
  const [products, setProducts] = useState([]);
  useEffect(()=>{
    async function getProducts(){
      let productData = [];
      const querySnapshot = await getDocs(collection(db, "products"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        productData.push({productId : doc.id,...doc.data()});
      });

      setProducts([...productData]);
    }
    getProducts();
  },[])

  return (
    <div id="itemsContainer" style={{ display: "flex" }}>
      {products.map((item) => {
        return (
          <div className="item" key={item.productId}>
            <div className="itemDescriptionContainer">
              <div className="itemDescription">{item.name}</div>
              <div style={{fontWeight: "bolder"}}>Rs {item.price}</div>
              <div>
                <button className="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
