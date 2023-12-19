import React, { useEffect, useRef, useState } from "react";
import "./HomePage.css";
import "./HomePageMedia.css"
import { db } from "../../firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { useCartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function HomePage() {
  

  const {currentUser} = useAuth();
  const {handleAdd, setCart,cart} = useCartContext();
  const [products, setProducts] = useState([]);

  const productName = useRef();


  useEffect(()=>{
    if(currentUser){
      console.log("CURRENT USER ", currentUser.email);
      async function getUserCartDetails(){
        const docRef = doc(db, "users", currentUser.email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data ABCD:", docSnap.data().cart);
          setCart([...docSnap.data().cart]);
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
          setCart([]);
        }
        console.log("object ", docSnap.data() )
        // setCart([...docSnap.data().cart]);
      }
      getUserCartDetails();
    }
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
  },[currentUser, setCart])



  function checkIfItemPresentInCart(prod){
    const index = cart.findIndex((item) => item.id === prod.id);
    if(index === -1){
      return false;
    }
    return true;
  }

  async function handleFormSubmit(e){
    e.preventDefault();
    let receivedProducts = [];
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("name", "==", productName.current.value));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      receivedProducts.push({"productId" : doc.id, ...doc.data()});
    });
    setProducts([...receivedProducts]);
  }
  return (
    <div>
      <div id="topContainer">
        <form onSubmit={handleFormSubmit}>
            <input ref={productName} type="text" placeholder="Enter Product Name... pants, Shoes etc" required />
            <button className="btn btn-primary" type="submit">Search</button>
        </form>
      </div>
      <div id="itemsContainer" style={{ display: "flex" }}>
        {products.length === 0 && <h2>No Products found</h2>}
        {products.map((item) => {
          return (
            <div className="item" key={item.productId}>
              <div className="itemDescriptionContainer">
                <div className="itemDescription">{item.name}</div>
                <div style={{fontWeight: "bolder"}}>Rs {item.price}</div>
                <div>
                  {checkIfItemPresentInCart(item)?<Link to="/cart"><button className="btn btn-secondary">Go to Cart</button></Link>:<button onClick={() => handleAdd(item)} className="btn btn-primary">Add to Cart</button>}
                  {/* <button onClick={() => handleAdd(item)} className="btn btn-primary">Add to Cart</button> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
