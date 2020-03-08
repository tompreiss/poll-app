var app = new Vue({

    el: '#app',
    data: {
        polls: {}
        

    },
    async created() {


               
        let response = await fetch('http://localhost:3000/polls/', {
            
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
                "Accept": 'application/json'
            }

        }).catch((err) => {
            console.log(err);
        });

        if (response.status == 200) {
            var res = await response.json();
            this.polls = res.reverse();
            
        } else {
            console.log(response.status);
        }


    }
    
    



      
});
