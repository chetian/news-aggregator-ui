import React, {Component} from 'react';

const Headline = props => {
    const {headline, handleAnchor} = props;
    return (
        <div className="headline" onClick={handleAnchor}>{headline}</div>
    );
}

const AltHeadline = props => {
    const {text, handleAnchor} = props;
    if (text) {
        return (
            <div className="alt-headline" onClick={handleAnchor}>{text}</div>
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
    const source = story && story.source;
    return (
        <div className="story-header">
            <Logo source={story.source} />
            <CollapseIcon {...props} />
        </div>
    );
}

const HeroImage = props => {
    const {image, video, handleAnchor} = props;
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
            <div className="hero-image" style={style} onClick={handleAnchor}></div>
        );
    }
    return (
        <div></div>
    );
}

const StoryWrapper = props => {
    const {story, story: {
        source, headline, altHeadline, image, video, link
    }, isCollapsed, handleCollapse} = props;
    let clickableLink = link;

    if (link && source) {
        if (!link.includes(`${source}.com`)){
            clickableLink = `https://${source}.com${link}`;
        }
        else {
            return (<div></div>);
        }
    }
    // TODO: these functions are making it look like StoryWrapper needs to be moved into its own class (but its late, so tomorrow)
    const handleAnchor = () => {
        window.open(clickableLink, `_blank_${source}`);
    }

    if (!isCollapsed) {
        if (story && headline && image) {
            return (
                <div>
                    <StoryHeader
                        handleCollapse={handleCollapse}
                        story={story}
                        isCollapsed={isCollapsed}
                    />
                    <Headline handleAnchor={handleAnchor} headline={headline} />
                    <NewsSource source={source} />
                    <HeroImage handleAnchor={handleAnchor} video={video} image={image} />
                    <AltHeadline handleAnchor={handleAnchor} text={altHeadline} />
                </div>
            );
        } else {
            return (
                <div>Error loading: {source}, retrying...</div>
            );
        }
    }
    if (story && headline) {
        return (
            <div>
                <StoryHeader
                    handleCollapse={handleCollapse}
                    story={story}
                    isCollapsed={isCollapsed}
                />
                <Headline headline={headline} />
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

        // TODO: write bind function
        this.handleCollapse = this.handleCollapse.bind(this);
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
                    <StoryWrapper handleCollapse={this.handleCollapse} story={story} isCollapsed={isCollapsed} />
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