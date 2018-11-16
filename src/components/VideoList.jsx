class VideoList extends React.Component {
  constructor (props) {
    super(props);

    // PropTypes tell other developers what `props` a component expects
    // Warnings will be shown in the console when the defined rules are violated
  }

  render () {
    var videoList = [];
    if (this.props.videos) {
      for (var i = 0; i < this.props.videos.length; i++) {
        videoList.push(<VideoListEntry video={this.props.videos[i]} listEntryClickFn={this.props.listEntryClickFn} key={i}/>);
      }
    }
    return (<div className="video-list">
      <div>
        <button type="button" autoComplete="off" onClick={this.props.autoPlayClick} className="btn btn-primary" data-toggle="button" aria-pressed="false" >
          Turn On Autoplay
        </button>
      </div>
    {videoList}

    </div>);

  }
  static propTypes () {
    videos: React.PropTypes.array.isRequired;
  }

}
// In the ES6 spec, files are "modules" and do not share a top-level scope.
// `var` declarations will only exist globally where explicitly defined.
window.VideoList = VideoList;
