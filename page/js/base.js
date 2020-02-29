let tagsCloud = new Vue({
    el: "#tags_cloud",
    data: {
        tags: [],

    },
    computed: {
        randomColor() {
            return function () {
                let red = Math.random() * 205 + 50;
                let green = Math.random() * 205 + 50;
                let blue = Math.random() * 205 + 50;
                return "rgb( " + red + " ," + green + "," + blue + " )";
            }
        },
        randomSize() {
            return function () {
                let size = Math.random() * 13 + 12;
                return size + "px";
            }
        }
    },
    created() {
        // 请求
        axios({
            url: "/getTagsCloud",
            method: "get"
        }).then(resp => {
            // console.log(resp);
            // 操作较复杂，最后再写
            for (let i = 0; i < resp.data.data.length; i++) {
                resp.data.data[i].link = "index.html?tagId=" + resp.data.data[i].id;
            }
            tagsCloud.tags = resp.data.data;
        })
    }
})

let HotBlogs = new Vue({
    el: ".hot-blogs",
    data: {
        blogTitles: []
    },
    created() {
        axios({
            url: "/getHotBlogs?limit=3",
            method: "get"
        }).then(resp => {
            // console.log(resp.data.data);
            for (let i = 0; i < resp.data.data.length; i++) {
                resp.data.data[i].link = "blog_detail.html?bid=" + resp.data.data[i].id;
            }
            HotBlogs.blogTitles = resp.data.data;
        })
    }
})

let newComments = new Vue({
    el: '.new-comments',
    data: {
        comments: []
    },
    created() {
        axios({
            url: "/getNewComments?limit=3",
            method: "get"
        }).then(resp => {
            for (let i = 0; i < resp.data.data.length; i++) {
                resp.data.data[i].user = resp.data.data[i].user_name;
                resp.data.data[i].date = resp.data.data[i].ctime;
                resp.data.data[i].content = resp.data.data[i].comments;
            }
            newComments.comments = resp.data.data;
        })
    }
})