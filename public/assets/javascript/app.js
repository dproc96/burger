$(document).on("click", "#add-burger", function() {
    burgerMethods.addBurger();
})

$(document).on("click", ".devour", function() {
    burgerMethods.devourBurger($(this));
})

$(document).on("keyup", function(e) {
    burgerMethods.editBurger(e);
})

const burgerMethods = {
    addBurger: function() {
        let burgerObject = { 
            burger_name: $("#burger-name").val() 
        };
        $("#burger-name").empty();
        if (burgerObject.burger_name) {
            $.post("/api/new", burgerObject, function(response) {
                location.reload()
            })
        }
    },
    devourBurger: function(e) {
        let burgerObject = {
            burger_name: e.attr("data-name"),
            devoured: true,
            id: e.attr("data-id")
        }
        this.updateBurger(burgerObject)
    },
    updateBurger: function(burgerObject) {
        $.ajax({
            url: `api/${burgerObject.id}`,
            type: "PUT",
            data: burgerObject
        }).then(function (response) {
            location.reload();
        })
    },
    editBurger: function(e) {
        if (e.keyCode === 13) {
            let $focus = $(":focus");
            if ($focus.attr("class") === "burger-editor") {
                let burgerObject = {
                    burger_name: $focus[0].textContent,
                    devoured: false,
                    id: $focus[0].dataset.id
                }
                this.updateBurger(burgerObject)
            }
        }
    }
}