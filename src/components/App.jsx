class App extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      currentVideo: props.videos ? props.videos[0] : window.exampleVideoData[0],
      videoList: props.videos,
      query: 'Stan Lee',
      lastSearch: Date.now(),
      auto: false
    };
    this.Auto = false;
    this.firstSearch = true;
  }

  searchTextChange(event) {
    if ((Date.now() >= this.state.lastSearch + 500) || this.firstSearch) {
      this.firstSearch = false;
      var query = event.target.value ;
      if (query !== this.state.query) {
        this.getVideos(query);
      }
    }
  }

  searchButtonClick(event) {
    if ((Date.now() >= this.state.lastSearch + 500) || this.firstSearch) {
      this.firstSearch = false;
      var query = event.target.parentNode.children[0].value ;
      if (query !== this.state.query) {
        this.getVideos(query);
      }
    }
  }

  videoListEntryClick (video) {
    var options = {
      key: window.YOUTUBE_API_KEY,
      videoID: video.id.videoId
    };

    this.props.getVideo(options, (videoData) => {
      this.setState({
        currentVideo: videoData,
        auto: this.Auto
      });
    });
  }

  render () {

    return (
      <div>
        <nav className="navbar">
          <div className="col-md-6 offset-md-3">
            <Search searchEvent={this.searchTextChange.bind(this)} searchClickEvent={this.searchButtonClick.bind(this)}/>
          </div>
        </nav>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video={this.state.currentVideo} autoplay={this.state.auto}/>
          </div>
          <div className="col-md-5">
            <VideoList videos={this.state.videoList} listEntryClickFn={this.videoListEntryClick.bind(this)} autoPlayClick={this.autoPlayClicked.bind(this)} />
          </div>
        </div>
      </div>
    );
  }


  componentDidMount () {
    this.getVideosAndCurrentVideo();
  }

  autoPlayClicked(event) {
    debugger;
    if (this.Auto) {
      event.target.innerHTML = "Turn On Autoplay";
      this.Auto = false;
    } else {
      event.target.innerHTML = "Turn Off Autoplay";
      this.Auto = true;
    }

  }

  getVideosAndCurrentVideo(q) {
    var options = {
      key: window.YOUTUBE_API_KEY,
      max: 10,
      query: q ? q : this.state.query
    };

    //use successCB to get the new videolist and video details

    this.props.searchYouTube(options, (data) => {
      options.videoID = data[0].id.videoId;
      this.props.getVideo(options, (videoData) => {
        console.log(data);
        console.log(videoData);
        this.setState({
          currentVideo: videoData,
          videoList: data,
          query: q,
          lastSearch: Date.now(),
          auto: this.Auto
        });
      });
    });

  }

  getVideos(q) {
    var options = {
      key: window.YOUTUBE_API_KEY,
      max: 10,
      query: q ? q : this.state.query
    };

    //use successCB to get the new videolist and video details

    this.props.searchYouTube(options, (data) => {
      this.setState({
        videoList: data,
        query: q,
        lastSearch: Date.now(),
        auto: this.Auto
      });
    });

  }
}


// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.App = App;
