var emails = []; 
var texts = []; 
var messages = [];
var allMessages = []; 
var startDate = new Date(2013, 11, 3);
var allMessagesSorted = [];
var emailsOnly = [];
var textsOnly = []; 
var percentWidth = 1;
var percentHeight = 1; 

var formatTime = d3.timeFormat("%b '%y");
var dateStringFormat = d3.timeFormat("%a %b %d, %Y")
var formatTimeofDay = d3.timeFormat("%I:%M %p");


function etchasketch(data){
                var etchasketchData = [];

                for (i in allMessagesSorted){
                    //here I could be more judicious about what goe sin, like only tagged messages, etc. 
                    if (allMessagesSorted[i].from == "Nitza" && allMessagesSorted[i].logistical == "r") {
                        etchasketchData.push(allMessagesSorted[i])
                    }
                }

                $("#etchasketch").mouseenter(function(){
                    $("#contents").hide(); 
                })

                $("#etchasketch").mouseout(function(){
                    //console.log("shaking!")
                     var index = getRndInteger(0, etchasketchData.length);
                     $("#contents").show()
                     $("#contents").html(etchasketchData[index].messageBody)
                     //console.log(etchasketchData[index])
                    // var message = data[index].message;
                })

                function getRndInteger(min, max) {
                    return Math.floor(Math.random() * (max - min) ) + min;
                    }
            }


$(document).on("ready", function() { 	
	loadData(); 
    etchasketch(allMessagesSorted); 

	
	$("#resetButton").click(function(){
		//alert( "Handler for .click() called." );
		resetAndClear();
	})

	$("#displayAllButton").click(function(){
		//alert( "Handler for .click() called." );
		displayAll(allMessagesSorted);
	})

	$("#timelineButton").on("click", function(){
        //alert( "Handler for .click() called." );
        loadTimeline(allMessagesSorted); 
    })
    $("#negativeSpaceButton").on("click", function(){
        //alert( "Handler for .click() called." );
        loadNegativeSpace(allMessagesSorted); 
    })
    $("#splittingButton").on("click", function(){
        //alert( "Handler for .click() called." );
        displaySplitting(allMessagesSorted); 
    })
    $("#splittingChrono").on("click", function(){
        //alert( "Handler for .click() called." );
        displaySplittingChron(allMessagesSorted); 
    })
    $("#strategyTagsButton").on("click", function(){
        //alert( "Handler for .click() called." );
        displayStrategyTags(allMessagesSorted); 
    })
     $("#detailedTimelineButton").on("click", function(){
        //alert( "Handler for .click() called." );
        detailedTimeline(allMessagesSorted); 
    })

     $("#x-zoom-in").on("click", function(){
        percentWidth = percentWidth * 1.5;
        //percentHeight = percentHeight * 1.5;
        detailedTimeline(allMessagesSorted);
     })

     $("#x-zoom-out").on("click", function(){
        percentWidth = percentWidth * .5;
        //percentHeight = percentHeight * .5;
        detailedTimeline(allMessagesSorted);
     })

     $("#y-zoom-in").on("click", function(){
        //percentWidth = percentWidth * 1.5;
        percentHeight = percentHeight * 1.5;
        detailedTimeline(allMessagesSorted);
     })

     $("#y-zoom-out").on("click", function(){
        //percentWidth = percentWidth * .5;
        percentHeight = percentHeight * .5;
        detailedTimeline(allMessagesSorted);
     })

     $("#zoom-out").on("click", function(){
        percentWidth = percentWidth * .5;
        percentHeight = percentHeight * .5;
        detailedTimeline(allMessagesSorted);
     })

     $("#zoom-in").on("click", function(){
        percentWidth = percentWidth * 1.5;
        percentHeight = percentHeight * 1.5;
        detailedTimeline(allMessagesSorted);
     })

     $("#zoom-reset").on("click", function(){
        percentWidth = 1;
        percentHeight = 1;
        detailedTimeline(allMessagesSorted);
     })

})


function detailedTimeline(dataHere){
    resetAndClear(); 
    $("#zoomControls").show()
   //set heights and widths for everything
   var padding = 12; 
   //yearHeight and yearWidth 
   var yearWidth = $(document).width()*percentWidth; 
   var approxYearsPerPageHeight = 3; 
   var yearHeight = (($(document).height()))/approxYearsPerPageHeight*percentHeight; 
   //emailHeight

   //stripeWidth
   //dayWidth
   var dayWidth = yearWidth/365;
   //verticalpadding

    //make a div for each year and fill it in to see how th elayout looks
    
    $("#messagesContainer").append("<div id='tagMenu'></div>")
    //checkboxes
    for (e in strategyCodes){
        $("#tagMenu").append("<div style='color:" + strategyCodes[e].color+ "'><input type='checkbox' id='"+strategyCodes[e].code+"' checked/> <strong>" +strategyCodes[e].code+" </strong><span style='color:gray'>"+strategyCodes[e].description+"</span></div>"); 
    }
    $("#tagMenu").append("<div style='color:gray'><input type='checkbox' id='none' checked/> <strong>un-tagged</strong><span style='color:gray'></span></div>");


    $("#messagesContainer").append("<div id='year-"+2018+"-label'>2018</div>").css("margin-left", padding);
    $("#messagesContainer").append("<div id='year-"+2018+"'></div>")
    $("#year-2018").width(yearWidth).height(yearHeight).css("background-color", "gainsboro").css("margin", padding);
    
    $("#messagesContainer").append("<div id='year-"+2017+"-label'>2017</div>").css("margin-left", padding);  
    $("#messagesContainer").append("<div id='year-"+2017+"'></div>")
    $("#year-2017").width(yearWidth).height(yearHeight).css("background-color", "gainsboro").css("margin", padding);
   
    $("#messagesContainer").append("<div id='year-"+2016+"-label'>2016</div>").css("margin-left", padding);
    $("#messagesContainer").append("<div id='year-"+2016+"'></div>")
    $("#year-2016").width(yearWidth).height(yearHeight).css("background-color", "gainsboro").css("margin", padding);
    

    $("#messagesContainer").append("<div id='year-"+2015+"-label'>2015</div>").css("margin-left", padding);
    $("#messagesContainer").append("<div id='year-"+2015+"'></div>")
    $("#year-2015").width(yearWidth).height(yearHeight).css("background-color", "gainsboro").css("margin", padding);
    

    $("#messagesContainer").append("<div id='year-"+2014+"-label'>2014</div>").css("margin-left", padding);
    $("#messagesContainer").append("<div id='year-"+2014+"'></div>")
    $("#year-2014").width(yearWidth).height(yearHeight).css("background-color", "gainsboro").css("margin", padding);
    

    $("#messagesContainer").append("<div id='year-"+2013+"-label'>2013</div>").css("margin-left", padding);
    $("#messagesContainer").append("<div id='year-"+2013+"'></div>")
    $("#year-2013").width(yearWidth).height(yearHeight).css("background-color", "gainsboro").css("margin", padding); //blue: #c1daf0


    //in a loop for each year between 2013 and year now
    


    for (y = 2013; y <= 2018; y++){
        var thisYearsMessages = []; 
        for (i in allMessagesSorted){
        if (allMessagesSorted[i].datetime.getFullYear() == y){
                thisYearsMessages.push(allMessagesSorted[i]);
            }
        }
        timelineYear(thisYearsMessages, y);
    }
    

    //get all the entries for each year in question into an array... and 

    //call timelineYear(dataFromThatYear)
    var tooltipdiv = $("#messagesContainer").append("<div id='tooltip'>tooltip</div");

    function timelineYear(dataThisYear, year){
        //console.log("drawing year:  " + y + "------------------------------")
        //console.log(dataThisYear)

        //x scale is domain jan1 to dec31, range 0 to yearWidth
        var jan1 = new Date(year, 0, 1, 0, 0, 0, 0);
        var dec31 = new Date(year, 11, 31, 0, 0, 0, 0);
        var xScale = d3.scale.linear()
            .domain([jan1, dec31])    
            .range([0, yearWidth]); 

        //yScale is domain midnight to 11:59, range 0 to yearHeight (keep in mind I may want to just use the whole height and ignore time of day)
        var midnight = new Date(0, 0, 0, 0, 0, 0, 0);
        var elevenfiftynine = new Date(0, 0, 0, 23, 59, 59, 0);
        var yScale = d3.scale.linear()
            .domain([midnight, elevenfiftynine])    
            .range([0, yearHeight]); 


        var xAxis = d3.svg.axis()
            .orient("top")
            .scale(xScale)
            .tickValues([0, 1, 2, 3, 4, 5, 6])
                .tickFormat(dateStringFormat);//<== insert the tickFormat function;

        //div is timeline[Year]
        div = d3.select("#year-" + year).append("svg:svg")
            .attr("width", yearWidth)
            .attr("height", yearHeight)
            .append("rect")
                .attr("y", yScale(new Date(0, 0, 0, 8, 0, 0, 0)))
                .attr("x", 0)
                .attr("width", yearWidth)
                //.attr("fill", "#fff098") //yellow
                .attr("fill", "#f5f5f5")
                .attr("height", yScale(new Date(0, 0, 0, 14, 0, 0, 0)));

        //append rectangle to stripe it so 9 am to 9pm is yellowish and 9pm to 9am is blueish
         div.append("g")
            .attr("class", "xAxisStyles")
            .attr("transform", "translate(" + padding + "," + 18 + ")")
            .call(xAxis);

 

        //Appen rectngles for each message
        d3.select("svg").selectAll("circle")

            .data(dataThisYear)
            .enter()
            .append("circle")
            .attr("class", function(d){
                var classes = ""
                for (c in d.strategy){
                    if (d.strategy[c] == ""){
                        return "none"
                    }
                    classes = classes + " " + d.strategy[c]
                }
                return classes; 
            })
            .attr("fill", function(d){
                    //if (d.strategy =! null){
                           for (c in d.strategy){
                            for (m in strategyCodes){
                                if (d.strategy[c] == strategyCodes[m].code){
                                    return strategyCodes[m].color;
                                    }
                                }
                            }
                            return "#e8e8e8"
                        //}
                })
                .attr("stroke", function(d){
                    //if (d.strategy =! null){
                           for (c in d.strategy){
                            for (m in strategyCodes){
                                if (d.strategy[c] == strategyCodes[m].code){
                                    return strategyCodes[m].color;
                                    }
                                }
                            }
                            return "#e8e8e8"
                        //}
                })
                .attr("cx", function (d) {
                    //console.log(d)
                    return xScale(d.dateOnly)
                })
                .attr("cy", function (d) {
                    return yScale(d.timeOfDay)
                })
                // .attr("height", function (d) {
                //     return yScale(new Date(0, 0, 0, 0, 30, 0, 0));
                // })
                .attr("r", function (d) {
                    return dayWidth;
                })

                .attr("stroke-opacity", function(d){
                    if (d.medium =="Text"){
                        return 0; 
                    }
                    if (d.medium =="Email"){
                        return .5;
                    }
                })
                .attr("stroke-width", 4)
                .on("mouseenter", function(d){   
                    //console.log("moused over")
                    var htmlEntry = "<P><strong>tags: </strong>"+d.strategy+"<p><strong>from:</strong> " + d.from + "</p><p><strong>on:</strong> " + dateStringFormat(d.dateOnly) + " <strong>at</strong> " + formatTimeofDay(d.timeOfDay) + "</p><p><strong>subject:</strong>  " + d.subject + "</p><p id='messageBox'><strong>message content:</strong> " + d.htmlMessage + "</p>";
                    var dataHere = d;
                    d3.select("#tooltip").html(htmlEntry);
                    d3.select("#tooltip").transition()     
                    .duration(20) ;           
                    
                    $("#tooltip")
                    .css("opacity", .95)
                    .css("width", "300px")
                    .css("height", "300px")
                    .css("overflow-y", "scroll")
                    .css("background-color", "gray")   
                    .css("position", "absolute")
                    .css("left", (d3.event.pageX) + "px")     
                    .css("top", (d3.event.pageY) + "px")
                    .css("font-family", "serif");
                })
                .on("mouseout", function(d){        
                    d3.select("#tooltip").transition()     
                    .duration(3000)      
                    .style("opacity", 0)   
                })
                .on("click", function(d){
                    console.log("clicked!")
                    d3.select("#tooltip").append("<p id='messageBox'>" + d.htmlMessage + "</p>")
                }) 

    }

    for (each in strategyCodes){
        
    }


    $('#worrying').click(function() {
       if ($("#" + strategyCodes[0].code).prop('checked')==false){
        $("." + strategyCodes[0].code).hide();   
        }
    if ($("#" + strategyCodes[0].code).prop('checked')==true){
        $("." + strategyCodes[0].code).show();   
    }
    })

    $('#enrolling').click(function() {
       if ($("#" + strategyCodes[1].code).prop('checked')==false){
        $("." + strategyCodes[1].code).hide();   
        }
    if ($("#" + strategyCodes[1].code).prop('checked')==true){
        $("." + strategyCodes[1].code).show();   
    }
    })

    $('#pleading').click(function() {
       if ($("#" + strategyCodes[2].code).prop('checked')==false){
        $("." + strategyCodes[2].code).hide();   
        }
    if ($("#" + strategyCodes[2].code).prop('checked')==true){
        $("." + strategyCodes[2].code).show();   
    }
    })

    $('#erasing').click(function() {
       if ($("#" + strategyCodes[3].code).prop('checked')==false){
        $("." + strategyCodes[3].code).hide();   
        }
    if ($("#" + strategyCodes[3].code).prop('checked')==true){
        $("." + strategyCodes[3].code).show();   
    }
    })

    $('#distracting').click(function() {
       if ($("#" + strategyCodes[4].code).prop('checked')==false){
        $("." + strategyCodes[4].code).hide();   
        }
    if ($("#" + strategyCodes[4].code).prop('checked')==true){
        $("." + strategyCodes[4].code).show();   
    }
    })

    $('#repairing').click(function() {
       if ($("#" + strategyCodes[5].code).prop('checked')==false){
        $("." + strategyCodes[5].code).hide();   
        }
    if ($("#" + strategyCodes[5].code).prop('checked')==true){
        $("." + strategyCodes[5].code).show();   
    }
    })

    $('#threatening').click(function() {
       if ($("#" + strategyCodes[6].code).prop('checked')==false){
        $("." + strategyCodes[6].code).hide();   
        }
    if ($("#" + strategyCodes[6].code).prop('checked')==true){
        $("." + strategyCodes[6].code).show();   
    }
    })

    $('#gaslighting').click(function() {
       if ($("#" + strategyCodes[7].code).prop('checked')==false){
        $("." + strategyCodes[7].code).hide();   
        }
    if ($("#" + strategyCodes[7].code).prop('checked')==true){
        $("." + strategyCodes[7].code).show();   
    }
    })

    $('#accusing').click(function() {
       if ($("#" + strategyCodes[8].code).prop('checked')==false){
        $("." + strategyCodes[8].code).hide();   
        }
    if ($("#" + strategyCodes[8].code).prop('checked')==true){
        $("." + strategyCodes[8].code).show();   
    }
    })

    $('#rationalizing').click(function() {
       
       if ($("#" + strategyCodes[9].code).prop('checked')==false){
        $("." + strategyCodes[9].code).hide();   
        }
    if ($("#" + strategyCodes[9].code).prop('checked')==true){
        $("." + strategyCodes[9].code).show();   
    }
    })

    $('#self-glorifying').click(function() {
       
       if ($("#" + strategyCodes[10].code).prop('checked')==false){
        $("." + strategyCodes[10].code).hide();   
        }
    if ($("#" + strategyCodes[10].code).prop('checked')==true){
        $("." + strategyCodes[10].code).show();   
    }
    })

    $('#invalidating').click(function() {
       if ($("#" + strategyCodes[11].code).prop('checked')==false){
        $("." + strategyCodes[11].code).hide();   
        }
    if ($("#" + strategyCodes[11].code).prop('checked')==true){
        $("." + strategyCodes[11].code).show();   
    }
    })
    $('#none').click(function() {
       if ($("#" + "none").prop('checked')==false){
        $("." + "none").hide();   
        }
    if ($("#" + "none").prop('checked')==true){
        $("." + "none").show();   
    }
    })
}


function loadTimeline(dataHere){
    var dayHeight = 8; 
    console.log("drawing timeline");
    //svg stuff should be appended to the left panel. in the left panel I want a timeline with a mouseover of time, date and subject. I want to be able to modify timelibne entries to reflect qualities of the data
    //text div should be appended to right panel. In the right panel I want the text of the moused over message
    resetAndClear(); 
    $("#messagesContainer").html("<div id='leftPanel'></div><div id='rightPanel'></div>"); 
    var leftWidth = $("#leftPanel").width();
    var rightWidth = $("#rightPanel").width();
    //from October 4, 2018 - December 2, 2013 
    var daysSinceFirstMsg = 1768; 
    var height = dayHeight*daysSinceFirstMsg;
    var centerPadding = 20;
    var padding= 50;


    var textBox = $("#rightPanel").append("<div id='messageDisplayBox'></div")
    .attr("width", rightWidth)
    .attr("height", height);

    var tooltipdiv = $("#messagesContainer").append("<div id='tooltip'>tooltip</div"); 

    var timeline = d3.select("#leftPanel").
    append("svg:svg")
    .attr("width", leftWidth)
    .attr("height", height);

    // define the y scale  (vertical)
    var minDate = new Date(2013,11,1),
    maxDate = new Date();

    var yScale = d3.scale.linear()
    .domain([minDate, maxDate])    
    .range([height, 0]);   

    var yAxis = d3.svg.axis()
    .orient("left")
    .scale(yScale)
    .ticks(200)
        .tickFormat(formatTime);//<== insert the tickFormat function;

    // draw y axis with labels and move in from the size by the amount of padding
    timeline.append("g")
    .attr("class", "axisStylesText")
    .attr("transform", "translate("+padding+",0)")
    .call(yAxis);
    //format and draw the x axis
    var minTime = new Date(0, 0, 0, 0, 0);
    var maxTime = new Date(0, 0, 0, 23, 59);

    var xScale = d3.scale.linear()
    .domain([minTime, maxTime])    
    .range([padding, leftWidth-padding]);   

    var xAxis = d3.svg.axis()
    .orient("top")
    .scale(xScale)
    .ticks(6)
        .tickFormat(formatTimeofDay);//<== insert the tickFormat function;

        timeline.append("g")
        .attr("class", "xAxisStyles")
        .attr("transform", "translate(" + padding + "," + 18 + ")")
        .call(xAxis);

    //adding some details to the timeline background qwould be nice, like better tick marks and maybe color bands for night and day 


    //drawing the messages onto the timelines
    d3.select("svg").selectAll("rect")
    .data(emailsOnly)
    .enter()
    .append("rect")
        //x position is xScale(time)
        .attr("y", function (d) {
            //console.log(d)
            return yScale(d.dateOnly)
        })
        .attr("x", function(d){
            //console.log(d)
            return xScale(d.timeOfDay); 
        })
        .attr("height", function (d) {
            //i'd like to be able to set this to the height of 1 day 
            return dayHeight;
        })
        .attr("width", function (d) {return dayHeight})
        .attr("fill", function(d){
            //console.log(d)
            var fillColor = "gray"  
            if (d.from == "Nitza"){
                //console.log("Nitza!")
                fillColor = "chocolate" 
            }
            else if (d.from == "Miriam"){
                //console.log("Miriam!")
                fillColor = "cornflowerBlue" 
            }
            return fillColor;
        })
        .attr("opacity", function(d){
            var opacity = 1  
            if (d.logistical == "l"){
                opacity = .2 
            }
            else if (d.logistical == "r"){
                opacity = 1 
            }
            return opacity;
        })
        .on("mouseover", function(d){   
            //console.log("moused over")
            var htmlEntry = "<p>from: " + d.from + "</p><p>on: " + dateStringFormat(d.dateOnly) + " at " + formatTimeofDay(d.timeOfDay) + "</p><p>" + d.subject + "</p>";
            var dataHere = d;
            d3.select("#tooltip").html(htmlEntry);
            d3.select("#tooltip").transition()     
            .duration(20)      
            .style("opacity", .9);      
            d3.select("#tooltip")
            .style("width", 200)
            .style("position", "absolute")
            .style("left", (d3.event.pageX) + "px")     
            .style("top", (d3.event.pageY) + "px")
            .style("font-family", "serif");
            d3.select("#messageDisplayBox").html("<p>" + d.htmlMessage + "</p>")
            .style("position", "absolute")
            .style("top", (($(window).scrollTop())+120) + "px")
            .style("font-family", "serif")
        })
        .on("mouseout", function(d){        
            d3.select("#tooltip").transition()     
            .duration(500)      
            .style("opacity", 0)   
        });  

        d3.select("svg").selectAll("circle")
        .data(textsOnly)
        .enter()
        .append("circle")
        //x position is xScale(time)
        .attr("cy", function (d) {
            //console.log(d);
            return yScale(d.dateOnly)-dayHeight/2;
        })
        .attr("cx", function(d){
            return xScale(d.timeOfDay); 
        })
        .attr("r", function(d) {
            //i'd like to be able to set this to the height of 1 day 
            return dayHeight/2;
        })
        .attr("fill", function(d){
            //console.log("filling circles!")
            //console.log(d.from)
            var fillColor = "gray"  
            if (d.from == "Nitza"){
               // console.log("Nitza!")
                fillColor = "chocolate" 
            }
            else if (d.from == "Miriam"){
                //console.log("Miriam!")
                fillColor = "cornflowerBlue" 
            }
            return fillColor;
        })
        .attr("opacity", function(d){
            var opacity = 1  
            if (d.logistical == "l"){
                opacity = .2 
            }
            else if (d.logistical == "r"){
                opacity = 1 
            }
            return opacity;
        })
        .on("mouseover", function(d){   
            var htmlEntry = "<p>from: " + d.from + "</p><p>on: " + d.date + " at " + d.time + "</p>";
            var dataHere = d;
            d3.select("#tooltip").html(htmlEntry);
            d3.select("#tooltip").transition()     
            .duration(20)      
            .style("opacity", .9);      
            d3.select("#tooltip")
            .style("width", 200)
            .style("position", "absolute")
            .style("left", (d3.event.pageX) + "px")     
            .style("top", (d3.event.pageY) + "px")
            .style("font-family", "sans-serif");
            d3.select("#messageDisplayBox").html("<p>" + d.message + "</p>").style("font-family", "sans-serif") 
            .style("position", "absolute")
            .style("top", (($(window).scrollTop())+120) + "px")
        })
        .on("mouseout", function(d){        
            d3.select("#tooltip").transition()     
            .duration(500)      
            .style("opacity", 0); 
            
        });
        

        //yPosition is yScale(data)
        //width is driven by wordcount?
        //color can eventually be driven by a qualitative labeling system
        //give it a mouseover with subject, date and time, and sender ont he tooltip and the message body showing up in the right panel 
}

function displayStrategyTags(dataHere){
    resetAndClear();


    $("#messagesContainer").append("<div id='tagMenu'></div>")
    //checkboxes
    for (e in strategyCodes){
        $("#tagMenu").append("<div style='color:" + strategyCodes[e].color+ "'><input type='checkbox' id='"+strategyCodes[e].code+"' unchecked/> <strong>" +strategyCodes[e].code+" </strong><span style='color:gray'>"+strategyCodes[e].description+"</span></div>");
    }
    //go through every row of data 
    for (i in dataHere){ 
        $("#messagesContainer").append("<div class='strategy' id='strategy-"+i+"' style='display:none;margin:10px;'>"+dataHere[i].messageBody+"</div>");
        //within that go through each strategy 
        if (dataHere[i].strategy !=null){
        for (m in dataHere[i].strategy){
             for (e in strategyCodes){
                if (dataHere[i].strategy[m] == strategyCodes[e].code){
                    $("#strategy-"+i).prepend("<div class='tag'>&lt;"+strategyCodes[e].code+"&gt;</div")
                    $("#strategy-"+i).addClass(strategyCodes[e].code).css("background-color", strategyCodes[e].color);
                    $(".tag").css("color", "white");
               } 
            }
         }
        }
    }

    $('#worrying').click(function() {
       
       if ($("#" + strategyCodes[0].code).prop('checked')==false){
         //console.log((strategyCodes[0].code) + " unchecked!")
        $("." + strategyCodes[0].code).hide();   
        }
    if ($("#" + strategyCodes[0].code).prop('checked')==true){
         //console.log((strategyCodes[0].code) + " checked!")
        $("." + strategyCodes[0].code).show();   
    }
    })

    $('#enrolling').click(function() {
       
       if ($("#" + strategyCodes[1].code).prop('checked')==false){
         //console.log((strategyCodes[1].code) + " unchecked!")
        $("." + strategyCodes[1].code).hide();   
        }
    if ($("#" + strategyCodes[1].code).prop('checked')==true){
         //console.log((strategyCodes[1].code) + " checked!")
        $("." + strategyCodes[1].code).show();   
    }
    })

    $('#pleading').click(function() {
       
       if ($("#" + strategyCodes[2].code).prop('checked')==false){
         //console.log((strategyCodes[2].code) + " unchecked!")
        $("." + strategyCodes[2].code).hide();   
        }
    if ($("#" + strategyCodes[2].code).prop('checked')==true){
         //console.log((strategyCodes[2].code) + " checked!")
        $("." + strategyCodes[2].code).show();   
    }
    })

    $('#erasing').click(function() {
       
       if ($("#" + strategyCodes[3].code).prop('checked')==false){
         //console.log((strategyCodes[3].code) + " unchecked!")
        $("." + strategyCodes[3].code).hide();   
        }
    if ($("#" + strategyCodes[3].code).prop('checked')==true){
         //console.log((strategyCodes[3].code) + " checked!")
        $("." + strategyCodes[3].code).show();   
    }
    })

    $('#distracting').click(function() {
       
       if ($("#" + strategyCodes[4].code).prop('checked')==false){
         //console.log((strategyCodes[4].code) + " unchecked!")
        $("." + strategyCodes[4].code).hide();   
        }
    if ($("#" + strategyCodes[4].code).prop('checked')==true){
        // console.log((strategyCodes[4].code) + " checked!")
        $("." + strategyCodes[4].code).show();   
    }
    })

    $('#repairing').click(function() {
       
       if ($("#" + strategyCodes[5].code).prop('checked')==false){
         //console.log((strategyCodes[5].code) + " unchecked!")
        $("." + strategyCodes[5].code).hide();   
        }
    if ($("#" + strategyCodes[5].code).prop('checked')==true){
        // console.log((strategyCodes[5].code) + " checked!")
        $("." + strategyCodes[5].code).show();   
    }
    })

    $('#threatening').click(function() {
       
       if ($("#" + strategyCodes[6].code).prop('checked')==false){
         //console.log((strategyCodes[6].code) + " unchecked!")
        $("." + strategyCodes[6].code).hide();   
        }
    if ($("#" + strategyCodes[6].code).prop('checked')==true){
        // console.log((strategyCodes[6].code) + " checked!")
        $("." + strategyCodes[6].code).show();   
    }
    })

    $('#gaslighting').click(function() {
       
       if ($("#" + strategyCodes[7].code).prop('checked')==false){
         //console.log((strategyCodes[7].code) + " unchecked!")
        $("." + strategyCodes[7].code).hide();   
        }
    if ($("#" + strategyCodes[7].code).prop('checked')==true){
         //console.log((strategyCodes[7].code) + " checked!")
        $("." + strategyCodes[7].code).show();   
    }
    })

    $('#accusing').click(function() {
       
       if ($("#" + strategyCodes[8].code).prop('checked')==false){
         //console.log((strategyCodes[8].code) + " unchecked!")
        $("." + strategyCodes[8].code).hide();   
        }
    if ($("#" + strategyCodes[8].code).prop('checked')==true){
         //console.log((strategyCodes[8].code) + " checked!")
        $("." + strategyCodes[8].code).show();   
    }
    })

    $('#rationalizing').click(function() {
       
       if ($("#" + strategyCodes[9].code).prop('checked')==false){
        // console.log((strategyCodes[9].code) + " unchecked!")
        $("." + strategyCodes[9].code).hide();   
        }
    if ($("#" + strategyCodes[9].code).prop('checked')==true){
        // console.log((strategyCodes[9].code) + " checked!")
        $("." + strategyCodes[9].code).show();   
    }
    })

    $('#self-glorifying').click(function() {
       
       if ($("#" + strategyCodes[10].code).prop('checked')==false){
         //console.log((strategyCodes[10].code) + " unchecked!")
        $("." + strategyCodes[10].code).hide();   
        }
    if ($("#" + strategyCodes[10].code).prop('checked')==true){
         //console.log((strategyCodes[10].code) + " checked!")
        $("." + strategyCodes[10].code).show();   
    }
    })

    $('#invalidating').click(function() {
       
       if ($("#" + strategyCodes[11].code).prop('checked')==false){
         //console.log((strategyCodes[11].code) + " unchecked!")
        $("." + strategyCodes[11].code).hide();   
        }
    if ($("#" + strategyCodes[11].code).prop('checked')==true){
        // console.log((strategyCodes[11].code) + " checked!")
        $("." + strategyCodes[11].code).show();   
    }
    })
    
}


function displaySplitting(dataHere){
    console.log("display splitting");
    $("#messagesContainer").html("<div id='leftPanel'></div><div id='rightPanel'></div>"); 
    var leftWidth = $("#leftPanel").width();
    var rightWidth = $("#rightPanel").width();
    for (i in dataHere){
        if (dataHere[i].messageBody == undefined){
            //console.log(dataHere[i])
        }
        if (dataHere[i].splitting == "i"){
           // console.log(dataHere[i].htmlMessage)
            $("#leftPanel").append("<div class='splitting idealizing'>"+dataHere[i].messageBody + "</div><div>---------</div>"); 

            $("#leftPanel").css("font-size", "10px");
        }
        if (dataHere[i].splitting == "d"){
            //console.log(dataHere[i].htmlMessage)
            $("#rightPanel").append("<div class='splitting devaluing'>"+dataHere[i].messageBody + "</div><div>---------</div>"); 
            $("#rightPanel").css("font-size", "10px");
        }
    }
}

function displaySplittingChron(dataHere){
    console.log("display splitting");
    $("#messagesContainer").html("<div id='splittingPanel'></div>"); 

    var width = $(document).width();
    for (i in dataHere){
        //$("#splittingPanel").append(dataHere[i].markdown).addClass("neutral");

        if (dataHere[i].messageBody == undefined){
            //console.log(dataHere[i])
        }
        if (dataHere[i].splitting == "i"){
           // console.log(dataHere[i].htmlMessage)
           $("#splittingPanel").append("<div class='splitting idealizing'>"+dataHere[i].messageBody + "</div>"); 
        }

        if (dataHere[i].splitting == "d"){
            //console.log(dataHere[i].htmlMessage)
           $("#splittingPanel").append("<div class='splitting devaluing'>"+dataHere[i].messageBody + "</div>"); 
        }
        else {
           var textSpan = document.createElement("span")
           var textContent = document.createTextNode(dataHere[i].messageBody).textContent;
          // console.log(textContent)
           textSpan.append(textContent)
           $("#splittingPanel").append(textSpan).addClass("neutral"); 
        }
    }
}

function displaySplittingChronAlt(dataHere){
    console.log("display splitting");
    $("#messagesContainer").html("<div id='splittingPanel'></div>"); 

    var width = $(document).width();
    for (i in dataHere){
        if (dataHere[i].messageBody == undefined){
            //console.log(dataHere[i])
        }
        if (dataHere[i].splitting == "i"){
           // console.log(dataHere[i].htmlMessage)
            $("#splittingPanel").append("<div class='splitting idealizing'>"+dataHere[i].messageBody + "</div><div>-------</div>"); 
        }

        if (dataHere[i].splitting == "d"){
            //console.log(dataHere[i].htmlMessage)
            $("#splittingPanel").append("<div class='splitting devaluing'>"+dataHere[i].messageBody + "</div><div>-------</div>"); 
        }
    }
}

function loadNegativeSpace(dataHere){
    var dayHeight = 2;
    console.log("drawing timeline");
    //svg stuff should be appended to the left panel. in the left panel I want a timeline with a mouseover of time, date and subject. I want to be able to modify timelibne entries to reflect qualities of the data
    //text div should be appended to right panel. In the right panel I want the text of the moused over message
    resetAndClear(); 
    $("#messagesContainer").html("<div id='negativeSpaceDiv'></div>"); 
    $("#negativeSpaceDiv").css("background-color", "black").css("width", $(document.body).width()/3)
    var divWidth = $(document.body).width()/3;
    //from October 4, 2018 - December 2, 2013 
    var daysSinceFirstMsg = 1768; 
    var height = dayHeight*daysSinceFirstMsg;
    var padding = 10; 

    var timeline = d3.select("#negativeSpaceDiv").
    append("svg:svg")
    .attr("width", divWidth)
    .attr("height", height);

    // define the y scale  (vertical)
    var minDate = new Date(2013,11,1),
    maxDate = new Date();

    var yScale = d3.scale.linear()
    .domain([minDate, maxDate])    
    .range([height, 0]);   

    var yAxis = d3.svg.axis()
    .orient("left")
    .scale(yScale)
    .ticks(200)
        .tickFormat(formatTime);//<== insert the tickFormat function;

    // draw y axis with labels and move in from the size by the amount of padding
    timeline.append("g")
    .attr("class", "axisStylesText")
    .attr("transform", "translate("+padding+",0)")
    .call(yAxis);
    //format and draw the x axis
    var minTime = new Date(0, 0, 0, 0, 0);
    var maxTime = new Date(0, 0, 0, 23, 59);

    var xScale = d3.scale.linear()
    .domain([minTime, maxTime])    
    .range([padding, divWidth-padding]);   

    var xAxis = d3.svg.axis()
    .orient("top")
    .scale(xScale)
    .ticks(6)
        .tickFormat(formatTimeofDay);//<== insert the tickFormat function;

        timeline.append("g")
        .attr("class", "xAxisStyles")
        .attr("transform", "translate(" + padding + "," + 18 + ")")
        .call(xAxis);

    //adding some details to the timeline background qwould be nice, like better tick marks and maybe color bands for night and day 


    //drawing the messages onto the timelines
    d3.select("svg").selectAll("rect")
    .data(emailsOnly)
    .enter()
    .append("rect")
        //x position is xScale(time)
        .attr("y", function (d) {
            //console.log(d)
            return yScale(d.dateOnly)
        })
        .attr("x", function(d){
            //console.log(d)
            return xScale(d.timeOfDay); 
        })
        .attr("height", function (d) {
            //i'd like to be able to set this to the height of 1 day 
            return dayHeight;
        })
        .attr("width", function (d) {return dayHeight})
        .attr("fill", function(d){
            //console.log(d)
            var fillColor = "gray"  
            if (d.from == "Nitza"){
                //console.log("Nitza!")
                fillColor = "white" 
            }
            else if (d.from == "Miriam"){
                //console.log("Miriam!")
                fillColor = "ghostWhite" 
            }
            return fillColor;
        })
        .attr("opacity", function(d){
            var opacity = 1  
            if (d.logistical == "l"){
                opacity = .2 
            }
            else if (d.logistical == "r"){
                opacity = 1 
            }
            return opacity;
        })


        d3.select("svg").selectAll("circle")
        .data(textsOnly)
        .enter()
        .append("circle")
        //x position is xScale(time)
        .attr("cy", function (d) {
            //console.log(d);
            return yScale(d.dateOnly)-dayHeight/2;
        })
        .attr("cx", function(d){
            return xScale(d.timeOfDay); 
        })
        .attr("r", function(d) {
            //i'd like to be able to set this to the height of 1 day 
            return dayHeight/2;
        })
        .attr("fill", function(d){
            //console.log("filling circles!")
            //console.log(d.from)
            var fillColor = "gray"  
            if (d.from == "Nitza"){
               // console.log("Nitza!")
                fillColor = "white" 
            }
            else if (d.from == "Miriam"){
                //console.log("Miriam!")
                fillColor = "ghostWhite" 
            }
            return fillColor;
        })
        .attr("opacity", function(d){
            var opacity = 1  
            if (d.logistical == "l"){
                opacity = .2 
            }
            else if (d.logistical == "r"){
                opacity = 1 
            }
            return opacity;
        })


    }



function displayAll(dataHere){
    resetAndClear(); 
    var showLogistical = false; 
    $("#messagesContainer").append("<input type='checkbox' id='showLogistical' checked/>Show 'logistical' Messages")
    //console.log(showLogistical)

    //console.log("display all function called")
    for (i in dataHere){
	//console.log("entered loop")
	//console.log(dataHere[i]);
	if (dataHere[i].medium == "Text"){
		if (dataHere[i].from == "Miriam"){
            $("#messagesContainer").append("<div id='text-"+i+"' class='fromMe'><div class ='textHeader'>" + "From: " + dataHere[i].from + "<br>group: " + dataHere[i].group + "<br>on " + dataHere[i].datetime + "</div><div class='textMessage'>" + dataHere[i].message + "</div></div>");
        }
        else {
            $("#messagesContainer").append("<div id='text-"+i+"' class='toMe'><div class ='textHeader'>" + "From: " + dataHere[i].from + "<br>group: " + dataHere[i].group + "<br>on " + dataHere[i].datetime + "</div><div class='textMessage'>" + dataHere[i].message + "</div></div>");
        }
        if (dataHere[i].logistical == "l"){
            //console.log("I found a logistical text ")
            $("#text-"+i).addClass("logistical")
        }
    }

    else if (dataHere[i].medium == "Email"){
      if (dataHere[i].from == "Miriam"){
         $("#messagesContainer").append("<div id='email-"+i+"' class='fromMe'><div class ='emailHeader'>" + "From: " + dataHere[i].from + "<br>to: " + dataHere[i].to + "<br>on " + dataHere[i].datetime + "<br>Subject: " + dataHere[i].subject + "</div><div class='emailMessage'>" + dataHere[i].htmlMessage + "</div></div>"); 
     }
     else {
         $("#messagesContainer").append("<div id='email-"+i+"' class='toMe'><div class ='emailHeader'>" + "From: " + dataHere[i].from + "<br>to: " + dataHere[i].to + "<br>on " + dataHere[i].datetime +  "<br>Subject: " + dataHere[i].subject + "</div><div class='emailMessage'>" + dataHere[i].htmlMessage + "</div></div>"); 
     }
     //console.log(dataHere[i].logistical);
     if (dataHere[i].logistical == "l"){
        //console.log("I found a logistical email ")
        $("#email-"+i).addClass("logistical")
        }
	}
}
    $(".logistical" ).css("opacity",".4");

    $('#showLogistical').click(function() {
       if (showLogistical = $('#showLogistical').prop('checked')==false){
        //console.log("unchecked!")
        $(".logistical" ).hide();   
    }
    if (showLogistical = $('#showLogistical').prop('checked')==true){
       // console.log("checked!")
        $(".logistical" ).show();
    }
});


}

function resetAndClear(){
   $("#messagesContainer").empty();
   $("#zoomControls").hide()
}



    function loadData(){
      for (i in myEmails){
        //console.log(data[i]);
        emails[i] = {};
        emails[i].messageID = myEmails[i].id; 
        emails[i].htmlMessage = myEmails[i].pretty_html;
        emails[i].markdown = myEmails[i].markdown;
        emails[i].rawDate = parseInt(myEmails[i].internalDate);
        emails[i].datetime = new Date(emails[i].rawDate);
        emails[i].medium = "Email";
        emails[i].dateMillis = emails[i].datetime.getTime();
        emails[i].sender = myEmails[i].From;
        emails[i].to = myEmails[i].To;
        emails[i].subject = myEmails[i].Subject;
        emails[i].snippet = myEmails[i].snippet;
        emails[i].messageBody = emails[i].htmlMessage;

        for (m in emailCodingData){
            if (emails[i].messageID == emailCodingData[m]["id"]){
                // console.log("message from original data = " )
                // console.log(emails[i])
                // console.log("message from coded data = " )
                // console.log(emailCodingData[m])

                emails[i].logistical = emailCodingData[m]["logisticalRelational"]
                emails[i].strategy = emailCodingData[m]["Strategies"].split("; ")
                emails[i].splitting = emailCodingData[m]["Splitting"]

            }
        }

        // if (emails[i].htmlMessage==""){
        //     console.log("------------------------------------------")
        //     console.log("message id: " + emails[i].messageID)
        //     console.log("sent on: " + emails[i].datetime)
        //     console.log("snippet: " + emails[i].snippet)
        // }


        emails[i].timeOfDay = new Date(0, 0, 0, emails[i].datetime.getHours(), emails[i].datetime.getMinutes()); 
        emails[i].dateOnly = new Date(emails[i].datetime.getFullYear(), emails[i].datetime.getMonth(), emails[i].datetime.getDate());


        if (emails[i].sender == "Miriam" ||  emails[i].sender ==  "Miriam Zisook" || emails[i].sender ==  "Miriam Zisook <mzisook@gmail.com>"){
            emails[i].from = "Miriam"
            //console.log("replaced with: " + emails[i].from)
        }

        else if (emails[i].sender == "Nitza" || emails[i].sender == "Nitza Zisook <nzisook@gmail.com>" || emails[i].sender == "Mom" || emails[i].sender == "Nitza Zisook" || emails[i].sender == "nzisook@gmail.com" ){
            emails[i].from = "Nitza"
            //console.log("replaced with: " + emails[i].from)
        }
        else {
            emails[i].from = emails[i].sender; 
        }

        //console.log(emails[i]);
        if (emails[i].rawDate > startDate){ 
            //console.log(emails[i]);
            emailsOnly.push(emails[i]);  
            allMessages.push(emails[i]);
        }

    }



    for (i in spreadsheetTexts){
      messages[i] = {} 
      messages[i].from = spreadsheetTexts[i]["Sender"]; 
      messages[i].date = spreadsheetTexts[i]["Date"];
      messages[i].medium = spreadsheetTexts[i]["Medium"];
      messages[i].time = spreadsheetTexts[i]["Time"];
      messages[i].message = spreadsheetTexts[i]["Message"];
      messages[i].subject = spreadsheetTexts[i]["Subject"];
      messages[i].group = spreadsheetTexts[i]["Group"];
      messages[i].logistical = spreadsheetTexts[i]["LogisticalRelational"]
      messages[i].splitting = spreadsheetTexts[i]["Splitting"]
      messages[i].messageBody = spreadsheetTexts[i]["Message"];
      messages[i].strategy = spreadsheetTexts[i]["Strategies"].split("; ");
      messages[i].markDown = spreadsheetTexts[i]["Message"];

      


      var dateSplit = messages[i].date.split("/");
      var timeSplit = messages[i].time.split(":")
      messages[i].datetime = new Date(20 + dateSplit[2], dateSplit[0]-1, dateSplit[1], timeSplit[0], timeSplit[1]);
      messages[i].dateMillis = messages[i].datetime.getTime();

      messages[i].timeOfDay = new Date(0, 0, 0, messages[i].datetime.getHours(), messages[i].datetime.getMinutes()); 
      messages[i].dateOnly = new Date(messages[i].datetime.getFullYear(), messages[i].datetime.getMonth(), messages[i].datetime.getDate());
  }



  for (i in messages){
    if (messages[i].medium=="Text"){

      if (messages[i].from ==  "Miriam Zisook"){

        messages[i].from = "Miriam"
            //console.log("replaced with: " + messages[i].from)
        }

        else if (messages[i].from == "Mom"){
            messages[i].from = "Nitza"
            //console.log("replaced with: " + messages[i].from)
        }

        //console.log("texts: ")
        //console.log(messages[i])
        allMessages.push(messages[i]);
        textsOnly.push(messages[i]); 
    }
}



    //trying to sort the array which contains emails and texts, now both with allMessages.dateMillis set as messages[i].datetime.getTime(); so it can display them all in a big chronological list 
    allMessagesSorted = allMessages.sort(function(a, b){
       return a.dateMillis-b.dateMillis;
   });

}



