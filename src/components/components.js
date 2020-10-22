import React, {Component} from 'react';

const Headline = props => {
    const {headline} = props;
    return (
        <div className="headline">{headline}</div>
    );
}

const AltHeadline = props => {
    const {text} = props;
    if (text) {
        return (
            <div className="alt-headline">{text}</div>
        );
    }
    return (
        <div></div>
    );

}

const NewsSource = props => {
    let {source} = props;
    return (
        <div className="source">Source: {source.toUpperCase()}</div>
    );
}

const Logo = props => {
    const {source} = props;
    return (
        <div className="logo-container">
            <div className="logo">
                <div className={source}></div>
            </div>
        </div>
    );
}

const CollapseIcon = props => {
    const {handleCollapse, isCollapsed} = props;
    return (
        <div className="collapse-icon-container" onClick={handleCollapse}>
            <div className="collapse-icon">{isCollapsed ? "+" : "−"}</div>
        </div>
    );
}

const StoryHeader = props => {
    const {story} = props;
    return (
        <div className="story-header">
            <Logo source={story.source} />
            <CollapseIcon {...props} />
        </div>
    );
}

const HeroImage = props => {
    const {image, video} = props;
    if (video && video.video) {
        return (
            <video className="video hero-image" poster={video.poster} autoPlay={true} muted={true} loop={true} playsInline={true} webkit-playsinline={true}>
                <source src={video.video} type="video/mp4" />
            </video>
        );
    }
    if (image) {
        const style = {
            backgroundSize: '100%',
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat"
        };
        return (
            <div className="hero-image" style={style}></div>
        );
    }
    return (
        <div></div>
    );
}

const StoryWrapper = props => {
    const {story, isCollapsed, handleCollapse} = props;
    if (!isCollapsed) {
        if (story && story.source && story.headline && story.image) {
            return (
                <div>
                    <StoryHeader
                        handleCollapse={handleCollapse}
                        story={story}
                        isCollapsed={isCollapsed}
                    />
                    <Headline headline={story.headline} />
                    <NewsSource source={story.source} />
                    <HeroImage video={story.video} image={story.image} />
                    <AltHeadline text={story.altHeadline} />
                </div>
            );
        } else {
            return (
                <div>Error loading: {story.source}, retrying...</div>
            );
        }
    }
    if (story && story.source && story.headline) {
        return (
            <div>
                <StoryHeader
                    handleCollapse={handleCollapse}
                    story={story}
                    isCollapsed={isCollapsed}
                />
                <Headline headline={story.headline} />
            </div>
    );
    }
}

class Story extends Component {
    constructor(props) {
        super(props);
        const {story} = props;
        this.state = {
            story: story,
            isCollapsed: false
        };
    }

    handleCollapse() {
        this.setState({isCollapsed: !this.state.isCollapsed});
    }

    render() {
        const {story} = this.props;
        const {isCollapsed} = this.state;
        return (
            <div className={`story-wrapper ${isCollapsed ? "collapsed" : ""}`}>
                <div className="story">
                    <StoryWrapper handleCollapse={this.handleCollapse.bind(this)} story={story} isCollapsed={isCollapsed} />
                </div>
            </div>
        );
    }
}

export const NewsComponent = props => {
    const {data} = props
    const stories = data.map(story => {
        return (
            <li key={story.source}>
                <Story story={story} />
            </li>
        );
    });
    return (
        <ul>{stories}</ul>
    );
}