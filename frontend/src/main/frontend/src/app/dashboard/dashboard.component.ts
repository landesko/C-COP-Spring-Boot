// Dashboard controller logic
// Implemented by Dan Lesko

import { Component, OnInit } from '@angular/core';
import { IMyOptions, IMyDateRangeModel } from 'mydaterangepicker';
import { DataFetchService } from '../global/data-fetch/data-fetch.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DataFetchService]
})
export class DashboardComponent implements OnInit {

  private today;
  private priorDate;
  private model: any = {
    beginDate: {year: null, month: null, day: null},
    endDate: {year: null, month: null, day: null}
  };

  constructor( private dataFetchService: DataFetchService) { }

  // initialization of all variables
  beginDate: any;
  cities: any;
  endDate: any;
  startTime: Date = new Date();
  endTime: Date = new Date();
  crimeData : any;
  arrestsData : any;
  //crimeHistogramData : any;
  //arrestsHistogramData : any;
  histogramData: any;
  crimePieData: any;
  arrestPieData: any;


  idFilter: any;
  agencyFilter: any;
  narrativeFilter: any;
  placeFilter: any;


  firstNameFilter: any;
  lastNameFilter: any;
  offenseFilter: any;

  cityFilter: any;

  // initializes the application
  ngOnInit() {
    var today = new Date()

    // Default time span is 2 weeks, that's what the # 14 is
    var priorDateStr = new Date().setDate(today.getDate()-14)
    this.today = today;
    var priorDate = new Date(priorDateStr);
    this.priorDate = priorDate;

    this.model = {
      beginDate: {year: this.priorDate.getFullYear(), month: this.priorDate.getMonth()+1, day: this.priorDate.getDate()},
      endDate: {year: this.today.getFullYear(), month: this.today.getMonth()+1, day:this.today.getDate()}
      };

      // console.log(this.model.endDate.day);

    this.applyGlobalFilters();
  }

  // checks user input and then calls functions that fetch data for the application user our data server
  applyGlobalFilters(): void{

    //console.log("Is this firing?");

    let start_date = this.model.beginDate.year +'-'+ this.model.beginDate.month +'-'+ this.model.beginDate.day;

    let end_date = this.model.endDate.year +'-'+ this.model.endDate.month +'-'+ this.model.endDate.day;

    var start = new Date(start_date);
    var end = new Date(end_date);

    //console.log(start);
    //console.log(end);

    var diff = Math.abs(start.getTime() - end.getTime());

    var diffDays = Math.ceil(diff / (1000 * 3600 * 24));

    //console.log("Diff days: " + diffDays);

    //console.log("City Filter: " + this.cityFilter);

    if(this.cityFilter == null || this.cityFilter == '' || this.cityFilter == undefined){
      this.cityFilter = "NONE";
    }

    if (diffDays <= 30) {
      this.getArrestsInInterval();
      this.getCrimesInInterval();

      this.getHistogram();

      this.getCities();

      this.getCrimePie();
      this.getArrestPie();
      //this.getArrestsHistogram();
    } else {
      alert("You must pick an interval within 30 days or less!")
    }
  }

  // options for the date picker
  private myDateRangePickerOptions: IMyOptions = {
    dateFormat: 'yyyy-mm-dd',
  };

  // below are functions that call upon our data fetch service in order to pass data to the dashboard view which is then distributed to other components
  // functions should be obvious by their names in what they do
  getArrestsInInterval(): void {
    //this.priorDate.getFullYear()+'-'+(this.priorDate.getMonth()+1)+'-'+this.priorDate.getDate() + '%20' + this.startTime.getHours() + ':' + this.startTime.getMinutes();
    let start_date = this.model.beginDate.year +'-'+ this.model.beginDate.month +'-'+ this.model.beginDate.day + '%20' + this.startTime.getHours() + ':' + this.startTime.getMinutes();
    // this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate() + '%20' + this.endTime.getHours() + ':' + this.endTime.getMinutes();
    let end_date = this.model.endDate.year +'-'+ this.model.endDate.month +'-'+ this.model.endDate.day + '%20' + this.endTime.getHours() + ':' + this.endTime.getMinutes();
    this.dataFetchService
      .getArrestsInInterval(start_date, end_date, this.cityFilter)
      .subscribe(response => {
        this.arrestsData = response;
        //console.log(this.arrestsData);
      });
  }

  getCrimesInInterval(): void {
    //this.priorDate.getFullYear()+'-'+(this.priorDate.getMonth()+1)+'-'+this.priorDate.getDate() + '%20' + this.startTime.getHours() + ':' + this.startTime.getMinutes();
    let start_date = this.model.beginDate.year +'-'+ this.model.beginDate.month +'-'+ this.model.beginDate.day + '%20' + this.startTime.getHours() + ':' + this.startTime.getMinutes();
    // this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate() + '%20' + this.endTime.getHours() + ':' + this.endTime.getMinutes();
    let end_date = this.model.endDate.year +'-'+ this.model.endDate.month +'-'+ this.model.endDate.day + '%20' + this.endTime.getHours() + ':' + this.endTime.getMinutes();
    this.dataFetchService
      .getCrimesInInterval(start_date, end_date, this.cityFilter)
      .subscribe(response => {
        this.crimeData = response;
        //console.log(this.crimeData);
      });
  }

  getHistogram(): void {
    //this.priorDate.getFullYear()+'-'+(this.priorDate.getMonth()+1)+'-'+this.priorDate.getDate() + '%20' + this.startTime.getHours() + ':' + this.startTime.getMinutes();
    let start_date = this.model.beginDate.year +'-'+ this.model.beginDate.month +'-'+ this.model.beginDate.day + '%20' + this.startTime.getHours() + ':' + this.startTime.getMinutes();
    // this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate() + '%20' + this.endTime.getHours() + ':' + this.endTime.getMinutes();
    let end_date = this.model.endDate.year +'-'+ this.model.endDate.month +'-'+ this.model.endDate.day + '%20' + this.endTime.getHours() + ':' + this.endTime.getMinutes();
    this.dataFetchService
      .getHistogram(start_date, end_date, this.cityFilter)
      .subscribe(response => {
        this.histogramData = response;
        //console.log(this.histogramData);
      });
  }

  getCities(): void {

    this.dataFetchService
      .getCities()
      .subscribe(response => {
        this.cities = response;
        //console.log(this.cities);
      });
  }

  getArrestPie(): void {
    //this.priorDate.getFullYear()+'-'+(this.priorDate.getMonth()+1)+'-'+this.priorDate.getDate() + '%20' + this.startTime.getHours() + ':' + this.startTime.getMinutes();
    let start_date = this.model.beginDate.year +'-'+ this.model.beginDate.month +'-'+ this.model.beginDate.day + '%20' + this.startTime.getHours() + ':' + this.startTime.getMinutes();
    // this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate() + '%20' + this.endTime.getHours() + ':' + this.endTime.getMinutes();
    let end_date = this.model.endDate.year +'-'+ this.model.endDate.month +'-'+ this.model.endDate.day + '%20' + this.endTime.getHours() + ':' + this.endTime.getMinutes();
    this.dataFetchService
        .getArrestPie(start_date, end_date, this.cityFilter)
        .subscribe(response => {
          this.arrestPieData = response;
          //console.log(this.arrestPieData);
        });
  }

  getCrimePie(): void {
    //this.priorDate.getFullYear()+'-'+(this.priorDate.getMonth()+1)+'-'+this.priorDate.getDate() + '%20' + this.startTime.getHours() + ':' + this.startTime.getMinutes();
    let start_date = this.model.beginDate.year +'-'+ this.model.beginDate.month +'-'+ this.model.beginDate.day + '%20' + this.startTime.getHours() + ':' + this.startTime.getMinutes();
    // this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate() + '%20' + this.endTime.getHours() + ':' + this.endTime.getMinutes();
    let end_date = this.model.endDate.year +'-'+ this.model.endDate.month +'-'+ this.model.endDate.day + '%20' + this.endTime.getHours() + ':' + this.endTime.getMinutes();
    this.dataFetchService
        .getCrimePie(start_date, end_date, this.cityFilter)
        .subscribe(response => {
          this.crimePieData = response;
          //console.log(this.crimePieData);
        });
  }
}
