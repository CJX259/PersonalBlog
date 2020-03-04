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
        let bid = -1;
        axios({
            url: "/getCommentsByBlogId?bid=" + bid,
            method: "get"
        }).then(resp => {
            console.log(resp);
            blogComments.commentList = resp.data.data;
        });
        axios({
            url: "/getCommentsCountByBlogId?bid=" + bid,
            method: "get"
        }).then(resp => {
            blogComments.commentsCount = resp.data.data[0].count;
        });
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
            // about的bid固定为-1
            let bid = -1;
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