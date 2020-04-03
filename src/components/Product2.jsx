import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

//Radio
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";

//Alert
import Alert from '@material-ui/lab/Alert';

const twoDigits = number =>
  Number.isInteger(number) ? number + ".00" : number;

export default function Product({ tShirt, clbkCart }) {
  //   const [colors, setColors] = React.useState([]);
  const [size, setSize] = React.useState("");
  const [isHidden, setIsHidden] = React.useState(true);

  const handleChange = event => {
    setSize(event.target.value);
  };

  function addElementToCart() {
    let newProduct = { ...tShirt };
    newProduct.size = size;
    return [newProduct];
  }

  function sizeAlert(){
    setIsHidden(false)
    setTimeout(() => {
      setIsHidden(true)
    }, 2000);
  }

  function sizeAvailable(size, key) {
    return tShirt.size.includes(size) ? (
      <FormControlLabel
        key={key}
        value={size}
        control={<Radio color="primary"/>}
        label={size}
      />
    ) : (
      <FormControlLabel
        key={key}
        value="disabled"
        disabled
        control={<Radio />}
        label={size}
      />
    );
  }
  return (
    <div className="product-box">
      <h1 className="product-title">{tShirt.brand}</h1>
      <div className="color-secondary-1-0 flex flex-end">
      
        <IconButton
          id="add-button"
          color="inherit"
          onClick={() => size ? clbkCart(addElementToCart()) : sizeAlert()}
          aria-label="add to shopping cart"
        >
          <AddIcon fontSize="large" />
        </IconButton>
      </div>
      <div className="product-reference flex space-between">
      <h2 className="color-secondary-1-0">{tShirt.ref}</h2>
      <div className={isHidden ? 'is-hidden' : ''}>
      <Alert id="alert-size" variant="outlined" severity="info">Add your size</Alert>
      </div>

      </div>
      <div className="product-size flex flex-end">
        <FormControl component="fieldset">
          {/* <FormLabel component="legend" >Size</FormLabel> */}
          <RadioGroup
            aria-label="size"
            name="size"
            value={size}
            onChange={handleChange}
          >
            {["S", "M", "L", "XL"].map((size, i) => sizeAvailable(size, i))}
          </RadioGroup>
        </FormControl>

        {/* <div className="product-colors">
        <Radio
          checked={selectedValue === "a"}
          onChange={handleChange}
          value="a"
          name="radio-button-demo"
          inputProps={{ "aria-label": "A" }}
        />
        <Radio
          checked={selectedValue === "b"}
          onChange={handleChange}
          value="b"
          name="radio-button-demo"
          inputProps={{ "aria-label": "B" }}
        />
        <GreenRadio
          checked={selectedValue === "c"}
          onChange={handleChange}
          value="c"
          name="radio-button-demo"
          inputProps={{ "aria-label": "C" }}
        />
      </div> */}
      </div>
      <div className="product-image">
        <img
          id="img"
          src={
            tShirt.img
              ? tShirt.img[0]
              : "https://cdn.shopify.com/s/files/1/0086/5334/0777/products/salty-smile-surf-vetements-vintage-white-good-vibes-t-shirt-homme-tee-shirts-11370351427689_1048x.png?v=1575932347"
          }
          alt="foo"
        />
      </div>
      
      <div className="flex flex-end">
        <h1>{twoDigits(tShirt.price)}€</h1>
      </div>
    </div>
  );
}
