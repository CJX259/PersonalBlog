let blogDetail = new Vue({
    el: "#blogDetail",
    data: {
        content: {}
    },
    created() {
        // 分析url,取出bid
        let params = location.search.split("?")[1].split("&");
        for (let i = 0; i < params.length; i++) {
            if (params[i].split("=")[0] == "bid") {   //找到
                let bid = params[i].split("=")[1];
                axios({
                    url: "getBlogById?bid=" + bid,
                    method: "get"
                }).then(resp => {
                    let data = resp.data.data[0];
                    blogDetail.content = data;
                    // blogDetail.content
                })
            }
        }
    }
})

let blogComments = new Vue({
    el: "#blogComment",
    data: {
        commentList: [],
        commentsCount: 0
    },
    methods: {
        huifu(parentName) {
            addComment.parent = 1;
            addComment.parentName = parentName;
            location.href = "#addComment"
        }
    },
    created() {
        let params = location.search.split("?")[1].split("&");
        for (let i = 0; i < params.length; i++) {
            if (params[i].split("=")[0] == "bid") {   //找到
                let bid = params[i].split("=")[1];
                axios({
                    url: "/getCommentsByBlogId?bid=" + bid,
                    method: "get"
                }).then(resp => {
                    // console.log(resp.data.data);
                    //  要在这里给每个comment设上name，属性

                    
                    blogComments.commentList = resp.data.data;
                    // let data = resp.data.data[0];
                    // blogDetail.content = data;
                    // blogDetail.content
                })
                axios({
                    url: "/getCommentsCountByBlogId?bid=" + bid,
                    method: "get"
                }).then(resp => {
                    blogComments.commentsCount = resp.data.data[0].count;
                })
            }
        }

    }
})

let addComment = new Vue({
    el: "#addComment",
    data: {
        randomSvg: "",
        rightCode: "",
        // commentId: 0,
        name: "",
        email: "",
        comment: "",
        inputRandomCode: "",
        parentName: "0",
        parent: -1
    },
    methods: {
        changeCode() {
            axios({
                url: "/getRandomCode",
                method: "get"
            }).then(resp => {
                this.randomSvg = resp.data.data.data;
                this.rightCode = resp.data.data.text;
            }).catch(e => {
                console.log(e);
            })
        },
        sendComment() {
            if (this.name == "" || this.email == "" || this.comment == "" || this.inputRandomCode == "") {
                alert("内容不能为空");
                return;
            }
            if (this.inputRandomCode.toLowerCase() != this.rightCode.toLowerCase()) {
                alert("验证码错误");
                return;
            }
            let bid = 0;
            let params = location.search.split("?")[1].split("&");
            for (let i = 0; i < params.length; i++) {
                if (params[i].split("=")[0] == "bid") {   //找到
                    bid = params[i].split("=")[1];
                }
            }
            axios({
                url: "/sendComment?bid=" + bid + "&parent=" + this.parent + "&name=" + this.name + "&email=" + this.email + "&comment=" + this.comment + "&parentName=" + this.parentName,
                method: "get"
            }).then(resp => {
                alert("留言成功");
                addComment.name = "";
                addComment.email = "";
                addComment.comment = "";
                addComment.inputRandomCode = "";
                addComment.parentName = "0";
                location.reload();
            })
        }
    },
    created() {
        this.changeCode();
    }
})