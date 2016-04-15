import * as React from 'react';
import { assign } from 'lodash';

export class Title extends React.Component<PropsInf, {}> {
    private defaultProps = {
        level: 1,
        content: '',
        isUpperCase: false
    }
    constructor(props) {
        super(props);
    }
    getElementNode(): React.ReactElement<any> {
        let {
            level,
            content,
            isUpperCase,
            style
        }: any = assign({}, this.defaultProps, this.props);
        content = <p style={style}>{isUpperCase ? content.toUpperCase() : content}</p>;
        switch (level) {
            case 1: return <h1>{content}</h1>
            case 2: return <h2>{content}</h2>
            case 3: return <h3>{content}</h3>
            case 4: return <h4>{content}</h4>
            case 5: return <h5>{content}</h5>
            case 6: return <h6>{content}</h6>
            default: throw new Error(`Title level is invalid`)
        }
    }
    render() {
        return (
            this.getElementNode()
        )
    }
}

interface PropsInf {
    style?: any
    level?: number
    content?: string
    isUpperCase?: boolean
}