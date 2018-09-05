import SimpleSchema from 'simpl-schema';

// create the object using our BaseModel
Immunization = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
Immunization.prototype._collection = Immunizations;

// // Create a persistent data store for addresses to be stored.
// // HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');

if(typeof Immunizations === 'undefined'){
  if(Package['clinical:autopublish']){
    Immunizations = new Mongo.Collection('Immunizations');
  } else {
    Immunizations = new Mongo.Collection('Immunizations', {connection: null});
  }
}


//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Immunizations._transform = function (document) {
  return new Immunization(document);
};




ImmunizationSchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "Immunization"
  },
  "identifier" : {
    optional: true,
    type:  Array
    },
  "identifier.$" : {
    optional: true,
    type:  IdentifierSchema 
    },
  "status" : {
    optional: true,
    type: String,
    allowedValues: ['in-progress', 'on-hold', 'completed', 'entered-in-error', 'stopped']
  },
  "date" : {
    optional: true,
    type: Date
  },
  "vaccineCode" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "patient" : {
    optional: true,
    type: ReferenceSchema
  },
  "wasNotGiven" : {
    optional: true,
    type: Boolean
  },
  "reported" : {
    optional: true,
    type: Boolean
  },
  "performer" : {
    optional: true,
    type: ReferenceSchema
  },
  "requester" : {
    optional: true,
    type: ReferenceSchema
  },
  "encounter" : {
    optional: true,
    type: ReferenceSchema
  },
  "manufacturer" : {
    optional: true,
    type: ReferenceSchema
  },
  "location" : {
    optional: true,
    type: ReferenceSchema
  },
  "lotNumber" : {
    optional: true,
    type: String
  },
  "expirationDate" : {
    optional: true,
    type: Date
  },
  "site" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "route" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "doseQuantity" : {
    optional: true,
    type: QuantitySchema
  },
  "note" : {
    optional: true,
    type: Array
  },
  "note.$" : {
    optional: true,
    type: AnnotationSchema 
  },
  "explanation" : {
    optional: true,
    type: Object
  },
  "explanation.reason" : {
    optional: true,
    type: Array
  },
  "explanation.reason.$" : {
    optional: true,
    type: CodeableConceptSchema 
  },
  "explanation.reasonNotGiven" : {
    optional: true,
    type: Array
  },
  "explanation.reasonNotGiven.$" : {
    optional: true,
    type: CodeableConceptSchema 
  },

  "reaction" : {
    optional: true,
    type:  Array
    },
  "reaction.$" : {
    optional: true,
    type:  Object 
    },
  "reaction.$.date" : {
    optional: true,
    type: Date
  },
  "reaction.$.detail" : {
    optional: true,
    type: ReferenceSchema
  },
  "reaction.$.reported" : {
    optional: true,
    type: Boolean
  },

  "vaccinationProtocol" : {
    optional: true,
    type:  Array
    },
  "vaccinationProtocol.$" : {
    optional: true,
    type:  Object 
    },  
  "vaccinationProtocol.$.doseSequence" : {
    optional: true,
    type: Number
  },
  "vaccinationProtocol.$.description" : {
    optional: true,
    type: String
  },
  "vaccinationProtocol.$.authority" : {
    optional: true,
    type: ReferenceSchema
  },
  "vaccinationProtocol.$.series" : {
    optional: true,
    type: String
  },
  "vaccinationProtocol.$.seriesDoses" : {
    optional: true,
    type: Number
  },
  "vaccinationProtocol.$.targetDisease" : {
    optional: true,
    type: Array
  },
  "vaccinationProtocol.$.targetDisease.$" : {
    optional: true,
    type: CodeableConceptSchema 
  },
  "vaccinationProtocol.$.doseStatus" : {
    optional: true,
    type: CodeableConceptSchema
  },
  "vaccinationProtocol.$.doseStatusReason" : {
    optional: true,
    type: CodeableConceptSchema
  }
});

BaseSchema.extend(ImmunizationSchema);
DomainResourceSchema.extend(ImmunizationSchema);
Immunizations.attachSchema(ImmunizationSchema);

export default { Immunization, Immunizations, ImmunizationSchema };