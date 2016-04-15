export interface ListItem {
    tag: string
    link: string
}

export interface AVI_URL {
    LEFT_ITEMS: string
}

class MockURL implements AVI_URL {
    LEFT_ITEMS = '/get/leftitems';
    COMMENTS = '/get/comments';
}

export var MOCK = new MockURL();