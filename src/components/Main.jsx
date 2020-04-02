import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
// button reset
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Product2 from "./Product2";
import tShirts from "../seed";
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  formLabel: {
    backgroundColor: "red"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    backgroundColor: "white"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  slider: {
    width: 300,
    paddingBottom: "15px"
  },
  button: {
    margin: theme.spacing(2)
  }
}));

var markArr = [];
var maxPrice = Math.ceil(Math.max(...tShirts.map(t => t.price)) / 10) * 10;
var minPrice = Math.floor(Math.min(...tShirts.map(t => t.price)) / 10) * 10;
for (let i = minPrice; i <= maxPrice; i += 10) markArr.push(i);

const marks = markArr.map(a => (a = { value: a, label: `${a}€` }));

const valuetext = value => `${value}€`;

const brands = tShirts
  .map(a => (a = a.brand))
  .filter((a, i, arr) => (a ? arr.indexOf(a) === i : null))
  .sort();
const sizes = ["S", "M", "L", "XL"];

export default function Main(props) {
  const classes = useStyles();
  const [prices, setPrices] = React.useState([minPrice, maxPrice]);
  const [brand, setBrand] = React.useState("");
  const [size, setSize] = React.useState(sizes);
  const [sortBy, setSortBy] = React.useState("");
  const [arrFilter, setArrFilter] = React.useState(tShirts);
  const [state, setState] = React.useState({
    s: false,
    m: false,
    l: false,
    xl: false
  });

  const handleChange = (event) =>{
    let arr = [];
    setState({ ...state, [event.target.name]: event.target.checked });
    sizes.forEach(s => (state[s] ? arr.push(s) : ""));
    setSize(arr.length ? arr : sizes);
  }

  const { s, m, l, xl } = state;

  function reset() {
    setBrand("");
    setSize("");
    setSortBy("");
    setPrices([minPrice, maxPrice]);
    setArrFilter(tShirts);
  }

  React.useEffect(() => {
    setArrFilter(
      tShirts
        .filter(t => (brand ? t.brand === brand : true))
        // .filter(t => (color ? t.color === color : true))
        .filter(
          t => t.price >= Math.min(...prices) && t.price <= Math.max(...prices)
        )
        .filter(
          t =>
            t.size.includes(state.s ? "S" : "") ||
            t.size.includes(state.m ? "M" : "") ||
            t.size.includes(state.l ? "L" : "") ||
            t.size.includes(state.xl ? "XL" : "") ||
            !(state.s + state.m + state.l + state.xl)
        )
        .sort((a, b) =>
          sortBy
            ? !isNaN(a[sortBy])
              ? a[sortBy] - b[sortBy]
              : a[sortBy] < b[sortBy]
              ? -1
              : 1
            : ""
        )
    );

    return () => {
      // cleanup
    };
  }, [size, brand, sortBy, prices,state]);
  // console.log(tShirts.sort((a,b)=> a.brand > b.brand))

  return (
    <>
      <div id="top-spacer"></div>
      <div id="main" className="flex">
        <div id="sidebar" className="flex column flex-end">
          <section id="sort" className="border flex column v-center">
            <Typography id="range-slider" variant="h5" gutterBottom>
              Sort by
            </Typography>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="demo-simple-select-filled-label">
                Sort by
              </InputLabel>
              <Select
                // labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"price"}>Price</MenuItem>
                <MenuItem value={"brand"}>Brand</MenuItem>
                <MenuItem value={"style"}>Style</MenuItem>
              </Select>
            </FormControl>
          </section>
          <section
            id="filter"
            className="border flex column v-center color-primary-1-background"
          >
            <div className={classes.slider}>
              <Typography id="range-slider" variant="h5" gutterBottom>
                Max price
              </Typography>
              <Slider
                value={prices}
                onChange={(e, newValue) => setPrices(newValue)}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valuetext}
                min={minPrice}
                max={maxPrice}
                marks={marks}
              />
            </div>
            <Typography id="range-slider" variant="h5" gutterBottom>
              Filter
            </Typography>
            <FormControl variant="filled" className={classes.formControl}>
              <InputLabel id="demo-simple-select-filled-label">
                Brand
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={brand}
                onChange={e => setBrand(e.target.value)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {brands.map((brand, i) => (
                  <MenuItem key={i} value={brand}>
                    {brand}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormLabel component="legend">Size</FormLabel>

            <FormGroup row>
              <FormControlLabel
                control={
                  <Checkbox checked={s} onChange={handleChange} name="s" />
                }
                label="S"
                labelPlacement="bottom"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={m} onChange={handleChange} name="m" />
                }
                label="M"
                labelPlacement="bottom"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={l} onChange={handleChange} name="l" />
                }
                label="L"
                labelPlacement="bottom"
              />
              <FormControlLabel
                control={
                  <Checkbox checked={xl} onChange={handleChange} name="xl" />
                }
                label="XL"
                labelPlacement="bottom"
              />
            </FormGroup>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={reset}
            >
              reset filter
            </Button>
          </section>
        </div>
        <div id="content">
          {arrFilter.length ? (
            <div id="products" className="grid auto-grid">
              {arrFilter.map((tShirt, i) => (
                <Product2 key={i} tShirt={tShirt} clbkCart={props.clbkCart} />
              ))}
            </div>
          ) : (
            <div className="flex max-height v-center center">
              <h1>No more Tshirt</h1>
            </div>
          )}
          <div id="products" className="grid auto-grid"></div>
        </div>
      </div>
    </>
  );
}
