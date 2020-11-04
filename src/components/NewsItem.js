import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function NewsItem(props) {
  const classes = useStyles();
  const {img_url,url,title,source_name} = props;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={title}
          height="140"
          image={img_url}
          title={title}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <b>{source_name}</b>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <a href={url}>
        <Button size="small" color="primary">
          Ver mas
        </Button>
        </a>
      </CardActions>
    </Card>
  );
}
