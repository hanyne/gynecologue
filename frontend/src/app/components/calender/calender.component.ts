import { Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import { CalendarOptions, Calendar, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg, EventDragStopArg } from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarService } from '../../service/calender.service';
import { Calender } from 'src/app/model/calender';


@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {
  calendarOptions?: CalendarOptions;
  eventsModel: any;
  @ViewChild('fullcalendar') fullcalendar?: FullCalendarComponent;
  events: any[] = []; // Array to store all events

  constructor(private calendarService: CalendarService) { }

  ngOnInit() {
    // need for load calendar bundle first
    forwardRef(() => Calendar);

    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      editable: true,
      customButtons: {
        myCustomButton: {
          text: 'custom!',
          click: () => {
            alert('clicked the custom button!');
          }
        }
      },
      headerToolbar: {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: 'dayGridMonth'
      },
      initialView: 'dayGridMonth', // Display the calendar in month view
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDragStop: this.handleEventDragStop.bind(this)
    };
    

    // Call a method to fetch all events from the calendar service
    this.fetchAllEvents();
  }

  fetchAllEvents() {
    this.calendarService.getEvents().subscribe(
      response => {
        this.events = response;
        // Update the calendar with the fetched events
        this.calendarOptions!.events = this.events;
      },
      error => {
        console.error('Error fetching events:', error);
      }
    );
  }

  handleDateClick(arg: any) {
    const title = prompt('Enter event title:');
    if (title) {
      const eventData: Calender = {
        title: title,
        start: arg.dateStr,
        end: arg.dateStr,
        eventId: ''
      };
      this.calendarService.createEvent(eventData).subscribe(
        response => {
          console.log('Event created:', response);
          // Add the newly created event to the calendar
          this.fullcalendar?.getApi().addEvent(eventData);
        },
        error => {
          console.error('Error creating event:', error);
        }
      );
    }
  }
  

  handleEventClick(arg: any) {
    const eventId = arg.event.id;
    const confirmation = confirm(`Souhaitez-vous confirmer la suppression de carnet de"${arg.event.eventId}"?`);
    if (confirmation) {
      this.calendarService.deleteEvent(eventId).subscribe(
        () => {
          // Event deleted successfully
          console.log('Event deleted successfully');
          // Remove the event from the local events array
          this.events = this.events.filter(event => event.id!== eventId);
          // Update the calendar with the updated events
          this.calendarOptions!.events = this.events;
        },
        error => {
          console.error('Error deleting event:', error);
        }
      );
    }
  }
  
  
  
  
  updateEvent(eventId: string, eventData: Calender) {
    this.calendarService.updateEvent(eventId, eventData).subscribe(
      updatedEvent => {
        // Update the event in the local events array
        const index = this.events.findIndex(event => event.id === eventId);
        if (index !== -1) {
          this.events[index] = updatedEvent;
        }
        // Update the calendar with the updated events
        this.calendarOptions!.events = this.events;
      },
      error => {
        console.error('Error updating event:', error);
      }
    );
  }
  
  
  handleEventDragStop(arg: any) {
    this.updateEvent;
  }

 
  
}
