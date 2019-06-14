import axios from 'axios';

export default {
    getStatus: function () {
        return axios.get('/rest/home/status');
    },
    getContent: function () {
        return axios.get('/rest/home/content');
    },
    getComponent: function () {
        return axios.get('/rest/home/component');
    }
};