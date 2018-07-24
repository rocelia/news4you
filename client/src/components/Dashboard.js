import React from 'react';
import { firebase } from '../base.js';
import request from 'request';
import cheerio from 'cheerio';


export default class Dashboard extends React.Component {
  state = {
    showFilters: false,
    showSaved: false,
    data: [],
    saved: false
  }

  componentDidMount = () => {
    console.log(this.state);
  }

  signOut = () => {
    firebase.auth().signOut()
  }
  ///bleacher reaport
  // scrapeComics = () => {
  //   console.log('Scraping Bleacher Report\n==================================================');

  //   var comicStirps = [];

  //   request("http://comics.azcentral.com/", (error, response, html) => {
  //     var $ = cheerio.load(html)

  //     $('.comic-display-name').each(function () {
  //       var title = $(this).children('.comic-name').children('href').text();
  //       // console.log(title);
  //       var img = $(this).children('.comic-name').children('a').children('img').attr('src');
  //       // console.log(img);
  //       var link = $(this).children('.comic-name').children('a').attr('href');
  //       // console.log(link);
  //       var newArticle = {
  //         title: title,
  //         img: img,
  //         link: link
  //       }
  //       comicStirps.push(newArticle);

  //     });

  //     console.log(comicStirps);
  //     this.setState({ data: comicStrips }, () => console.log(this.state));
  //   });
  // }

  ///bleacher reaport
  scrapeBR = () => {
    console.log('Scraping Bleacher Report\n==================================================');

    var bleacherReportArticles = [];

    request("https://bleacherreport.com", (error, response, html) => {
      var $ = cheerio.load(html)

      $('.articleSummary').each(function () {
        var title = $(this).children('.commentary').children('h3').text();
        // console.log(title);
        var img = $(this).children('.articleMedia').children('a').children('img').attr('src');
        // console.log(img);
        var link = $(this).children('.articleMedia').children('a').attr('href');
        // console.log(link);
        var newArticle = {
          title: title,
          img: img,
          link: link
        }
        bleacherReportArticles.push(newArticle);

      });

      console.log(bleacherReportArticles);
      this.setState({ data: bleacherReportArticles }, () => console.log(this.state));
    });
  }

  ///billboard scrape
  scrapeNYT = () => {
    console.log('Scraping Bleacher Report\n==================================================');

    var nytArticles = [];

    request("https://www.nytimes.com/", (error, response, html) => {
      var $ = cheerio.load(html)

      $(".story-heading").each(function () {
        var title = $(this).children('h2').childrentext();
        // console.log(title);
        // var img = $(this).children('.articleMedia').children('a').children('img').attr('src');
        // console.log(img);

        var link = $(this).children('h2').children('a').attr('href');
        // console.log(link);
        var newArticle = {
          title: title,
          // img: img,
          link: link
        }
        nytArticles.push(newArticle);

      });

      console.log(nytArticles);
      this.setState({ data: nytArticles }, () => console.log(this.state));
    });
  }


  handleAddItemChange = (event) => {
    this.setState({ newItem: event.target.value });
  }

  addItem = (event) => {
    event.preventDefault()
    firebase.database().ref('/to-do-list').push({
      item: this.state.newItem,
      uid: this.props.uid
    })
    document.getElementById("add-item-form").reset();
  }

  deleteItem = (key) => {
    firebase.database().ref('/to-do-list').child(key).remove();
  }

  showFilters = () => {
    this.setState({
      showFilters: true,
      showSaved: false,
    });
  }

  showSaved = () => {
    this.setState({
      showSaved: true,
      showFilters: false
    });
  }

  saveArticle = () => {
    this.setState({
      saved: true
    })
  }

  showArticles = () => {
    return this.state.data.map((eachArticle, key) => (
      <div className="eachArticle">
        <a href={eachArticle.link} target="_blank">
          <img className="imgSteez" key={eachArticle.key} src={eachArticle.img}></img>
          <br></br>
          <h3 className="steezArticle" key={eachArticle.key}>{eachArticle.title}</h3>
        </a>
        <span className="bookmark-article" uk-icon="bookmark" onClick={this.saveArticle}></span>
      </div>

    ))
  }

  render() {

    // const listItems = this.props.items.map((eachItem, key) =>
    //   <p key={eachItem.key}>{eachItem.item} <button onClick={() => this.deleteItem(eachItem.key)}>x</button></p>
    // );

    return (
      <div>
        <button className="topic-btn" onClick={this.scrapeBR}>Sports</button>
        <button className="topic-btn" onClick={this.scrapeNYT}>Current Events</button>
        <button className="topic-btn" onClick={this.scapeComics}>Tech</button>
        <button className="topic-btn" onClick={this.scrapeBillboard}>Music</button>
        <button className="topic-btn" onClick={this.scrapeBillboard}>World News</button>
        <button className="topic-btn" onClick={this.scrapeBillboard}>Comic strips</button>
        <button className="topic-btn" onClick={this.scrapeBillboard}>Conspiracy Theroy</button>
        <button className="topic-btn" onClick={this.scrapeBillboard}>Health</button>
        <button className="topic-btn" onClick={this.scrapeBillboard}>Finance</button>
        <button className="topic-btn" onClick={this.scrapeBillboard}>Fake News</button>
        <button className="topic-btn" onClick={this.scrapeBR}>Sports</button>
        <button className="topic-btn" onClick={this.getNYTData}>Current Events</button>
        <button className="topic-btn" onClick={this.scrapeBillboard}>Tech</button>
        <button className="topic-btn" onClick={this.scrapeBillboard}>Music</button>
        <button className="topic-btn" onClick={this.scrapeBillboard}>World News</button>
        <button className="topic-btn" onClick={this.scrapeBillboard}>Comic strips</button>
        <button className="topic-btn" onClick={this.scrapeBillboard}>Conspiracy Theroy</button>
        <button className="topic-btn" onClick={this.scrapeBillboard}>Health</button>
        <button className="topic-btn" onClick={this.scrapeBillboard}>Finance</button>
        <button className="topic-btn" onClick={this.scrapeBillboard}>Fake News</button>
        <div className="allArticles">
          {this.showArticles()}
        </div>
      </div>
    )
  }
}
