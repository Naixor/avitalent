import * as axios from 'axios';

function ValidationError(message, detail) {
    this.name = "ValidationError";
    this.message = (message || "");
    this.detail = detail;
}
ValidationError.prototype = Error.prototype;

function success(response) {
    if (!response.data) {
        throw new Error('未返回数据');
    }
    if (!response.data.hasOwnProperty('status') || response.data.status !== 0) {
        if (response.data.status === 422) {
            throw new ValidationError(response.data.msg, response.data.errors);
        }
        throw new Error(response.data.msg || 'API调用错误');
    }
    return response.data.data;
}

function fail(response) {
    if (response instanceof Error) {
        throw response;
    } else if (response.status === 422 || response.data.status === 422) {
        throw new ValidationError(response.data.msg, response.data.errors);
    } else {
        // that falls out of the range of 2xx
        var error = response.statusText || 'Unknown error';
        if (typeof response.data == 'string') {
            error = response.data;
        } else if (response.data && response.data.msg) {
            error = response.data.msg;
        }

        throw new Error(error);
    }
}

export function get(url, config) {
    return axios.get(url, config)
                .then(response => success(response), response => fail(response));
}

export function post(url, data, config) {
    return axios.post(url, data, config)
                .then(response => success(response), response => fail(response));
}

export function put(url, data, config) {
    return axios.put(url, data, config)
                .then(response => success(response), response => fail(response));
}

export function remove(url, config) {
    return axios.delete(url, config)
                .then(response => success(response), response => fail(response));
}
