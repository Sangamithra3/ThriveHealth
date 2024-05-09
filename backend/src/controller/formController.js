const FormData = require('../model/formModel');

const { PDFDocument, PDFImage, PDFSignature } = require('pdf-lib');
const { readFile, writeFile } = require('fs/promises');
const sharp = require('sharp');


const submitFormData = async (req, res) => {
    try {
        const { signature } = req.body;
        const signatureBuffer = Buffer.from(signature, 'base64');
        req.body.signature = signatureBuffer;

        const formData = new FormData(req.body);
        console.log(req.body)
        
        const savedFormData = await formData.save();
        res.status(201).json(savedFormData);
    } catch (error) {
        res.status(500).json({ error: 'Error saving form data' });
    }
};



const populatePDF = async (req, res) => {
    try {
         const fieldValues = await FormData.findOne().sort({ _id: -1 });
         console.log(fieldValues)

        const dateOfBirth = fieldValues.dateOfBirth instanceof Date ? fieldValues.dateOfBirth.toISOString().split('T')[0].replace(/-/g, '') : fieldValues.dateOfBirth;
        let sexValue;
        const sex = fieldValues.sex;
        if (sex === 'Female') {
          sexValue = 'F';
        } else {
          sexValue = 'M';
        }
        
        let noticeValue;
        const notice = fieldValues.notices;
        if(notice === 'Email'){
            noticeValue = 'email'
        }
        else if(notice === 'Regular Mail'){
            noticeValue = 'Regular Mail'
        }

        
        const dateOfBirthA = fieldValues.dateOfBirthA instanceof Date ? fieldValues.dateOfBirthA.toISOString().split('T')[0].replace(/-/g, '') : fieldValues.dateOfBirthA;
        let sexValueA;
        const sexA = fieldValues.sexA;
        if (sexA === 'Female') {
          sexValueA = 'Female';
        } else {
          sexValueA = 'Male';
        }
        let relationValue;
        const relationA = fieldValues.relationA;
        if (relationA === 'parent'){
            relationValue = 'Parent'
        }
        else if(relationValue === 'legal guardian'){
            relationValue = 'attorney for personal care'
        }
        else{
            relationValue = 'legal guardian'
        }
        const date = fieldValues.date instanceof Date ? fieldValues.date.toISOString().split('T')[0].replace(/-/g, '') : fieldValues.date;


        const pdfDoc = await PDFDocument.load(await readFile('D:/ThriveHealth/form.pdf'));
        const fieldNames = pdfDoc.getForm().getFields().map((f) => f.getName());
        const form = pdfDoc.getForm();

        form.getTextField('Last name of adult submitting form').setText(fieldValues.lastName);
        form.getTextField('First Name of adult submitting form').setText(fieldValues.firstName);
        form.getTextField('Second Name of adult patient').setText(fieldValues.secondName);
        form.getTextField('Health Number').setText(fieldValues.healthNumber)
        form.getTextField('Code').setText(fieldValues.versionCode)
        form.getTextField('Date of Birth 1').setText(dateOfBirth)
        form.getRadioGroup('Sex').select(sexValue);
        form.getTextField('Apartment No. (Mailing address)').setText(fieldValues.mailingAddress.apartmentNumber)
        form.getTextField('Street (Mailing address)').setText(fieldValues.mailingAddress.streetName)
        form.getTextField('CityTown (Mailing address)').setText(fieldValues.mailingAddress.city)
        form.getTextField('Postal Code (Mailing address)').setText(fieldValues.mailingAddress.postalCode)    
        form.getRadioGroup('Notices').select(noticeValue)
        if (fieldValues.residentAddress.isSameAsMailing == true){
            form.getCheckBox('Different residential address').check()
        }
        else{
           form.getTextField('Apartment (Residential address)').setText(fieldValues.residentAddress.apartmentNumber)
           form.getTextField('Street (Residential address)').setText(fieldValues.residentAddress.streetName)
           form.getTextField('CityTown (Residential address)').setText(fieldValues.residentAddress.city)
           form.getTextField('Postal code (Residential address)').setText(fieldValues.residentAddress.postalCode)
        }
        form.getTextField('Email Address of adult submitting form').setText(fieldValues.emailAddress)

        form.getTextField('Last Name A').setText(fieldValues.lastNameA);
        form.getTextField('First Name_A').setText(fieldValues.firstNameA);
        form.getTextField('Second Name_A').setText(fieldValues.secondNameA);
        form.getTextField('Health Number_A').setText(fieldValues.healthNumberA)
        form.getTextField('Version code_A').setText(fieldValues.versionCodeA)
        form.getTextField('Date of Birth yyyymmdd_2').setText(dateOfBirthA)
        form.getRadioGroup('Sex_A').select(sexValueA);
        form.getRadioGroup('Relationship A').select(relationValue);
        if (fieldValues.mailingAddressA.isSameAsSection1 == true){
            form.getCheckBox('Same Mailing_A').check()
        }
        else{
           form.getTextField('Apartment Mailing A').setText(fieldValues.mailingAddressA.apartmentNumberA)
           form.getTextField('Street Mailing A').setText(fieldValues.mailingAddressA.streetNameA)
           form.getTextField('CityTown_Mailing_A').setText(fieldValues.mailingAddressA.cityA)
           form.getTextField('Postal Code_A').setText(fieldValues.mailingAddressA.postalCodeA)
        }
        if (fieldValues.residentAddressA.isSameAsSection1 == true){
            form.getCheckBox('Same Residence_A').check()
        }
        else{
           form.getTextField('Apartment_Residence_A').setText(fieldValues.residentAddressA.apartmentNumberA)
           form.getTextField('Street_Residence_A').setText(fieldValues.residentAddressA.streetNameA)
           form.getTextField('CityTown_Residence_A').setText(fieldValues.residentAddressA.cityA)
           form.getTextField('Postal Code_Residence_A').setText(fieldValues.residentAddressA.postalCodeA)
        }
        if (fieldValues.myself == true){
            form.getCheckBox('myself').check()
        }
        if (fieldValues.children == true){
            form.getCheckBox('children').check()
        }
        if (fieldValues.dependentAdults == true){
            form.getCheckBox('dependent adults').check()
        }
        form.getTextField('Full name').setText(fieldValues.fullName);
        form.getTextField('Home or Mobile Telephone No').setText(fieldValues.homeNumber);
        form.getTextField('Work Telephone No').setText(fieldValues.workNumber);
        form.getTextField('Date signed').setText(date);    
        
        form.getTextField('Family Doctor Information').setText('Dr Farrell, 123 Hillview St, Oshawa, R1X 3D4')

        // const signature = fieldValues.signature;
        // if (!signature) {
        //     throw new Error('Signature data is missing');
        // }

        // const signatureBuffer = Buffer.from(signature, 'base64');
        // const pdfSignature = new PDFSignature();
        // pdfSignature.setAppearance(signatureBuffer);
        // const signatureField = pdfDoc.getForm().getSignature('Signature1');
        // signatureField.setSignature(pdfSignature);  
                

        const pdfBytes = await pdfDoc.save();
        await writeFile('output.pdf',pdfBytes);
        console.log('PDF CREATED');
      
    
        res.status(200)
            .contentType('application/pdf')
            .download('output.pdf');
    } catch (error) {
        console.error('Error populating PDF:', error);
        res.status(500).json({ error: 'Error populating PDF' });
    }
};


module.exports = {
    submitFormData,
    populatePDF
};
