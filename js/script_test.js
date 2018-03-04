QUnit.module( "Module A: For Testing Business logic", {	
  setup: function() {
    this.data = [{"name":"Bob","gender":"Male","age":23,"pets":[{"name":"Garfield","type":"Cat"},{"name":"Fido","type":"Dog"}]},{"name":"Jennifer","gender":"Female","age":18,"pets":[{"name":"Garfield","type":"Cat"}]},{"name":"Steve","gender":"Male","age":45,"pets":null},{"name":"Fred","gender":"Male","age":40,"pets":[{"name":"Tom","type":"Cat"},{"name":"Max","type":"Cat"},{"name":"Sam","type":"Dog"},{"name":"Jim","type":"Cat"}]},{"name":"Samantha","gender":"Female","age":40,"pets":[{"name":"Tabby","type":"Cat"}]},{"name":"Alice","gender":"Female","age":64,"pets":[{"name":"Simba","type":"Cat"},{"name":"Nemo","type":"Fish"}]}];
  }
});
test("verify the output of a pets based on male owners and pet category", function() {
    equal(petOwnersClientModule.getFilteredListofPetOwnerDetails("male","cat",this.data).length, 4);
});
test("verify the output of a pets based on female owners and pet category", function() {
    equal(petOwnersClientModule.getFilteredListofPetOwnerDetails("female","cat",this.data).length, 3);
});

QUnit.module( "Module B: For Testing Ajax requests", {});
asyncTest('Get Pet and owner details form server ', function(){
    expect(1); 
    var xhr = $.ajax({
        type: 'GET',
        url:    'http://agl-developer-test.azurewebsites.net/people.json'
    })
    .always(function(data, status){
        var $data = $(data);
        equal($(data).length>0, true, 'Success');
        start(); 
    });

});

QUnit.module( "Module C: For Testing UI", {	
  setup: function() {
    this.data = [{"name":"Bob","gender":"Male","age":23,"pets":[{"name":"Garfield","type":"Cat"},{"name":"Fido","type":"Dog"}]},{"name":"Jennifer","gender":"Female","age":18,"pets":[{"name":"Garfield","type":"Cat"}]},{"name":"Steve","gender":"Male","age":45,"pets":null},{"name":"Fred","gender":"Male","age":40,"pets":[{"name":"Tom","type":"Cat"},{"name":"Max","type":"Cat"},{"name":"Sam","type":"Dog"},{"name":"Jim","type":"Cat"}]},{"name":"Samantha","gender":"Female","age":40,"pets":[{"name":"Tabby","type":"Cat"}]},{"name":"Alice","gender":"Female","age":64,"pets":[{"name":"Simba","type":"Cat"},{"name":"Nemo","type":"Fish"}]}];
  }
});
test("verify the binding of pet details in to the UI controls for Male Owner's category", function() {
    petOwnersClientModule.showPetDetailsInUi(this.data);
    equal($('#petDetailsMaleOutput').html()!='', true, 'Success');
});

test("verify the binding of pet details in to the UI controls for Female Owner's category ", function() {
petOwnersClientModule.showPetDetailsInUi(this.data);
    equal($('#petDetailsFemaleOutput').html()!='', true, 'Success');
});
test("verify the binding of pet details in to the UI controls for Owner's category ", function() {
petOwnersClientModule.insertPetDetails();
    equal($('#petDetailsFemaleOutput').html()!='', true, 'Success');
    equal($('#petDetailsMaleOutput').html()!='', true, 'Success');
});


