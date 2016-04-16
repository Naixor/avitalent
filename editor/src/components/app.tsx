import * as React from 'react';
import { AppBar, Styles, IconButton } from 'material-ui';

import { Box, BoxState } from './box';
import { AviLeftNav } from './avi-left-nav';
import { AviLeft } from './avi-left';
import { MainView } from './main-view';
import { Title } from './title';
import { Layout } from './layout';

import { ListItem, MOCK } from '../modules/datastructures';
import { get } from '../modules/utils/ajax';

import { assign, merge, extend } from 'lodash';

import { View, Container } from './navigation-view';
import { CommentPaginate } from './comment-paginate';

interface AppProps {}

interface AppState {
    smallMode: boolean
    leftOpen: boolean
    leftItems: ListItem[]
}

const RightStyle = {
    flex: 3,
    transition: 'all .5s'
}

const layoutJson = {
    Box: {
        children:[
            {
                name: 'AviLeft|AviLeftNav',
                style: {
                    flex: 1,
                    minWidth: '240px',
                    maxWidth: '340px',
                    backgroundColor: Styles.Colors.darkBlack
                },
                card: {
                    title: 'AVITALENT GROUP PROVIDES BEST PILOT JOBS , AVIATION SERVICES',
                    logoSrc: 'images/logo.jpg',
                    logoAlt: 'WWW.AVITALENT.NET'
                }
            },
        ]
    }
}

class App extends React.Component<AppProps, AppState> {
    private appBarStyle = {
        position: 'fixed',
        zIndex: 1000
    }
    private bigModeLeftStyle: any;
    refs: {
        [key: string]: Element
        left: HTMLDivElement
    }
    constructor(props) {
        super(props);
        this.bigModeLeftStyle = {flex: 1,minWidth: '240px',maxWidth: '340px',backgroundColor: Styles.Colors.darkBlack};
        this.state = {
            smallMode: false,
            leftOpen: false,
            leftItems: []
        };
        this.getItemData(((items) => {
            this.setState({
                smallMode: this.state.smallMode,
                leftOpen: false,
                leftItems: items
            });
        }).bind(this));
    }
    getItemData(callback) {
        get(MOCK.LEFT_ITEMS, {}).then(callback);
    }
    handleModeChange(state: BoxState): void {
        let _state: any = assign({}, this.state, {smallMode: state.smallMode});
        this.setState(_state);
    }
    handleOpen(): void {
        this.setState({
            smallMode: this.state.smallMode,
            leftOpen: !this.state.leftOpen,
            leftItems: this.state.leftItems
        });
    }
    requestChange(open) {
        let _state: any = assign({}, this.state, {leftOpen: open});
        this.setState(_state);
    }
    getLeftStyle() {
        return !this.state.smallMode ? {flex: 1,minWidth: '240px',maxWidth: '340px',backgroundColor: Styles.Colors.darkBlack}
                                    : {flex: 1, minWidth: '0px',maxWidth: '0px', backgroundColor: Styles.Colors.darkBlack};
    }
    render() {
        if (this.state.smallMode) {
            this.bigModeLeftStyle.maxWidth = '0px';
            this.bigModeLeftStyle.minWidth = '0px';    
        } else {
            this.bigModeLeftStyle.maxWidth = '340px';
            this.bigModeLeftStyle.minWidth = '240px';
        }

        return (
            <Box minWidth="700" onModeChange={this.handleModeChange.bind(this)}>
                <AviLeft style={this.bigModeLeftStyle} items={this.state.leftItems} card={layoutJson.Box.children[0].card}/>
                <AviLeftNav open={this.state.leftOpen} onRequestChange={open => this.requestChange(open)} items={this.state.leftItems}/>
                <div style={RightStyle}>
                    <AppBar
                        style={this.appBarStyle}
                        title="avitalent"
                        showMenuIconButton={this.state.smallMode}
                        onLeftIconButtonTouchTap={this.handleOpen.bind(this)}/>
                    <div className="parent-view">
                        <Container>
                            <View className="child-view" style={{
                                backgroundImage: 'url(images/pilot-job.jpg)',
                                backgroundColor: 'transparent',
                                backgroundSize: 'cover',
                                backgroundPosition: '50% 50%',
                                backgroundRepeat: 'no-repeat'
                            }} locator={"link0"}>
                                <Layout raw={"center"} column={"center"}>
                                    <div className="child-view-container">
                                        <Title style={{
                                            color: 'white',
                                            textAlign: 'center',
                                        }} content="Avitalent Group" isUpperCase={true}/>
                                        <Title style={{
                                            color: 'white',
                                            textAlign: 'center',
                                        }} level={5} content={'International Aviation Support Services.'}/>
                                    </div>                            
                                </Layout>
                            </View>
                            <View className="child-view"
                                locator="/polit/job/xiangpeng"
                                style={{
                                    "backgroundImage": "url(images/pilot-job1.jpg)",
                                    "backgroundColor": "transparent",
                                    "backgroundSize": "cover",
                                    "backgroundPosition": "50% 50%",
                                    "backgroundRepeat": "no-repeat"
                                }}>
                                <div className="child-view-container">
                                    <Title style={{
                                        color: 'white',
                                        textAlign: 'left'
                                    }} content={"2016年祥鹏航空大学生公费飞行学员校园招聘"}/>
                                    <Title style={{
                                        color: 'white',
                                        textAlign: 'left',
                                        fontSize: '0.5rem'
                                    }} content={"请填写以下报名信息"}/>
                                    
                                </div>
                            </View>
                            <View className="child-view"
                                locator="/polit/job/news">
                                <Title style={{
                                    color: "white",
                                    textAlign: "left"
                                }} content="Aviation News Daily" isUpperCase={true}/>
                                <CommentPaginate dataUrl={MOCK.COMMENTS} perPage={4}/>
                            </View>
                            <View className="child-view"
                                locator="/polit/job/B737_Captain_Job"
                                style={{
                                    "backgroundImage": "url(images/18.jpg)",
                                    "backgroundColor": "transparent",
                                    "backgroundSize": "auto",
                                    "backgroundPosition": "50% 50%",
                                    "backgroundRepeat": "repeat"
                                }}>
                                      
                            </View>
                            <View className="child-view"
                                locator="/polit/job/A320_A330_Captain_Job"
                                style={{
                                    "backgroundImage": "url(images/17.jpg)",
                                    "backgroundColor": "transparent",
                                    "backgroundSize": "auto",
                                    "backgroundPosition": "50% 50%",
                                    "backgroundRepeat": "repeat"
                                }}>
                                      
                            </View>
                            <View className="child-view"
                                locator="/polit/job/B787_Captain_Job"
                                style={{
                                    "backgroundImage": "url(images/18.jpg)",
                                    "backgroundColor": "transparent",
                                    "backgroundSize": "auto",
                                    "backgroundPosition": "50% 50%",
                                    "backgroundRepeat": "repeat"
                                }}>
                                      
                            </View>
                            <View className="child-view"
                                locator="/polit/job/ERJ170_175_190_195_Captain_Job"
                                style={{
                                    "backgroundImage": "url(images/17.jpg)",
                                    "backgroundColor": "transparent",
                                    "backgroundSize": "auto",
                                    "backgroundPosition": "50% 50%",
                                    "backgroundRepeat": "repeat"
                                }}>
                                      
                            </View>
                            <View className="child-view"
                                locator="/polit/job/signingup">
                                      
                            </View>
                            <View className="child-view"
                                locator="/polit/job/pilot_jobs">
                                      
                            </View>
                            <View className="child-view"
                                locator="/polit/job/collect_information">
                                      
                            </View>
                            <View className="child-view"
                                locator="/polit/job/upload_document">
                                      
                            </View>
                            <View className="child-view"
                                locator="/polit/job/about"
                                style={{
                                    "backgroundImage": "url(images/cartographer.jpg)",
                                    "backgroundColor": "transparent",
                                    "backgroundSize": "auto",
                                    "backgroundPosition": "50% 50%",
                                    "backgroundRepeat": "repeat"
                                }}>
                                      
                            </View>
                        </Container>

                    </div>
                </div>
            </Box>
        )
    }
}

export const app: any = App;