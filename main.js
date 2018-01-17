(function() {

  
  //initialize dom object
  var dom;
  
  
 //initialize the module
  const init = function() {
    cacheDOM();
    bindEventHandlers();
  }
  
  
  //caching the DOM
  const cacheDOM = function() {
    dom = {};
    dom.input = document.getElementsByClassName("search-text")[0];
    dom.buttonSearch = document.getElementById("button-search");
    dom.searchText = document.getElementById("search-text"); 
  }
  
  
  //defining event listeners
  const bindEventHandlers = function() {
    dom.buttonSearch.addEventListener("click", onUserSearch);
    dom.searchText.addEventListener("keydown", onEnterUserSearch);
    };  
  
  
  //letting users search on enter key
  const onEnterUserSearch = function(e) {
    if (e.which === 13) {
      onUserSearch();
    }
  }
  
  
  //definining what happens when user searches
    const onUserSearch = function() {
      
      //clear div when user searches again
      $("div").remove("#divResults");
      const api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + dom.input.value;
      $.ajax({
          method:"GET",
          url: api,
          cache: false,
          dataType: "jsonp"
        }).then(function(data) {
              var objArray = Object.entries(data.query.pages);
        
              //iterating through the array results
              objArray.forEach(function(item) {
                var newDiv = document.createElement("div"); //setting up a div to inject results into DOM
                newDiv.id = "divResults";
                newDiv.class = "divResults";
                
                var a = document.createElement('a');
                a.href = 'https://en.wikipedia.org/wiki/?curid=' + item[1].pageid;
                a.target = "_blank";
                a.class = "resultsLink";
                // var aText = document.createTextNode("Click here for article");
                // a.appendChild(aText);
                
                var h1 = document.createElement("h1");
                var titleText = document.createTextNode(item[1].title);
                h1.appendChild(titleText);
                var snippetText = document.createTextNode(item[1].extract);
                
                //populating div with data
                // h1.appendChild(a);
                newDiv.appendChild(h1);
                newDiv.appendChild(snippetText);
                a.appendChild(newDiv);
                // var finalDiv = $(".divResults").wrap($('.resultsLink'));
                // finalDiv.class = "finalDiv";
                
                
                document.body.appendChild(a);
                dom.searchText.value = ''; //resetting search input
              })
              })
    } 
     
  init();
  
})(jQuery);