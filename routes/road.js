let express = require('express');
var fs = require('fs');
let router = express.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
    let s = parseInt(req.query.start);
    let e = parseInt(req.query.end);
    if (s > e) {
        res.send({err:"起始索引不能比结束索引大"});
        return;
    }
    fs.readFile('data/drivingdatarealposbaidu.txt', 'utf-8', function (err, data) {
        let result;
        if (err) {
            res.error(err)
        } else {
            let lines = data.split("\n");
            fs.readFile('data/Results.txt', 'utf-8', function (err, data1) {
                if (err) {
                    res.error(err);
                    return;
                }
                let linesCategory = data1.split("\n");
                result = [];
                for (let i = s; i < e; i++) {
                    result.push({pos: lines[i], category: linesCategory[i]});
                }
                let j = JSON.stringify(result);
                res.send(j);
            })
        }
    });
});

module.exports = router;