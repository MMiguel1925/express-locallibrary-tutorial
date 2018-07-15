var mongoose = require('mongoose');
var moment = require('moment');
moment.locale('pt');
var Schema = mongoose.Schema;

var BookInstanceSchema = new Schema({
    book: {
        type: Schema.ObjectId,
        ref: 'Book',
        required: true
    }, //reference to the associated book
    imprint: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Available', 'Maintenance', 'Loaned', 'Reserved'],
        default: 'Maintenance'
    },
    due_back: {
        type: Date,
        default: Date.now
    }
});

// Virtual for bookinstance's URL
BookInstanceSchema
    .virtual('url')
    .get(function () {
        return '/catalog/bookinstance/' + this._id;
    });

// Virtual for bookinstance's format date dd-mm-yyyy
BookInstanceSchema
    .virtual('due_back_formatted')
    .get(function () {
        return moment(this.due_back).format('DD-MMM-YYYY');
    });

// Virtual for bookinstance's format date mmmmm d, yyyy
BookInstanceSchema
    .virtual('due_back_formatted_ext')
    .get(function () {
        return moment(this.due_back).format('D MMMM, YYYY');
    });

//Export model
module.exports = mongoose.model('BookInstance', BookInstanceSchema);