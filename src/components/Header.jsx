import React from "react";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MenuIcon from "@material-ui/icons/Menu";

const StyledBadge = withStyles(theme => ({
  badge: {
    right: -3,
    top: 0,
    border: `1px solid ${theme.palette.background.paper}`,
    padding: "0 4px"
  }
}))(Badge);

export default function Header({cart}) {
    const [isVisible, setVisibility] = React.useState(false);
    
  return (
    <header>
      <div className="flex">
        <div id="burger" className="black flex center v-center" onClick={()=>setVisibility(!isVisible)}>
          <MenuIcon />
        </div>

        <img src="./logo-TRS-light.png" alt="logo" />
        <div id="cart" className="black vcenter center flex">
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={cart.length} color="secondary">
              <ShoppingCartIcon color="secondary" />
            </StyledBadge>
          </IconButton>
        </div>
      </div>
      {isVisible && <div id="burger-menu" className="scale-in-tl">
        </div>}
      <div>
        <h1 id="search-title">Search...</h1>
      </div>
    </header>
  );
}
