import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";
import AddIcon from "@material-ui/icons/Add";
// import { makeStyles } from '@material-ui/core/styles';

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    }
  },
  checked: {}
})(props => <Radio color="default" {...props} />);

// const useStyles = makeStyles(theme => ({
//   addIcon: {
//     fontSize: "large",
//     position: "fixed"
//   }
// }));

const twoDigits = number => Number.isInteger(number) ? number + '.00' : number

export default function Product({tShirt}) {
//   const [color, setColor] = React.useState("");
  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = event => {
    setSelectedValue(event.target.value);
  };
  return (
    <div className="product-box flex column">
      <div className="flex space-between">
        <h1 className="product-title">{tShirt.brand}</h1>
        <AddIcon fontSize="large" onClick={() => alert("added")} />
      </div>
      <div className="flex space-between">
      <h2 className="product-reference color-secondary-1-0">{tShirt.ref}</h2>
      <div className="product-colors">
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
      </div>
      </div>
      <div className="product-image">
        <img
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
