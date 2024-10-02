import cn from "classnames";
function FlipCard({ card }) {      
    return (      
      <div className="flip-card-outer">
        <div className="flip-card-inner">
        <div
        className={cn("flip-card-inner", {
          "hover-trigger": card.variant === "hover"
        })}//added here cuz we need inner card
      >
          <div className="card front">            
          <img width='400px' className="rounded-xl h-96" src='https://webbtelescope.org/files/live/sites/webb/files/home/_images/webb-science.jpg?t=tn2400'/>
            <div className="card-body d-flex justify-content-center align-items-center">
              <p className="card-text fs-1 fw-bold">{card.front}</p>
            </div>
          </div>
          <div className="card back">
          <img width='400px' className="rounded-xl h-96" src='https://webbtelescope.org/files/live/sites/webb/files/home/_images/webb-science.jpg?t=tn2400'/>
            <div className="card-body d-flex justify-content-center align-items-center">
              <p className="card-text fs-1 fw-bold">{card.back}</p>
            </div>
          </div>
        </div>
        </div>
      </div>
    );   
  }  
  
export default FlipCard;
// import cn from "classnames";
// function FlipCard({ card }) {      
//     return (      
//       <div className="flip-card-outer">
//         <div className="flip-card-inner">
//         <div
//         className={cn("flip-card-inner", {
//           "hover-trigger": card.variant === "hover"
//         })}//added here cuz we need inner card
//       >
//           <div className="card front">
// 		<div class="wrapper">
//         <i id="left" class="fa-solid  fas fa-angle-left"></i>
//         <ul class="carousel">
//             <li class="card">
//                 <div class="img">
// 			<img width='100%' src='https://webbtelescope.org/files/live/sites/webb/files/home/_images/webb-science.jpg?t=tn2400'alt=""draggable="false"/> </div>
//             </li>
// 	</ul>
//         <i id="right" class="fa-solid fas fa-angle-right"></i>
//     </div>         
//             <div className="card-body d-flex justify-content-center align-items-center">
//               <p className="card-text fs-1 fw-bold">{card.front}</p>
//             </div>
//           </div>
//           <div className="card back">
// 		<div class="wrapper">
//         <i id="left" class="fa-solid  fas fa-angle-left"></i>
//         <ul class="carousel">
//             <li class="card">
//                 <div class="img">
// 			<img width='100%' src='https://webbtelescope.org/files/live/sites/webb/files/home/_images/webb-science.jpg?t=tn2400'alt=""draggable="false"/> </div>
//             </li>
// 	</ul>
//         <i id="right" class="fa-solid fas fa-angle-right"></i>
//     </div>         
	
//                       <div className="card-body d-flex justify-content-center align-items-center">
//               <p className="card-text fs-1 fw-bold">{card.back}</p>
//             </div>
//           </div>
//         </div>
//         </div>
//       </div>
//     );    
//   }  
  
//   export default FlipCard;