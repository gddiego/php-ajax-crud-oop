
$(document).ready(function () {
    // READ records on page load
    readRecords(); // calling function
});

function addRecord() {
    var first_name=$("#first_name").val();
    var last_name=$("#last_name").val();
    var email=$("#email").val();
 
 
// AJAX code to send data to php file.
        $.ajax({
            type: "POST",
            url: "ajax/create.php",
            data: {first_name:first_name,last_name:last_name,email:email},
            success: function(data) {
             $("#message").html(data);
            $("p").addClass("alert alert-success");

            $("#add_new_record_modal").modal("hide");
 
            // read records again
            readRecords();
 
            // clear fields from the popup
            $("#first_name").val("");
            $("#last_name").val("");
            $("#email").val("");
            },
            error: function(err) {
            alert(err);
            }
        } 
        );
 
}

function readRecords() {
    $.get("ajax/read.php", {}, function (data, status) {
        $(".records_content").html(data);
    });
}
 
function DeleteUser(id) {
    var conf = confirm("Are you sure, do you really want to delete User?");
    if (conf == true) {
        // $.post("ajax/delete.php", {
        //         id: id
        //     },
        //     function (data, status) {
        //         // reload Users by using readRecords();
        //         readRecords();
        //     }
        // );

          $.ajax({
            type: "POST",
            url: "ajax/delete.php",
            data: {id:id},
            success: function(data) {
                console.log(id);
             $("#message").html(data);
            $("p").addClass("alert alert-success"); 
 
            // read records again
            readRecords(); 
            },
            error: function(err) {
            alert(err);
            }
        } 
        );
    }
}

function GetUserDetails(id) {
    // Add User ID to the hidden field
    $("#hidden_user_id").val(id);
    $.post("ajax/details.php", {
            id: id
        },
        function (data, status) {
            // PARSE json data
            var user = JSON.parse(data);
            // Assign existing values to the modal popup fields
            $("#update_first_name").val(user.first_name);
            $("#update_last_name").val(user.last_name);
            $("#update_email").val(user.email);
        }
    );
    // Open modal popup
    $("#update_user_modal").modal("show");
}

function UpdateUserDetails() {
    // get values
    var first_name = $("#update_first_name").val();
    first_name = first_name.trim();
    var last_name = $("#update_last_name").val();
    last_name = last_name.trim();
    var email = $("#update_email").val();
    email = email.trim();

    if (first_name == "") {
        alert("First name field is required!");
    }
    else if (last_name == "") {
        alert("Last name field is required!");
    }
    else if (email == "") {
        alert("Email field is required!");
    }
    else {
        // get hidden field value
        var id = $("#hidden_user_id").val();

        // Update the details by requesting to the server using ajax
        $.post("ajax/update.php", {
                id: id,
                first_name: first_name,
                last_name: last_name,
                email: email
            },
            function (data, status) {
                // hide modal popup
                $("#update_user_modal").modal("hide");
                // reload Users by using readRecords();
                 console.log(id+first_name+last_name);
                readRecords();
            }
        );
    }
}