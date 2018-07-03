## clinical:hl7-resource-immunization

#### Licensing  

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)


#### Integration & Verification Tests  

[![CircleCI](https://circleci.com/gh/clinical-meteor/hl7-resource-immunization/tree/master.svg?style=svg)](https://circleci.com/gh/clinical-meteor/hl7-resource-immunization/tree/master)


#### API Reference  

The resource in this package implements Immunization resource schema, specified at [https://www.hl7.org/fhir/DSTU2/immunization.html](https://www.hl7.org/fhir/DSTU2/immunization.html). 



#### Installation  

````bash
# to add hl7 resource schemas and rest routes
meteor add clinical:hl7-resource-immunization

# to initialize default data
INITIALIZE=true meteor
````


#### Example   

```js
var immunizationStatement = {}
Immunizations.insert(immunizationStatement);
```


#### Extending the Schema

```js
ExtendedImmunizationSchema = new SimpleSchema([
  ImmunizationSchema,
  {
    "createdAt": {
      "type": Date,
      "optional": true
    }
  }
]);
Immunizations.attachSchema( ExtendedImmunizationSchema );
```


#### Utilities  

If you're working with HL7 FHIR Resources, we recommend using [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en).


