import * as React from 'react';
import { CardHeader, Avatar } from 'material-ui';

interface PropsInf {
    comments?: any[]
}

interface StateInf {

}

export class CommentList extends React.Component<PropsInf, StateInf> {
    private nowYear = new Date().getFullYear();
    static defaultProps = {
        comments: []
    }
    refs: {
        [key: string]: any
    }
    constructor(props) {
        super(props);
        this.state = {};
    }
    getTimeStamp(str: string) {
        let stampArr = /^(\d{4})\-(\d{2})\-(\d{2})\S+/.exec(str);
        const ch = ["年", "月", "日"];
        if (stampArr) {
            if (+stampArr[1] === this.nowYear) {
                return stampArr.slice(2).map((str, i) => +str+ch[i+1]).join("");
            }
            return stampArr.slice(1).map((str, i) => +str+ch[i]).join("");
        }
        return "";
    }
    renderComments() {
        return this.props.comments.map((comment, idx) => {
            return <Comment key={idx} title={comment.title} time={this.getTimeStamp(comment.publishedAt)} avatar={comment.iconUrl}/>
        });
    }
    render() {
        return (
            <div>
                {this.renderComments()}
            </div>
        )
    }
}

interface CommentPropsInf {
    title?: string
    time?: string
    avatar?: string
    href?: string
}

interface CommentStateInf {

}

export class Comment extends React.Component<CommentPropsInf, CommentStateInf> {
    static defaultProps = {
        title: '',
        time: '',
        avatar: '',
        href: ''
    }
    refs: {
        [key: string]: any
    }
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <a href={this.props.href} style={{width: '100%', height: '100%', display: 'inline-block'}}>
                <CardHeader
                    style={{height: 'auto'}}
                    title={this.props.title}
                    titleStyle={{color: "rgb(85,85,85)", fontWeight: "normal", fontSize: ".8rem"}}
                    subtitle={this.props.time}
                    subtitleStyle={{color: "rgb(139, 197, 63)", fontStyle: "italic", fontSize: ".5rem"}}
                    avatar={<Avatar src={this.props.avatar} size={100}/>}/>
            </a>
        )
    }
}