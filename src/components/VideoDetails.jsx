var VideoDetails = (props) => (
  <div className="video-player-details">
    <span className = "tags">{props.video.snippet.tags ? props.video.snippet.tags.map((tag,index, collection)=> {
      if (index!==collection.length-1) {
        return `#${tag}, `;
      } else {
        return `#${tag}`
      }
    }): ''}</span>
    <h3>{props.video.snippet.title}</h3>
    <div>{props.video.snippet.description}</div>
  </div>
);

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
VideoPlayer.propTypes = {
  video: React.PropTypes.object.isRequired
};

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
window.VideoDetails = VideoDetails;
