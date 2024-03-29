const { on } = require("nodemon");
const db = require("../models");
const comment = db.Comment;
const Op = db.Sequelize.Op;
const controller = {};

//add comment and rating
controller.addcomment = (req, res) => {
    comment.create(req.body).then(() => {
        }).catch((err) => res.status(500).send(err))
}


//comment rating
controller.status = async (req, res) => {

    try{
        const pid = req.params.pid
        const five_star = await comment.count({
            where: {
                productId: pid,
                rating: 5 // count rating = 5
            }
        })
        const four_star = await comment.count({
            where: {
                productId: pid,
                rating: 4 // count rating = 4
            }
        })
        const three_star = await comment.count({
            where: {
                productId: pid,
                rating: 3 // count rating = 3
            }
        })
        const two_star = await comment.count({
            where: {
                productId: pid,
                rating: 2 // count rating = 2
            }
        })
        const one_star = await comment.count({
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
    const setoffset = 0;
    const setlimit = 2;
    if(commentpointer>0){
        const setoffset = 2 + 1*(commentpointer-1);
        const setlimit = 1;
    }
    comment.findAll({
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