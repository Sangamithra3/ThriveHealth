const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
    lastName: String,
    firstName: String,
    secondName: String,
    healthNumber: String,
    versionCode: String,
    dateOfBirth: Date,
    sex: String,
    mailingAddress: {
        apartmentNumber: String,
        streetName: String,
        city: String,
        postalCode: String,
    },
    residentAddress: {
        isSameAsMailing: Boolean,
        apartmentNumber: String,
        streetName: String,
        city: String,
        postalCode: String,
    },
    notices: String,
    emailAddress: String,

    lastNameA: String,
    firstNameA: String,
    secondNameA: String,
    healthNumberA: String,
    versionCodeA: String,
    dateOfBirthA: Date,
    sexA: String,
    mailingAddressA: {
        isSameAsSection1: Boolean,
        apartmentNumberA: String,
        streetNameA: String,
        cityA: String,
        postalCodeA: String,
    },
    residentAddressA: {
        isSameAsSection1: Boolean,
        apartmentNumberA: String,
        streetNameA: String,
        cityA: String,
        postalCodeA: String,
    },
    relation: String,
    myself: Boolean,
    children: Boolean,
    dependentAdults: Boolean,
    fullName: String,
    homeNumber: String,
    workNumber: String,
    date: Date,
    signature:Buffer
});

const FormData = mongoose.model('FormData', formDataSchema)

module.exports = FormData;
