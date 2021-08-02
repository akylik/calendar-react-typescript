import './App.css';
import Calendar from './calendar/calendar.tsx';

const fakeActivites: Activity[] = [
   {
      name: 'Занятие 1',
      time: '19:00',
      type: 'webinar',
      date: '2021-07-31'
   },{
      name: 'Занятие 2',
      time: '19:00',
      type: 'webinar',
      date: '2021-08-14'
   },{
      name: 'Занятие 3',
      time: '19:00',
      type: 'webinar',
      date: '2021-08-21'
   },{
      name: 'Занятие 4',
      time: '19:00',
      type: 'webinar',
      date: '2021-08-28'
   },{
      name: 'Занятие 4',
      time: '19:00',
      type: 'webinar',
      date: '2021-09-04'
   },{
      name: 'ДЗ 1',
      time: '23:59',
      type: 'deadline',
      date: '2021-08-10'
   },{
      name: 'ДЗ 2',
      time: '23:59',
      type: 'deadline',
      date: '2021-08-31'
   }
]

function App() {
  return (
    <div className="App">
        <Calendar activities={fakeActivites}
           dateStart={'2021-08-01'}/>
    </div>
  );
}

export default App;
