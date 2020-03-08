var app = new Vue({
  el: '#app',
  data: {
    poll: {
      question: '',
      answers: [
        {text:'', count:0},
        {text:'', count:0}
      ]
    },
    id: null,
    answer: null,
        
  },
  async created() {
    this.id = window.location.hash.substring(1);
    if (!this.id) return window.location.replace('/');

    let response = await fetch('http://localhost:3000/api/poll/' + this.id, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).catch((err) => { console.log(err); });

    if (response.status == 200) {
      var res = await response.json();
      this.poll = res;
    } else {
      console.log(response.status);
    }

  },
  methods: {
    selected(i) {
      this.answer = i;
    },
    async vote() {
      if (this.answer !== null) {

        let response = await fetch('http://localhost:3000/api/poll/' + this.id, {
          method: 'PUT',
          body: JSON.stringify({answer:this.answer}),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }).catch((err) => { console.log(err); });

        if (response.status == 200) {
          
          var res = await response.json();
          window.location.replace('/result/#' + this.id);
        } else {
          console.log(response.status);
        }

      }
    }
  }
});
