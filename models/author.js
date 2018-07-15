var mongoose = require('mongoose');
var moment = require('moment');
moment.locale('pt');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        max: 100
    },
    family_name: {
        type: String,
        required: true,
        max: 100
    },
    date_of_birth: {
        type: Date
    },
    date_of_death: {
        type: Date
    },
});

// Virtual for author's full name
AuthorSchema
    .virtual('name')
    .get(function () {
        return this.family_name + ', ' + this.first_name;
    });

// Virtual for author's URL
AuthorSchema
    .virtual('url')
    .get(function () {
        return '/catalog/author/' + this._id;
    });


// Virtual for author's format birth date
AuthorSchema
    .virtual('date_of_birth_formatted')
    .get(function () {
        return this.date_of_birth ? moment(this.date_of_birth).format('DD-MMM-YYYY') : '';
    });
// Virtual for author's format death date
AuthorSchema
    .virtual('date_of_death_formatted')
    .get(function () {
        return this.date_of_death ? moment(this.date_of_death).format('DD-MMM-YYYY') : '' ;
    });

// Virtual for author's life span format (death date - birth date)
AuthorSchema
    .virtual('life_span_formatted')
    .get(function () {
        var da = moment();
        var dn = moment(this.date_of_birth);
        return this.date_of_death == null ? da.diff(dn, 'years') : '';
    });



//Export model
module.exports = mongoose.model('Author', AuthorSchema);