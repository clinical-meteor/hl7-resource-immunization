import { Card, CardActions, CardMedia, CardText, CardTitle, Toggle } from 'material-ui';

import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { FaTags, FaCode, FaPuzzlePiece, FaLock  } from 'react-icons/fa';
import { GoTrashcan } from 'react-icons/go'

export class ImmunizationsTable extends React.Component {

  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity')
      },
      selected: [],
      immunizations: [],
      displayToggle: false,
      displayDates: false
    }

    if(this.props.displayToggles){
      data.displayToggle = this.props.displayToggles;
    }
    if(this.props.displayDates){
      data.displayDates = this.props.displayDates;
    }
    if(this.props.data){
      data.immunizations = this.props.data;
    } else {
      if(Immunizations.find({}, {$sort: {'identifier.type.text': 1}}).count() > 0){
        data.immunizations = Immunizations.find({}, {$sort: {'identifier.type.text': 1}}).fetch();
      }
    }
    if(process.env.NODE_ENV === "test") console.log("ImmunizationsTable[data]", data);

    return data;
  };

  displayOnMobile(width){
    let style = {};
    if(['iPhone'].includes(window.navigator.platform)){
      style.display = "none";
    }
    if(width){
      style.width = width;
    }
    return style;
  }
  renderToggleHeader(){
    if (!this.props.hideToggle) {
      return (
        <th className="toggle" style={{width: '60px'}} >Toggle</th>
      );
    }
  }
  renderToggle(){
    if (!this.props.hideToggle) {
      return (
        <td className="toggle">
            <Toggle
              defaultToggled={true}
            />
          </td>
      );
    }
  }
  renderDateHeader(){
    if (!this.props.hideDate) {
      return (
        <th className='date'>Date</th>
      );
    }
  }
  renderDate(newDate ){
    if (!this.props.hideDate) {
      return (
        <td className='date'>{ moment(newDate).format('YYYY-MM-DD') }</td>
      );
    }
  }

  renderIdentifierHeader(){
    if (!this.props.hideIdentifier) {
      return (
        <th className="identifier">Identifier</th>
      );
    }
  }
  renderIdentifier(immunization){
    if (!this.props.hideIdentifier) {
      
      return (
        <td className='identifier'>{ get(immunization, 'identifier[0].value') }</td>       );
    }
  }
  renderStatusHeader(){
    if (!this.props.hideStatus) {
      return (
        <th className="status">Status</th>
      );
    }
  }
  renderStatus(status){
    if (!this.props.hideStatus) {
      
      return (
        <td className='status'>{ status }</td>       );
    }
  }

  renderPatientHeader(){
    if (!this.props.hidePatient) {
      return (
        <th className="patient">Patient</th>
      );
    }
  }
  renderPatient(immunization){
    if (!this.props.hidePatient) {
      
      return (
        <td className='patient'>{ get(immunization, 'patient.display') }</td>       );
    }
  }
  renderPerformerHeader(){
    if (!this.props.hidePerformer) {
      return (
        <th className="performer">Performer</th>
      );
    }
  }
  renderPerformer(immunization){
    if (!this.props.hidePerformer) {
      
      return (
        <td className='performer'>{ get(immunization, 'performer.display') }</td>       );
    }
  }


  rowClick(id){
    Session.set('immunizationsUpsert', false);
    Session.set('selectedImmunizationId', id);
    Session.set('immunizationPageTabIndex', 2);
  };
  renderActionIconsHeader(){
    if (!this.props.hideActionIcons) {
      return (
        <th className='actionIcons' style={{minWidth: '120px'}}>Actions</th>
      );
    }
  }
  renderActionIcons(immunization ){
    if (!this.props.hideActionIcons) {
      let iconStyle = {
        marginLeft: '4px', 
        marginRight: '4px', 
        marginTop: '4px', 
        fontSize: '120%'
      }

      return (
        <td className='actionIcons' style={{minWidth: '120px'}}>
          <FaTags style={iconStyle} onClick={this.showSecurityDialog.bind(this, immunization)} />
          <GoTrashcan style={iconStyle} onClick={this.removeRecord.bind(this, immunization._id)} />  
        </td>
      );
    }
  } 
  renderIdentifierHeader(){
    if (!this.props.hideIdentifier) {
      return (
        <th className='identifier'>Identifier</th>
      );
    }
  }
  renderIdentifier(identifier ){
    if (!this.props.hideIdentifier) {
      return (
        <td className='identifier'>{ identifier }</td>
      );
    }
  } 
  removeRecord(_id){
    console.log('Remove patient ', _id)
    Immunizations._collection.remove({_id: _id})
  }
  showSecurityDialog(immunization){
    console.log('showSecurityDialog', immunization)

    Session.set('securityDialogResourceJson', Immunizations.findOne(get(immunization, '_id')));
    Session.set('securityDialogResourceType', 'Immunization');
    Session.set('securityDialogResourceId', get(immunization, '_id'));
    Session.set('securityDialogOpen', true);
  }
  render () {
    // console.log('this.data', this.data)

    let tableRows = [];
    for (var i = 0; i < this.data.immunizations.length; i++) {
      let newRow = {
        patientDisplay: get(this.data.immunizations[i], 'patient.display'),
        patientReference: get(this.data.immunizations[i], 'patient.reference'),
        performerDisplay: get(this.data.immunizations[i], 'performer.display'),
        performerReference: get(this.data.immunizations[i], 'performer.reference'),
        identifier: get(this.data.immunizations[i], 'identifier[0].value'),
        status: get(this.data.immunizations[i], 'status'),
        vaccineCode: get(this.data.immunizations[i], 'vaccineCode.text'),
        reported: get(this.data.immunizations[i], 'reported'),
        date: get(this.data.immunizations[i], 'date')
      }

      let rowStyle = {
        cursor: 'pointer',
        textAlign: 'left'
      }
      if(get(this.data.immunizations[i], 'modifierExtension[0]')){
        rowStyle.color = "orange";
      }

      tableRows.push(
        <tr key={i} className="immunizationRow" style={rowStyle} onClick={ this.rowClick.bind('this', this.data.immunizations[i]._id)} >
          { this.renderToggle() }
          { this.renderActionIcons(this.data.immunizations[i]) }
          { this.renderIdentifier( newRow.identifier ) }
          <td className='vaccineCode'>{ newRow.vaccineCode }</td>

          { this.renderStatus( newRow.status ) }
          { this.renderPatient(this.data.immunizations[i]) }
          { this.renderPerformer(this.data.immunizations[i]) }

          {/* <td className='identifier' style={this.displayOnMobile()} >{ newRow.identifier }</td> */}
          {/* <td className='status' style={this.displayOnMobile()}>{ newRow.status }</td>
          <td className='patient' style={this.displayOnMobile()} >{ newRow.patientDisplay }</td>
          <td className='performer' style={this.displayOnMobile()} >{ newRow.performerDisplay }</td> */}

          { this.renderDate(newRow.date) }
        </tr>
      )
    }

    return(
      <Table id='immunizationsTable' hover >
        <thead>
          <tr>
            { this.renderToggleHeader() }
            { this.renderActionIconsHeader() }
            { this.renderIdentifierHeader() }
            {/* <th className='identifier' style={this.displayOnMobile()} >identifier</th> */}

            <th className='vaccineCode'>vaccineCode</th>

            {/* <th className='status' style={this.displayOnMobile()} >status</th>
            <th className='patient' style={this.displayOnMobile()} >patient</th>
            <th className='performer' style={this.displayOnMobile()} >performer</th> */}

            { this.renderStatusHeader() }
            { this.renderPatientHeader() }
            { this.renderPerformerHeader() }

            { this.renderDateHeader() }
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>
    );
  }
}

ImmunizationsTable.propTypes = {
  id: PropTypes.string,
  fhirVersion: PropTypes.string,

  hideToggle: PropTypes.bool,
  hideIdentifier: PropTypes.bool,
  hideDate: PropTypes.bool,
  hideStatus: PropTypes.bool,
  hidePatient: PropTypes.bool,
  hidePerformer: PropTypes.bool,
 
  limit: PropTypes.number,
  query: PropTypes.object,
  patient: PropTypes.string,
  patientDisplay: PropTypes.string,
  sort: PropTypes.string
  // onPatientClick: PropTypes.func
};
ReactMixin(ImmunizationsTable.prototype, ReactMeteorData);
export default ImmunizationsTable;