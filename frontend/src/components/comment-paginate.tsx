declare var require: any;

import * as React from 'react';
import { FlatButton } from 'material-ui';
const HardwareKeyboardArrowLeft = require('material-ui/lib/svg-icons/hardware/keyboard-arrow-left');
const HardwareKeyboardArrowRight = require('material-ui/lib/svg-icons/hardware/keyboard-arrow-right');
import { get } from '../modules/utils/ajax';
import { assign } from 'lodash'; 
import {CommentList} from './comment-list';

const ReactPaginate = require('react-paginate');

export class CommentPaginate extends React.Component<PropsInf, StateInf> {
    static defaultProps = {
        dataUrl: '',
        perPage: 3,
        offset: 1
    }
    refs: {
        [key: string]: any
    }
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            perPage: this.props.perPage,
            offset: 1
        };
        this.getComments();
    }
    getComments() {
        if (this.props.dataUrl) {
            get(this.props.dataUrl, {
                data: {
                    expand: 'bloPosts',
                    limit: this.state.perPage,
                    page: this.state.offset
                }
            }).then((comments: CommentsInf) => {
                const state: any = assign({}, this.state, {comments: comments.blog.blogPosts.slice(this.state.offset, this.state.perPage)});
                this.setState(state);
            });
        }
    }
    handlePageClick(data) {
        let selected = data.selected;
        let offset = Math.ceil(selected * this.state.perPage);
        const state: any = assign({}, this.state, {offset});
        this.setState(state, () => {
            this.getComments();
        });
    }
    render() {
        return (
            <div>
                <CommentList comments={this.state.comments}/>
                <ReactPaginate previousLabel={<HardwareKeyboardArrowLeft/>}
                       nextLabel={<HardwareKeyboardArrowRight/>}
                       breakLabel={<a href="">...</a>}
                       pageNum={this.state.perPage}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       clickCallback={this.handlePageClick}
                       containerClassName={"paginate-container"}
                       pageClassName={"paginate-page"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"paginate-active"} />
                
            </div>
        )
    }
}

interface PropsInf {
    dataUrl: string
    perPage?: number
}
interface StateInf {
    comments: any[]
    perPage: number
    offset: number
}

interface CommentInf {
    content: {}
    createAt: string
    iconUrl: string
    title: string
    publicUrl: string
    publishedAt: string
    updatedAt: string
}

interface CommentsInf {
    blog: {
        blogPosts: CommentInf[]
        pagination: {
            blogPosts: {
                currentPage: number
                nextPage: number
                perPage: number
                previousPage: any
                totalCount: number
                totalPages: number
            }
        }
    }
}