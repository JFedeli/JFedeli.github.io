  $("#closeModal").addEventListener("click", () => { $("#authorModal") .close() })
        //event listener

        //$(".authors").addEventListener(click, getAuthorInfo);
        let authorLinks = document.querySelectorAll(".authors");
        for(let i of authorLinks) {
            i.addEventListener("click", getAuthorInfo);
        }

        function $(selector){
            return document.querySelector(selector);
        }

        async function getAuthorInfo(){
            let authorId = this.getAttribute("authorId");
            let url = "api/authors/" + authorId;
            let response = await fetch(url);
            let data = await response.json();
            $("#authorName").textContent = data[0].firstName + " " + data[0].lastName;
            $("#authorImage").src = data[0].portrait;
        }