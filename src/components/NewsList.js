import { connect } from "react-redux";
import { fetchNews } from "../redux/actions/newsAction";
import React from "react";
import NewsItem from "./NewsItem";
import Fab from "@material-ui/core/Fab";
import { SyncLoader } from 'react-spinners'


class NewsList extends React.Component  {

  componentDidMount() {
    const { fetchNews, categoryObj } = this.props;
    fetchNews(categoryObj.id);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.categoryObj.id!==this.props.categoryObj.id){
      this.props.fetchNews(this.props.categoryObj.id);
    }
  }

  render(){
    const {categoryObj, news} = this.props;
    
  return (
    <div className="NewsListContainer">
      <Fab
        className="NewsCategory"
        variant="extended"
        color="primary"
        aria-label="add"
      >
        {categoryObj.icon}
        {categoryObj.name}
      </Fab>
      {news.isFetching
        ? <div className="syncLoader"><SyncLoader  /></div>
        :(
          news.news.map(({ img_url, url, title, source_name }, index) => (
            <NewsItem
              img_url={img_url}
              title={title}
              source_name={source_name}
              url={url}
            ></NewsItem>)
          )
        )
      }
    </div>
  )}
};

const mapStateToProps = (state) => {
  return {
    news: state.news,
    error: state.error,
    isFetching: state.isFetching
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchNews: (path) => dispatch(fetchNews(path))
  // ,clearNews: () => dispatch(clearNews())
});

export default connect(mapStateToProps,mapDispatchToProps)(NewsList);
