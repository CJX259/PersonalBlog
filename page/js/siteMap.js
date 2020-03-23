let blogs = new Vue({
    el: "#blogs",
    data: {
        blogs: []
    },
    created() {
        axios({
            url: "/getAllBlogs",
            method: "get"
        }).then(resp => {
            for (let i = 0; i < resp.data.data.length; i++) {
                resp.data.data[i].link = "/blog_detail.html?bid=" + resp.data.data[i].id;
            }
            blogs.blogs = resp.data.data;
        })
    }
})