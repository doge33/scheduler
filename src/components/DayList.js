import React from 'react';
import DayListItem from './DayListItem';


export default function DayList(props) {

  //console.log("~~~~in DayList component; props are~~~~~", props)


  const dayList = props.days.map((day) => {

    //console.log("~~~~in each day of DayList component; props are~~~~~", props)
 
    return  (
      <ul>
        <DayListItem
          key={day.id}
          name={day.name}
          spots={day.spots}
          selected={day.name === props.day}
          setDay={props.setDay} />
      </ul>

    );

    
  }
  
  );

return dayList;

}
