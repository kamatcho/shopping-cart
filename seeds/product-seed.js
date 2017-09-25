var mongoose = require('mongoose');
mongoose.connect('localhost:27017/shopping');

var Product = require('../models/product');

var products = [
    new Product ({
        imagePath : 'https://www.konami.com/kde_cms/eu_publish/uploads/pes2017andy-1024x576.jpg',
        title : 'Pes 2017',
        description : 'My Favourite Game',
        price : 100
    }),
    new Product ({
        imagePath : 'https://media.playstation.com/is/image/SCEA/fifa-17-standard-edition-two-column-01-ps4-us-03jun16?$MediaCarousel_Original$',
        title : 'Fifa 2017',
        description : 'Awesome Game',
        price : 300
    }),

    new Product ({
        imagePath : 'http://www.telegraph.co.uk/content/dam/motoring2/2015/12/02/1-2016-BMW-7-series-front-xlarge-xlarge_trans_NvBQzQNjv4BqrWYeUU_H0zBKyvljOo6zlkYMapKPjdhyLnv9ax6_too.jpg',
        title : 'Bmw',
        description : 'My Dream',
        price : 300
    })
];
var done = 0;
for (i = 0 ; i < products.length ; i ++){
    products[i].save(function (err, result) {
        done++;
        if (done === products.length) {
            exit()
        }
    })

}

function exit() {
    mongoose.disconnect();
}