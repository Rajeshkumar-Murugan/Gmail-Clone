
  /**
   * Sample JavaScript code for gmail.users.getProfile
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/guides/code_samples#javascript
   * 
   * 
   */

  function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://mail.google.com/ https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.metadata"})
        .then(function() { 
            console.log("Sign-in successful"); 

    },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey("AIzaSyDG5xC4ErbnEQ4Gq2MQR5hlBKLqV0rqr7k");
    return gapi.client.load("https://gmail.googleapis.com/$discovery/rest?version=v1")
        .then(function() { console.log("GAPI client loaded for API"); 
        signinsuccess();
        
        
    },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  // User Profile
  function getProfile() {
    return gapi.client.gmail.users.getProfile({
      "userId": "me"
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
               // console.log("Response", response);
                return response;
              },
              function(err) { console.error("Execute error", err); });
  }
  


  function shortmessage() {
  
        return gapi.client.gmail.users.messages.list({
          "userId": "me"
        })
            .then(function(response) {
                    // Handle the results here (response.result has the parsed body).
                   // console.log("Response", response);
                    return response;
                  },
                  function(err) { console.error("Execute error", err); });
                  
      }

 

  // auth2 is initialized with gapi.auth2.init() and a user is signed in.


      // loading new data
     
      async function signinsuccess(){
        const container = document.querySelector('.container');
        const data = await getProfile();

        console.log(data)
        container.innerHTML = ''; //wipping the old data     
          container.innerHTML  += ` 
          
              <div class="header" >
                  <div>
                    <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_1x_r2.png"/>
                  </div>
                  
                  <div>
                    <button class="profile-btn tooltip"><img src="https://www.pngfind.com/pngs/m/678-6781630_icon-profile-bio-avatar-person-symbol-chat-circle.png" class="profile-pic tooltip" >
                        <span class="tooltiptext">
                        <p class="account-type"><b>Google Acount</b></p>
                        <p class="account-mail"><b>${data.result.emailAddress}</b></p>
                        <p class="account-mail-count"><b>Total Mail:${data.result.messagesTotal}</b></p>
                        </span>
                    </button>
                  </div>
              </div>
          
              <div class="catagories">  
                            
                  <div class="Primary-tab">   
                    <button onclick="Primary()" class="primary-btn">Primary</button>
                  </div>

                  <div class="message">
                    <button onclick="messagedata()" class="primary-btn">Getmessage data</button>
                  </div>
              </div>
         

          <div class="Menu-container">
            <ul>
              <li><a class="active icons" href="#Income" onclick="inbox_fun()">
              <span class="material-icons">
              inbox
              </span>Inbox</a></li>
              <li><a href="#news" class="icons"><span class="material-icons">
              star
              </span>Starred</a></li>
              <li><a href="#contact" class="icons"><span class="material-icons">
              watch_later
              </span>
              Snoozed</a></li>
              <li><a href="#contact" class="icons"><span class="material-icons">
              send
              </span>Sent</a></li>
              <li><a href="#about" class="icons"><span class="material-icons">
              drafts
              </span>
              Draft</a></li>
            </ul>

            
            <div class="message-content">            
                <div class="primary-data">
                
                </div>
                <table>
                <tbody class="primary-message">

                </tbody>
                </table>
            </div>
          <div>


          ` 
          Primary();        
      }  

      
async function Primary() {
        const primaryMsg = document.querySelector('.primary-message');        
        const data = await shortmessage();

        const msg = data.result.messages
        primaryMsg.innerHTML = ''; //wipping the old data  
                 
        msg.forEach((user)=>{ 
  
          return gapi.client.gmail.users.messages.get({
            "userId": "me",
            "id": user.id,
            "format": "full",
          "maxResults": 10

          })
              .then(function(response) {
                      // Handle the results here (response.result has the parsed body).
                      console.log("Response", response);
                      
                      var sub = response.result.payload.headers.filter((el)=> el.name == "Subject").map(e=>e.value)
                      var from = response.result.payload.headers.filter((el)=> el.name == "From").map(e=>e.value)
                       var date = response.headers.date
                    
                       
                       
                      


                      //console.log(n)
                      
                      primaryMsg.innerHTML += `
                      <tr> 
                      <td class="message-from">${from}</td>
                      <td class="message-sub">${sub}</td>
                      <td class="message-date">${date}</td>
                      </tr>
                      `

                    },
                    function(err) { console.error("Execute error", err); });
        })
      }

//Inbox function starts
async function inbox_fun() {
  const primaryMsg = document.querySelector('.primary-message');        
  const data = await shortmessage();

  const msg = data.result.messages
  primaryMsg.innerHTML = ''; //wipping the old data  
           
  msg.forEach((user)=>{ 

    return gapi.client.gmail.users.messages.get({
      "userId": "me",
      "id": user.id,
      "format": "full",
    "maxResults": 10

    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                //console.log("Response", response);
                
                 var subject = response.result.filter((el)=> el.labelIds == "INBOX")
                //  var from = response.result.payload.headers.filter((el)=> el.name == "From").map(e=>e.value)
                //  var date = response.headers.date
               
                 console.log(subject)
                 // var from = response.result.filter((el)=> el.labelIds == "INBOX").filter((el)=> el.payload.headers.name == "From").map(e=>e.payload.headers.value)
                // var date = response.result.filter((el)=> el.labelIds == "INBOX").filter((el)=> el.payload.headers.name == "Subject").map(e=>e.response.headers.date)
                // //console.log(n)
                
                // primaryMsg.innerHTML += `
                // <tr> 
                // <td class="message-from">${from}</td>
                // <td class="message-sub">${sub}</td>
                // <td class="message-sub">${date}</td>
                // </tr>
                // `

              },
              function(err) { console.error("Execute error", err); });
  })
}


     



      gapi.load("client:auth2", function() {
        gapi.auth2.init({client_id: "68402850544-44tf25t6o3lb1k3ilk3qb0kvkb9vhnt9.apps.googleusercontent.com"});
      });
