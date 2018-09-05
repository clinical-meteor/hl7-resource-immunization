import { CardText, CardTitle } from 'material-ui/Card';
import {Tab, Tabs} from 'material-ui/Tabs';
import { GlassCard, VerticalCanvas, Glass } from 'meteor/clinical:glass-ui';

import ImmunizationDetail from './ImmunizationDetail';
import ImmunizationsTable from './ImmunizationsTable';

import { Session } from 'meteor/session';

import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';

Session.setDefault('fhirVersion', 'v1.0.2');

export class ImmunizationsPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        tab: {
          borderBottom: '1px solid lightgray',
          borderRight: 'none'
        }
      },
      tabIndex: Session.get('immunizationPageTabIndex'),
      immunizationSearchFilter: Session.get('immunizationSearchFilter'),
      selectedImmunizationId: Session.get('selectedImmunizationId'),
      fhirVersion: Session.get('fhirVersion'),
      selectedImmunization: false
    };

    if (Session.get('selectedImmunizationId')){
      data.selectedImmunization = Immunizations.findOne({_id: Session.get('selectedImmunizationId')});
    } else {
      data.selectedImmunization = false;
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    return data;
  }

  handleTabChange(index){
    Session.set('immunizationPageTabIndex', index);
  }

  onNewTab(){
    Session.set('selectedImmunizationId', false);
    Session.set('immunizationUpsert', false);
  }

  render() {
    if(process.env.NODE_ENV === "test") console.log('ImmunizationsPage.render()', this.data);
    return (
      <div id='immunizationsPage'>
        <VerticalCanvas>
          <GlassCard height='auto'>
            <CardTitle title='Immunizations' />
            <CardText>
              <Tabs id="immunizationsPageTabs" default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}>
               <Tab className='newImmunizationTab' label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0}>
                 <ImmunizationDetail 
                  id='newImmunization' 
                  fhirVersion={ this.data.fhirVersion }
                  immunizationId={ this.data.selectedImmunizationId } />  
               </Tab>
               <Tab className="immunizationListTab" label='Immunizations' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                <ImmunizationsTable 
                  displayDates={true}
                />
               </Tab>
               <Tab className="immunizationDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                 <ImmunizationDetail 
                  id='immunizationDetails' 
                  fhirVersion={ this.data.fhirVersion }
                  immunization={ this.data.selectedImmunization }
                  immunizationId={ this.data.selectedImmunizationId }
                  showDatePicker={true} 
                  />
               </Tab>
             </Tabs>
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}

ReactMixin(ImmunizationsPage.prototype, ReactMeteorData);

export default ImmunizationsPage;