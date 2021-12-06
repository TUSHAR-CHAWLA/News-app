import React, { Component } from 'react'

export class NewsItem extends Component {
    

    render() {
        let {title, description, imageurl, newsurl, author, date, source} = this.props
        return (
            <div className="my-3">
                <div className="card" >
                <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex: '1'}}>
    {source}</span>
               <img src={!imageurl?"https://d2jx2rerrg6sh3.cloudfront.net/image-handler/picture/2021/9/shutterstock_1699058398.jpg":imageurl} className="card-img-top" alt="..."/>
                <div className="card-body">
                <h5 className="card-title">{title}... </h5>
               <p className="card-text">{description}...</p>
               <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {date} </small></p>
    <a href={newsurl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
  </div>
</div>
            </div>
        )
    }
}

export default NewsItem
