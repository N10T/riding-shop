import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CheckboxListSecondary({cart}) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List dense className={classes.root} id="right-cart">
      {cart && cart.map((a,i) => {
        const labelId = `checkbox-list-secondary-label-${a}`;
        return (
          <ListItem key={i} button>
            <ListItemAvatar>
              <Avatar
              variant="rounded"
                alt={`tshirt n°${a.brand +' ' + a.ref}`}
                src={a.img[0]}
              />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={a.brand} secondary={<>
                {a.ref + " — " + a.size}
              </>  }/>
            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={handleToggle(a)}
                checked={checked.indexOf(a) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}