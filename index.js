

import {colorLegend} from './colorLegend.js'

const svg=d3.select('svg');
const height= +svg.attr('height');
const width =+svg.attr('width');
const margin={top:15,right:10,bottom:10,left:10};
const parseMonth=d3.timeParse("%m")

const myTitle=(id,txt,x)=>d3.selectAll('div')
     .append("text")  
     .attr('y',margin.top+x)
     .html(txt +"<br/>")
     .attr('id',id);
      
/*load data */
let  xArray=[];
let  yArray=[];
let  xMin;
let  xMax;
let data=[];
let m;
let temp;
const clr= [0,2.8,3.9,5.0,6.1,7.2,8.3,9.5,10.6,11.7,12.8]

const innerHeight = height - margin.top - margin.bottom;
fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json')
 .then(response=>response.json())
 .then(d=>
     {
          temp=d.baseTemperature
          let lng=d.monthlyVariance.length
          for(let i=0;i<lng;i++ ){
               data.push([
                    d.monthlyVariance[i].year,
                    parseMonth(d.monthlyVariance[i].month),
                    d.monthlyVariance[i].variance ,
                                   ]);
               xArray.push( d.monthlyVariance[i].year);  
          }   
          xMin=d3.min(xArray);
          xMax=d3.max(xArray);
       
        for(let j=0;j<12;j++)
        yArray.push(parseMonth(j+1))
          render(data)
     }
 )


const render=(data)=>{

     myTitle('title','Monthly Global Land-Surface Temperature',10)
     myTitle('subTitle',xMin+" - "+xMax+": base temperature 8.66℃",30)    
const colorScale=d3.scaleLinear() 
     .domain(clr)
     .range(["#67001f","#b2182b","#d6604d","#f4a582",
     "#fddbc7","#f7f7f7","#d1e5f0","#92c5de","#4393c3","#2166ac","#053061"])
 
      /* x-axis*/
let xScale = d3.scaleLinear()
     .domain([xMin,xMax])
     .range([0, width - 70])
let xAxis=d3.axisBottom(xScale)
     .tickFormat(d3.format("d"))// will remove coma from years
     /*y-axis */
let yScale = d3.scaleBand()  // band is the best for color range because not oreder not number
       .domain(yArray)
       .range([0,height-110])
let yAxis = d3.axisLeft()
        .scale(yScale)
        .tickFormat(d3.timeFormat('%B'))
           
/********************************************************/
/********************************************************/

let gBar=svg.selectAll('rect').data(data);
 const rectBar= gBar
     .enter()
     .append('rect');
     rectBar.merge(gBar)  
          .attr("x",d=>xScale(d[0])+70)
          .attr("y",d=>yScale(d[1]))
          .attr("width",4)
          .attr("height",yScale.bandwidth())// best to align and avoid horizental overlap
          .attr('fill', d => colorScale(temp+d[2]))
          .attr('stroke',d=> colorScale(temp+d[2]))
          .attr('class','cell')
          .attr('data-month',d=>yScale(d[1]))
          .attr('data-year',d=>xScale(d[0]))
          .attr('data-temp',d=> {return (temp+d[2])});
         
gBar.exit().remove()
gBar
.merge(rectBar)
      .append('title')
      .html(d=>{ 
          return( d[0] + ' - ' +d3.timeFormat("%B")(d[1])+'\n'+
          (temp+d[2]).toFixed(2) +' &#8451;'+'\n'+d[2].toFixed(2) + ' &#8451;')})
    // .style('color','red')
      .attr('data-year',d=>d[0])
      .attr('id','tooltip');  
  // y-text
  svg.append('text')
     .attr('x',-innerHeight/2)
     .attr('y',-99)
     .text('Month')
     .attr("transform", `translate(115,-70)rotate(-90)`)
     .attr('text-anchor', 'middle')
     .attr('class','axis-txt'); 
  //x-text
svg .append('text')          
     .text('Year')
     .attr('y', height-70)
     .attr('x',width/2)
     .attr('text-anchor', 'middle')
     .attr('class','axis-txt');  
  /*************************** */ 
  /*************************** */ 
  /*************************** */ 
  svg.append('g')
     .attr('id','x-axis')
     .attr('transform',`translate(70,${height-110})`)
     .call(xAxis)
     .attr('class','tick')

  svg.append("g")
       .attr('id','y-axis')
       .attr("transform", "translate(70, 0)")
       .call(yAxis)
       .attr("y",  50)
       .attr('class','tick');

      
       /************************* */
       svg.call(
          colorLegend,{
              colorScale,
              spacing:30,
              textOffset:40
               }
          )
 }









 
  
 
     
      
 