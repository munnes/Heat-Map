

export const colorLegend=(selection,props)=>{
const {
    colorScale, 
    spacing,
    textOffset
}=props

const groups =    selection.selectAll('.gk')
    .data(colorScale.domain())
    .attr('id','legend');
   
const groupEnter=  groups
   .enter().append('g');
          
groupEnter // we should statrt it here to avoid overlap
   .merge(groups )
   .attr('transform',(d, i)=>`translate( ${i*spacing},400)`);  //i *30 to make sequnce unoverlaped rect 

groupEnter
    .append('rect')          
     .merge(groups.select('.k') )
        .attr('fill',colorScale)
        .attr('x',100)
        .attr('y',20)
        .attr('width',30)
        .attr('height',20)
        .attr('stroke','black')
        .attr('class','k')

groupEnter
        .append('text')          
         .merge(groups.select('text') )
         .text(d=>d!==0?d:'')
         .attr('x', textOffset)
         .attr('class','txtK')
         .attr('transform',d=>`translate( 57,55)`);  
}