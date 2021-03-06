import React from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";
import Cart from "./components/Cart";

function App() {
  const [cart,setCart] = React.useState([])
function elementAdded(arr){
  setCart([...arr,...cart].sort((a,b)=>a.brand > b.brand ? 1 : -1))
}
console.table(cart)

  return (
    <div className="App">
      <Header cart={cart}/>
      <Main clbkCart={elementAdded}/>
      {/* <Cart /> */}
      <footer></footer>
    </div>
  );
}

export default App;
