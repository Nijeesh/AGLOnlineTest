// using revealing pattern for exposing the ajax server call
var petOwnersServerModule = (function () {
    var petOwnerDetailsUrl = 'http://agl-developer-test.azurewebsites.net/people.json';
    //exception handling
    $(document).ajaxError(function (event, xhr) {        
		$('.loading-overlay').hide();	
		$('#accordion').hide();	
		$('#errorDetails').html("There is an error processing request: </br> Error Code: " + xhr.status + "</br> Error Details: " + xhr.statusText)
    });
	//actual ajax call
    var getPetOwnerDetails = function () {
        return $.ajax(petOwnerDetailsUrl);
    };
    return {
        getPetOwnerDetails: getPetOwnerDetails
    };
}());
//This module will reveal the business logic behind filtering, sorting, compilation of template and dispaly the output in UI
var petOwnersClientModule = (function () {
  var data =[];
  var templates = {};
  //compiling the handlebar template to generate the dynamic html
    var compileTemplates = function () {
        templates.petDetailsofMaleOwners = Handlebars.compile($("#petDetailsofMaleOwners").html());
        templates.petDetailsofFemaleOwners = Handlebars.compile($("#petDetailsofFemaleOwners").html());
    };
   //calling the methods to do the filtering and sorting and also binding the UI with the output of child methods
    var showPetDetailsInUi = function (output) {
		this.data =output;
        var outputPetsofMaleOwners = templates.petDetailsofMaleOwners({ petsofMaleOwners: getFilteredListofPetOwnerDetails('male', 'cat', this.data) });
        $("#petDetailsMaleOutput").html(outputPetsofMaleOwners);
        var outputPetsofFemaleOwners = templates.petDetailsofFemaleOwners({ petsofFemaleOwners: getFilteredListofPetOwnerDetails('female', 'cat', this.data) });
        $("#petDetailsFemaleOutput").html(outputPetsofFemaleOwners);
        $('.loading-overlay').hide();
		$('#accordion').show();			
    };
    //getting the filtered list of desired data and returning the sorted list to the calling method
    var getFilteredListofPetOwnerDetails = function (ownerType, petType, data) {
        var pets = [];
        $.each(data, function (key, value) {
            $.each(value.pets, function (subKey, subValue) {
                if (value.gender.toLowerCase() === ownerType.toLowerCase() && subValue.type.toLowerCase() === petType.toLowerCase()) {
                    pets.push(subValue.name);
                }
            });
        });
        return pets.sort();
    };
    // initiating the ajax server call and do the actual data binding via call back
    var insertPetDetails = function () {
        $('.loading-overlay').show();
        petOwnersServerModule.getPetOwnerDetails().done(showPetDetailsInUi);
    };
	    return {
        compileTemplates: compileTemplates,
        showPetDetailsInUi : showPetDetailsInUi,		
	    getFilteredListofPetOwnerDetails : getFilteredListofPetOwnerDetails,		
		insertPetDetails: insertPetDetails		
    };

}());
// This is Accordion module to have the animation
var AccordionModule = (function () {
	//telling accordion what to do on user interaction and binding the dropdown
     var Accordion = function (el, multiple) {
		    Accordion.prototype.dropdown = AccordionDropDown;
            this.el = el || {};
            this.multiple = multiple || false;
            var links = this.el.find('.link');
            links.on('click', { el: this.el, multiple: this.multiple }, this.dropdown)
        }
		//accordion dropdown functionality
		var AccordionDropDown = function (e) {
            var $el = e.data.el;
            $this = $(this),
			$next = $this.next();
            $next.slideToggle();
            $this.parent().toggleClass('open');
            if (!e.data.multiple) {
                $el.find('.submenu').not($next).slideUp().parent().removeClass('open');
            };
        }
    return {
        Accordion: Accordion
    };
}());
//document ready
$(function () {
        petOwnersClientModule.compileTemplates();
        petOwnersClientModule.insertPetDetails();
        var accordion = new AccordionModule.Accordion($('#accordion'), false);
});
 


