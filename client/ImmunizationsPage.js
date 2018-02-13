import { CardText, CardTitle } from 'material-ui/Card';
import {Tab, Tabs} from 'material-ui/Tabs';
import { GlassCard, VerticalCanvas, Glass } from 'meteor/clinical:glass-ui';

import ImmunizationDetail from './ImmunizationDetail';
import ImmunizationsTable from './ImmunizationsTable';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';

import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';

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
      currentImmunization: Session.get('selectedImmunization')
    };

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    return data;
  }

  handleTabChange(index){
    Session.set('immunizationPageTabIndex', index);
  }

  onNewTab(){
    Session.set('selectedImmunization', false);
    Session.set('immunizationUpsert', false);
  }

  render() {
    if(process.env.NODE_ENV === "test") console.log('In ImmunizationsPage render');
    return (
      <div id='immunizationsPage'>
        <VerticalCanvas>
          <GlassCard height='auto'>
            <CardTitle title='Immunizations' />
            <CardText>
              <Tabs id="immunizationsPageTabs" default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}>
               <Tab className='newImmunizationTab' label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0}>
                 <ImmunizationDetail id='newImmunization' />
               </Tab>
               <Tab className="immunizationListTab" label='Immunizations' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                <ImmunizationsTable />
               </Tab>
               <Tab className="immunizationDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                 <ImmunizationDetail 
                  id='immunizationDetails' 
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