//=========application script starts============
function applicationload(){
    const userdetails = document.querySelector('.row');
    userdetails.innerHTML = ''; //wipping the old data  
    
    userdetails.innerHTML = `<div id="Message">
      
    <ul>
      <li>
          <div id="primaryMessage">
                
              <button onclick="getThreadmsg()" class="primaryBtn" id="button">
                      <i class="material-icons" id="sectionTwoicon">inbox</i> 
                  <div>
                      Primary 
                  </div> 
              </button>               
              </div>
            
          </li>
      <li>
        <button class="socialBtn" onclick ="getThreadmsg()" id="button">
          <i class="material-icons" id="sectionTwoicon">send</i> 
              <div>
                  Sent Email
              </div>
                  
              </button>
              
          </li>
      <li>
        
        
        <button class="promotionsBtn" onclick="listOfdrafts()" id="button">
           <i class="material-icons" id="sectionTwoicon">drafts</i>
       <div>
          Draft Email
       </div>             
              </button>            
              </li> 
              </ul>
     
    </div>   
         
        <div >
          <div class="primary"> </div>
      </div>
              
         <div>
          <input type="text" placeholder="Enter Email ID" id="emailField">
          <input type="text" placeholder="Message" id="messageField">
          <button id="sendBtn">send</button>
    
         </div>
          `
}
