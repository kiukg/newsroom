import React from "react";
import { connect } from "react-redux";
import { searchNews } from "../redux/actions/newsAction";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import {
  Announcement,
  Brush,
  Camera,
  Computer,
  Gavel,
  Search,
  Sports,
} from "@material-ui/icons";

import { Route, Link, Switch, BrowserRouter, NavLink } from "react-router-dom";
import { navigate } from "@reach/router";
import NewsList from "./NewsList";
import { Button } from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(0),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearch = (event, searchWord) => {
    props.searchNews(`${event.target.value}`);
    // props.history.push('/search');
  };

  const submitSearch = (event) => {
    if (event.keyCode == 13) {
      console.log(props);
      navigate(`/search/${props.state.news.search}`);
    }
  };

  const categoryList = [
    { id: 1, name: "News", icon: <Announcement />, path: "/" },
    { id: 2, name: "Politica", icon: <Gavel />, path: "/Politica" },
    { id: 3, name: "Tecnologia", icon: <Computer />, path: "/Tecnologia" },
    { id: 4, name: "Espectaculo", icon: <Camera />, path: "/Espectaculo" },
    { id: 5, name: "Deportes", icon: <Sports />, path: "/Deportes" },
    { id: 6, name: "Diseño", icon: <Brush />, path: "/Diseño" },
    // { id: "Search", name: "Busqueda", icon: <Search />, path: "/search" },
  ];

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        {categoryList.map((categoryItem, index) => (
          <ListItem
            to={categoryItem.path}
            component={Link}
            button
            key={categoryItem.name}
          >
            <ListItemIcon>{categoryItem.icon}</ListItemIcon>
            <ListItemText primary={categoryItem.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <BrowserRouter>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              News Room
            </Typography>

            <div className={classes.search}>
              {/* <div className={classes.searchIcon}>
                <SearchIcon />
              </div> */}
              <InputBase
                placeholder="Buscar…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={handleSearch}
                // onKeyDown={submitSearch}
              />
            </div>
            <Link to={"/search/" + props.state.news.search}>
              <IconButton
                color="default"
                aria-label="search"
                component="span"
              >
                <SearchIcon />
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            {categoryList.map((categoryItem) => {
              if (categoryItem.name === "News") {
                return (
                  <Route
                    key={categoryItem.id + categoryItem.name}
                    exact
                    path={categoryItem.path}
                    render={(props) => (
                      <NewsList
                        categoryObj={categoryItem}
                        props={props}
                      ></NewsList>
                    )}
                  ></Route>
                );
              } else {
                return (
                  <Route
                    key={categoryItem.id + categoryItem.name}
                    path={`${categoryItem.path}`}
                    render={(props) => (
                      <NewsList
                        categoryObj={categoryItem}
                        props={props}
                      ></NewsList>
                    )}
                  ></Route>
                );
              }
            })}

            <Route
              path="/search"
              render={(props) => (
                // console.log(props)
                <NewsList
                  categoryObj={{
                    id: "search",
                    name: "Busqueda",
                    icon: <Search />,
                    path: "/search",
                  }}
                  props={props}
                ></NewsList>
              )}
            ></Route>
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    state,
  };
};

const mapDispatchToProps = (dispatch) => ({
  searchNews: (path) => dispatch(searchNews(path)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDrawer);
