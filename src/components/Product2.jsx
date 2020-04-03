import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

const twoDigits = number =>
  Number.isInteger(number) ? number + ".00" : number;

export default function Product({ tShirt, clbkCart }) {
  //   const [colors, setColors] = React.useState([]);
  const [state, setState] = React.useState({
    checkedS: false,
    checkedM: false,
    checkedL: false,
    checkedXL: false
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  function sizeAvailable(size,key) {
    return tShirt.size.includes(size) ? (
      <FormControlLabel
      key={key}
        control={
          <Checkbox
            checked={state[`checked${size}`]}
            onChange={handleChange}
            name={`checked${size}`}
            color="primary"
          />
        }
        label={size}
        labelPlacement="start"
      />
    ) : (
      <FormControlLabel
      key={key}
        control={
          <Checkbox
            disabled
            inputProps={{ "aria-label": "disabled checkbox" }}
            color="secondary"
          />
        }
        label={size}
        labelPlacement="start"
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
          onClick={() => clbkCart([tShirt])}
          aria-label="add to shopping cart"
        >
          <AddIcon fontSize="large" />
        </IconButton>
      </div>
      <h2 className="product-reference color-secondary-1-0">{tShirt.ref}</h2>
      <div className="product-size flex flex-end">
        <FormGroup>
        {["S", "M", "L", "XL"].map((size,i)=>sizeAvailable(size,i))}
        </FormGroup>

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
