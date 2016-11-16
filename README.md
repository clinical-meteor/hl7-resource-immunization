##clinical:hl7-resource-immunization

HL7 FHIR Resource - Immunization


===============================
#### Conformance Statement  

The resource in this package implements the FHIR Patient Resource schema provided at  [https://www.hl7.org/fhir/immunization.html](https://www.hl7.org/fhir/immunization.html).  


===============================
#### Installation  

````bash
# to add hl7 resource schemas and rest routes
meteor add clinical:hl7-resource-immunization

# to initialize default data
INITIALIZE=true meteor
````

===============================
#### Example   

```js
var immunizationStatement = {}
Immunizations.insert(immunizationStatement);
```

===============================
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



===============================
#### Utilities  

If you're working with HL7 FHIR Resources, we recommend using [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en).




===============================
#### Licensing  

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)
