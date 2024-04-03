const { on } = require("nodemon");
const db = require("../models");
const Comment = db.Comment;
const User = db.User;
const Order = db.Order;
const OrderItem = db.OrderItem;
const Op = db.Sequelize.Op;
const controller = {};

//add comment and rating
controller.addcomment = async (req, res) => {
    const { username, rating, content, productId, orderId } = req.body;
    const findcomment = await Comment.findOne({
        where: { username: username,
                 orderId: orderId,
                 productId: productId
    }})
    const findorder = await OrderItem.findOne({
        attributes: ['orderId', 'productId'],
        include: [{
            model: Order,
            attributes: ['userId']
        }],
        where: { orderId: orderId,
                 productId: productId
    }})
    await User.findOne({ attributes: ['id'],
           where: { username: username }})
    .then(async (data) => {
        if((findcomment==null)&&(findorder!=null)&&(findorder.order.userId==data.id)){
            const view = {
                username: username,
                rating: rating,
                content: content,
                userId: data.id,
                productId: productId,
                orderId: orderId
            }
            console.log("go")
            await Comment.create(view)
                .then(() => {
                    res.send("Add comment success.")
                }).catch((err) => res.status(500).send(err))
        }else{
            res.status(400).json("fail to add comment")
        }
    }).catch((err) => res.status(500).send(err))
}


//comment rating
controller.status = async (req, res) => {

    try{
        const pid = req.params.pid
        const five_star = await Comment.count({
            where: {
                productId: pid,
                rating: 5 // count rating = 5
            }
        })
        const four_star = await Comment.count({
            where: {
                productId: pid,
                rating: 4 // count rating = 4
            }
        })
        const three_star = await Comment.count({
            where: {
                productId: pid,
                rating: 3 // count rating = 3
            }
        })
        const two_star = await Comment.count({
            where: {
                productId: pid,
                rating: 2 // count rating = 2
            }
        })
        const one_star = await Comment.count({
            where: {
                productId: pid,
                rating: 1 // count rating = 1
            }
        })

        const status = {
            "id": req.params.pid,
            "five_star": JSON.stringify(five_star),
            "four_star": JSON.stringify(four_star),
            "three_star": JSON.stringify(three_star),
            "two_star": JSON.stringify(two_star),
            "one_star": JSON.stringify(one_star)
        }
        res.send(status)
    }
    catch(err){
        res.status(500).send(err)
    }
};

//show comment 
controller.commentlist = (req, res) => {
    const { commentpointer, id } = req.body;
    var setoffset = 0;
    var setlimit = 3;
    if(commentpointer>0){
        var setoffset = 3 + (commentpointer-1);
        var setlimit = 1;
    }
    Comment.findAll({
        attributes: ['username', 'rating', 'content'],
        where: {
            productId: id
        },
        offset: setoffset,
        limit: setlimit
    }).then((data) => {
        res.send(data)
    }).catch((err) => {
        res.status(400).send(err)
    })
}


module.exports = controller;