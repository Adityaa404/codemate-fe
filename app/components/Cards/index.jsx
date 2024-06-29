// "use client"
// import React, { ReactNode } from 'react';

// interface CardProps {
//   frontContent: ReactNode;
//   backContent: ReactNode;
//   badge: string;
//   title: string;
// }

// const Card: React.FC<CardProps> = ({ frontContent, backContent, badge, title }) => {
//   return (
//     <div className="card w-[190px] h-[254px] perspective-1000">
//       <div className="content w-full h-full transform-style-3d transition duration-300 shadow-lg rounded-md hover:rotate-y-180">
//         <div className="back absolute w-full h-full backface-hidden rounded-md overflow-hidden bg-gray-800 dark:bg-gray-700">
//           <div className="back-content absolute w-[99%] h-[99%] bg-gray-800 dark:bg-gray-700 rounded-md text-white flex flex-col justify-center items-center gap-8">
//             {backContent}
//           </div>
//         </div>
//         <div className="front absolute w-full h-full backface-hidden rounded-md overflow-hidden bg-gray-800 dark:bg-gray-700 text-white rotate-y-180">
//           <div className="front-content absolute w-full h-full p-4 flex flex-col justify-between">
//             <span className="badge bg-gray-700 dark:bg-gray-600 px-2 py-1 rounded-full text-xs self-start">{badge}</span>
//             <div className="description w-full p-2 bg-gray-700 dark:bg-gray-600 backdrop-blur rounded-md">
//               <h3 className="text-sm font-bold mb-2">{title}</h3>
//               {frontContent}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;





// import React from 'react';

// interface CardProps {
//   title: string;
//   children: React.ReactNode;
// }

// const Card: React.FC<CardProps> = ({ title, children }) => {
//   return (
//     <div className="p-6 bg-white rounded-lg shadow-lg">
//       <h2 className="mb-2 text-lg font-bold">{title}</h2>
//       {children}
//     </div>
//   );
// };

// export default Card;

import React from 'react';
import '../../../styles/cards.css';

const Card = ({ title, description }) => {
  return (
    <div className="card">
      <div className="content">
        <div className="back">
          <div className="back-content">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#fff" d="M41,24c0,9.4-7.6,17-17,17S7,33.4,7,24S14.6,7,24,7S41,14.6,41,24z"></path><path fill="#455a64" d="M21 41v-5.5c0-.3.2-.5.5-.5s.5.2.5.5V41h2v-6.5c0-.3.2-.5.5-.5s.5.2.5.5V41h2v-5.5c0-.3.2-.5.5-.5s.5.2.5.5V41h1.8c.2-.3.2-.6.2-1.1V36c0-2.2-1.9-5.2-4.3-5.2h-2.5c-2.3 0-4.3 3.1-4.3 5.2v3.9c0 .4.1.8.2 1.1L21 41 21 41zM40.1 26.4C40.1 26.4 40.1 26.4 40.1 26.4c0 0-1.3-.4-2.4-.4 0 0-.1 0-.1 0-1.1 0-2.9.3-2.9.3-.1 0-.1 0-.1-.1 0-.1 0-.1.1-.1.1 0 2-.3 3.1-.3 1.1 0 2.4.4 2.5.4.1 0 .1.1.1.2C40.2 26.3 40.2 26.4 40.1 26.4zM39.8 27.2C39.8 27.2 39.8 27.2 39.8 27.2c0 0-1.4-.4-2.6-.4-.9 0-3 .2-3.1.2-.1 0-.1 0-.1-.1 0-.1 0-.1.1-.1.1 0 2.2-.2 3.1-.2 1.3 0 2.6.4 2.6.4.1 0 .1.1.1.2C39.9 27.1 39.9 27.2 39.8 27.2zM7.8 26.4c-.1 0-.1 0-.1-.1 0-.1 0-.1.1-.2.8-.2 2.4-.5 3.3-.5.8 0 3.5.2 3.6.2.1 0 .1.1.1.1 0 .1-.1.1-.1.1 0 0-2.7-.2-3.5-.2C10.1 26 8.6 26.2 7.8 26.4 7.8 26.4 7.8 26.4 7.8 26.4zM8.2 27.9c0 0-.1 0-.1-.1 0-.1 0-.1 0-.2.1 0 1.4-.8 2.9-1 1.3-.2 4 .1 4.2.1.1 0 .1.1.1.1 0 .1-.1.1-.1.1 0 0 0 0 0 0 0 0-2.8-.3-4.1-.1C9.6 27.1 8.2 27.9 8.2 27.9 8.2 27.9 8.2 27.9 8.2 27.9z"></path><path fill="#455a64" d="M14.2,23.5c0-4.4,4.6-8.5,10.3-8.5c5.7,0,10.3,4,10.3,8.5S31.5,31,24.5,31S14.2,27.9,14.2,23.5z"></path><path fill="#455a64" d="M28.6 16.3c0 0 1.7-2.3 4.8-2.3 1.2 1.2.4 4.8 0 5.8L28.6 16.3zM20.4 16.3c0 0-1.7-2.3-4.8-2.3-1.2 1.2-.4 4.8 0 5.8L20.4 16.3zM20.1 35.9c0 0-2.3 0-2.8 0-1.2 0-2.3-.5-2.8-1.5-.6-1.1-1.1-2.3-2.6-3.3-.3-.2-.1-.4.4-.4.5.1 1.4.2 2.1 1.1.7.9 1.5 2 2.8 2 1.3 0 2.7 0 3.5-.9L20.1 35.9z"></path><path fill="#00bcd4" d="M24,4C13,4,4,13,4,24s9,20,20,20s20-9,20-20S35,4,24,4z M24,40c-8.8,0-16-7.2-16-16S15.2,8,24,8 s16,7.2,16,16S32.8,40,24,40z"></path>
</svg>
            <strong>{description}</strong>
          </div>
        </div>
        <div className="front">
          <div className="img">
            <div className="circle"></div>
            <div className="circle" id="right"></div>
            <div className="circle" id="bottom"></div>
          </div>
          <div className="front-content">
            <small className="badge">{title}</small>
            <div className="description">
              <div className="title">
                <p className="title">
                  <strong>{title}</strong>
                </p>
                <svg fill-rule="nonzero" height="15px" width="15px" viewBox="0,0,256,256" xmlns="http://www.w3.org/1999/xlink">
                  <g style={{ mixBlendMode: 'normal' }} text-anchor="none" font-size="none" font-weight="none" font-family="none" stroke-dashoffset="0" stroke-dasharray="" stroke-miterlimit="10" stroke-linejoin="miter" stroke-linecap="butt" stroke-width="1" stroke="none" fill-rule="nonzero" fill="#20c997">
                    <g transform="scale(8,8)">
                      <path d="M25,27l-9,-6.75l-9,6.75v-23h18z"></path>
                    </g>
                  </g>
                </svg>
              </div>
              <p className="card-footer">
                Interactive Card
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;