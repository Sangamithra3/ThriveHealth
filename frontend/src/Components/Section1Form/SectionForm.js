import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';


const SectionForm = () => {
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        secondName: '',
        healthNumber: '',
        versionCode: '',
        dateOfBirth: '',
        sex: '',
        mailingAddress: {
            apartmentNumber: '',
            streetName: '',
            city: '',
            postalCode: '',
        },
        residentAddress: {
            isSameAsMailing: false,
            apartmentNumber: '',
            streetName: '',
            city: '',
            postalCode: '',
        },
        notices: '',
        emailAddress: '',

        lastNameA: '',
        firstNameA: '',
        secondNameA: '',
        healthNumberA: '',
        versionCodeA: '',
        dateOfBirthA: '',
        sexA: '',
        mailingAddressA: {
            isSameAsSection1:false,
            apartmentNumberA: '',
            streetNameA: '',
            cityA: '',
            postalCodeA: '',
        },
        residentAddressA: {
            isSameAsSection1: false,
            apartmentNumberA: '',
            streetNameA: '',
            cityA: '',
            postalCodeA: '',
        },
        relationA: '',

        myself: false,
        children: false,
        dependentAdults: false,
        fullName: '',
        homeNumber: '',
        workNumber: '',
        date: '',
        signature: ''
    });


        
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'checkbox') {
            if (name === 'residentAddress.isSameAsMailing') {
                setFormData({
                    ...formData,
                    residentAddress: {
                        ...formData.residentAddress,
                        isSameAsMailing: checked,
                        apartmentNumber: checked ? formData.mailingAddress.apartmentNumber : '',
                        streetName: checked ? formData.mailingAddress.streetName : '',
                        city: checked ? formData.mailingAddress.city : '',
                        postalCode: checked ? formData.mailingAddress.postalCode : '',
                    },
                });
            } else if (name === 'residentAddressA.isSameAsSection1') {
                setFormData({
                    ...formData,
                    residentAddressA: {
                        ...formData.residentAddressA,
                        isSameAsSection1: checked,
                        apartmentNumberA: checked ? formData.mailingAddress.apartmentNumber : formData.residentAddress.apartmentNumberA,
                        streetNameA: checked ? formData.mailingAddress.streetName : formData.residentAddress.streetNameA,
                        cityA: checked ? formData.mailingAddress.city : formData.residentAddress.cityA,
                        postalCodeA: checked ? formData.mailingAddress.postalCode : formData.residentAddress.postalCodeA,
                    },
                });
            } else if (name === 'mailingAddressA.isSameAsSection1') {
                setFormData({
                    ...formData,
                    mailingAddressA: {
                        ...formData.mailingAddressA,
                        isSameAsSection1: checked,
                        apartmentNumberA: checked ? formData.mailingAddress.apartmentNumber : '',
                        streetNameA: checked ? formData.mailingAddress.streetName : '',
                        cityA: checked ? formData.mailingAddress.city : '',
                        postalCodeA: checked ? formData.mailingAddress.postalCode : '',
                    },
                });
            } else {
                setFormData({
                    ...formData,
                    [name]: checked,
                });
            }
        } else if (name.startsWith('mailingAddress') || name.startsWith('residentAddress')) {
            const addressField = name.split('.')[1];
            const addressType = name.split('.')[0];
            setFormData({
                ...formData,
                [addressType]: {
                    ...formData[addressType],
                    [addressField]: value,
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };
    
    const signatureCanvasRef = useRef();


    const handleSaveSignature = (event) => {
        event.preventDefault(); 
        
        const signatureDataUrl = signatureCanvasRef.current.toDataURL();
        setFormData({
            ...formData,
            signature: signatureDataUrl 
        });
    };
       

    const handleClearSignature = (e) => {
        e.preventDefault(); 
        if (signatureCanvasRef.current) {
            signatureCanvasRef.current.clear();
            setFormData({
                ...formData,
                signature: '' 
            });
        }
    };
    


    const handleSave = async () => {
        try {
            // Save form data
            const saveResponse = await fetch('http://localhost:5000/api/saveFormData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
    
            if (!saveResponse.ok) {
                throw new Error('Failed to save form data');
            }
    
            alert('Form data saved successfully!');

            const pdfResponse = await fetch('http://localhost:5000/api/populatePdf');
    
            if (!pdfResponse.ok) {
                throw new Error('Failed to populate PDF');
            }
    
            const blob = await pdfResponse.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'output_form.pdf';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
    
            alert('PDF downloaded successfully!');
        } catch (error) {
            console.error('Error saving form data:', error);
            alert('An error occurred while saving form data. Please try again.');
        }
    };
       
    
    

    const handleCancel = () => {
        setFormData({
            lastName: '',
            firstName: '',
            secondName: '',
            healthNumber: '',
            versionCode: '',
            dateOfBirth: '',
            sex: '',
            mailingAddress: {
                apartmentNumber: '',
                streetName: '',
                city: '',
                postalCode: '',
            },
            residentAddress: {
                isSameAsMailing: false,
                apartmentNumber: '',
                streetName: '',
                city: '',
                postalCode: '',
            },
            notices: '',
            emailAddress: '',

            lastNameA: '',
        firstNameA: '',
        secondNameA: '',
        healthNumberA: '',
        versionCodeA: '',
        dateOfBirthA: '',
        sexA: '',
        mailingAddressA: {
            isSameAsSection1:false,
            apartmentNumberA: '',
            streetNameA: '',
            cityA: '',
            postalCodeA: '',
        },
        residentAddressA: {
            isSameAsSection1: false,
            apartmentNumberA: '',
            streetNameA: '',
            cityA: '',
            postalCodeA: '',
        },
        relationA: '',

        myself: '',
        children: '',
        dependentAdults: '',
        fullName: '',
        homeNumber: '',
        workNumber: '',
        date: '',
        });
    };
    
        

    return (
        <div className="container">
            <h3>Section 1 - I want to enroll myself with the family doctor identified in Section 4</h3>
            <form>
                <div className="horizontal">
                    <label>
                        Last Name:
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                    </label>
                    <label>
                        First Name:
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                    </label>
                    <label>
                        Second Name:
                        <input type="text" name="secondName" value={formData.secondName} onChange={handleInputChange} />
                    </label>
                </div>
                <div className="horizontal">
                    <label>
                        Health Number:
                        <input type="text" name="healthNumber" value={formData.healthNumber} onChange={handleInputChange} />
                    </label>
                    <label>
                        Version Code:
                        <input type="text" name="versionCode" value={formData.versionCode} onChange={handleInputChange} />
                    </label>
                </div>
                <div className="horizontal">
                    <label>
                        Date of Birth:
                        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} />
                    </label>
                    <div className="sex">
                        Sex:
                        <label>
                            <input type="radio" name="sex" value="Male" checked={formData.sex === 'Male'} onChange={handleInputChange} />
                            Male
                        </label>
                        <label>
                            <input type="radio" name="sex" value="Female" checked={formData.sex === 'Female'} onChange={handleInputChange} />
                            Female
                        </label>
                    </div>
                </div>
                <h4>Mailing Address</h4>
                <div className="horizontal">
                    <label>
                        Apartment Number:
                        <input type="text" name="mailingAddress.apartmentNumber" value={formData.mailingAddress.apartmentNumber} onChange={handleInputChange} />
                    </label>
                    <label>
                        Street Name:
                        <input type="text" name="mailingAddress.streetName" value={formData.mailingAddress.streetName} onChange={handleInputChange} />
                    </label>
                    <label>
                        City:
                        <input type="text" name="mailingAddress.city" value={formData.mailingAddress.city} onChange={handleInputChange} />
                    </label>
                    <label>
                        Postal Code:
                        <input type="text" name="mailingAddress.postalCode" value={formData.mailingAddress.postalCode} onChange={handleInputChange} />
                    </label>
                </div>
                <h4>Resident Address</h4>
                <div className="horizontal">
                    <label>
                        <input type="checkbox" name="residentAddress.isSameAsMailing" checked={formData.residentAddress.isSameAsMailing} onChange={handleInputChange} />
                        Same as Mailing Address
                    </label>
                </div>
                {!formData.residentAddress.isSameAsMailing && (
                    <div className="horizontal">
                        <label>
                            Apartment Number:
                            <input type="text" name="residentAddress.apartmentNumber" value={formData.residentAddress.apartmentNumber} onChange={handleInputChange} />
                        </label>
                        <label>
                            Street Name:
                            <input type="text" name="residentAddress.streetName" value={formData.residentAddress.streetName} onChange={handleInputChange} />
                        </label>
                        <label>
                            City:
                            <input type="text" name="residentAddress.city" value={formData.residentAddress.city} onChange={handleInputChange} />
                        </label>
                        <label>
                            Postal Code:
                            <input type="text" name="residentAddress.postalCode" value={formData.residentAddress.postalCode} onChange={handleInputChange} />
                        </label>
                    </div>
                )}
                <label>
                        Email Address:
                        <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleInputChange} />
                    </label>
                <h4>Send Notices from My Doctor's Office</h4>
                <div className="horizontal-2">
                    <label>
                    <input type="radio" name="notices" value="Email" checked={formData.notices==='Email'} onChange={handleInputChange}/>    
                        Email
                    </label>
                    <label>
                        <input type="radio" name="notices" value="Regular Mail" checked={formData.notices==='Regular Mail'} onChange={handleInputChange} />
                        Regular Mail
                    </label>                    
                </div>
            </form>
            <br></br>
            <br></br>
           <h3>Section 2 -  I want to enrol my child(ren) under 16 and/or dependent adult(s) with the family doctor identified in Section 4</h3>
            <form>
                <div className="horizontal">
                    <label>
                        Last Name:
                        <input type="text" name="lastNameA" value={formData.lastNameA} onChange={handleInputChange} />
                    </label>
                    <label>
                        First Name:
                        <input type="text" name="firstNameA" value={formData.firstNameA} onChange={handleInputChange} />
                    </label>
                    <label>
                        Second Name:
                        <input type="text" name="secondNameA" value={formData.secondNameA} onChange={handleInputChange} />
                    </label>
                </div>
                <div className="horizontal">
                    <label>
                        Health Number:
                        <input type="text" name="healthNumberA" value={formData.healthNumberA} onChange={handleInputChange} />
                    </label>
                    <label>
                        Version Code:
                        <input type="text" name="versionCodeA" value={formData.versionCodeA} onChange={handleInputChange} />
                    </label>
                </div>
                <div className="horizontal">
                    <label>
                        Date of Birth:
                        <input type="date" name="dateOfBirthA" value={formData.dateOfBirthA} onChange={handleInputChange} />
                    </label>
                    <div className="sex">
                        Sex:
                        <label>
                            <input type="radio" name="sexA" value="Male" checked={formData.sexA === 'Male'} onChange={handleInputChange} />
                            Male
                        </label>
                        <label>
                            <input type="radio" name="sexA" value="Female" checked={formData.sexA === 'Female'} onChange={handleInputChange} />
                            Female
                        </label>
                    </div>
                </div>

                <h4>Mailing Address</h4>
                <div className="horizontal">
                    <label>
                        <input type="checkbox" name="mailingAddressA.isSameAsSection1" checked={formData.mailingAddressA.isSameAsSection1} onChange={handleInputChange} />
                        Same as Section 1
                    </label>
                </div>
                {!formData.mailingAddressA.isSameAsSection1 && (
                    <div className="horizontal">
                        <label>
                            Apartment Number:
                            <input type="text" name="mailingAddressA.apartmentNumberA" value={formData.mailingAddressA.apartmentNumberA} onChange={handleInputChange} />
                        </label>
                        <label>
                            Street Name:
                            <input type="text" name="mailingAddressA.streetNameA" value={formData.mailingAddressA.streetNameA} onChange={handleInputChange} />
                        </label>
                        <label>
                            City:
                            <input type="text" name="mailingAddressA.cityA" value={formData.mailingAddressA.cityA} onChange={handleInputChange} />
                        </label>
                        <label>
                            Postal Code:
                            <input type="text" name="mailingAddressA.postalCodeA" value={formData.mailingAddressA.postalCodeA} onChange={handleInputChange} />
                        </label>
                    </div>
                )}
                
                <h4>Resident Address</h4>
                <div className="horizontal">
                    <label>
                        <input type="checkbox" name="residentAddressA.isSameAsSection1" checked={formData.residentAddressA.isSameAsSection1} onChange={handleInputChange} />
                        Same as Section 1
                    </label>
                </div>
                {!formData.residentAddressA.isSameAsSection1 && (
                    <div className="horizontal">
                        <label>
                            Apartment Number:
                            <input type="text" name="residentAddressA.apartmentNumberA" value={formData.residentAddressA.apartmentNumberA} onChange={handleInputChange} />
                        </label>
                        <label>
                            Street Name:
                            <input type="text" name="residentAddressA.streetNameA" value={formData.residentAddressA.streetNameA} onChange={handleInputChange} />
                        </label>
                        <label>
                            City:
                            <input type="text" name="residentAddressA.cityA" value={formData.residentAddressA.cityA} onChange={handleInputChange} />
                        </label>
                        <label>
                            Postal Code:
                            <input type="text" name="residentAddressA.postalCodeA" value={formData.residentAddressA.postalCodeA} onChange={handleInputChange} />
                        </label>
                    </div>
                )}
                
                <h4>I am this person's</h4>
                <div className="horizontal-2">
                    <label>
                    <input type="radio" name="relationA" value="parent" checked={formData.relationA==='parent'} onChange={handleInputChange}/>    
                        Parent
                    </label>
                    <label>
                        <input type="radio" name="relationA" value="legal guardian" checked={formData.relationA==='legal guardian'} onChange={handleInputChange} />
                        Legal guardian
                    </label> 
                    <label>
                    <input type="radio" name="relationA" value="attorney for personal care" checked={formData.relationA==='attorney for personal care'} onChange={handleInputChange}/>    
                        Attorney for personal care
                    </label>                   
                </div>
            </form>

            <br></br>
            <br></br>
           <h3>Section 3 - Signature</h3>
            <form>
            
            <div className="consent">
             <h4>Consent</h4>
                 <p>I have read and agree to the Patient Commitment, the Consent to Release Personal Health Information, and the Cancellation Conditions on the back of this form. I acknowledge that this Enrolment is not intended to be a legally binding contract and is not intended to give rise to any new legal obligations between my family doctor and me.</p>
            </div>

            <div className="signingOnBehalf">
              <h4>I am signing on behalf of (check all that apply)</h4>
              <label>
                 myself
                <input type="checkbox" name="myself" checked={formData.myself} onChange={handleInputChange}/>
              </label>
              <label>
                child(ren)
                <input type="checkbox" name="children" checked={formData.children} onChange={handleInputChange}/>
              </label>
              <label>
                dependent adult(s)
               <input type="checkbox" name="dependentAdults" checked={formData.dependentAdults} onChange={handleInputChange}/>
              </label>
           </div>

            <div className="horizontal-3">
                <label>
                    Full Name
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} />
                </label><br></br>
            
            
                <label>
                    Home Telephone No
                    <input type="text" name="homeNumber" value={formData.homeNumber} onChange={handleInputChange} />
                </label><br></br>
                <label>
                    Work Telephone No
                    <input type="text" name="workNumber" value={formData.workNumber} onChange={handleInputChange} />
                </label><br></br>
            
            
                <label>
                    Date
                    <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
                </label>                   
            </div>

            <div className="signature-container">
                <SignatureCanvas
                    ref={signatureCanvasRef}
                    penColor="black"
                    canvasProps={{ width: 80, height: 100, className: 'signature-canvas' }}
                />
                <button onClick={(event) => handleSaveSignature(event)}>Save Signature</button>

                <button onClick={(e) => handleClearSignature(e)}>Clear Signature</button>

            </div>

                
            </form>
            <div className="button-container">
                <button className="save-button" onClick={handleSave}>Save</button>
                <button className="cancel-button" onClick={handleCancel}>Cancel</button>                
           </div>

        </div>
    );
    
};

export default SectionForm;
