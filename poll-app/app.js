

var app = new Vue({
  el: '#app',
  data: {
      poll: {
        question: '',
        answers: [
          {text:'', count:0},
          {text:'', count:0}
        ],
      },
        
      
  },
  methods: {
    addAnswer() {
      this.poll.answers.push({text:'', count:0});
              
      
    },
    removeAnswer() {
      this.poll.answers.pop();
            
    },

    
   


    async publish() {

                    
      let response = await fetch('http://localhost:3000/api/poll/', {
        method: 'POST',
        body: JSON.stringify(this.poll),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).catch((err) => { console.log(err); });

      if (response.status == 200) {
        var res = await response.json();
        window.location.replace('/vote/#' + res.insertedId);
      } else {
        console.log(response.status);
      }

    }
  }
});
