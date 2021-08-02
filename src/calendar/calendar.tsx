import React, { Component } from 'react';
import './calendar.css';

import * as Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);


// Описание пропсов и state в текущем компоненте (через типы)
export interface Activity {
   type: 'webinar | deadline'
   name: string
   time: string
   date: string
}

type Props = {
   activities: Activity[]
   dateStart?: string               //dateStart можно передавать не обязательно
}

type State = {

}

const weekDays = [
   {
      name: 'Пн'
   },
   {
      name: 'Вт'
   },
   {
      name: 'Ср'
   },
   {
      name: 'Чт'
   },
   {
      name: 'Пт'
   },
   {
      name: 'Сб'
   },
   {
      name: 'Вс'
   },
];

const today = moment();

const MAP_TYPES = {
   webinar: 'Вебинар',
   deadline: 'Дедлайн'
}

const ActivityElement = (props: Activity) => (
   <div className={'calendar__activity ' + (props.type === 'webinar'
      ? 'calendar__activity--webinar'
      : 'calendar__activity--deadline')}>
      {/* <div className='calendar__activity__title'> {
         props.type === 'webinar' ? 'Вебинар' : 'Дедлайн'
      }</div> */}
      <div className='calendar__activity__title'> {
         MAP_TYPES[props.type]
      }</div>
      <div className='calendar__activity__name'>{props.name}</div>
      <div className='calendar__activity__time'>{props.time}</div>
   </div>
)

export default class Calendar extends Component<Props, State> {
   get getAllMonthDays() {
      const { dateStart = today.format('YYYY-MM-DD') } = this.props;
      const monthStart = moment(dateStart).startOf('month').startOf('isoWeek');
      const monthEnd = moment(dateStart).endOf('month').endOf('isoWeek');
      // const monthStart = moment().startOf('month').startOf('isoWeek');
      // const monthEnd = moment().endOf('month').endOf('isoWeek');
      const weeksRange = Array.from(moment.range(monthStart, monthEnd).by('weeks'));
      console.log(weeksRange);

      const daysRange = weeksRange.map((week) => {
         const weekStart = week.clone().startOf('isoWeek');
         const weekEnd = week.clone().endOf('isoWeek');

         return Array.from(moment.range(weekStart, weekEnd).by('days'))
      })
      console.log(daysRange);
      return daysRange;

   }

   render() {
      return (
         <div className="calendar">
            <div className="calendar__header">
               {weekDays.map((day) => (
                  <div className="calendar__week-day">{day.name}</div>
               ))}
            </div>
            <div className="calendar__cells-wrapper">
               {this.getAllMonthDays.map((week) => (
                  <div className="calendar__row">{
                     week.map((day) => {
                        const classList = ['calendar__cell_inner'];
                        if (day.month() !== today.month()) {
                           classList.push('calendar__cell_inner--disable')
                        }
                        if (today.isAfter(day)) {
                           classList.push('calendar__cell_inner--passed')
                        }

                        const activities = this.props.activities.filter((a) => {
                           return a.date === day.format('YYYY-MM-DD')
                        });
                        return (
                           <div className="calendar__cell">
                              <div className={classList.join(' ')}>
                                 <div className="calendar__day-wrapper">
                                    {today.isSame(day, 'day') ? (
                                       <div className="calendar__cell-today">{day.format('DD')}</div>
                                    ) : day.format('DD')}
                                 </div>
                                 {activities.map((activity) => {
                                    return <ActivityElement {...activity}/>
                                 })}
                              </div>
                           </div>
                        )
                     })
                  }</div>
               ))}
            </div>
         </div>
      )
   }
}