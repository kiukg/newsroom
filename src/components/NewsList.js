import { connect } from "react-redux";
import { fetchNews, pageChanged } from "../redux/actions/newsAction";
import React from "react";
import NewsItem from "./NewsItem";
import Fab from "@material-ui/core/Fab";
import { SyncLoader } from "react-spinners";
import Pagination from "@material-ui/lab/Pagination";


class NewsList extends React.Component {
  componentDidMount() {
    const { fetchNews, categoryObj } = this.props;
    if (categoryObj.id == "search") {
      fetchNews(this.props.props.location.pathname);
      this.props.pageChanged(1);
    } else {
      fetchNews(categoryObj.id);
      this.props.pageChanged(1);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.props.location.pathname !== this.props.props.location.pathname) {
      if (this.props.categoryObj.id == "search") {
        this.props.fetchNews(this.props.props.location.pathname);
        this.props.pageChanged(1);
      } else {
        this.props.fetchNews(this.props.categoryObj.id);
        this.props.pageChanged(1);
      }
        
    }
  }

  handlePageChange = (event, value) => {
    this.props.pageChanged(value);
  };

  paginate(array, pageSize, page) {
    if (array.lenght == 0) {
      return array;
    }
    return array.slice((page - 1) * pageSize, page * pageSize);
  }

  render() {
    const { categoryObj, news } = this.props;
    let { count, page, pageSize } = news;
    let paginationCounter = Math.floor(count / pageSize);
    const paginateArray = this.paginate(news.news, pageSize, page);
    if (news.error) {
      return <div className="errorLabel">Error cargando datos</div>;
    }

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
        <Pagination
          color="primary"
          className="paginationC"
          count={paginationCounter}
          page={page}
          siblingCount={1}
          boundaryCount={1}
          onChange={this.handlePageChange}
        />
        {news.isFetching ? (
          <div className="syncLoader">
            <SyncLoader />
          </div>
        ) : (
          paginateArray.map(({ img_url, url, title, source_name }, index) => (
            <NewsItem
              key={index + "newsitem"}
              img_url={img_url}
              title={title}
              source_name={source_name}
              url={url}
            ></NewsItem>
          ))
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    news: state.news,
    error: state.error,
    isFetching: state.isFetching,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchNews: (path) => dispatch(fetchNews(path)),
  pageChanged: (value) => dispatch(pageChanged(value)),
  // ,clearNews: () => dispatch(clearNews())
});

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
