import React from "react";
import "./App.css";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  const [cart,setCart] = React.useState([])
function elementAdded(arr){
  setCart([...arr,...cart])
}
  return (
    <div className="App">
      <Header cart={cart}/>
      <Main clbkCart={elementAdded}/>
      <footer></footer>
    </div>
  );
}

export default App;
