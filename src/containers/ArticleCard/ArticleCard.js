import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Moment from "react-moment";
import { Link } from "react-router-dom";

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
};

const  ProductCard = (props) => {
  const { classes } = props;

  return (

    <Grid item xs={6} sm={3}>

        <Card className={classes.card}>
              <CardActionArea>

                <CardMedia
                  className={classes.media}
                  image={props.image}
                />

                <CardContent>

                  <Typography gutterBottom variant="h5" component="h2">
                  title - {props.title}
                  </Typography>

                  <Typography component="p">
                    description - {props.description}
                  </Typography>
                  <Typography component="p">
                    category - {props.category}
                  </Typography>
                  <Typography component="p">
                    by user - {props.username}
                  </Typography>

                  <Typography component="p">
                  <Moment className="text-muted" format="Do MMM YYYY">
                         {props.date}
                  </Moment>
                  </Typography>



                </CardContent>

              </CardActionArea>

              
              {props.isCorrectUser ? ( <CardActions>
                <Button size="small" color="delete" onClick={props.removeArticle}>
                  Delete
                </Button>
                <Link  to={`/users/${props.currentUserId}/articles/${props.articleId}/edit`} exact >Edit</Link>

              </CardActions>) : null}
             
            </Card>


     </Grid>

  );
}

ProductCard.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(ProductCard);
