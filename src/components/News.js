import React, { Component } from 'react'
import Loading from './Loading';
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
    static defaultProps = {
      country: 'in',
      pageSize: 5,
      category: 'general'
    }
    static propTypes = {
      country: PropTypes.string,
      pageSize: PropTypes.number,
      category: PropTypes.string,
    }
    
    
    constructor(props){
        super(props);
        console.log("Hello I am a constructor from News Component");
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
               }
               document.title = `${this.props.category} - NewsMonkey`; 
    }
    async updateNews(){
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ce5808ad0eff43cab851248df9373e6d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true});
      let data = await fetch(url);
      let parsedData = await data.json()
     
      
      
      this.setState({
        
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
        
      })


    }
    async componentDidMount(){
    ;
      this.updateNews();

    }

    handlePreviousClick=async ()=>{

      console.log("previous");
  
      this.setState({page: this.state.page - 1})
      this.updateNews();
    }
   
    handleNextClick=async ()=>{


      console.log("Next");
   
      this.setState({page: this.state.page + 1})
      this.updateNews();
    }
    fetchMoreData = async() => {
     this.setState({page: this.state.page + 1})
     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ce5808ad0eff43cab851248df9373e6d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    
     let data =  await fetch(url);
     let parsedData = await data.json()
     
     
     
     this.setState({
       
       articles: this.state.articles.concat(parsedData.articles),
       totalResults: parsedData.totalResults,
       loading: false,
       
       
     })
     

      };

    render() {
        return (
            <>
                <h1 className="text-center">NewsMonkey - Top {this.props.category} Headlines</h1>
                {this.state.loading && <Loading/>}
               <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Loading/>}
        >
          <div className="container">

                <div className="row">
                {this.state.articles.map((element)=>{
                  return <div className="col-md-4" key={element.url}>
                   <NewsItem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""}
                    imageurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                   </div>})}
                </div>
                    </div>
                </InfiniteScroll>
                <div className="container d-flex justify-content-between">
                <button disabled={this.state.page<=1} type="button" className="btn btn-dark"onClick={this.handlePreviousClick}>&larr; Previous</button>
                <button disabled={this.state.page + 1> Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark"onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </>
        )
    }
}

export default News
