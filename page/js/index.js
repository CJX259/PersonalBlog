
let everyDay = new Vue({
    el: "#every_day",
    data: {
        content: "Loading~~~"
    },
    computed: {
        getContent: function () {
            return this.content;
        }
    },
    created: () => {
        // 请求数据
        axios({
            url: "/queryEveryDay",
            method: "get"
        }).then(resp => {
            everyDay.content = resp.data.data.content;
        }).catch(error => {
            console.log(error);
        })
    }
})
let blogList = new Vue({
    el: "#blog-list",
    data: {
        // 每页展示三个就好
        page: 1,
        limit: 3,
        blogs: []
    },
    computed: {
        getPage() {
            return this.page;
        },
        getLimit() {
            return this.limit;
        }
    },
    created: () => {
        // 拿到tagId
        let tagId = "";
        if (location.search) {
            let params = location.search.split("?")[1].split("&");
            for (let i = 0; i < params.length; i++) {
                if (params[i].split("=")[0] == "tagId") {   //找到
                    tagId = params[i].split("=")[1];
                }
            }
        }
        if (tagId == "") {
            axios({
                url: "/getBlogByPage?offset=0&limit=3",
                method: "get"
            }).then(resp => {
                for (let i = 0; i < resp.data.data.length; i++) {
                    // 注意，分割的为中文逗号
                    resp.data.data[i].tags = resp.data.data[i].tags.split("，");
                }
                blogList.blogs = resp.data.data;
                for (let i = 0; i < resp.data.data.length; i++) {
                    blogList.blogs[i].link = "/blog_detail.html?bid=" + resp.data.data[i].id;
                }
            }).catch(error => {
                console.log(error);
            })
        } else {
            axios({
                url: "/queryBlogsByTagsByPage?offset=0&limit=3&tagId=" + tagId,
                method: "get"
            }).then(resp => {
                for (let i = 0; i < resp.data.data.length; i++) {
                    // 注意，分割的为中文逗号
                    resp.data.data[i].tags = resp.data.data[i].tags.split("，");
                }
                blogList.blogs = resp.data.data;
                for (let i = 0; i < resp.data.data.length; i++) {
                    blogList.blogs[i].link = "/blog_detail.html?bid=" + resp.data.data[i].id;
                }
            }).catch(error => {
                console.log(error);
            })
        }
    }
})

let pageTools = new Vue({
    el: "#pageTools",
    data: {
        total: 0,
        nowPage: 1,
        limit: 3,
        pageList: [],
        display : true
    },
    methods: {
        refresh: function () {
            let totalPage = Math.ceil(pageTools.total / pageTools.limit);
            pageTools.pageList = [];
            pageTools.pageList.push({ text: "首页", pageNum: 1 });
            if (pageTools.nowPage - 2 > 0) {
                pageTools.pageList.push({ text: pageTools.nowPage - 2, pageNum: pageTools.nowPage - 2 });
            }
            if (pageTools.nowPage - 1 > 0) {
                pageTools.pageList.push({ text: pageTools.nowPage - 1, pageNum: pageTools.nowPage - 1 });
            }
            pageTools.pageList.push({ text: pageTools.nowPage, pageNum: pageTools.nowPage });
            if (pageTools.nowPage + 1 <= totalPage) {
                pageTools.pageList.push({ text: pageTools.nowPage + 1, pageNum: pageTools.nowPage + 1 });
            }
            if (pageTools.nowPage + 2 <= totalPage) {
                pageTools.pageList.push({ text: pageTools.nowPage + 2, pageNum: pageTools.nowPage + 2 });
            }
            pageTools.pageList.push({ text: "尾页", pageNum: totalPage });
        }
    },
    computed: {
        changePage: function () {
            return function (pageNum) {
                // 获取url
                let tagId = "";
                if (location.search) {
                    let params = location.search.split("?")[1].split("&");
                    for (let i = 0; i < params.length; i++) {
                        if (params[i].split("=")[0] == "tagId") {   //找到
                            tagId = params[i].split("=")[1];
                        }
                    }
                }
                if (tagId == "") {
                    pageTools.nowPage = pageNum;
                    axios({
                        url: "/getBlogByPage?offset=" + (pageNum - 1) * pageTools.limit + "&limit=" + pageTools.limit,
                        method: "get"
                    }).then(resp => {
                        for (let i = 0; i < resp.data.data.length; i++) {
                            // 注意，分割的为中文逗号
                            resp.data.data[i].tags = resp.data.data[i].tags.split("，");
                        }
                        blogList.blogs = resp.data.data;
                        for (let i = 0; i < resp.data.data.length; i++) {
                            blogList.blogs[i].link = "/blog_detail.html?bid=" + resp.data.data[i].id;
                        }
                    });
                } else {
                    pageTools.nowPage = pageNum;
                    axios({
                        url: "/queryBlogsByTagsByPage?tagId=" + tagId + "&offset=" + (pageNum - 1) * pageTools.limit + "&limit=" + pageTools.limit,
                        method: "get"
                    }).then(resp => {
                        for (let i = 0; i < resp.data.data.length; i++) {
                            // 注意，分割的为中文逗号
                            resp.data.data[i].tags = resp.data.data[i].tags.split("，");
                        }
                        blogList.blogs = resp.data.data;
                        for (let i = 0; i < resp.data.data.length; i++) {
                            blogList.blogs[i].link = "/blog_detail.html?bid=" + resp.data.data[i].id;
                        }
                        // console.log(blogList.blogs);
                    })
                }


            }
        }
    },
    created: function () {
        let tagId = "";
        if (location.search) {
            let params = location.search.split("?")[1].split("&");
            for (let i = 0; i < params.length; i++) {
                if (params[i].split("=")[0] == "tagId") {   //找到
                    tagId = params[i].split("=")[1];
                }
            }
        }
        // 设置blog总数
        if (tagId == "") {
            axios({
                url: "/getTotalBlogs",
                method: "get"
            }).then(resp => {
                pageTools.total = resp.data.data[0].count;
                pageTools.refresh();
            });
        } else {
            axios({
                url: "/getBlogsByTagMappingCount?tagId=" + tagId,
                method: "get"
            }).then(resp => {
                pageTools.total = resp.data.data[0].count;
                pageTools.refresh();
            })
        }

    }
})

let searchBar = new Vue({
    el: ".search-bar",
    data: {
        search: ""
    },
    computed: {
        submitSearch() {
            return function () {
                axios({
                    url: "/search?search=" + this.search,
                    method: "get"
                }).then(resp => {
                    pageTools.display = false;
                    pageTools.refresh();
                    for (let i = 0; i < resp.data.data.blogList.length; i++) {
                        resp.data.data.blogList[i].link = "/blog_detail.html?bid=" + resp.data.data.blogList[i].id;
                        resp.data.data.blogList[i].tags = resp.data.data.blogList[i].tags.split("，");
                    }
                    blogList.blogs = resp.data.data.blogList;
                })
            }
        }
    }
})